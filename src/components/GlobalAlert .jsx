import React from "react";
import { useAlert } from "../contexts/AlertContext";

const GlobalAlert = () => {
  const { alertType, alertMessage, alertVisible } = useAlert();

  if (!alertVisible) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-in-out transform ${
        alertVisible ? "translate-y-0" : "translate-y-full"
      } ${
        alertType === "success"
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
      } rounded-md p-4 shadow-md`}
      style={{
        bottom: "30px", // Always place at the bottom
        right: "30px", // Align to the right of the screen
        maxWidth: "300px", // Set a maximum width for the alert box
        zIndex: 9999, // Ensure it appears above all other elements
      }}
    >
      <p>{alertMessage}</p>
    </div>
  );
};

export default GlobalAlert;
