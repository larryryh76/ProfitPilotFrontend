import React, { useEffect, useState } from "react";
import API from "../utils/api";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [tokens, setTokens] = useState([]);

  const fetchAdminData = async () => {
    try {
      const userRes = await API.get("/admin/users");
      const tokenRes = await API.get("/admin/tokens");
      setUsers(userRes.data);
      setTokens(tokenRes.data);
    } catch (err) {
      console.error("Admin fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-orange-50">
      <h2 className="text-2xl font-bold text-orange-700 mb-4">Admin Panel</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="text-lg font-semibold mb-2 text-orange-600">Users</h3>
          <ul className="space-y-1 max-h-60 overflow-y-auto">
            {users.map((user) => (
              <li key={user._id} className="text-sm border-b py-1">
                {user.username} — {user.email}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="text-lg font-semibold mb-2 text-orange-600">Tokens</h3>
          <ul className="space-y-1 max-h-60 overflow-y-auto">
            {tokens.map((token) => (
              <li key={token._id} className="text-sm border-b py-1">
                {token.name} — {token.user?.email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
