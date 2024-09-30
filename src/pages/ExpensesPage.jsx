import { useState, useMemo, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TransactionFilter from "../components/TransactionFilter";
import ExpensesCategoryBar from "../components/charts/ExpensesCategoryBar";
import ExpensesCategoryLine from "../components/charts/ExpensesCategoryLine";
import TrashIconWithCross from "../components/TrashIconWithCross";
import ViewEntryModal from "../components/ViewEntryModal";
import NewEntryModal from "../components/NewEntryModal";
import EditEntryModal from "../components/EditEntryModal";
import { useTransactionContext } from "../contexts/TransactionContext"; // Use the new context
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { formatDateForInput } from "../utils/dateUtils";

const ExpensesPage = () => {
  //State for toggling between Bar and Line chart
  const [bar, setBar] = useState(true);

  //States for modals (New Entry, Edit Entry, View Entry)
  const [openNewEntryModal, setOpenNewEntryModal] = useState(false);
  const [openEditEntryModal, setOpenEditEntryModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState(null);

  //Filters state for filtering transactions
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    createdDate: "",
  });

  //Fetch transactions from context
  const { transactions, loading, error } = useTransactionContext();

  //Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 6; //Number of transactions to display per page

  //Effect to reset currentPage to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  //Calculate indices for slicing the filtered transactions array
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;

  //Change page handler
  const handlePageChange = (event, value) => {
    console.log("Page changed to:", value);
    setCurrentPage(value);
  };

  //Format transactions to ensure categories have a default value
  const formattedTransactions = transactions.map((transaction) => ({
    ...transaction,
    category: transaction.category || { title: "Unknown" },
  }));

  //Calculate total expenses using useMemo for performance optimization
  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0)
        .toFixed(2),
    [transactions]
  );

  //Total number of transactions
  const totalTransactions = transactions.length;

  //Calculate average expense
  const averageExpense = useMemo(() => {
    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense"
    );
    return expenseTransactions.length > 0
      ? (totalExpenses / expenseTransactions.length).toFixed(2)
      : 0;
  }, [totalExpenses, transactions]);

  //Determine top category by total amount spent
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

  //Function to toggle between Bar and Line chart
  const toggleChart = () => {
    setBar(!bar);
  };

  // const d = new Date();
  // let year = d.getFullYear();

  //Function to compare dates for filtering
  const compareDates = (expenseDateStr, filterDateStr) => {
    if (!expenseDateStr || !filterDateStr) return false;

    const expenseDate = new Date(expenseDateStr);
    const filterDate = new Date(filterDateStr);

    //Check for invalid dates
    if (isNaN(expenseDate.getTime()) || isNaN(filterDate.getTime())) {
      console.error("Invalid date format:", expenseDateStr, filterDateStr);
      return false;
    }

    //Format both dates to YYYY-MM-DD for comparison
    const formattedExpenseDate = expenseDate.toISOString().split("T")[0];
    const formattedFilterDate = filterDate.toISOString().split("T")[0];

    return formattedExpenseDate === formattedFilterDate;
  };

  //Handle clicks on chart bars to set category filter
  const handleBarClick = (categoryName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: categoryName,
    }));
  };

  //Function to clear all filters
  const clearFilters = () => {
    setFilters({
      title: "",
      category: "",
      amount: "",
      date: "",
      createdDate: "",
    });
  };

  //Check if any filters are active
  const areFiltersActive = () => {
    return Object.values(filters).some((value) => value !== "");
  };

  //Filter transactions based on filters
  const filteredExpenses = transactions.filter((transaction, index) => {
    console.log(`Transaction #${index}:`, transaction);

    const matchesTitle =
      filters.title === "" ||
      transaction.title?.toLowerCase().includes(filters.title.toLowerCase());

    const matchesCategory =
      filters.category === "" ||
      transaction.category?.title === filters.category;

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
      compareDates(transaction.createdAt, filters.createdDate);

    return (
      matchesTitle &&
      matchesCategory &&
      matchesAmount &&
      matchesDate &&
      matchesCreatedDate
    );
  });

  //Apply pagination to filtered expenses
  const currentTransactions = filteredExpenses.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  //Calculate total number of pages based on filtered expenses
  const totalPages = Math.ceil(filteredExpenses.length / transactionsPerPage);

  //Ensure currentPage is within valid range (especially after filtering)
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  //Handle row click to open View Entry modal
  const handleRowClick = (expense) => {
    setEntryToEdit(expense);
    setOpenViewModal(true); // Directly set openViewModal to true
  };

  //Handle edit action from View Entry modal
  const handleEditFromViewModal = () => {
    setOpenViewModal(false);
    setTimeout(() => {
      setOpenEditEntryModal(true);
    }, 0);
  };

  //Handle edit action
  const handleEdit = (expense) => {
    console.log("In edit");
    setEntryToEdit(expense);
    setOpenEditEntryModal(true);
  };

  // const handleDelete = (expenseId) => {
  //   console.log("Delete:", expenseId);
  // };

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
                  {currentTransactions.length > 0 ? (
                    currentTransactions.map((expense, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-[#293458]/45 transition-colors duration-200 cursor-pointer"
                        onClick={() => handleRowClick(expense)}
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
                        <td className="p-4">
                          {formatDateForInput(expense.date)}
                        </td>{" "}
                        <td className="p-4">
                          {expense.createdAt
                            ? formatDateForInput(expense.createdAt)
                            : "N/A"}
                        </td>
                        {/* Action Button inside each row */}
                        <td className="p-4 text-right  right-4 top-4">
                          {/* Action Menu */}
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <MenuButton
                              className="inline-flex justify-center w-full px-2 py-2 text-sm font-medium text-white bg-transparent rounded-md hover:bg-[#293458]/30 focus:outline-none"
                              onClick={(e) => e.stopPropagation()}
                            >
                              ⋮
                            </MenuButton>
                            <MenuItems className="absolute right-0 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-10">
                              <div className="py-1">
                                <MenuItem
                                  as="button"
                                  className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 data-[active=true]:bg-gray-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(expense);
                                  }}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  as="button"
                                  className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-red-700 hover:bg-red-200 data-[active=true]:bg-red-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(expense._id);
                                  }}
                                >
                                  Delete
                                </MenuItem>
                              </div>
                            </MenuItems>
                          </Menu>
                        </td>
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
            {/* MUI Pagination Component */}
            <div className="flex justify-center mt-4">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages} // Total number of pages
                  page={currentPage} // Current active page
                  onChange={handlePageChange} // Handler for page change
                  variant="outlined"
                  shape="rounded"
                  className="custom-pagination"
                />
              </Stack>
            </div>
          </div>
          {/* View Entry Modal */}
          {entryToEdit && (
            <ViewEntryModal
              open={openViewModal}
              setOpen={setOpenViewModal}
              entry={entryToEdit}
              onEdit={handleEditFromViewModal}
            />
          )}
          {/* Modal Section */}
          <NewEntryModal
            open={openNewEntryModal}
            setOpen={setOpenNewEntryModal}
            defaultCategory="Expense"
          />

          {/* Edit Entry Modal */}
          {entryToEdit && (
            <EditEntryModal
              open={openEditEntryModal}
              setOpen={setOpenEditEntryModal}
              entry={entryToEdit}
            />
          )}
          {/* Floating "+" Button */}
          <button
            className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl fixed bottom-10 right-10"
            onClick={() => setOpenNewEntryModal(true)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
