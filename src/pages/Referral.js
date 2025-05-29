import React, { useEffect, useState } from "react";
import API from "../utils/api";

const Referral = () => {
  const [referralCode, setReferralCode] = useState("");
  const [referrals, setReferrals] = useState([]);

  const fetchReferralData = async () => {
    try {
      const res = await API.get("/user/referrals");
      setReferralCode(res.data.referralCode);
      setReferrals(res.data.referredUsers || []);
    } catch (err) {
      console.error("Failed to load referral data", err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied to clipboard!");
  };

  useEffect(() => {
    fetchReferralData();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-center text-indigo-800 mb-4">
          Invite Friends & Earn
        </h2>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-sm mb-2">Your referral code:</p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-lg font-semibold text-indigo-700 bg-white px-4 py-1 rounded border">
              {referralCode || "loading..."}
            </span>
            <button
              onClick={handleCopy}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
            >
              Copy
            </button>
          </div>
          <p className="text-xs mt-2 text-gray-600">Share and earn $2 per invite!</p>
        </div>

        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2">Your Referrals</h3>
          <ul className="space-y-2">
            {referrals.length === 0 && (
              <li className="text-sm text-gray-500 italic">No referrals yet.</li>
            )}
            {referrals.map((user, idx) => (
              <li
                key={idx}
                className="bg-indigo-100 px-4 py-2 rounded-md text-indigo-800"
              >
                {user.email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Referral;
