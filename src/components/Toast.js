import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded-md shadow-md text-white z-50 ${
        type === "success" ? "bg-green-600" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
