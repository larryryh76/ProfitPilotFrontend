import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-orange-50">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default Layout;
