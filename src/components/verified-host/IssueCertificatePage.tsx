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
import { ArrowLeft, Award, CheckCircle2, User, Calendar } from "lucide-react";

export default function IssueCertificatePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    trainingModule: "",
    completionDate: "",
    certificationLevel: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.studentName && formData.studentEmail && formData.trainingModule && formData.completionDate && formData.certificationLevel) {
      setSubmitted(true);
      setTimeout(() => navigate("/verified-host"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-4">
        <button
          onClick={() => navigate("/verified-host")}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full border border-purple-200 mb-4">
                <Award size={18} className="text-purple-600" />
                <span className="text-sm font-bold text-purple-700">Issue Certificate</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Award Certification
              </h1>
              <p className="text-xl text-gray-600">
                Generate and issue digital certificates to successfully trained students.
              </p>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center justify-between mb-12">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <button
                    onClick={() => setStep(s)}
                    className={`w-12 h-12 rounded-full font-bold flex items-center justify-center transition-all ${
                      s <= step
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {s < step ? <CheckCircle2 size={24} /> : s}
                  </button>
                  {s < 2 && (
                    <div className={`flex-1 h-1 mx-3 transition-all ${s < step ? "bg-purple-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Information</h2>
                  </div>
                  <div>
                    <Label className="block mb-2 font-bold text-gray-900">Student Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      <Input
                        type="text"
                        placeholder="Select or enter student name"
                        value={formData.studentName}
                        onChange={(e) => handleInputChange("studentName", e.target.value)}
                        className="pl-12 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="block mb-2 font-bold text-gray-900">Email Address</Label>
                    <Input
                      type="email"
                      placeholder="student@example.com"
                      value={formData.studentEmail}
                      onChange={(e) => handleInputChange("studentEmail", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="block mb-2 font-bold text-gray-900">Training Module Completed</Label>
                    <Select value={formData.trainingModule} onValueChange={(val) => handleInputChange("trainingModule", val)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select training module..." />
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
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Certification Details</h2>
                  </div>
                  <div>
                    <Label className="block mb-2 font-bold text-gray-900">Completion Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      <Input
                        type="date"
                        value={formData.completionDate}
                        onChange={(e) => handleInputChange("completionDate", e.target.value)}
                        className="pl-12 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="block mb-2 font-bold text-gray-900">Certification Level</Label>
                    <Select value={formData.certificationLevel} onValueChange={(val) => handleInputChange("certificationLevel", val)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select level..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="certified">Certified Agri2rist Host</SelectItem>
                        <SelectItem value="silver">Silver Verified Host</SelectItem>
                        <SelectItem value="gold">Gold Verified Host</SelectItem>
                        <SelectItem value="platinum">Platinum Verified Host</SelectItem>
                        <SelectItem value="master">Master Agri2rist Host</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Certificate Preview */}
                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200 rounded-xl p-8 mt-6">
                    <div className="text-center space-y-4">
                      <Award size={48} className="text-purple-600 mx-auto" />
                      <p className="text-sm text-purple-600 font-semibold uppercase tracking-wide">Certificate of Achievement</p>
                      <h3 className="text-2xl font-bold text-gray-900">{formData.studentName || "Student Name"}</h3>
                      <p className="text-sm text-gray-600">
                        Has successfully completed the {formData.trainingModule} training program
                      </p>
                      <p className="text-xs text-gray-500">Awarded on {formData.completionDate || "YYYY-MM-DD"}</p>
                      <div className="pt-4 flex items-center justify-center gap-2 text-xs text-purple-600">
                        <CheckCircle2 size={16} />
                        <span>Digital certificate with verification link</span>
                      </div>
                    </div>
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
                  if (step < 2) {
                    setStep(step + 1);
                  } else {
                    handleSubmit();
                  }
                }}
                disabled={
                  (step === 1 && (!formData.studentName || !formData.studentEmail || !formData.trainingModule)) ||
                  (step === 2 && (!formData.completionDate || !formData.certificationLevel))
                }
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-12 px-8 font-bold"
              >
                {step === 2 ? "Issue Certificate" : "Continue"}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award size={40} className="text-purple-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Certificate Issued Successfully!</h2>
            <p className="text-gray-600 mb-8">
              Certificate for {formData.studentName} has been issued and sent to {formData.studentEmail}.
              They can now download and share their credential.
            </p>
            <Button
              onClick={() => navigate("/verified-host")}
              className="bg-purple-600 hover:bg-purple-700 rounded-xl h-12 px-8 font-bold"
            >
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
