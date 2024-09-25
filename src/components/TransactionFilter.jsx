const TransactionFilter = ({ filters, setFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="flex flex-wrap justify-between p-3 bg-[#161A40] rounded-3xl shadow-md">
      <div className="w-full sm:w-1/6">
        <label className="text-gray-300 font-bold">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Search by title"
          className="w-full bg-white text-black p-2 rounded-md"
          onChange={handleInputChange}
          value={filters.title}
        />
      </div>

      <div className="w-full sm:w-1/6">
        <label className="text-gray-300 font-bold">Category</label>
        <select
          name="category"
          className="w-full bg-white text-black p-2 rounded-md"
          onChange={handleInputChange}
          value={filters.category}
        >
          <option value="">All</option>
          <option value="Shopping">Shopping</option>
          <option value="Auto">Auto</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
        </select>
      </div>

      <div className="w-full sm:w-1/6">
        <label className="text-gray-300 font-bold">Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Search by amount"
          className="w-full bg-white text-black p-2 rounded-md"
          onChange={handleInputChange}
          value={filters.amount}
        />
      </div>

      <div className="w-full sm:w-1/6">
        <label className="text-gray-300 font-bold">Date</label>
        <input
          type="date"
          name="date"
          className="w-full bg-white text-black p-2 rounded-md"
          onChange={handleInputChange}
          value={filters.date}
        />
      </div>

      <div className="w-full sm:w-1/6">
        <label className="text-gray-300 font-bold">Created Date</label>
        <input
          type="date"
          name="createdDate"
          className="w-full bg-white text-black p-2 rounded-md"
          onChange={handleInputChange}
          value={filters.createdDate}
        />
      </div>
    </div>
  );
};

export default TransactionFilter;
