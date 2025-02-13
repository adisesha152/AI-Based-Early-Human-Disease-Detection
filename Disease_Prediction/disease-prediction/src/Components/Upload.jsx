import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CloudUpload, XCircle, FileCheck2, ArrowLeft } from "lucide-react";
import axios from 'axios';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected!");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file); // Use the `file` state instead
  
    try {
      const response = await axios.post("http://localhost:8000/auth/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload Success:", response.data); // Debugging line
      console.log("Prediction Result:", response.data.result); // Log prediction result to console
      navigate("/result", { state: { result: response.data.result } });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center border border-gray-200">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800">Upload Your Scan</h2>
        <p className="text-gray-600 mt-2">Upload an image or file for analysis.</p>

        {/* File Upload Box */}
        <label
          htmlFor="fileInput"
          className="mt-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        >
          <CloudUpload className="w-12 h-12 text-gray-500 mb-2" />
          <span className="text-gray-700 font-medium">Click to Upload or Drag & Drop</span>
          <input
            type="file"
            id="fileInput"
            accept=".jpg, .png, .jpeg, .csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Display Selected File */}
        {file && (
          <div className="mt-4 flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-300">
            <FileCheck2 className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">{file.name}</span>
            <XCircle
              className="w-5 h-5 text-red-500 cursor-pointer"
              onClick={() => setFile(null)}
            />
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file}
          className={`mt-6 px-6 py-3 w-full text-white font-semibold rounded-lg shadow-md transition ${
            file
              ? "bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-lg"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {file ? "Analyze Scan" : "Select a File First"}
        </button>

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 flex items-center text-gray-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}