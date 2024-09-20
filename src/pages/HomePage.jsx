import React from "react";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow flex">
        <Dashboard />
      </div>
    </div>
  );
};

export default HomePage;
