import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center bg-[#494951] p-1 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search recent expenses..."
        value={query}
        onChange={handleInputChange}
        className="w-full bg-transparent text-gray-300 p-2 outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-orange-600 text-white px-4 py-2 rounded-md ml-2"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
