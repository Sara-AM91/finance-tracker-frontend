import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TransactionFilter from "../components/TransactionFilter";
import ViewEntryModal from "../components/ViewEntryModal";
import NewEntryModal from "../components/NewEntryModal";
import EditEntryModal from "../components/EditEntryModal";
import { useTransactionContext } from "../contexts/TransactionContext";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { formatDateForInput } from "../utils/dateUtils";
import TrashIconWithCross from "../components/TrashIconWithCross";

const TransactionsListPage = () => {
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
    key: "title",
    direction: "asc",
  });
  const { transactions = [], loading, error } = useTransactionContext();

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 20;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Helper function to compare dates
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

  // Ensure filters have default values
  const filtersWithDefaults = {
    title: filters.title || "",
    category: filters.category || "",
    amount: filters.amount || "",
    date: filters.date || "",
    createdDate: filters.createdDate || "",
    type: filters.type || "",
  };

  // Filter the transactions based on the filters state
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
      filtersWithDefaults.createdDate === "" ||
      compareDates(transaction.createdAt, filtersWithDefaults.createdDate);

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

  // Apply sorting to the filtered transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const { key, direction } = sortConfig;
    const order = direction === "asc" ? 1 : -1;

    const valueA = a[key] ?? "";
    const valueB = b[key] ?? "";

    // Determine the sorting logic based on data type
    if (key === "amount") {
      return order * (parseFloat(valueA) - parseFloat(valueB));
    } else if (key === "date" || key === "createdDate") {
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
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "⇅";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col text-white">
      <div className="flex-grow w-full bg-gradient-to-b from-[#121428] to-[#000036] text-white overflow-hidden">
        {/* Filter Section */}
        <TransactionFilter
          filters={filters}
          setFilters={setFilters}
          type="all"
          showTypeFilter={true}
        />

        {/* Transactions Table */}
        <div className="rounded-2xl mt-4 h-[75vh] overflow-y-auto">
          <table className="min-w-full bg-[#161A40] text-gray-300 rounded-3xl overflow-hidden">
            <thead>
              <tr className="text-left bg-[#3A3A57]">
                <th
                  className="p-4 font-bold bg-[#293458]"
                  onClick={() => handleSort("title")}
                >
                  Title {getSortIcon("title")}
                </th>
                <th
                  className="p-4 font-bold bg-[#293458]"
                  onClick={() => handleSort("type")}
                >
                  Type {getSortIcon("type")}
                </th>
                <th
                  className="p-4 font-bold bg-[#293458]"
                  onClick={() => handleSort("category")}
                >
                  Category {getSortIcon("category")}
                </th>
                <th
                  className="p-4 font-bold bg-[#293458]"
                  onClick={() => handleSort("amount")}
                >
                  Amount {getSortIcon("amount")}
                </th>
                <th
                  className="p-4 font-bold bg-[#293458]"
                  onClick={() => handleSort("date")}
                >
                  Date {getSortIcon("date")}
                </th>
                <th
                  className="p-4 font-bold bg-[#293458]"
                  onClick={() => handleSort("createdDate")}
                >
                  Created Date {getSortIcon("createdDate")}
                </th>
                <th className="p-4 font-bold text-right bg-[#293458]">
                  <button
                    onClick={() =>
                      setFilters({
                        type: "",
                        title: "",
                        category: "",
                        amount: "",
                        date: "",
                        createdDate: "",
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
                    onClick={() => setEntryToEdit(transaction)}
                  >
                    <td className="p-4">{transaction.title}</td>
                    <td className="p-4">{transaction.type}</td>
                    <td className="p-4">
                      {transaction.category?.title || "Unknown"}
                    </td>
                    <td className="p-4">
                      {parseFloat(transaction.amount).toFixed(2)}$
                    </td>
                    <td className="p-4">
                      {formatDateForInput(transaction.date)}
                    </td>
                    <td className="p-4">
                      {transaction.createdAt
                        ? formatDateForInput(transaction.createdAt)
                        : "N/A"}
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
      </div>
    </div>
  );
};

export default TransactionsListPage;
