import { useState, useEffect } from "react";

const TransactionFilter = ({
  filters = {},
  setFilters,
  type,
  showTypeFilter = false,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        //Ensure the type is defined before fetching categories
        const selectedType = filters.type || type;
        if (!selectedType) {
          setCategories([]); //Clear categories if no type is selected
          return;
        }

        const response = await fetch(
          `https://finance-tracker-api-eunu.onrender.com/categories/global?categoryType=${selectedType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        //Ensure "Other" is at the end of the array
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
  }, [filters.type]); //Re-fetch categories when the selected type changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value || "",
      ...(name === "type" && { category: "" }), //Reset category when type changes
    }));
  };

  //Destructure filters with default values
  const {
    title = "",
    category = "",
    amount = "",
    date = "",
    createdDate = "",
    type: selectedType = "",
  } = filters;

  //Set the size class for inputs depending on the showTypeFilter prop
  const inputClass = showTypeFilter
    ? "w-full sm:w-[8%] md:w-[10%] lg:w-[15%]" // Smaller custom size if showTypeFilter is true
    : "w-full sm:w-[12%] md:w-[15%] lg:w-[18%]"; // Larger custom size if showTypeFilter is false
  return (
    <div className="flex flex-wrap flex-col lg:flex-row justify-between p-3 bg-[#161A40] rounded-3xl shadow-md">
      {/* Type Filter (conditionally displayed) */}
      {showTypeFilter && (
        <div className={inputClass}>
          <label className="text-gray-300 font-bold">Type</label>
          <select
            name="type"
            className="w-full bg-white text-black pl-2 rounded-md h-9"
            onChange={handleInputChange}
            value={selectedType}
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      )}

      {/* Title Filter */}
      <div className={inputClass}>
        <label className="text-gray-300 font-bold">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Search by title"
          className="w-full bg-white text-black pl-2 rounded-md h-9"
          onChange={handleInputChange}
          value={title}
        />
      </div>

      {/* Category Filter */}
      <div className={inputClass}>
        <label className="text-gray-300 font-bold">Category</label>
        <select
          name="category"
          className="w-full bg-white text-black pl-2 rounded-md h-9"
          onChange={handleInputChange}
          value={category}
          disabled={!selectedType && showTypeFilter} // Disable if type is not selected and showTypeFilter is true
        >
          <option value="">All</option>
          {categories.length > 0 ? (
            categories.map((category) => (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            ))
          ) : (
            <option value="">Select a type to view categories</option>
          )}
        </select>
      </div>

      {/* Amount Filter */}
      <div className={inputClass}>
        <label className="text-gray-300 font-bold">Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Search by amount"
          className="w-full bg-white text-black pl-2 rounded-md h-9"
          onChange={handleInputChange}
          value={amount}
        />
      </div>

      {/* Transaction Date Filter */}
      <div className={inputClass}>
        <label className="text-gray-300 font-bold">Transaction Date</label>
        <input
          type="date"
          name="date"
          className="w-full bg-white text-black pl-2 rounded-md h-9"
          onChange={handleInputChange}
          value={date}
        />
      </div>

      {/* Created Date Filter */}
      <div className={inputClass}>
        <label className="text-gray-300 font-bold">Created Date</label>
        <input
          type="date"
          name="createdDate"
          className="w-full bg-white text-black pl-2 rounded-md h-9"
          onChange={handleInputChange}
          value={createdDate}
        />
      </div>
    </div>
  );
};

export default TransactionFilter;
