import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import {
  HeartIcon,
  LightBulbIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/solid";

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { result } = location.state || {};

  const diagnosisResult = result || {
    disease: "Unknown",
    confidence: 0,
    riskLevel: "Unknown",
    scanType: "Unknown",
    date: new Date().toISOString(),
    recommendations: [],
    keyInsights: []
  };

  useEffect(() => {
    console.log("Diagnosis Result:", diagnosisResult); // Debugging line
  }, [diagnosisResult]);

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800";
      case "moderate": return "bg-amber-100 text-amber-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center space-x-4">
            <UserCircleIcon className="w-8 h-8 text-gray-400" />
            <span className="text-sm font-medium">Dr. Sarah Thompson</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Diagnosis Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{diagnosisResult.disease}</h1>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <ShieldCheckIcon className="w-5 h-5 mr-2" />
                  {diagnosisResult.confidence}% Confidence
                </span>
                <span className={`${getRiskColor(diagnosisResult.riskLevel)} px-3 py-1 rounded-full text-sm`}>
                  {diagnosisResult.riskLevel} Risk
                </span>
              </div>
            </div>
            <DocumentTextIcon className="w-16 h-16 opacity-20" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Primary Results */}
          <div className="lg:col-span-2">
            {/* Visualization Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ChartBarIcon className="w-6 h-6 text-blue-600 mr-2" />
                Diagnostic Visualization
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 h-80 flex items-center justify-center">
                <span className="text-gray-400">Brain MRI Scan Analysis Preview</span>
              </div>
            </div>

            {/* Insights Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <LightBulbIcon className="w-6 h-6 text-amber-500 mr-2" />
                Key Clinical Insights
              </h2>
              <ul className="space-y-3">
                {diagnosisResult.keyInsights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <p className="text-gray-700">{insight}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Analysis Details</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-500">Scan Type</dt>
                  <dd className="font-medium">{diagnosisResult.scanType}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Analysis Date</dt>
                  <dd className="font-medium">
                    {new Date(diagnosisResult.date).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Processing Time</dt>
                  <dd className="font-medium">47 seconds</dd>
                </div>
              </dl>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2" />
                Recommended Actions
              </h2>
              <ul className="space-y-3">
                {diagnosisResult.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-teal-600 rounded-full mt-2" />
                    <p className="text-gray-700">{rec}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100 text-sm text-amber-700">
          <ExclamationTriangleIcon className="w-5 h-5 float-left mr-3" />
          This AI-powered analysis should be interpreted by qualified healthcare professionals. 
          Results are probabilistic and should be correlated with clinical findings and 
          patient history. Always exercise professional judgment in medical decision-making.
        </div>
      </main>
    </div>
  );
}