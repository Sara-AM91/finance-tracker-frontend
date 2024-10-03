import { Link } from "react-router-dom";
import { useState } from "react";
import { SlCalender } from "react-icons/sl";
import MobileSidebar from "./MobileSidebar";

const Header = ({ user, isMobile }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsCollapsed(!isCollapsed); // Toggle the collapsed state for the hamburger icon animation
  };

  return (
    <div className="flex gap-4">
      <div className="navbar bg-[#161A40] rounded-3xl py-2 px-6 mb-4">
        <div className="navbar-start">
          {isMobile && (
            <>
              <div className="relative">
                <nav>
                  <button
                    onClick={toggleSidebar}
                    className="text-white w-10 h-10 relative focus:outline-none  rounded-md "
                  >
                    <span className="sr-only">Open main menu</span>
                    <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                          isCollapsed ? "-translate-y-1.5" : "rotate-45"
                        }`}
                      ></span>
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                          isCollapsed ? "" : "opacity-0"
                        }`}
                      ></span>
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                          isCollapsed ? "translate-y-1.5" : "-rotate-45"
                        }`}
                      ></span>
                    </div>
                  </button>
                </nav>
              </div>
              {/* Pass props to MobileSidebar */}
              <MobileSidebar
                user={user}
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </>
          )}
        </div>
        <div className="navbar-center">
          <Link to="/dashboard" className="text-xl text-white">
            FinanceTracker
          </Link>
        </div>
        {isMobile && (
          <div className="navbar-end">
            <Link to="/account" className="w-12 h-12 rounded-full ">
              <img src={user.profilePic} className="rounded-full " />
            </Link>
          </div>
        )}
      </div>
      {!isMobile && (
        <div className="bg-[#161A40] rounded-3xl py-2 px-8 mb-4 flex items-center text-white">
          <SlCalender size={20} color="white" className="mr-5" />

          <span className="text-white text-sm mr-3">{user.firstName}</span>
          {/* <p>{new Date().toLocaleDateString()}</p> */}
          <Link to="/account" className="w-12 h-12 rounded-full ">
            <img src={user.profilePic} className="rounded-full " />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
