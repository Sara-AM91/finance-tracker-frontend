import { useState, useEffect } from "react";
import { useTransactionContext } from "../contexts/TransactionContext";

const TransactionFilter = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState([]);
  const [localFilters, setLocalFilters] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    createdDate: "",
  });

  //Update global filters whenever local filter changes
  useEffect(() => {
    setFilters(localFilters);
  }, [localFilters]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }
        const response = await fetch(
          "http://localhost:5000/categories/filter?categoryType=expense",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // Ensure "Other" is at the end of the array
        const sortedCategories = data.sort((a, b) => {
          if (a.title === "Other") return 1;
          if (b.title === "Other") return -1;
          return a.title.localeCompare(b.title);
        });

        setCategories(sortedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input Change Detected: ${name} = ${value}`);
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value || "" }));
  };

  //Define default values for `filters` object to avoid `undefined` values
  const defaultFilters = {
    title: "",
    category: "",
    amount: "",
    date: "",
    createdDate: "",
  };

  return (
    <div className="flex flex-wrap justify-between p-3 bg-[#161A40] rounded-3xl shadow-md">
      <div className="w-full sm:w-1/6">
        <label className="text-gray-300 font-bold">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Search by title"
          className="w-full bg-white text-black pl-2 rounded-md h-9"
          onChange={handleInputChange}
          value={filters.title || defaultFilters.title}
        />
      </div>

      <div className="w-full sm:w-1/6">
        <label className="text-gray-300 font-bold">Category</label>
        <select
          name="category"
          className="w-full bg-white text-black pl-2 rounded-md h-9"
          onChange={handleInputChange}
          value={filters.category || defaultFilters.category}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full sm:w-1/6">
        <label className="text-gray-300 font-bold">Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Search by amount"
          className="w-full bg-white text-black pl-2 rounded-md h-9"
          onChange={handleInputChange}
          value={filters.amount || defaultFilters.amount}
        />
      </div>

      <div className="w-full sm:w-1/6">
        <label className="text-gray-300 font-bold">Transaction Date</label>
        <input
          type="date"
          name="date"
          className="w-full bg-white text-black pl-2 rounded-md h-9"
          onChange={handleInputChange}
          value={filters.date || defaultFilters.date}
        />
      </div>

      <div className="w-full sm:w-1/6">
        <label className="text-gray-300 font-bold">Created Date</label>
        <input
          type="date"
          name="createdDate"
          className="w-full bg-white text-black pl-2 rounded-md h-9"
          onChange={handleInputChange}
          value={filters.createdDate || ""}
        />
      </div>
    </div>
  );
};

export default TransactionFilter;
