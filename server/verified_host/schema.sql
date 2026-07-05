-- MySQL compatible schema for core tables (simplified)
CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120), email VARCHAR(120) UNIQUE, role VARCHAR(32));
CREATE TABLE students (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, enrolled_at DATETIME, FOREIGN KEY (user_id) REFERENCES users(id));
CREATE TABLE trainers (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, FOREIGN KEY (user_id) REFERENCES users(id));
CREATE TABLE courses (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(200), active BOOLEAN DEFAULT TRUE);
CREATE TABLE enrollments (id INT AUTO_INCREMENT PRIMARY KEY, student_id INT, course_id INT, enrolled_at DATETIME, FOREIGN KEY (student_id) REFERENCES students(id), FOREIGN KEY (course_id) REFERENCES courses(id));
CREATE TABLE payments (id INT AUTO_INCREMENT PRIMARY KEY, amount DECIMAL(10,2), status VARCHAR(32), created_at DATETIME);
CREATE TABLE class_schedules (id INT AUTO_INCREMENT PRIMARY KEY, course_id INT, starts_at DATETIME, FOREIGN KEY (course_id) REFERENCES courses(id));
CREATE TABLE certificates (id INT AUTO_INCREMENT PRIMARY KEY, student_id INT, issued_at DATETIME, FOREIGN KEY (student_id) REFERENCES students(id));
