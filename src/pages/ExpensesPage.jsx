import { useState } from "react";
import ExpensesVsIncomeBar from "../components/charts/ExpensesVsIncomeBar";
import ExpensesVsIncomeLine from "../components/charts/ExpensesVsIncomeLine";
import TransactionFilter from "../components/TransactionFilter";

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
];

const ExpensesPage = () => {
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
  });

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

  const [bar, setBar] = useState(true);
  const toggleChart = () => {
    setBar(!bar);
  };
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
            </div>

            {/* Chart Section */}
            <div className="bg-[#161A40] p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Daily Expenses</h3>
              <div className="h-40 bg-gray-800 rounded-lg mt-4">
                {bar ? <ExpensesVsIncomeBar /> : <ExpensesVsIncomeLine />}
              </div>
            </div>
          </div>

          {/* Latest Transactions Section */}
          <div className="w-full flex flex-col bg-gradient-to-b from-[#121428] to-[#000036] text-white">
            {/* Filter Section */}
            <TransactionFilter filters={filters} setFilters={setFilters} />

            {/* Transactions Table */}
            <div className="rounded-lg shadow-lg mt-4">
              <table className="min-w-full bg-[#161A40] text-gray-300 rounded-lg shadow-lg">
                <thead>
                  {/* //202747 3A3A57 202147 272747 */}
                  <tr className="text-left bg-[#272747]">
                    {" "}
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense, index) => (
                      <tr key={index} className="border-b border-gray-700">
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
