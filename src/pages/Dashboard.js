import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [boosted, setBoosted] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchIncome = async () => {
    try {
      const res = await API.get("/income");
      setIncome(res.data.totalIncome);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChartData = async () => {
    try {
      const res = await API.get("/token/performance");
      setChartData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBoost = async () => {
    try {
      setLoading(true);
      const res = await API.post("/boost");
      setBoosted((prev) => prev + 1);
      setIncome(res.data.newIncome);
    } catch (err) {
      console.error("Boost failed:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCountdown = () => {
    const end = new Date("2025-12-01T00:00:00Z");
    const now = new Date();
    const diff = end - now;
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    return months > 0 ? `${months} month(s)` : "Cashout now";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchIncome();
      fetchChartData();
    }
  }, []);

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-sky-50 to-blue-100">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-100 rounded-xl text-center">
            <p className="text-sm text-gray-600">Total Income</p>
            <p className="text-2xl font-bold text-blue-800">${income.toFixed(2)}</p>
          </div>

          <div className="p-4 bg-green-100 rounded-xl text-center">
            <p className="text-sm text-gray-600">Boosted Times</p>
            <p className="text-2xl font-bold text-green-800">{boosted}</p>
          </div>

          <div className="p-4 bg-yellow-100 rounded-xl text-center md:col-span-2">
            <p className="text-sm text-gray-600">Cashout Countdown</p>
            <p className="text-xl font-bold text-yellow-800">{getCountdown()}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Token Performance
          </h3>
          <div className="w-full h-64 bg-gray-50 rounded-xl p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={handleBoost}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
          >
            {loading ? "Boosting..." : "Boost ($3)"}
          </button>

          <button
            onClick={() => navigate("/referral")}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl transition"
          >
            Referral
          </button>

          <button
            onClick={() => navigate("/leaderboard")}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
          >
            Leaderboard
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-xl transition"
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
