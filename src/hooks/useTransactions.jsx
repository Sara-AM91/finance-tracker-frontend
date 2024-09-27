import { useState, useEffect } from "react";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token").replace(/['"]+/g, "");
      try {
        const response = await fetch("http://localhost:5000/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const result = await response.json();
        setTransactions(result.transactions);
        //console.log("Transactiosn:", result.transactions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { transactions, loading, error };
};

export default useTransactions;
