import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

const MainLayout = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token").replace(/['"]+/g, "");
      try {
        const response = await fetch("http://localhost:5000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const result = await response.json();
        setUser(result);
        // console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative flex flex-col bg-gradient-to-b from-[#121428] to-[#000036] h-full">
      {/* First Background Curve */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#121428] to-[#000036] z-0">
        {/* Upper Curve */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#121428] to-[#000036]"
          style={{ clipPath: "ellipse(80% 50% at 50% 0%)" }}
        ></div>
      </div>

      {/* Second Background Curve */}
      <div
        className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-l from-[#121428] to-[#000036] z-0"
        style={{ clipPath: "ellipse(80% 60% at 50% 100%)" }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col flex-grow overflow-hidden p-4">
        <Header />
        <div className="flex flex-grow gap-6 h-full">
          <Sidebar user={user} />
          <Outlet context={{ user }} /> {/* Dashboard content */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
