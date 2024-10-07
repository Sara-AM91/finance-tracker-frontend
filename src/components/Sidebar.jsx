import { useState, useContext } from "react";
import DateCalendarModal from "./DateCalendarModal";
import { AuthContext } from "../contexts/AuthContext";
import { TransactionContext } from "../contexts/TransactionContext";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { FaExchangeAlt, FaSignOutAlt } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ user, isMobile }) => {
  const { setToken, setUser } = useContext(AuthContext);
  const { setTransactions } = useContext(TransactionContext);

  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Reset authentication state
    setToken(null);
    setUser(null);

    // Reset transactions
    setTransactions([]);

    // Clear localStorage
    localStorage.clear();

    // Redirect to login page
    navigate("/login");
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
                className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-4 py-2 mb-7"
              >
                <img src={user.profilePic} className="h-10 w-10 rounded-full" />
                <span className="ml-3">Account</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-9 py-2"
              >
                <RxDashboard className="text-xl" />
                <span className="ml-3">Dashboard</span>
              </Link>

              <Link
                to="/expenses"
                className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-9 py-2"
              >
                <GiPayMoney className="text-xl" />
                <span className="ml-3">Expenses</span>
              </Link>
              <Link
                to="/incomes"
                className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-9 py-2"
              >
                <GiReceiveMoney className="text-xl" />
                <span className="ml-3">Incomes</span>
              </Link>
              <Link
                to="/transactions-list"
                className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-9 py-2"
              >
                <FaExchangeAlt className="text-xl" />
                <span className="ml-3">All Transactions</span>
              </Link>
              <div
                className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-9 py-2 cursor-pointer"
                onClick={handleClickOpen}
              >
                <SlCalender className="text-xl text-white" />
                <span className="ml-3 text-white text-base">Your Calender</span>
              </div>
            </li>
            {/* Add more menu items here */}
          </ul>
          <DateCalendarModal open={open} handleClose={handleClose} />
        </div>
      ) : null}

      {/* Logout Button at the Bottom */}
      {!isCollapsed && (
        <div className="absolute bottom-4 w-full">
          <button
            onClick={handleLogout}
            className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-9 py-2 w-full text-left"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
