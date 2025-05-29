import React, { useEffect, useState } from "react";
import API from "../utils/api";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await API.get("/leaderboard");
      setLeaders(res.data);
    } catch (err) {
      console.error("Error loading leaderboard", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-yellow-50 to-orange-100">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-center text-orange-700 mb-4">
          Top Earners Leaderboard
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-orange-200 text-orange-900">
              <th className="text-left p-2">#</th>
              <th className="text-left p-2">Username</th>
              <th className="text-left p-2">Total Income ($)</th>
            </tr>
          </thead>
          <tbody>
            {leaders.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500 italic">
                  No leaderboard data yet.
                </td>
              </tr>
            ) : (
              leaders.map((user, index) => (
                <tr key={user._id} className="border-b border-orange-100">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 capitalize">{user.username}</td>
                  <td className="p-2 font-semibold">${user.totalIncome.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
