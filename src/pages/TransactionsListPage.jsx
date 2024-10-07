import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/solid";
import TransactionFilter from "../components/TransactionFilter";
import ViewEntryModal from "../components/ViewEntryModal";
import NewEntryModal from "../components/NewEntryModal";
import EditEntryModal from "../components/EditEntryModal";
import { useTransactionContext } from "../contexts/TransactionContext";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { formatDateForInput } from "../utils/dateUtils";
import TrashIconWithCross from "../components/TrashIconWithCross";
import { useOutletContext } from "react-router-dom";

const TransactionsListPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const { isMobile } = useOutletContext();

  const [openNewEntryModal, setOpenNewEntryModal] = useState(false);
  const [openEditEntryModal, setOpenEditEntryModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState(null);

  const [filters, setFilters] = useState({
    type: "",
    title: "",
    category: "",
    amount: "",
    date: "",
    createdDate: "",
  });

  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const { transactions = [], loading, error } = useTransactionContext();
  const { addTransaction } = useTransactionContext();
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 20;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const compareDates = (transactionDateStr, filterDateStr) => {
    if (!transactionDateStr || !filterDateStr) return false;

    const transactionDate = new Date(transactionDateStr);
    const filterDate = new Date(filterDateStr);

    if (isNaN(transactionDate.getTime()) || isNaN(filterDate.getTime())) {
      return false;
    }

    const formattedTransactionDate = transactionDate
      .toISOString()
      .split("T")[0];
    const formattedFilterDate = filterDate.toISOString().split("T")[0];

    return formattedTransactionDate === formattedFilterDate;
  };

  const filtersWithDefaults = {
    title: filters.title || "",
    category: filters.category || "",
    amount: filters.amount || "",
    date: filters.date || "",
    createdAt: filters.createdDate || "",
    type: filters.type || "",
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionTitleLower = (transaction.title || "").toLowerCase();
    const filtersTitleLower = filtersWithDefaults.title.toLowerCase();

    const matchesTitle =
      filtersTitleLower === "" ||
      transactionTitleLower.includes(filtersTitleLower);

    const transactionCategoryTitle = transaction.category?.title || "Unknown";
    const matchesCategory =
      filtersWithDefaults.category === "" ||
      transactionCategoryTitle === filtersWithDefaults.category;

    const transactionAmountStr = (transaction.amount || "").toString();
    const filterAmountStr = filtersWithDefaults.amount;
    const matchesAmount =
      filterAmountStr === "" ||
      transactionAmountStr.startsWith(filterAmountStr);

    const matchesDate =
      filtersWithDefaults.date === "" ||
      compareDates(transaction.date, filtersWithDefaults.date);

    const matchesCreatedDate =
      filtersWithDefaults.createdAt === "" ||
      compareDates(transaction.createdAt, filtersWithDefaults.createdAt);

    const matchesType =
      filtersWithDefaults.type === "" ||
      transaction.type === filtersWithDefaults.type;

    return (
      matchesTitle &&
      matchesCategory &&
      matchesAmount &&
      matchesDate &&
      matchesCreatedDate &&
      matchesType
    );
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const { key, direction } = sortConfig;
    const order = direction === "asc" ? 1 : -1;

    //Handle sorting for the category column specifically
    let valueA, valueB;

    if (key === "category") {
      valueA = a.category?.title || ""; //Safely access category title
      valueB = b.category?.title || "";
    } else {
      valueA = a[key] ?? "";
      valueB = b[key] ?? "";
    }

    //Apply sorting based on data type
    if (key === "amount") {
      return order * (parseFloat(valueA) - parseFloat(valueB));
    } else if (key === "date" || key === "createdAt") {
      return order * (new Date(valueA) - new Date(valueB));
    } else {
      return valueA.toString().localeCompare(valueB.toString()) * order;
    }
  });

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = sortedTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  const handleSort = (key) => {
    setSortConfig((prevSortConfig) => {
      // If the same key is clicked, toggle direction
      const newDirection =
        prevSortConfig.key === key && prevSortConfig.direction === "asc"
          ? "desc"
          : "asc";
      return { key, direction: newDirection };
    });
  };

  // Function to determine the color of the sort icon
  const getIconColor = (key) => {
    return sortConfig.key === key ? "text-red-500" : "text-gray-400"; // Red if active, gray otherwise
  };
  const handleRowClick = (transaction) => {
    setEntryToEdit(transaction);
    setOpenViewModal(true);
  };

  const handleEditFromViewModal = () => {
    setOpenViewModal(false);
    setTimeout(() => {
      setOpenEditEntryModal(true);
    }, 0);
  };

  const handleEdit = (transaction) => {
    setEntryToEdit(transaction);
    setOpenEditEntryModal(true);
  };
  // Handle page change in pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  const getSortIcon = (key) => {
    const className =
      "w-5 h-5 inline-block ml-1 align-middle transition-colors duration-200";

    const isActive = sortConfig.key === key;

    return isActive ? (
      sortConfig.direction === "asc" ? (
        <ChevronUpIcon className={`${className} text-red-500`} />
      ) : (
        <ChevronDownIcon className={`${className} text-red-500`} />
      )
    ) : (
      <ArrowsUpDownIcon
        className={`${className} text-gray-400 group-hover:text-gray-200`}
      />
    );
  };

  return (
    <div className="h-full w-full text-white">
      <div className="flex flex-col flex-grow w-full text-white overflow-hidden">
        {/* Filter Section */}
        {isMobile && (
          <button
            className="self-end px-3 py-1 bg-[#293458] text-white text-sm font-semibold rounded-md hover:bg-cyan-800 transition-colors duration-200 w-24"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            Filter
          </button>
        )}
        {!isMobile && (
          <TransactionFilter
            filters={filters}
            setFilters={setFilters}
            type="all"
            showTypeFilter={true}
          />
        )}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
            onClick={toggleSidebar}
          >
            <div
              className="bg-[#161A40] w-3/4 sm:w-1/2 h-full p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="text-white"
                onClick={toggleSidebar} // Button to close sidebar
              >
                Close
              </button>
              <TransactionFilter
                filters={filters}
                setFilters={setFilters}
                type="all"
                showTypeFilter={true}
              />
            </div>
          </div>
        )}
        {/* Pagination Component */}
        <div className="flex justify-center mt-4">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
              variant="outlined"
              shape="rounded"
              className="custom-pagination"
            />
          </Stack>
        </div>

        {/* Transactions Table */}
        <div className="rounded-2xl mt-4 h-[75vh] sm:h-[55vh] md:h-[70vh] w-[40vh] sm:w-[70vh] md:w-auto relative overflow-x-auto self-center md:self-auto">
          <div className="h-full overflow-y-auto">
            <table className="min-w-full bg-[#161A40] text-gray-300 rounded-3xl">
              <thead>
                <tr className="text-left bg-[#3A3A57]">
                  <th
                    className="p-4 font-bold sticky top-0 z-10 bg-[#293458] rounded-tl-2xl w-1/6"
                    onClick={() => handleSort("title")}
                  >
                    Title{" "}
                    <span className={`${getIconColor("title")}`}>
                      {getSortIcon("title")}
                    </span>
                  </th>
                  <th
                    className="p-4 font-bold sticky top-0 z-10 bg-[#293458] w-1/6"
                    onClick={() => handleSort("type")}
                  >
                    Type{" "}
                    <span className={`${getIconColor("type")}`}>
                      {getSortIcon("type")}
                    </span>
                  </th>
                  <th
                    className="p-4 font-bold sticky top-0 z-10 bg-[#293458] w-1/6"
                    onClick={() => handleSort("category")}
                  >
                    Category{" "}
                    <span className={`${getIconColor("category")}`}>
                      {getSortIcon("category")}
                    </span>
                  </th>
                  <th
                    className="p-4 font-bold sticky top-0 z-10 bg-[#293458] w-1/6"
                    onClick={() => handleSort("amount")}
                  >
                    Amount{" "}
                    <span className={`${getIconColor("amount")}`}>
                      {getSortIcon("amount")}
                    </span>
                  </th>
                  <th
                    className="p-4 font-bold sticky top-0 z-10 bg-[#293458] w-1/6"
                    onClick={() => handleSort("date")}
                  >
                    Date{" "}
                    <span className={`${getIconColor("date")}`}>
                      {getSortIcon("date")}
                    </span>
                  </th>
                  <th
                    className="p-4 font-bold sticky top-0 z-10 bg-[#293458] w-1/6"
                    onClick={() => handleSort("createdAt")}
                  >
                    Created Date{" "}
                    <span className={`${getIconColor("createdAt")}`}>
                      {getSortIcon("createdAt")}
                    </span>
                  </th>
                  <th className="p-4 font-bold sticky top-0 bg-[#293458] z-10 rounded-tr-2xl">
                    {" "}
                    <button
                      onClick={() =>
                        setFilters({
                          type: "",
                          title: "",
                          category: "",
                          amount: "",
                          date: "",
                          createdAt: "",
                        })
                      }
                      aria-label="Clear filters"
                      title="Clear filters"
                      className="inline-flex items-center cursor-pointer"
                    >
                      <TrashIconWithCross
                        filtersActive={Object.values(filters).some(
                          (val) => val !== ""
                        )}
                      />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.length > 0 ? (
                  currentTransactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-[#293458]/45 transition-colors duration-200 cursor-pointer"
                      onClick={() => handleRowClick(transaction)}
                    >
                      <td className="p-4 w-1/6 truncate">
                        {transaction.title}
                      </td>
                      <td className="p-4 w-1/6 truncate">{transaction.type}</td>
                      <td className="p-4 w-1/6 truncate">
                        {transaction.category?.title || "Unknown"}
                      </td>
                      <td className="p-4 w-1/6 truncate">
                        {parseFloat(transaction.amount).toFixed(2)}$
                      </td>
                      <td className="p-4 w-1/6 truncate">
                        {formatDateForInput(transaction.date)}
                      </td>
                      <td className="p-4 w-1/6 truncate">
                        {transaction.createdAt
                          ? formatDateForInput(transaction.createdAt)
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
                                  handleEdit(transaction);
                                }}
                              >
                                Edit
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </Menu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-4 text-center" colSpan="7">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
        addTransaction={addTransaction}
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
  );
};

export default TransactionsListPage;
