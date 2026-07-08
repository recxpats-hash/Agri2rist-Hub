import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Users, CheckCircle2, Mail, Phone, User } from "lucide-react";

export default function RegisterStudentPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    enrollmentDate: "",
    referenceId: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.fullName && formData.email && formData.phone && formData.course) {
      setSubmitted(true);
      setTimeout(() => navigate("/verified-host"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-4">
        <button
          onClick={() => navigate("/verified-host")}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {!submitted ? (
          <>
            {/* Hero Section */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200 mb-4">
                <Users size={18} className="text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700">Register New Student</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Add Student to Your Program
              </h1>
              <p className="text-xl text-gray-600">
                Enroll new participants in your training modules with instant verification.
              </p>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center justify-between mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <button
                    onClick={() => setStep(s)}
                    className={`w-12 h-12 rounded-full font-bold flex items-center justify-center transition-all ${
                      s <= step
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {s < step ? <CheckCircle2 size={24} /> : s}
                  </button>
                  {s < 3 && (
                    <div className={`flex-1 h-1 mx-3 transition-all ${s < step ? "bg-emerald-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                  </div>
                  <div>
                    <Label className="block mb-2 font-bold text-gray-900">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      <Input
                        type="text"
                        placeholder="Enter full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="pl-12 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="block mb-2 font-bold text-gray-900">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      <Input
                        type="email"
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-12 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="block mb-2 font-bold text-gray-900">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      <Input
                        type="tel"
                        placeholder="+256 XXX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-12 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Selection</h2>
                  </div>
                  <div>
                    <Label className="block mb-2 font-bold text-gray-900">Select Training Module</Label>
                    <Select value={formData.course} onValueChange={(val) => handleInputChange("course", val)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Choose a course..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hospitality">Hospitality Foundation</SelectItem>
                        <SelectItem value="agriculture">Agricultural Experience</SelectItem>
                        <SelectItem value="food-safety">Food Safety Practicals</SelectItem>
                        <SelectItem value="digital">Digital Skills for Hosts</SelectItem>
                        <SelectItem value="business">Business Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="block mb-2 font-bold text-gray-900">Enrollment Date</Label>
                    <Input
                      type="date"
                      value={formData.enrollmentDate}
                      onChange={(e) => handleInputChange("enrollmentDate", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Confirm</h2>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 space-y-3">
                    <p><span className="font-bold text-gray-900">Name:</span> {formData.fullName}</p>
                    <p><span className="font-bold text-gray-900">Email:</span> {formData.email}</p>
                    <p><span className="font-bold text-gray-900">Phone:</span> {formData.phone}</p>
                    <p><span className="font-bold text-gray-900">Course:</span> {formData.course}</p>
                    <p><span className="font-bold text-gray-900">Enrollment Date:</span> {formData.enrollmentDate}</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                      ✓ Student will receive email confirmation with login credentials and course materials.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="rounded-xl h-12 px-8"
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  if (step < 3) {
                    setStep(step + 1);
                  } else {
                    handleSubmit();
                  }
                }}
                disabled={
                  (step === 1 && (!formData.fullName || !formData.email || !formData.phone)) ||
                  (step === 2 && !formData.course)
                }
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 px-8 font-bold"
              >
                {step === 3 ? "Confirm Registration" : "Continue"}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Student Registered Successfully!</h2>
            <p className="text-gray-600 mb-8">
              {formData.fullName} has been enrolled in {formData.course} and will receive confirmation email shortly.
            </p>
            <Button
              onClick={() => navigate("/verified-host")}
              className="bg-emerald-600 hover:bg-emerald-700 rounded-xl h-12 px-8 font-bold"
            >
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
