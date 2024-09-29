import React, { createContext, useState, useContext } from "react";

// Create a Context for the alert
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState(""); // Can be 'success' or 'error'
  const [alertMessage, setAlertMessage] = useState("");

  // Function to show the alert
  const showAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  return (
    <AlertContext.Provider
      value={{ alertVisible, alertType, alertMessage, showAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};

// Custom hook to use the AlertContext
export const useAlert = () => useContext(AlertContext);
