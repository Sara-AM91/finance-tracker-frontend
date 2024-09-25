import { useState } from "react";
import ExpensesVsIncomeBar from "../components/charts/ExpensesVsIncomeBar";
import ExpensesVsIncomeLine from "../components/charts/ExpensesVsIncomeLine";
import BasicPie from "../components/charts/BasicPie";
import ProgressBar from "../components/charts/ProgressBar";
import TransactionsList from "../components/TransactionsList";
import NewEntryModal from "../components/NewEntryModal";
import greenWave from "../assets/greenWave2.png";
import redWave from "../assets/redWave.png";
import plus from "../assets/plus.png";
import SearchBar from "../components/SearchBar";

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
];

const ExpensesPage = () => {
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
          <div className="bg-[#161A40] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Recent Expenses</h3>
            {/* Search Bar */}
            <div className="my-4">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="space-y-4 mt-4">
              {recentExpenses.map((expense, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-[#202747] p-3 rounded-lg" //202747 3A3A57 202147 272747
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
