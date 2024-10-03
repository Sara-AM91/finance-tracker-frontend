import { FaExchangeAlt, FaSignOutAlt } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { AuthContext } from "../contexts/AuthContext";
import { TransactionContext } from "../contexts/TransactionContext";
import { useContext } from "react";

const MobileSidebar = ({ user, isSidebarOpen, toggleSidebar }) => {
  const { setToken, setUser } = useContext(AuthContext);
  const { setTransactions } = useContext(TransactionContext);

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
    <div>
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar} // Close the sidebar when clicking on the overlay
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-[#161A40]`}
        tabindex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <button
          type="button"
          onClick={toggleSidebar} // Close the sidebar when clicked
          aria-controls="drawer-navigation"
          class="text-gray-200 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close menu</span>
        </button>
        <div class="py-4 overflow-y-auto">
          <ul class="space-y-2 font-medium">
            <div className="py-4">
              <ul className="space-y-4 pt-4">
                <li>
                  <Link
                    to="/account"
                    className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-4 py-2 mb-7"
                  >
                    <img
                      src={user.profilePic}
                      className="h-10 w-10 rounded-full"
                    />
                    <span className="ml-3 text-white text-lg">Account</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-9 py-2"
                  >
                    <RxDashboard className="text-xl text-white" />
                    <span className="ml-3 text-white text-lg">Dashboard</span>
                  </Link>

                  <Link
                    to="/expenses"
                    className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-9 py-2"
                  >
                    <GiPayMoney className="text-xl text-white" />
                    <span className="ml-3 text-white text-lg">Expenses</span>
                  </Link>
                  <Link
                    to="/incomes"
                    className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-9 py-2"
                  >
                    <GiReceiveMoney className="text-xl text-white" />
                    <span className="ml-3 text-white text-lg">Incomes</span>
                  </Link>
                  <Link
                    to="/transactions-list"
                    className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-9 py-2"
                  >
                    <FaExchangeAlt className="text-xl text-white" />
                    <span className="ml-3 text-white text-lg">
                      All Transactions
                    </span>
                  </Link>
                  <Link
                    to="/transactions-list"
                    className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-9 py-2"
                  >
                    <SlCalender className="text-xl text-white" />
                    <span className="ml-3 text-white text-lg">
                      Your Calender
                    </span>
                  </Link>
                </li>
                {/* Add more menu items here */}
              </ul>
              <div className="absolute bottom-4 w-full">
                <button
                  onClick={handleLogout}
                  className="flex gap-2 items-center hover:bg-gradient-to-r from-purple-600 to-indigo-900 pl-9 py-2 w-full text-left"
                >
                  <FaSignOutAlt className="text-xl" />
                  <span className="ml-3">Logout</span>
                </button>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
