import ExpensesVsIncomeBar from "../components/charts/ExpensesVsIncomeBar";
const recentExpenses = [
  {
    title: "Groceries",
    date: "Sep 20, 2024",
    amount: "50,00",
    category: "Shopping",
  },
  { title: "Gas", date: "Sep 19, 2024", amount: "30,00", category: "Auto" },
  {
    title: "Movie Tickets",
    date: "Sep 18, 2024",
    amount: "15,00",
    category: "Entertainment",
  },
  {
    title: "Doctor Visit",
    date: "Sep 17, 2024",
    amount: "90,00",
    category: "Health",
  },
  {
    title: "Doctor Visit",
    date: "Sep 17, 2024",
    amount: "90,00",
    category: "Health",
  },
  {
    title: "Doctor Visit",
    date: "Sep 17, 2024",
    amount: "90,00",
    category: "Health",
  },
];

const ExpensesPage = () => {
  return (
    <div className="h-screen w-full flex bg-gradient-to-b from-[#121428] to-[#000036] text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-[#161A40] p-4 flex flex-col space-y-8 rounded-lg">
        <h1 className="text-3xl font-bold text-orange-500">FinanceTracker</h1>
        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-orange-500"
          >
            <span>💰</span>
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-orange-500"
          >
            <span>📊</span>
            <span>Expenses</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-orange-500"
          >
            <span>💸</span>
            <span>Transactions</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6 space-y-8">
        {/* Search Bar */}
        <div className="bg-[#161A40] p-4 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Search expenses, transactions..."
            className="w-full bg-transparent text-gray-300 p-2 outline-none"
          />
        </div>

        {/* Cards */}
        {/* <div className="grid grid-cols-4 gap-6">
          <div className="p-6 bg-[#161A40] rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Total Expenses</h3>
            <p className="text-3xl font-bold mt-2">$1,200</p>
          </div>
          <div className="p-6 bg-[#161A40] rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Total Transactions</h3>
            <p className="text-3xl font-bold mt-2">15</p>
          </div>
          <div className="p-6 bg-[#161A40] rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Average Expense</h3>
            <p className="text-3xl font-bold mt-2">$80</p>
          </div>
          <div className="p-6 bg-[#161A40] rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Top Category</h3>
            <p className="text-3xl font-bold mt-2">Shopping</p>
          </div>
        </div> */}
        <div className="grid grid-cols-4 gap-6">
          <div className="p-6 bg-[#161A40] rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-orange-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.105 0-2-.672-2-1.5S10.895 5 12 5s2 .672 2 1.5S13.105 8 12 8zm0 0c0 2-2 2-2 4h4c0-2-2-2-2-4zm0 0V5m0 13h.01M12 12v1m0 4h.01"
                />
              </svg>
              <h3 className="text-lg font-semibold">Total Expenses</h3>
            </div>
            <p className="text-3xl font-bold mt-2">$1,200</p>
          </div>

          <div className="p-6 bg-[#161A40] rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M3 6h18m-9 4v8m-5-8v8m10-8v8M3 14h18"
                />
              </svg>
              <h3 className="text-lg font-semibold">Total Transactions</h3>
            </div>
            <p className="text-3xl font-bold mt-2">15</p>
          </div>

          <div className="p-6 bg-[#161A40] rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v10m8-5a8 8 0 10-16 0 8 8 0 0016 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold">Average Expense</h3>
            </div>
            <p className="text-3xl font-bold mt-2">$80</p>
          </div>

          <div className="p-6 bg-[#161A40] rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M4 6h16v12H4V6z"
                />
              </svg>
              <h3 className="text-lg font-semibold">Top Category</h3>
            </div>
            <p className="text-3xl font-bold mt-2">Shopping</p>
          </div>
        </div>

        {/* Graph and Latest Transactions */}
        <div className="grid grid-cols-3 gap-6">
          {/* Graph Section */}
          <div className="col-span-2 bg-[#161A40] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mt-2">Daily Expenses</h3>
            {/* Placeholder for the graph */}
            <div className="h-80 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 mt-4">
              {/* Graph goes here */}
              <div className="w-full h-full">
                <ExpensesVsIncomeBar />
              </div>
            </div>
          </div>

          {/* Latest Transactions */}
          <div className="bg-[#161A40] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <div className="space-y-4 mt-4">
              {recentExpenses.map((expense, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-[#1F1F2E] p-3 rounded-lg"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{expense.title}</span>
                    <span className="text-sm text-gray-400">
                      {expense.date}
                    </span>
                  </div>
                  <div className="font-semibold text-right">
                    {expense.amount}$
                  </div>
                </div>
              ))}
            </div>

            {/* View ALl Button */}
          </div>
        </div>
        {/* "+" Button positioned in the bottom-right corner */}
        <button className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl absolute bottom-10 right-10">
          +
        </button>
      </div>
    </div>
  );
};

export default ExpensesPage;
