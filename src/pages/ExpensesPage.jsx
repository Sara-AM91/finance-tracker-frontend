import { useState, useMemo } from "react";
import TransactionFilter from "../components/TransactionFilter";
import ExpensesCategoryBar from "../components/charts/ExpensesCategoryBar";
import ExpensesCategoryLine from "../components/charts/ExpensesCategoryLine";
import TrashIconWithCross from "../components/TrashIconWithCross";
import NewEntryModal from "../components/NewEntryModal";
import useTransactions from "../hooks/useTransactions";

const ExpensesPage = () => {
  const [bar, setBar] = useState(true);

  const [filters, setFilters] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    createdDate: "",
  });

  const { transactions, loading, error } = useTransactions(filters);

  const formattedTransactions = transactions.map((transaction) => ({
    ...transaction,
    category: transaction.category || { title: "Unknown" },
  }));

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0)
        .toFixed(2),
    [transactions]
  );
  const totalTransactions = transactions.length;

  const averageExpense = useMemo(() => {
    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense"
    );
    return expenseTransactions.length > 0
      ? (totalExpenses / expenseTransactions.length).toFixed(2)
      : 0;
  }, [totalExpenses, transactions]);

  const topCategory = useMemo(() => {
    const categoryMap = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const categoryTitle = t.category?.title || "Unknown";
        if (!categoryMap[categoryTitle]) {
          categoryMap[categoryTitle] = 0;
        }
        categoryMap[categoryTitle] += parseFloat(t.amount || 0);
      });

    const sortedCategories = Object.entries(categoryMap).sort(
      (a, b) => b[1] - a[1]
    );
    return sortedCategories.length > 0 ? sortedCategories[0][0] : "Unknown";
  }, [transactions]);
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

  const filteredExpenses = transactions.filter((transaction) => {
    const matchesTitle =
      filters.title === "" ||
      transaction.title.toLowerCase().includes(filters.title.toLowerCase());

    const matchesCategory =
      filters.category === "" ||
      transaction.category?.title === filters.category;

    // Convert `amount` to string and handle accordingly
    const matchesAmount =
      filters.amount === "" ||
      parseFloat(
        typeof transaction.amount === "string"
          ? transaction.amount.replace(",", ".")
          : transaction.amount
      ) === parseFloat(filters.amount);

    const matchesDate =
      filters.date === "" || compareDates(transaction.date, filters.date);

    const matchesCreatedDate =
      filters.createdDate === "" ||
      compareDates(transaction.createdDate, filters.createdDate);

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
    <div className="h-screen w-screen flex flex-col text-white">
      <div className="flex flex-grow">
        {/* Main Content */}
        <div className="flex-grow space-y-6 overflow-hidden">
          {/* Cards and Chart Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Card Section */}
            <div className="col-span-2 grid grid-cols-2 gap-6">
              <div className="p-6 bg-[#161A40] rounded-3xl shadow-lg">
                <h3 className="text-lg font-semibold">Total Expenses</h3>
                <p className="text-3xl font-bold mt-2">${totalExpenses}</p>
              </div>
              <div className="p-6 bg-[#161A40] rounded-3xl shadow-lg">
                <h3 className="text-lg font-semibold">Total Transactions</h3>
                <p className="text-3xl font-bold mt-2">{totalTransactions}</p>
              </div>
              <div className="p-6 bg-[#161A40] rounded-3xl shadow-lg">
                <h3 className="text-lg font-semibold">Average Expense</h3>
                <p className="text-3xl font-bold mt-2">${averageExpense}</p>
              </div>
              <div className="p-6 bg-[#161A40] rounded-3xl shadow-lg">
                <h3 className="text-lg font-semibold">Top Category</h3>
                <p className="text-3xl font-bold mt-2">{topCategory}</p>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-[#161A40] p-6 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Expenses by Category</h3>
                <button
                  className="px-3 py-1 bg-[#293458] text-white text-sm font-semibold rounded-md hover:bg-cyan-800 transition-colors duration-200 w-24"
                  onClick={toggleChart}
                >
                  {bar ? "Line Chart" : "Bar Chart"}
                </button>
              </div>
              <div className="h-40 rounded-3xl mt-4">
                {bar ? (
                  <ExpensesCategoryBar
                    transactions={formattedTransactions}
                    onBarClick={handleBarClick}
                  />
                ) : (
                  <ExpensesCategoryLine transactions={formattedTransactions} />
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
                    <th className="p-4 font-bold bg-[#293458]">Title</th>
                    <th className="p-4 font-bold bg-[#293458]">Category</th>
                    <th className="p-4 font-bold bg-[#293458]">Amount</th>
                    <th className="p-4 font-bold bg-[#293458]">Date</th>
                    <th className="p-4 font-bold bg-[#293458]">Created Date</th>
                    <th className="p-4 font-bold text-right bg-[#293458]">
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
                        className="border-b border-gray-700 hover:bg-[#293458]/45 transition-colors duration-200"
                      >
                        <td className="p-4">{expense.title}</td>
                        <td className="p-4">
                          {/* Safely handle null or undefined categories */}
                          {expense.category &&
                          typeof expense.category === "object"
                            ? expense.category.title
                            : expense.category || "Unknown"}
                        </td>
                        <td className="p-4">
                          {parseFloat(expense.amount).toFixed(2)}$
                        </td>
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
              ;
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
