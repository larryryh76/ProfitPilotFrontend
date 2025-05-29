import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const AdminRoute = () => {
  const token = localStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("https://profitpilot-backend.onrender.com/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAdmin(res.data.email === "larryryh76@gmail.com");
      } catch (err) {
        setIsAdmin(false);
      }
    };
    if (token) checkAdmin();
    else setIsAdmin(false);
  }, [token]);

  if (isAdmin === null) return <div>Loading...</div>;
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
