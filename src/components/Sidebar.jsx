import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-12" : "w-56 bg-[#161A40]"
      }  text-white relative flex-shrink-0 rounded-3xl`}
    >
      {/* Hamburger Menu Button */}
      <div className="relative sm:max-w-xl mx-auto">
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

      {/* Sidebar Content */}
      {!isCollapsed ? (
        <div className="py-4">
          <ul className="space-y-4 pt-4">
            <li>
              <Link
                to="/account"
                className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-4 py-2"
              >
                <img
                  src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                  className="h-10 w-10 rounded-full"
                />
                <span className="ml-3">Account</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-16 py-2"
              >
                <span className="ml-3">Dashboard</span>
              </Link>
              <Link className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-16 py-2">
                <span className="ml-3">Settings</span>
              </Link>
              <Link
                to="/expenses"
                className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-16 py-2"
              >
                <span className="ml-3">Expenses</span>
              </Link>
            </li>
            {/* Add more menu items here */}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
