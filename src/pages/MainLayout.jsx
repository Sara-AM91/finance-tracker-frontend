import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
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
      <div className="relative z-10 flex flex-col h-full">
        <Header />
        <div className="flex flex-grow gap-6 h-full">
          <Outlet /> {/* Dashboard content */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
