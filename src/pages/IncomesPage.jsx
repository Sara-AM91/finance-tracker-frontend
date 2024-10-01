import { useState, useMemo, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TransactionFilter from "../components/TransactionFilter";
import IncomesCategoryBar from "../components/charts/IncomesCategoryBar";
import IncomesCategoryLine from "../components/charts/IncomesCategoryLine";
import TrashIconWithCross from "../components/TrashIconWithCross";
import ViewEntryModal from "../components/ViewEntryModal";
import NewEntryModal from "../components/NewEntryModal";
import EditEntryModal from "../components/EditEntryModal";
import { useTransactionContext } from "../contexts/TransactionContext";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { formatDateForInput } from "../utils/dateUtils";

const IncomesPage = () => {
  //State for toggling between Bar and Line chart
  const [bar, setBar] = useState(true);

  //States for modals (New Entry, Edit Entry, View Entry)
  const [openNewEntryModal, setOpenNewEntryModal] = useState(false);
  const [openEditEntryModal, setOpenEditEntryModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState(null);

  //Local filters state for filtering transactions
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    createdDate: "",
  });

  //Fetch transactions from context
  const { transactions = [], loading, error } = useTransactionContext();

  const filtersWithDefaults = {
    title: filters.title || "",
    category: filters.category || "",
    amount: filters.amount || "",
    date: filters.date || "",
    createdDate: filters.createdDate || "",
  };

  //Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 6; //Number of transactions to display per page

  //Reset currentPage to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  //Calculate indices for slicing the filtered transactions array
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;

  //Filter transactions to only include incomes
  const incomeTransactions = transactions.filter((t) => t.type === "income");

  //Format transactions to ensure categories have a default value
  const formattedTransactions = incomeTransactions.map((transaction) => ({
    ...transaction,
    category: transaction.category ?? { title: "Unknown" },
  }));

  //Calculate total incomes using useMemo for performance optimization
  const totalExpenses = useMemo(
    () =>
      incomeTransactions
        .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0)
        .toFixed(2),
    [incomeTransactions]
  );

  //Total number of transactions
  const totalTransactions = incomeTransactions.length;

  //Calculate average income
  const averageExpense = useMemo(() => {
    return incomeTransactions.length > 0
      ? (totalExpenses / incomeTransactions.length).toFixed(2)
      : 0;
  }, [totalExpenses, incomeTransactions]);

  //Determine top category by total amount spent
  const topCategory = useMemo(() => {
    const categoryMap = {};
    incomeTransactions.forEach((t) => {
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
  }, [incomeTransactions]);

  //Function to toggle between Bar and Line chart
  const toggleChart = () => {
    setBar(!bar);
  };

  //Function to compare dates for filtering
  const compareDates = (incomeDateStr, filterDateStr) => {
    if (!incomeDateStr || !filterDateStr) return false;

    const incomeDate = new Date(incomeDateStr);
    const filterDate = new Date(filterDateStr);

    //Check for invalid dates
    if (isNaN(incomeDate.getTime()) || isNaN(filterDate.getTime())) {
      console.error("Invalid date format:", incomeDateStr, filterDateStr);
      return false;
    }

    //Format both dates to YYYY-MM-DD for comparison
    const formattedIncomeDate = incomeDate.toISOString().split("T")[0];
    const formattedFilterDate = filterDate.toISOString().split("T")[0];

    return formattedIncomeDate === formattedFilterDate;
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

  //Filter transactions based on local filters
  const filteredIncomes = formattedTransactions.filter((transaction) => {
    const transactionTitleLower = (transaction.title || "").toLowerCase();
    const filtersTitleLower = (filtersWithDefaults.title || "").toLowerCase();

    const matchesTitle =
      filtersTitleLower === "" ||
      transactionTitleLower.includes(filtersTitleLower);

    const transactionCategoryTitle = transaction.category?.title || "Unknown";
    const matchesCategory =
      filtersWithDefaults.category === "" ||
      transactionCategoryTitle === filtersWithDefaults.category;

    //Convert amounts to strings for comparison
    const transactionAmountStr = (transaction.amount || "").toString();
    const filterAmountStr = filtersWithDefaults.amount;

    const matchesAmount =
      filtersWithDefaults.amount === "" ||
      transactionAmountStr.startsWith(filterAmountStr);

    const matchesDate =
      filtersWithDefaults.date === "" ||
      compareDates(transaction.date, filtersWithDefaults.date);

    const matchesCreatedDate =
      filtersWithDefaults.createdDate === "" ||
      compareDates(transaction.createdAt, filtersWithDefaults.createdDate);

    return (
      matchesTitle &&
      matchesCategory &&
      matchesAmount &&
      matchesDate &&
      matchesCreatedDate
    );
  });

  //Apply pagination to filtered incomes
  const currentTransactions = filteredIncomes.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  //Calculate total number of pages based on filtered incomes
  const totalPages = Math.ceil(filteredIncomes.length / transactionsPerPage);

  //Ensure currentPage is within valid range (especially after filtering)
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  //Handle row click to open View Entry modal
  const handleRowClick = (income) => {
    setEntryToEdit(income);
    setOpenViewModal(true);
  };

  //Handle edit action from View Entry modal
  const handleEditFromViewModal = () => {
    setOpenViewModal(false);
    setTimeout(() => {
      setOpenEditEntryModal(true);
    }, 0);
  };

  //Handle edit action
  const handleEdit = (income) => {
    setEntryToEdit(income);
    setOpenEditEntryModal(true);
  };

  //Handle delete action (functionality to be implemented)
  const handleDelete = (incomeId) => {
    console.log("Delete:", incomeId);
  };

  //Handle page change in pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  //Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  //Show error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col text-white">
      <div className="flex flex-grow">
        {/* Main Content */}
        <div className="flex-grow space-y-6 overflow-hidden">
          {/* Cards and Chart Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Card Section */}
            <div className="col-span-2 grid grid-cols-2 gap-6">
              {/* Total Incomes Card */}
              <div className="p-6 bg-[#161A40] rounded-3xl shadow-lg">
                <h3 className="text-lg font-semibold">Total Incomes</h3>
                <p className="text-3xl font-bold mt-2">${totalExpenses}</p>
              </div>
              {/* Total Transactions Card */}
              <div className="p-6 bg-[#161A40] rounded-3xl shadow-lg">
                <h3 className="text-lg font-semibold">Total Transactions</h3>
                <p className="text-3xl font-bold mt-2">{totalTransactions}</p>
              </div>
              {/* Average Ixpense Card */}
              <div className="p-6 bg-[#161A40] rounded-3xl shadow-lg">
                <h3 className="text-lg font-semibold">Average Income</h3>
                <p className="text-3xl font-bold mt-2">${averageExpense}</p>
              </div>
              {/* Top Category Card */}
              <div className="p-6 bg-[#161A40] rounded-3xl shadow-lg">
                <h3 className="text-lg font-semibold">Top Category</h3>
                <p className="text-3xl font-bold mt-2">{topCategory}</p>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-[#161A40] p-6 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Incomes by Category</h3>
                <button
                  className="px-3 py-1 bg-[#293458] text-white text-sm font-semibold rounded-md hover:bg-cyan-800 transition-colors duration-200 w-24"
                  onClick={toggleChart}
                >
                  {bar ? "Line Chart" : "Bar Chart"}
                </button>
              </div>
              <div className="h-40 rounded-3xl mt-4">
                {bar ? (
                  <IncomesCategoryBar
                    transactions={formattedTransactions}
                    onBarClick={handleBarClick}
                  />
                ) : (
                  <IncomesCategoryLine transactions={formattedTransactions} />
                )}
              </div>
            </div>
          </div>

          {/* Latest Transactions Section */}
          <div className="w-full flex flex-col bg-gradient-to-b from-[#121428] to-[#000036] text-white">
            {/* Filter Section */}
            <TransactionFilter
              filters={filters}
              setFilters={setFilters}
              type="income"
            />
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
                    currentTransactions.map((income, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-[#293458]/45 transition-colors duration-200 cursor-pointer"
                        onClick={() => handleRowClick(income)}
                      >
                        <td className="p-4">{income.title}</td>
                        <td className="p-4">
                          {income.category?.title || "Unknown"}
                        </td>
                        <td className="p-4">
                          {parseFloat(income.amount).toFixed(2)}$
                        </td>
                        <td className="p-4">
                          {formatDateForInput(income.date)}
                        </td>
                        <td className="p-4">
                          {income.createdAt
                            ? formatDateForInput(income.createdAt)
                            : "N/A"}
                        </td>
                        {/* Action Button inside each row */}
                        <td className="p-4 text-right right-4 top-4">
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
                                    handleEdit(income);
                                  }}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  as="button"
                                  className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-red-700 hover:bg-red-200 data-[active=true]:bg-red-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(income._id);
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
                      <td className="p-4 text-center" colSpan="6">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination Component */}
            <div className="flex justify-center mt-4">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
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
          {/* New Entry Modal */}
          <NewEntryModal
            open={openNewEntryModal}
            setOpen={setOpenNewEntryModal}
            defaultCategory="Income"
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

export default IncomesPage;
