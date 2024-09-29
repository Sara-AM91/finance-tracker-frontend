import React, { createContext, useContext, useState, useEffect } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]); // Store transactions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({}); // Add filter state

  // Fetch transactions from the backend
  const fetchTransactions = async () => {
    const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
    if (!token) {
      setError("No token found, user is not authenticated");
      setLoading(false);
      return;
    }

    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = queryParams
        ? `http://localhost:5000/transactions?${queryParams}`
        : `http://localhost:5000/transactions`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const result = await response.json();
      setTransactions(result.transactions || []);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch transactions on mount or when filters change
  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  // Define a function to refresh transactions manually
  const refreshTransactions = () => {
    setLoading(true);
    fetchTransactions();
  };

  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        error,
        setTransactions,
        refreshTransactions,
        setFilters,
        addTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => useContext(TransactionContext);
