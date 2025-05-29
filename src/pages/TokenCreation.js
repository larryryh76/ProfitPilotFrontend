import React, { useState, useEffect } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const TokenCreation = () => {
  const navigate = useNavigate();
  const [tokenName, setTokenName] = useState("");
  const [message, setMessage] = useState("");
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTokens = async () => {
    try {
      const res = await API.get("/token");
      setTokens(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!tokenName) return;
    try {
      setLoading(true);
      const res = await API.post("/token", { name: tokenName });
      setMessage("Token created successfully!");
      setTokenName("");
      fetchTokens();
    } catch (err) {
      setMessage(err.response?.data?.msg || "Failed to create token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const hasFreeToken = tokens.length >= 1;
  const canCreateMore = tokens.length < 5;

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
          Create a Token
        </h2>
        {message && <p className="text-center mb-3 text-sm text-blue-700">{message}</p>}

        {!canCreateMore ? (
          <p className="text-red-500 text-center mb-4">You’ve reached the max of 5 tokens.</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter token name"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              className="w-full p-2 border rounded-xl mb-3"
            />
            <button
              onClick={handleCreate}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              {hasFreeToken ? "Create Token ($5)" : "Create Free Token"}
            </button>
          </>
        )}

        <div className="mt-6">
          <h4 className="text-lg font-medium mb-2">Your Tokens</h4>
          <ul className="space-y-2">
            {tokens.map((token) => (
              <li
                key={token._id}
                className="px-3 py-2 bg-gray-100 rounded-xl text-gray-700 text-sm"
              >
                {token.name}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TokenCreation;
