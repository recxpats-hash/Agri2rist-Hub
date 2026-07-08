import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, FileText, Download, CheckCircle2, BarChart3 } from "lucide-react";

export default function GenerateReportPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reportType: "",
    timeframe: "",
    module: "",
    includeStudents: false,
    includeMetrics: false,
    includeRevenue: false,
    format: "pdf",
  });
  const [submitted, setSubmitted] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateReport = async () => {
    setGenerating(true);
    // Simulate report generation
    await new Promise(r => setTimeout(r, 2000));
    setSubmitted(true);
    setGenerating(false);
    setTimeout(() => navigate("/verified-host"), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-4">
        <button
          onClick={() => navigate("/verified-host")}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200 mb-4">
                <BarChart3 size={18} className="text-orange-600" />
                <span className="text-sm font-bold text-orange-700">Generate Report</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Business & Analytics Reports
              </h1>
              <p className="text-xl text-gray-600">
                Create comprehensive reports on your training programs, student performance, and revenue.
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 space-y-8">
              {/* Report Type */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Report Configuration</h2>
                <Label className="block mb-2 font-bold text-gray-900">Report Type</Label>
                <Select value={formData.reportType} onValueChange={(val) => handleInputChange("reportType", val)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select report type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Monthly Summary Report</SelectItem>
                    <SelectItem value="student-progress">Student Progress Report</SelectItem>
                    <SelectItem value="revenue">Revenue & Financial Report</SelectItem>
                    <SelectItem value="compliance">Compliance & Certification Report</SelectItem>
                    <SelectItem value="full">Full Business Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Timeframe */}
              <div>
                <Label className="block mb-2 font-bold text-gray-900">Reporting Period</Label>
                <Select value={formData.timeframe} onValueChange={(val) => handleInputChange("timeframe", val)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select timeframe..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-quarter">Last Quarter</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Date Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Module Filter */}
              <div>
                <Label className="block mb-2 font-bold text-gray-900">Training Module (Optional)</Label>
                <Select value={formData.module} onValueChange={(val) => handleInputChange("module", val)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="All modules" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modules</SelectItem>
                    <SelectItem value="hospitality">Hospitality Foundation</SelectItem>
                    <SelectItem value="agriculture">Agricultural Experience</SelectItem>
                    <SelectItem value="food-safety">Food Safety Practicals</SelectItem>
                    <SelectItem value="digital">Digital Skills for Hosts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Report Sections */}
              <div>
                <Label className="block mb-4 font-bold text-gray-900">Include Sections</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <Checkbox
                      checked={formData.includeStudents}
                      onCheckedChange={(val) => handleInputChange("includeStudents", val)}
                      className="w-5 h-5"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Student Performance Metrics</p>
                      <p className="text-sm text-gray-600">Enrollment, completion rates, attendance</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <Checkbox
                      checked={formData.includeMetrics}
                      onCheckedChange={(val) => handleInputChange("includeMetrics", val)}
                      className="w-5 h-5"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Training Analytics</p>
                      <p className="text-sm text-gray-600">Module performance, instructor ratings, trends</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <Checkbox
                      checked={formData.includeRevenue}
                      onCheckedChange={(val) => handleInputChange("includeRevenue", val)}
                      className="w-5 h-5"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Revenue & Payments</p>
                      <p className="text-sm text-gray-600">Income, expenses, pending payments, forecasts</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Format Selection */}
              <div>
                <Label className="block mb-2 font-bold text-gray-900">Export Format</Label>
                <div className="grid grid-cols-2 gap-4">
                  {["pdf", "excel", "csv"].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => handleInputChange("format", fmt)}
                      className={`p-4 rounded-xl border-2 font-bold transition-all ${
                        formData.format === fmt
                          ? "bg-orange-100 border-orange-500 text-orange-700"
                          : "bg-white border-gray-200 text-gray-700 hover:border-orange-300"
                      }`}
                    >
                      {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <p className="text-sm text-orange-900">
                  <strong>✓ Report will include:</strong> {formData.reportType}, covering {formData.timeframe}, 
                  {formData.includeStudents && " with student metrics,"} 
                  {formData.includeMetrics && " training analytics,"} 
                  {formData.includeRevenue && " and revenue data"} in {formData.format.toUpperCase()} format.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/verified-host")}
                className="rounded-xl h-12 px-8"
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerateReport}
                disabled={!formData.reportType || !formData.timeframe || generating}
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12 px-8 font-bold flex items-center gap-2"
              >
                {generating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    Generate Report
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={40} className="text-orange-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Report Generated Successfully!</h2>
            <p className="text-gray-600 mb-8">
              Your {formData.reportType} has been generated in {formData.format.toUpperCase()} format.
              The file will download automatically, or you can retrieve it from your reports library.
            </p>
            <div className="flex gap-4 justify-center mb-8">
              <Button
                variant="outline"
                className="rounded-xl h-12 px-8 font-bold"
              >
                <Download size={18} className="mr-2" />
                Download Now
              </Button>
            </div>
            <Button
              onClick={() => navigate("/verified-host")}
              className="bg-orange-600 hover:bg-orange-700 rounded-xl h-12 px-8 font-bold"
            >
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
