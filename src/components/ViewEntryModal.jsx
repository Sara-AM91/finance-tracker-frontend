import { useEffect, useState } from "react";
import { formatDateForInput } from "../utils/dateUtils";
import { useTransactionContext } from "../contexts/TransactionContext"; // Import context

const ViewEntryModal = ({ open, setOpen, entry, onEdit }) => {
  //Call the useTransactionContext hook at the top level
  const { refreshTransactions } = useTransactionContext();

  const [form, setForm] = useState({
    user: entry?.user || "",
    title: entry?.title || "",
    type: entry?.type || "",
    category: entry?.category?.title || "",
    description: entry?.description || "",
    amount: entry?.amount || "",
    date: entry?.date || "",
    invoice: entry?.invoice || "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (open && entry) {
      setForm({
        user: entry.user || "",
        title: entry.title || "",
        type: entry.type || "",
        category: entry.category?.title || "",
        description: entry.description || "",
        amount: entry.amount || "",
        date: formatDateForInput(entry?.date),
        invoice: entry.invoice || "",
      });
    }
  }, [entry, open]);

  if (!open) return null;

  return (
    <div className="relative z-10">
      <div
        transition="true"
        className="fixed inset-0 bg-blue-950 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className=" w-[420px]">
            <div
              transition="true"
              className="relative transform overflow-hidden rounded-xl text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-[#161a40] border border-indigo-400 rounded-xl relative overflow-hidden pb-2">
                <div className="absolute top-0 left-0 w-full">
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
                        View Transaction
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {/* Please fill out the details below. */}
                        </p>
                        <form className="mt-4">
                          <div className="flex justify-between gap-6 pb-4">
                            <div className="flex-grow">
                              <label
                                htmlFor="type"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              ></label>
                              <select
                                id="type"
                                name="type"
                                value={form.type}
                                disabled
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
                                disabled
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

                          <input
                            id="title"
                            name="title"
                            className="w-full p-2 mb-4 bg-[#161a40] border-b border-indigo-300 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block placeholder-gray-400"
                            placeholder="Title"
                            value={form.title}
                            disabled
                            required
                          />

                          <input
                            id="amount"
                            name="amount"
                            type="text"
                            className="p-2 mb-4 bg-[#161a40] border-b border-indigo-300 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block placeholder-gray-400"
                            placeholder="Amount"
                            value={form.amount}
                            disabled
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
                            disabled
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
                            disabled
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pt-3 pb-6 sm:flex sm:flex-row-reverse sm:px-6 relative z-10">
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm  sm:ml-3 sm:w-auto ${
                      !form.category ||
                      !form.title ||
                      !form.type ||
                      !form.date ||
                      !form.amount
                        ? "bg-gradient-to-r from-cyan-500 to-teal-400 opacity-40 shadow-inner text-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-500 to-teal-400 text-white"
                    }`}
                    onClick={onEdit}
                  >
                    Edit
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

export default ViewEntryModal;
