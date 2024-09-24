//import { Bar } from "react-chartjs-2"; // Assuming you're using react-chartjs-2

// const ExpensesCategoryBar = ({ categories }) => {
//   const data = {
//     labels: categories.map((cat) => cat.name),
//     datasets: [
//       {
//         label: "Expenses (%)",
//         data: categories.map((cat) => cat.percentage),
//         backgroundColor: "#F36712", // Color of bars
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//       },
//     },
//   };

//   return <Bar data={data} options={options} />;
// };

// export default ExpensesCategoryBar;
import React from "react";

const categories = [
  { name: "Bills", percentage: 45, amount: 500, color: "bg-orange-500" },
  { name: "Shopping", percentage: 30, amount: 250, color: "bg-yellow-400" },
  { name: "Health", percentage: 15, amount: 150, color: "bg-green-500" },
  { name: "Home", percentage: 10, amount: 100, color: "bg-blue-600" },
  { name: "Auto", percentage: 20, amount: 300, color: "bg-red-500" },
  { name: "Food", percentage: 25, amount: 350, color: "bg-green-700" },
  {
    name: "Entertainment",
    percentage: 15,
    amount: 200,
    color: "bg-purple-400",
  },
];

const ExpensesCategoryBar = () => {
  return (
    <div className="p-4 bg-[#161A40] text-white rounded-3xl">
      <h2 className="text-xl mb-4">Expense Details</h2>
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center gap-4">
            {/* Icon and Category Name */}
            <div className="flex items-center gap-2 w-1/5">
              {/* Icon (placeholder, replace with your icons) */}
              <div className="w-8 h-8 flex items-center justify-center">
                <span>🔍</span> {/* You can add actual icons here */}
              </div>
              <div className="w-full">{category.name}</div>
            </div>

            {/* Bar and Amount */}
            <div className="flex-grow">
              {/* Bar container */}
              <div className="relative w-full h-4 bg-gray-700 rounded-full mb-1">
                <div
                  className={`absolute h-4 rounded-full ${category.color}`}
                  style={{ width: `${category.percentage}%` }}
                >
                  <span className="absolute right-2 text-xs font-semibold text-white">
                    {category.percentage}%
                  </span>
                </div>
              </div>
              {/* Amount under the bar */}
              <div className="text-sm text-gray-300">${category.amount}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Total Transactions & Amount */}
      <div className="flex justify-between mt-6">
        <div>
          Number of transactions: <span>15</span>
        </div>
        <div>
          Total expense amount: <span>$1,400</span>
        </div>
      </div>
    </div>
  );
};

export default ExpensesCategoryBar;
