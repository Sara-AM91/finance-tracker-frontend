import TransactionFilter from "./TransactionFilter"; // Reuse the existing filter component

const FilterSidebar = ({
  toggleSidebar,
  isSidebarOpen,
  filters,
  setFilters,
}) => {
  return (
    isSidebarOpen && (
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
            type="expense"
          />
        </div>
      </div>
    )
  );
};

export default FilterSidebar;
