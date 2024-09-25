import { useState } from "react";
import TransactionFilter from "../components/TransactionFilter";
import ExpensesCategoryBar from "../components/charts/ExpensesCategoryBar";
import ExpensesCategoryLine from "../components/charts/ExpensesCategoryLine";
import TrashIconWithCross from "../components/TrashIconWithCross";
import NewEntryModal from "../components/NewEntryModal";
const ExpensesPage = () => {
  const [bar, setBar] = useState(true);

  const [filters, setFilters] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    createdDate: "",
  });

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Groceries",
      date: "2024-09-20",
      amount: "50.00",
      category: "Shopping",
      createdDate: "2024-09-20",
    },
    {
      id: 2,
      title: "Gas",
      date: "Sep 19, 2024",
      amount: "30,00",
      category: "Auto",
      createdDate: "2024-09-20",
    },
    {
      id: 3,
      title: "Movie Tickets",
      date: "2024-09-18",
      amount: "15,00",
      category: "Entertainment",
      createdDate: "2024-09-18",
    },
    {
      id: 4,
      title: "Doctor Visit",
      date: "2024-09-17",
      amount: "90,00",
      category: "Health",
      createdDate: "2024-09-20",
    },
    {
      id: 5,
      title: "Doctor Visit",
      date: "2024-09-17",
      amount: "90,00",
      category: "Health",
      createdDate: "2024-09-20",
    },
    {
      id: 6,
      title: "Groceries",
      date: "2024-09-14",
      amount: "50,00",
      category: "Shopping",
      createdDate: "2024-09-20",
    },
    {
      id: 7,
      title: "Groceries",
      date: "2024-09-20",
      amount: "50,00",
      category: "Shopping",
      createdDate: "2024-09-20",
    },
  ]);

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

  const d = new Date();
  let year = d.getFullYear();

  const compareDates = (expenseDateStr, filterDateStr) => {
    const expenseDate = new Date(expenseDateStr);
    const filterDate = new Date(filterDateStr);
    if (isNaN(expenseDate.getTime()) || isNaN(filterDate.getTime())) {
      console.error("Invalid date format:", expenseDateStr, filterDateStr);
      return false;
    }
    return (
      expenseDate.getFullYear() === filterDate.getFullYear() &&
      expenseDate.getMonth() === filterDate.getMonth() &&
      expenseDate.getDate() === filterDate.getDate()
    );
  };

  const handleBarClick = (categoryName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: categoryName,
    }));
  };
  const clearFilters = () => {
    setFilters({
      title: "",
      category: "",
      amount: "",
      date: "",
      createdDate: "",
    });
  };

  const areFiltersActive = () => {
    return Object.values(filters).some((value) => value !== "");
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesTitle =
      filters.title === "" ||
      expense.title.toLowerCase().includes(filters.title.toLowerCase());

    const matchesCategory =
      filters.category === "" || expense.category === filters.category;

    const matchesAmount =
      filters.amount === "" ||
      parseFloat(expense.amount.replace(",", ".")) ===
        parseFloat(filters.amount);

    const matchesDate =
      filters.date === "" || compareDates(expense.date, filters.date);

    const matchesCreatedDate =
      filters.createdDate === "" ||
      compareDates(expense.createdDate, filters.createdDate);
    return (
      matchesTitle &&
      matchesCategory &&
      matchesAmount &&
      matchesDate &&
      matchesCreatedDate
    );
  });

  const [open, setOpen] = useState(false);

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
                  <ExpensesCategoryBar
                    categories={categories}
                    onBarClick={handleBarClick}
                  />
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
                  <tr className="text-left bg-[#3A3A57]">
                    <th className="p-4 font-bold">Title</th>
                    <th className="p-4 font-bold">Category</th>
                    <th className="p-4 font-bold">Amount</th>
                    <th className="p-4 font-bold">Date</th>
                    <th className="p-4 font-bold">Created Date</th>
                    <th className="p-4 font-bold text-right">
                      <button
                        onClick={clearFilters}
                        aria-label="Clear filters"
                        title="Clear filters"
                        className="inline-flex items-center cursor-pointer"
                      >
                        <TrashIconWithCross
                          filtersActive={areFiltersActive()}
                        />
                      </button>
                    </th>
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
                        <td className="p-4"></td>{" "}
                        {/* Empty cell for alignment */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-4 text-center" colSpan="6">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Floating "+" Button */}
          <button
            className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl fixed bottom-10 right-10"
            onClick={() => setOpen(true)}
          >
            +
          </button>
        </div>
      </div>

      {/* Modal Section */}
      <NewEntryModal open={open} setOpen={setOpen} defaultCategory="Expense" />
    </div>
  );
};

export default ExpensesPage;
