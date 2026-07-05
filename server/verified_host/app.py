from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from datetime import datetime, timedelta

app = Flask(__name__, template_folder='templates', static_folder='static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.dirname(__file__), 'data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

# --- Models (simplified for dashboard metrics) ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True)
    role = db.Column(db.String(32))

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    enrolled_at = db.Column(db.DateTime, default=datetime.utcnow)

class Trainer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    active = db.Column(db.Boolean, default=True)

class Enrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
    enrolled_at = db.Column(db.DateTime, default=datetime.utcnow)

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(32))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ClassSchedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
    starts_at = db.Column(db.DateTime)

class Certificate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    issued_at = db.Column(db.DateTime, default=datetime.utcnow)


def init_db():
    db.create_all()
    # seed minimal data if empty
    if User.query.count() == 0:
        admin = User(name='Admin', email='admin@example.com', role='admin')
        u1 = User(name='Alice Student', email='alice@example.com', role='student')
        u2 = User(name='Ben Trainer', email='ben@example.com', role='trainer')
        db.session.add_all([admin, u1, u2])
        db.session.commit()
        s = Student(user_id=u1.id)
        t = Trainer(user_id=u2.id)
        c1 = Course(title='Certified Agri2rist Host - Foundation')
        c2 = Course(title='Hospitality & Experience Design')
        db.session.add_all([s, t, c1, c2])
        db.session.commit()
        enroll = Enrollment(student_id=s.id, course_id=c1.id)
        pay = Payment(amount=250000, status='paid')
        cls = ClassSchedule(course_id=c1.id, starts_at=datetime.utcnow())
        cert = Certificate(student_id=s.id)
        db.session.add_all([enroll, pay, cls, cert])
        db.session.commit()

@app.route('/api/dashboard')
def api_dashboard():
    total_students = Student.query.count()
    total_trainers = Trainer.query.count()
    active_courses = Course.query.filter_by(active=True).count()
    certificates = Certificate.query.count()
    revenue = db.session.query(db.func.coalesce(db.func.sum(Payment.amount), 0.0)).scalar() or 0.0
    pending_payments = Payment.query.filter_by(status='pending').count()
    upcoming = ClassSchedule.query.filter(ClassSchedule.starts_at >= datetime.utcnow()).count()

    data = {
        'total_students': total_students,
        'total_trainers': total_trainers,
        'active_courses': active_courses,
        'certificates': certificates,
        'revenue': revenue,
        'pending_payments': pending_payments,
        'upcoming_classes': upcoming,
    }
    return jsonify(data)

@app.route('/dashboard')
def dashboard_page():
    return render_template('dashboard.html')

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5001)
