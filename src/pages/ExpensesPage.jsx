import { useState } from "react";
import TransactionFilter from "../components/TransactionFilter";
import ExpensesCategoryBar from "../components/charts/ExpensesCategoryBar";
import ExpensesCategoryLine from "../components/charts/ExpensesCategoryLine";

const recentExpenses = [
  {
    title: "Groceries",
    date: "Sep 20, 2024",
    amount: "50,00",
    category: "Shopping",
    createdDate: "Sep 20, 2024",
  },
  {
    title: "Gas",
    date: "Sep 19, 2024",
    amount: "30,00",
    category: "Auto",
    createdDate: "Sep 20, 2024",
  },
  {
    title: "Movie Tickets",
    date: "Sep 18, 2024",
    amount: "15,00",
    category: "Entertainment",
    createdDate: "Sep 20, 2024",
  },
  {
    title: "Doctor Visit",
    date: "Sep 17, 2024",
    amount: "90,00",
    category: "Health",
    createdDate: "Sep 20, 2024",
  },
  {
    title: "Doctor Visit",
    date: "Sep 17, 2024",
    amount: "90,00",
    category: "Health",
    createdDate: "Sep 20, 2024",
  },
  {
    title: "Groceries",
    date: "Sep 20, 2024",
    amount: "50,00",
    category: "Shopping",
    createdDate: "Sep 20, 2024",
  },
  {
    title: "Groceries",
    date: "Sep 20, 2024",
    amount: "50,00",
    category: "Shopping",
    createdDate: "Sep 20, 2024",
  },
];

const ExpensesPage = () => {
  const [bar, setBar] = useState(true);

  const [filters, setFilters] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
  });

  const categories = [
    { name: "Bills", percentage: 20, amount: 300, color: "#F97316" }, // bg-orange-500
    { name: "Shopping", percentage: 30, amount: 250, color: "#FACC15" }, // bg-yellow-400
    { name: "Health", percentage: 15, amount: 150, color: "#22C55E" }, // bg-green-500
    { name: "Home", percentage: 10, amount: 200, color: "#2563EB" }, // bg-blue-600
    { name: "Auto", percentage: 20, amount: 300, color: "#EF4444" }, // bg-red-500
    { name: "Food", percentage: 25, amount: 350, color: "#15803D" }, // bg-green-700
    { name: "Entertainment", percentage: 15, amount: 200, color: "#C084FC" }, // bg-purple-400
  ];
  const toggleChart = () => {
    setBar(!bar);
  };
  const filteredExpenses = recentExpenses.filter((expense) => {
    return (
      (filters.title === "" ||
        expense.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.category === "" || expense.category === filters.category) &&
      (filters.amount === "" ||
        parseFloat(expense.amount) === parseFloat(filters.amount)) &&
      (filters.date === "" || expense.date === filters.date)
    );
  });

  const d = new Date();
  let year = d.getFullYear();

  const handleSearch = (query) => {
    const results = recentExpenses.filter((expense) =>
      expense.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredExpenses(results);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-[#121428] to-[#000036] text-white">
      <div className="flex flex-grow">
        {/* Main Content */}
        <div className="flex-grow p-6 space-y-6 overflow-hidden">
          {/* Cards and Chart Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Card Section */}
            <div className="col-span-2 grid grid-cols-2 gap-6">
              <div className="p-6 bg-[#161A40] rounded-3xl shadow-lg">
                <h3 className="text-lg font-semibold">Total Expenses</h3>
                <p className="text-3xl font-bold mt-2">$1,200</p>
              </div>
              <div className="p-6 bg-[#161A40] rounded-3xl shadow-lg">
                <h3 className="text-lg font-semibold">Total Transactions</h3>
                <p className="text-3xl font-bold mt-2">15</p>
              </div>
              <div className="p-6 bg-[#161A40] rounded-3xl shadow-lg">
                <h3 className="text-lg font-semibold">Average Expense</h3>
                <p className="text-3xl font-bold mt-2">$80</p>
              </div>
              <div className="p-6 bg-[#161A40] rounded-3xl shadow-lg">
                <h3 className="text-lg font-semibold">Top Category</h3>
                <p className="text-3xl font-bold mt-2">Shopping</p>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-[#161A40] p-6 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Expenses by Category</h3>
                <button
                  className="px-3 py-1 bg-[#3A3A57] text-white text-sm font-semibold rounded-md hover:bg-cyan-800 transition-colors duration-200"
                  onClick={toggleChart}
                >
                  {bar ? "Line Chart" : "Bar Chart"}
                </button>
              </div>
              <div className="h-40 bg-gray-800 rounded-3xl mt-4">
                {bar ? (
                  <ExpensesCategoryBar categories={categories} />
                ) : (
                  <ExpensesCategoryLine categories={categories} />
                )}
              </div>
            </div>
          </div>

          {/* Latest Transactions Section */}
          <div className="w-full flex flex-col bg-gradient-to-b from-[#121428] to-[#000036] text-white">
            {/* Filter Section */}
            <TransactionFilter filters={filters} setFilters={setFilters} />

            {/* Transactions Table */}
            <div className="rounded-2xl mt-4">
              <table className="min-w-full bg-[#161A40] text-gray-300 rounded-3xl overflow-hidden">
                <thead>
                  {/* //202747 3A3A57 202147 272747 bg-opacity-75 transition-opacity data-[closed]:opacity-0 */}
                  <tr className="text-left bg-[#3A3A57]">
                    {" "}
                    <th className="p-4 font-bold">Title</th>
                    <th className="p-4 font-bold">Category</th>
                    <th className="p-4 font-bold">Amount</th>
                    <th className="p-4 font-bold">Date</th>
                    <th className="p-4 font-bold">Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-[#272747] transition-colors duration-200"
                      >
                        <td className="p-4">{expense.title}</td>
                        <td className="p-4">{expense.category}</td>
                        <td className="p-4">{expense.amount}$</td>
                        <td className="p-4">{expense.date}</td>
                        <td className="p-4">{expense.createdDate}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-4 text-center" colSpan="5">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Floating "+" Button */}
          <button className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl fixed bottom-10 right-10">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
