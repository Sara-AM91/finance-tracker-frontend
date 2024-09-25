import React from "react";

const TransactionFilter = ({ filters, setFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-[#161A40] rounded-lg shadow-md">
      <div className="w-full sm:w-1/5">
        <label className="text-gray-300">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Search by title"
          className="w-full bg-white text-black p-2 rounded-md"
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full sm:w-1/5">
        <label className="text-gray-300">Category</label>
        <select
          name="category"
          className="w-full bg-white text-black p-2 rounded-md"
          onChange={handleInputChange}
        >
          <option value="">All</option>
          <option value="Shopping">Shopping</option>
          <option value="Auto">Auto</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
        </select>
      </div>
      <div className="w-full sm:w-1/5">
        <label className="text-gray-300">Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Search by amount"
          className="w-full bg-white text-black p-2 rounded-md"
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full sm:w-1/5">
        <label className="text-gray-300">Date</label>
        <input
          type="date"
          name="date"
          className="w-full bg-white text-black p-2 rounded-md"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default TransactionFilter;
