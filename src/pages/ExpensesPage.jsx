// import React from "react";
// import { useNavigate } from "react-router-dom";

// const categories = [
//   { name: "Bills", percentage: 25, icon: "🧾" },
//   { name: "Shopping", percentage: 25, icon: "🛒" },
//   { name: "Health", percentage: 25, icon: "❤️" },
//   { name: "Home", percentage: 25, icon: "🏠" },
//   { name: "Auto", percentage: 25, icon: "🚗" },
//   { name: "Food", percentage: 25, icon: "🍕" },
//   { name: "Entertainment", percentage: 25, icon: "🎮" },
// ];

// const ExpensesPage = () => {
//   const navigate = useNavigate();

//   const handleCategoryClick = (category) => {
//     navigate(`/expenses/${category}`);
//   };

//   return (
//     <div className="expenses-page p-4 relative min-h-screen bg-gradient-to-b from-[#121428] to-[#000036]">
//       <h1 className="text-2xl font-bold text-white mb-4">Expense Details</h1>
//       <p className="text-2xl font-bold text-white mb-4">
//         Here you can see a breakdown of your expenses by category.
//       </p>
//       <div className="expense-list mt-4">
//         {categories.map((cat) => (
//           <div
//             key={cat.name}
//             className="expense-category flex items-center mb-2 cursor-pointer"
//             onClick={() => handleCategoryClick(cat.name.toLowerCase())}
//           >
//             <span className="icon mr-2">{cat.icon}</span>
//             <span className="name w-1/4 text-white">{cat.name}</span>
//             <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
//               <div
//                 className="bg-orange-500 h-2.5 rounded-full"
//                 style={{ width: `${cat.percentage}%` }}
//               />
//             </div>
//             <span className="percentage ml-4">{cat.percentage}%</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ExpensesPage;

// const categories = [
//   { name: "Bills", percentage: 25, icon: "🧾", color: "bg-orange-500" },
//   { name: "Shopping", percentage: 25, icon: "🛒", color: "bg-orange-500" },
//   { name: "Health", percentage: 25, icon: "❤️", color: "bg-orange-500" },
//   { name: "Home", percentage: 25, icon: "🏠", color: "bg-orange-500" },
//   { name: "Auto", percentage: 25, icon: "🚗", color: "bg-orange-500" },
//   { name: "Food", percentage: 25, icon: "🍕", color: "bg-orange-500" },
//   { name: "Entertainment", percentage: 25, icon: "🎮", color: "bg-orange-500" },
// ];

// const ExpensesPage = () => {
//   return (
//     <div className="h-screen w-[1230px] flex flex-col bg-[#161A40] text-white p-4">
//       <div className="p-4 bg-[#161A40] text-white rounded-3xl w-full h-full">
//         <h2 className="text-2xl mb-4">Expense Details</h2>
//         <p className="mb-4">
//           Here you can get a better overview of all your spendings, look at the
//           details of each of your expenses, transactions, and add a new
//           transaction entry.
//         </p>

//         <div className="space-y-4 flex-grow">
//           {categories.map((category) => (
//             <div key={category.name} className="flex items-center gap-4">
//               {/* Icon and Category Name */}
//               <div className="flex items-center gap-4 w-1/5">
//                 {/* Icon */}
//                 <div className="w-8 h-8 flex items-center justify-center text-2xl">
//                   {category.icon}
//                 </div>
//                 {/* Category Name */}
//                 <span>{category.name}</span>
//               </div>

//               {/* Bar and Percentage */}
//               <div className="flex-grow">
//                 {/* Bar container */}
//                 <div className="relative w-full h-4 bg-gray-700 rounded-full">
//                   <div
//                     className={`absolute h-4 rounded-full ${category.color}`}
//                     style={{ width: `${category.percentage}%` }}
//                   >
//                     <span className="absolute right-2 text-xs font-semibold text-white">
//                       {category.percentage}%
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Total Transactions */}
//         <div className="flex justify-between items-center mt-6">
//           <div className="text-lg">Total Transactions</div>
//           <div className="bg-gray-800 text-white text-lg py-1 px-4 rounded-full">
//             15
//           </div>
//           <button className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl">
//             +
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

//export default ExpensesPage;

const categories = [
  {
    name: "Bills",
    percentage: 25.9,
    amount: "362,00",
    icon: "🧾",
    color: "bg-customOrange",
  },
  {
    name: "Shopping",
    percentage: 17.2,
    amount: "241,00",
    icon: "🛒",
    color: "bg-customeYellow",
  },
  {
    name: "Health",
    percentage: 12.0,
    amount: "168,00",
    icon: "❤️",
    color: "bg-customeLightGreen",
  },
  {
    name: "Home",
    percentage: 9.2,
    amount: "129,00",
    icon: "🏠",
    color: "bg-customeDarkBlue",
  },
  {
    name: "Auto",
    percentage: 9.1,
    amount: "128,00",
    icon: "🚗",
    color: "bg-customeRed",
  },
  {
    name: "Food",
    percentage: 8.6,
    amount: "120,00",
    icon: "🍕",
    color: "bg-customeDarkGreen",
  },
  {
    name: "Entertainment",
    percentage: 5,
    amount: "25,00",
    icon: "🎮",
    color: "bg-customePink",
  },
];

const ExpensesPage = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-[#161A40] text-white p-4 mr-10 rounded-3xl overflow-hidden">
      <div className="p-4 bg-[#161A40] text-white rounded-3xl w-full flex-grow overflow-hidden relative">
        <h2 className="text-3xl mb-4">Expense Details</h2>
        <p className="mb-4 text-2xl ">
          Here you can get a better overview of all your spendings, look at the
          details of each of your expenses, transactions, and add a new
          transaction entry.
        </p>

        <div className="space-y-4 mt-20 overflow-hidden">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center gap-4">
              {/* Icon and Category Name */}
              <div className="flex items-center gap-4 w-1/5">
                {/* Icon */}
                <div className="w-8 h-8 flex items-center justify-center text-2xl">
                  {category.icon}
                </div>
                {/* Category Name */}
                <span>{category.name}</span>
              </div>

              {/* Bar and Percentage */}
              <div className="flex-grow">
                {/* Bar container */}
                <div className="relative w-full h-4 bg-gray-700 rounded-full">
                  <div
                    className={`absolute h-4 rounded-full ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  >
                    <span className="absolute right-2 text-xs font-semibold text-white">
                      {category.percentage}%
                    </span>
                  </div>
                </div>
                <span className="absolute text-xs font-semibold text-white">
                  {category.amount}$
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total Transactions */}
        <div className="flex items-center mt-6">
          <div className="text-lg">Total Transactions</div>
          <div className="bg-gray-800 text-white text-lg py-1 px-4 rounded-full ml-6">
            15
          </div>
        </div>
        <button className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl absolute bottom-10 right-10">
          +
        </button>
      </div>
    </div>
  );
};

export default ExpensesPage;
