import { useNavigate } from "react-router-dom";
import { ChartBarIcon, ShieldCheckIcon, ClockIcon, CloudArrowUpIcon, CpuChipIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CpuChipIcon className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">MedScan AI</span>
          </div>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32" style={{ minHeight: "100vh" }}>
        <div className="text-center" style={{ height: "calc(100vh - 6rem)" }}>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight mt-40">
            Advanced Medical Imaging Analysis
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Powered by Deep Learning
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI Human Disease Detection platform delivering rapid, accurate insights for the patient
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate("/upload")}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Upload an Image
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors duration-200"
            >
              Register
            </button>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Dashboard with Modern UI</h2>
          <p className="text-gray-600 mb-8">Experience a sleek and intuitive interface designed for efficient medical analysis.</p>
          <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-teal-50 p-8 shadow-xl border border-gray-100">
            <img
              src="./public/dashboard-preview.png"
              alt="Platform preview"
              width={1200}
              height={600}
              className="rounded-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cutting-Edge AI for Accurate Diagnostics
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive AI-powered tools designed for modern healthcare demands
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={ChartBarIcon}
            title="Clinical Accuracy"
            desc="Algorithms trained on millions of annotated medical images"
          />
          <FeatureCard
            icon={ShieldCheckIcon}
            title="HIPAA Compliance"
            desc="End-to-end encrypted platform with security protocols"
          />
          <FeatureCard
            icon={ClockIcon}
            title="Real-time Analysis"
            desc="Instant results with cloud-based processing infrastructure"
          />
        </div>
      </section>

      {/* Workflow Section */}
      <section className="bg-blue-50/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Streamlined Clinical Workflow
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Seamless integration into existing medical imaging pipelines
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <WorkflowStep
              step="1"
              icon={CloudArrowUpIcon}
              title="DICOM Upload"
              desc="Secure PACS integration or manual upload"
            />
            <WorkflowStep
              step="2"
              icon={CpuChipIcon}
              title="AI Processing"
              desc="Parallel analysis with ensemble models"
            />
            <WorkflowStep
              step="3"
              icon={DocumentCheckIcon}
              title="Clinical Review"
              desc="Interactive viewer with measurement tools"
            />
            <WorkflowStep
              step="4"
              icon={ShieldCheckIcon}
              title="Secure Sharing"
              desc="Secure report generation"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Diagnostic Workflow?</h2>
          <p className="text-lg mb-8 opacity-90">
            Get started with MedScan AI today and experience the future of medical imaging
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Contact Sales
            </button>
            <button
              onClick={() => navigate("/docs")}
              className="px-8 py-3 border-2 border-white/30 rounded-lg font-semibold hover:border-white/60 transition-colors duration-200"
            >
              Technical Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <CpuChipIcon className="h-6 w-6 text-blue-400" />
                <span className="font-semibold text-white">MedScan AI</span>
              </div>
              <p className="text-sm opacity-75">
                Advancing medical diagnostics through deep learning innovation
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm opacity-75">
            © {new Date().getFullYear()} MedScan AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100">
    <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

// Workflow Step Component
const WorkflowStep = ({ step, icon: Icon, title, desc }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-100 hover:border-blue-100 transition-all duration-200 group">
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-bold">
        {step}
      </div>
      <Icon className="w-6 h-6 ml-3 text-gray-500 group-hover:text-blue-600 transition-colors" />
    </div>
    <h4 className="font-semibold text-lg mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);

export default Homepage;