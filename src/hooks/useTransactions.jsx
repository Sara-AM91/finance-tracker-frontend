import { useState, useEffect } from "react";
//USE LIKE THIS:
// const filters = { type: "expense" };
// const {
//   transactions,
// loading: transactionsLoading,
//error: transactionsError,
//} = useTransactions({ filters });

//OR:
//const {
//   transactions,
// loading: transactionsLoading,
//error: transactionsError,
//} = useTransactions({ type: "expenses" });

//NO FILTER: useTransactions({})

const useTransactions = (filters = {}) => {
  // Filters are passed as an object
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
      if (!token) {
        setError("No token found, user is not authenticated");
        setLoading(false);
        return;
      }

      try {
        // Construct query parameters based on filters and use the second endpoint if there is no filter used
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
        console.log("Transactions Data:", result.transactions);

        setTransactions(result.transactions);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, loading, error };
};

export default useTransactions;
