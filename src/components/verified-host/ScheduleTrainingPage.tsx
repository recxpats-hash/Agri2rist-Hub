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
import { ArrowLeft, Calendar, Clock, MapPin, Users, CheckCircle2 } from "lucide-react";

export default function ScheduleTrainingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    trainingModule: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    capacity: "",
    instructor: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.trainingModule && formData.date && formData.startTime && formData.endTime && formData.venue) {
      setSubmitted(true);
      setTimeout(() => navigate("/verified-host"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-4">
        <button
          onClick={() => navigate("/verified-host")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200 mb-4">
                <Calendar size={18} className="text-blue-600" />
                <span className="text-sm font-bold text-blue-700">Schedule Training</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Create Training Session
              </h1>
              <p className="text-xl text-gray-600">
                Schedule a new training module with venue, time, and instructor details.
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
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {s < step ? <CheckCircle2 size={24} /> : s}
                  </button>
                  {s < 3 && (
                    <div className={`flex-1 h-1 mx-3 transition-all ${s < step ? "bg-blue-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Training Module</h2>
                  </div>
                  <div>
                    <Label className="block mb-2 font-bold text-gray-900">Select Training Module</Label>
                    <Select value={formData.trainingModule} onValueChange={(val) => handleInputChange("trainingModule", val)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Choose a module..." />
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule Details</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="block mb-2 font-bold text-gray-900">Training Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          className="pl-12 rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="block mb-2 font-bold text-gray-900">Capacity (Students)</Label>
                      <div className="relative">
                        <Users className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <Input
                          type="number"
                          placeholder="Max participants"
                          value={formData.capacity}
                          onChange={(e) => handleInputChange("capacity", e.target.value)}
                          className="pl-12 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="block mb-2 font-bold text-gray-900">Start Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <Input
                          type="time"
                          value={formData.startTime}
                          onChange={(e) => handleInputChange("startTime", e.target.value)}
                          className="pl-12 rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="block mb-2 font-bold text-gray-900">End Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <Input
                          type="time"
                          value={formData.endTime}
                          onChange={(e) => handleInputChange("endTime", e.target.value)}
                          className="pl-12 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Venue & Instructor</h2>
                  </div>
                  <div>
                    <Label className="block mb-2 font-bold text-gray-900">Venue Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      <Input
                        type="text"
                        placeholder="Training Hall A, Training Lab, etc."
                        value={formData.venue}
                        onChange={(e) => handleInputChange("venue", e.target.value)}
                        className="pl-12 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="block mb-2 font-bold text-gray-900">Assigned Instructor</Label>
                    <Select value={formData.instructor} onValueChange={(val) => handleInputChange("instructor", val)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select instructor..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aiman">Aiman Rahman</SelectItem>
                        <SelectItem value="fatima">Fatima Hassan</SelectItem>
                        <SelectItem value="hassan">Hassan Ahmed</SelectItem>
                        <SelectItem value="siti">Siti Nur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            {/* Review Section */}
            {step === 3 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Review Schedule</h3>
                <div className="space-y-3 text-sm">
                  <p><span className="font-bold text-gray-900">Module:</span> {formData.trainingModule}</p>
                  <p><span className="font-bold text-gray-900">Date:</span> {formData.date}</p>
                  <p><span className="font-bold text-gray-900">Time:</span> {formData.startTime} - {formData.endTime}</p>
                  <p><span className="font-bold text-gray-900">Venue:</span> {formData.venue}</p>
                  <p><span className="font-bold text-gray-900">Capacity:</span> {formData.capacity} students</p>
                  <p><span className="font-bold text-gray-900">Instructor:</span> {formData.instructor}</p>
                </div>
              </div>
            )}

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
                  (step === 1 && !formData.trainingModule) ||
                  (step === 2 && (!formData.date || !formData.startTime || !formData.endTime)) ||
                  (step === 3 && (!formData.venue || !formData.instructor))
                }
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 px-8 font-bold"
              >
                {step === 3 ? "Confirm Schedule" : "Continue"}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Training Scheduled Successfully!</h2>
            <p className="text-gray-600 mb-8">
              Your {formData.trainingModule} training session has been scheduled for {formData.date} at {formData.startTime}.
              Enrolled students will receive notification automatically.
            </p>
            <Button
              onClick={() => navigate("/verified-host")}
              className="bg-blue-600 hover:bg-blue-700 rounded-xl h-12 px-8 font-bold"
            >
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
