import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { useTransactionContext } from "../contexts/TransactionContext"; // Import context
import { useAlert } from "../contexts/AlertContext"; // Import the useAlert hook

const NewEntryModal = ({ open, setOpen, defaultCategory, addTransaction }) => {
  const { user } = useOutletContext();
  const [form, setForm] = useState({
    user: user._id,
    title: "",
    type: defaultCategory ? defaultCategory.toLowerCase() : "",
    category: "",
    customCategoryTitle: "", // Added for custom category title
    description: "",
    amount: "",
    date: "",
    invoice: "",
  });

  const { showAlert } = useAlert();
  const { refreshTransactions } = useTransactionContext();

  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCustomCategoryField, setShowCustomCategoryField] = useState(false); // State to control the visibility of custom category input

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (form.type) {
      const fetchCategories = async () => {
        try {
          const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
          let headers = {};

          if (token) {
            headers = {
              Authorization: `Bearer ${token}`,
            };
          } else {
            console.error("No token found, user is not logged in.");
            return;
          }

          const globalResponse = await fetch(
            `http://localhost:5000/categories/global?categoryType=${form.type}`
          );
          const globalCategories = await globalResponse.json();

          let userCategories = [];

          if (token) {
            const userResponse = await fetch(
              `http://localhost:5000/categories/filter?categoryType=${form.type}`,
              { headers }
            );

            if (userResponse.status === 401) {
              console.error("User not authorized to fetch categories.");
            } else {
              userCategories = await userResponse.json();
            }
          }

          const allCategories = [
            ...globalCategories,
            ...userCategories.filter(
              (userCategory) =>
                !globalCategories.some(
                  (globalCategory) => globalCategory._id === userCategory._id
                )
            ),
          ];

          const sortedCategories = [
            ...allCategories.filter((category) => category.title !== "Other"),
            ...allCategories.filter((category) => category.title === "Other"),
          ];

          setCategories(sortedCategories);
        } catch (error) {
          console.error("Failed to fetch categories", error);
          setCategories([]);
        }
      };

      fetchCategories();
    }
  }, [form.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Detect when "Other" is selected
    if (name === "category") {
      const selectedCategory = categories.find(
        (category) => category._id === value
      );
      if (selectedCategory && selectedCategory.title === "Other") {
        setShowCustomCategoryField(true);
      } else {
        setShowCustomCategoryField(false);
        // Reset custom category title when "Other" is deselected
        setForm((prev) => ({ ...prev, customCategoryTitle: "" }));
      }
    }
  };

  useEffect(() => {
    if (defaultCategory) {
      setForm((prev) => ({ ...prev, type: defaultCategory.toLowerCase() }));
    }
  }, [defaultCategory]);

  const onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      setForm((prev) => ({ ...prev, amount: amount }));
    }
  };

  const filteredCategories = categories.filter(
    (category) => category.categoryType === form.type.toLowerCase()
  );

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
    if (!token) {
      showAlert("error", "No token found, user is not authenticated");
      return;
    }

    let categoryId = form.category; // Initially use the selected category id

    if (showCustomCategoryField && form.customCategoryTitle) {
      // Create the new category
      try {
        const categoryData = {
          title: form.customCategoryTitle,
          categoryType: form.type,
        };
        const categoryResponse = await fetch(
          "http://localhost:5000/categories",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(categoryData),
          }
        );
        if (!categoryResponse.ok) {
          showAlert(
            "error",
            `Failed to create category. Status: ${categoryResponse.status}`
          );
          throw new Error(`HTTP error! status: ${categoryResponse.status}`);
        }
        const newCategory = await categoryResponse.json();
        categoryId = newCategory._id; // Use the new category's id
      } catch (error) {
        console.error("Error creating category:", error);
        showAlert("error", "Error creating category. Please try again.");
        return; // Stop submission if category creation fails
      }
    }

    // Proceed to create transaction
    const formData = new FormData();
    formData.append("user", form.user);
    formData.append("type", form.type);
    formData.append("category", categoryId);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("amount", form.amount);
    formData.append("date", form.date);
    formData.append("invoice", form.invoice);

    try {
      const res = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        showAlert(
          "error",
          `Failed to create transaction. Status: ${res.status}`
        );
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      addTransaction(data.transaction);

      refreshTransactions();
      setOpen(false);
      showAlert("success", "Transaction successfully created!");
    } catch (error) {
      console.error("Error creating transaction:", error);
      showAlert("error", "Error creating transaction. Please try again.");
    }
  };

  return (
    <div className="relative z-10">
      <div
        transition="true"
        className="fixed inset-0 bg-blue-950 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="w-[420px]">
            <div
              transition="true"
              className="relative transform overflow-hidden rounded-xl text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-[#161a40] border border-indigo-400 rounded-xl relative overflow-hidden pb-2">
                <div className="absolute top-0 left-0 w-full">
                  {/* SVG Wave Background */}
                  <svg
                    viewBox="0 0 1440 320"
                    className="w-full h-[100px]"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="waveGradient"
                        gradientTransform="rotate(1)"
                      >
                        <stop offset="0%" stopColor="#7F3BCB" />
                        <stop offset="100%" stopColor="#633FD7" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#waveGradient)"
                      fillOpacity="1"
                      d="M0,320L48,293.3C96,267,192,213,288,202.7C384,192,480,224,576,234.7C672,245,768,235,864,218.7C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    />
                  </svg>
                </div>

                <div className="px-4 pb-4 pt-12 sm:p-6 sm:pb-4 relative z-10 mt-6 sm:mt-16">
                  <div className="sm:flex sm:items-start justify-center">
                    <div className="mt-3 text-center sm:mx-6 sm:mt-0 sm:text-left">
                      <div className="text-lg font-semibold leading-6 text-white">
                        Add New Transaction
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Please fill out the details below.
                        </p>
                        <form className="mt-4" onSubmit={handleSubmit}>
                          <div className="flex justify-between gap-6 pb-4">
                            <div className="flex-grow">
                              <label
                                htmlFor="type"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              ></label>
                              <select
                                id="type"
                                name="type"
                                onChange={(e) => {
                                  handleChange(e);
                                  setForm((prev) => ({
                                    ...prev,
                                    category: "",
                                  }));
                                }}
                                value={form.type}
                                disabled={!!defaultCategory}
                                required
                                className="bg-[#161a40] border-b border-indigo-300 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                              >
                                <option value="">Choose a Type</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                              </select>
                            </div>
                            {/* Select Category based on Type */}
                            <div className="flex-grow">
                              <label
                                htmlFor="category"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              ></label>
                              <select
                                id="category"
                                name="category"
                                className="bg-[#161a40] border-b border-indigo-300 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                value={form.category}
                                onChange={handleChange}
                                required
                              >
                                <option value="">Select Category</option>
                                {categories.length > 0 &&
                                  categories.map((category, index) => (
                                    <option
                                      key={`${category._id}-${index}`}
                                      value={category._id}
                                    >
                                      {category.title}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>

                          {/* Show custom category input when "Other" is selected */}
                          {showCustomCategoryField && (
                            <input
                              id="customCategoryTitle"
                              name="customCategoryTitle"
                              className="w-full p-2 mb-4 bg-[#161a40] border-b border-indigo-300 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block placeholder-gray-400"
                              placeholder="Enter your category"
                              value={form.customCategoryTitle}
                              onChange={handleChange}
                              required
                            />
                          )}

                          <input
                            id="title"
                            name="title"
                            className="w-full p-2 mb-4 bg-[#161a40] border-b border-indigo-300 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block placeholder-gray-400"
                            placeholder="Title"
                            value={form.title}
                            onChange={handleChange}
                            required
                          />

                          <input
                            id="amount"
                            name="amount"
                            type="text"
                            className="p-2 mb-4 bg-[#161a40] border-b border-indigo-300 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block placeholder-gray-400"
                            placeholder="Amount"
                            value={form.amount}
                            onChange={onAmountChange}
                            required
                            min="0"
                            step="0.01"
                          />
                          <input
                            id="date"
                            name="date"
                            type="date"
                            className="p-2 mb-4 bg-[#161a40] border-b border-indigo-300 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block placeholder-gray-400"
                            style={{
                              backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 24 24'%3E%3Cpath d='M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z'/%3E%3C/svg%3E\")",
                              backgroundPosition: "right 10px center",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "20px 20px",
                            }}
                            placeholder="Date"
                            value={form.date}
                            onChange={handleChange}
                            required
                          />

                          <label
                            htmlFor="description"
                            className="block mt-7 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            className="w-full p-2 bg-[#161a40] border rounded-lg border-indigo-300 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block placeholder-gray-400"
                            placeholder="Add a short description of your transaction"
                            value={form.description}
                            onChange={handleChange}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pt-3 pb-6 sm:flex sm:flex-row-reverse sm:px-6 relative z-10">
                  <button
                    disabled={
                      !form.category ||
                      !form.title ||
                      !form.type ||
                      !form.date ||
                      !form.amount ||
                      (showCustomCategoryField && !form.customCategoryTitle) // Disable if custom category is required but empty
                    }
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm  sm:ml-3 sm:w-auto ${
                      !form.category ||
                      !form.title ||
                      !form.type ||
                      !form.date ||
                      !form.amount ||
                      (showCustomCategoryField && !form.customCategoryTitle)
                        ? "bg-gradient-to-r from-cyan-500 to-teal-400 opacity-40 shadow-inner text-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-500 to-teal-400 text-white"
                    }`}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-gradient-to-r from-orange-500 to-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEntryModal;
