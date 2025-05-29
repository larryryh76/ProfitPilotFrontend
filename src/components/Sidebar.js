import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaRocket, FaUsers, FaGift, FaSignOutAlt, FaPlus } from "react-icons/fa";
import { logout } from "../utils/api";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/boost", label: "Boost", icon: <FaRocket /> },
    { to: "/create-token", label: "Create Token", icon: <FaPlus /> },
    { to: "/referral", label: "Referral", icon: <FaGift /> },
    { to: "/leaderboard", label: "Leaderboard", icon: <FaUsers /> },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="w-64 min-h-screen bg-orange-100 p-4 shadow-lg">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">ProfitPilot</h2>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 p-2 rounded-md transition ${
              location.pathname === link.to
                ? "bg-orange-600 text-white"
                : "text-orange-700 hover:bg-orange-200"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-3 p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
