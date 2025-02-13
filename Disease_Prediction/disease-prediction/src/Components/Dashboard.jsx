import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    UserCircleIcon,
    HomeIcon,
    ClockIcon,
    Cog6ToothIcon,
    ChartBarSquareIcon,
    ArrowUpTrayIcon, // ✅ Correct replacement for UploadIcon
    PlusCircleIcon,
    ChartBarIcon,
    CogIcon,
  } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  // Fetch user data
  const getAuthUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/auth/user", {
        headers: { "x-auth-token": token },
      });
      setUser(response.data.user);
    } catch (error) {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    getAuthUser();
  }, []);

  // Fetch history
  useEffect(() => {
    if (!user?.id) return;
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/history/${user.id}`);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="w-9 h-9 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-1">
          {[
            { icon: HomeIcon, label: "Home", path: "/dashboard" },
            { icon: ChartBarIcon, label: "Analytics", path: "/analytics" },
            { icon: ClockIcon, label: "History", path: "/history" },
            { icon: CogIcon, label: "Settings", path: "/settings" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex items-center w-full p-3 space-x-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 space-x-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <ArrowUpTrayIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8 flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health Overview</h1>
            <p className="text-gray-500 mt-1">Latest updates and medical insights</p>
          </div>
          <button
            onClick={() => navigate("/upload")}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <PlusCircleIcon className="w-5 h-5" />
            <span>New Scan Analysis</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-2">Total Scans</div>
            <div className="text-3xl font-bold text-gray-900">{(history.length || 0).toLocaleString()}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-2">Last Scan Date</div>
            <div className="text-3xl font-bold text-gray-900">
              {history.length ? new Date(history[0].date).toLocaleDateString() : "N/A"}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-2">Most Frequent</div>
            <div className="text-3xl font-bold text-gray-900">
              {history.length ? history[0].disease : "N/A"}
            </div>
          </div>
        </div>

        {/* Recent Scans Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold">Recent Diagnoses</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Confidence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {history.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {record.disease}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${record.confidence}%` }}
                          />
                        </div>
                        {record.confidence}%
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      No diagnostic history available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}