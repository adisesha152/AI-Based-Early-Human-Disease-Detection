import { useState, useEffect } from "react";
import axios from "axios";

export default function HistoryPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/history")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Project History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
              <p className="text-gray-700 mt-2">{project.description}</p>
              <div className="mt-3">
                <span className="text-gray-600 font-medium">Technologies:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-blue-500 text-white px-3 py-1 text-sm rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-3">Year: {project.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}