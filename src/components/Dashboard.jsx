import { useEffect, useState, useMemo } from "react";
import ExpensesVsIncomeBar from "./charts/ExpensesVsIncomeBar";
import ExpensesVsIncomeLine from "./charts/ExpensesVsIncomeLine";
import IncomePie from "./charts/IncomePie";
import ExpensesPie from "./charts/ExpensesPie";
import ProgressBar from "./charts/ProgressBar";
import TransactionsList from "./TransactionsList";
import NewEntryModal from "./NewEntryModal";
import greenWave from "../assets/greenWave2.png";
import redWave from "../assets/redWave.png";
import plus from "../assets/plus.png";
import { useOutletContext } from "react-router-dom";
import CalculateBalance from "./CalculateBalance";

const Dashboard = () => {
  const [isBarChart, setIsBarChart] = useState(true);
  const [balance, setBalance] = useState(0);
  const [maxInc, setMaxInc] = useState({});
  const [maxExp, setMaxExp] = useState({});

  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(null);

  const { transactions, addTransaction } = useOutletContext();

  useEffect(() => {
    console.log("Transactions updated in Dashboard:", transactions);
  }, [transactions]); // This should log whenever transactions state changes

  // Automatically set the default year to the latest year from transactions
  //this helps data load when component mounts without having to reselect year
  useEffect(() => {
    if (transactions.length > 0) {
      const years = transactions.map(({ date }) =>
        new Date(date).getFullYear()
      );
      const latestYear = Math.max(...years);
      setYear(latestYear);
    }
  }, [transactions]);

  // Memoize the unique years and transactions filtered by the selected year
  const [uniqueYears, yearlyTransactions] = useMemo(() => {
    const unique = Array.from(
      new Set(transactions.map(({ date }) => new Date(date).getFullYear()))
    );
    const filteredTransactions = year
      ? transactions.filter(
          (el) => new Date(el.date).getFullYear() === parseInt(year)
        )
      : [];
    return [unique, filteredTransactions];
  }, [transactions, year]);

  // Ensure data shows when the page first loads by triggering the initial year set
  useEffect(() => {
    if (uniqueYears.length > 0 && !year) {
      setYear(uniqueYears[0]); // Set the default year when the component mounts
    }
  }, [uniqueYears, year]);

  const toggleChart = () => {
    setIsBarChart(!isBarChart);
  };

  useEffect(() => {
    const { balance } = CalculateBalance(transactions);
    setBalance(balance); // Update the balance in state
  }, [transactions]);

  return (
    <div className="h-full flex flex-col">
      {/* Main grid layout */}
      <div className="grid grid-cols-6 gap-4 flex-grow">
        {/* Left Grid (Income & Expenses + Other items) */}
        <div className="col-span-4 grid grid-cols-4 gap-4 h-full">
          <div className="col-span-3 bg-[#161A40] p-4 text-white rounded-3xl flex flex-col ">
            <div className="flex justify-between">
              <div>
                <h1 className="text-xl">Income & Expenses</h1>
                <h2>
                  <select
                    id="year"
                    name="year"
                    aria-label="Select Year"
                    className="bg-[#161a40] border-b border-indigo-300 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                    value={year || ""}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Year
                    </option>
                    {uniqueYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </h2>
              </div>
              <div className="flex gap-6 items-center">
                <div className="flex gap-2 items-center">
                  <p className="text-xs">Expenses</p>
                  <div className="h-5 w-12 bg-[#F36712] rounded-md"></div>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-xs">Incomes</p>
                  <div className="h-5 w-12 bg-[#08D59C] rounded-md"></div>
                </div>
                <button
                  className="px-3 py-1 bg-[#293458] text-white text-sm font-semibold rounded-md hover:bg-cyan-800 transition-colors duration-200 w-24"
                  onClick={toggleChart}
                >
                  {isBarChart ? "Line Chart" : "Bar Chart"}
                </button>
              </div>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <div className="w-full h-full">
                {isBarChart ? (
                  <ExpensesVsIncomeBar
                    transactions={yearlyTransactions}
                    setMaxInc={setMaxInc}
                    setMaxExp={setMaxExp}
                  />
                ) : (
                  <ExpensesVsIncomeLine transactions={yearlyTransactions} />
                )}
              </div>
            </div>
          </div>

          {/* Other Grid Items */}
          <div className="col-span-1 bg-[#161A40] p-4 text-white rounded-3xl overflow-auto flex flex-col items-center justify-around gap-6">
            <div className="flex flex-col items-center">
              <p className="text-lg">Max. Income</p>
              <p className="text-3xl">{maxInc.amount}</p>
              <img src={greenWave} />
              <p className="text-lg">{maxInc.month}</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-lg">Max. Expenses</p>
              <p className="text-3xl">{maxExp.amount}</p>
              <img src={redWave} />
              <p className="text-lg">{maxExp.month}</p>
            </div>
          </div>

          <div className="col-span-2 bg-[#161A40] p-4 text-white rounded-3xl">
            <h1 className="text-xl">Sources Income</h1>
            <div className="flex-grow flex items-center justify-center">
              <div className="h-full max-w-full max-h-full">
                <IncomePie transactions={yearlyTransactions} />
              </div>
            </div>
          </div>

          <div className="col-span-2 bg-[#161A40] p-4 text-white rounded-3xl">
            <h1 className="text-xl">Sources Expenses</h1>
            <div className="flex-grow flex items-center justify-center">
              <div className="h-full max-w-full max-h-full">
                <ExpensesPie transactions={yearlyTransactions} />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="col-span-4 bg-[#161A40] p-4 text-white rounded-3xl overflow-hidden ">
            <ProgressBar balance={balance} />
          </div>
        </div>

        {/* Right Grid (Sidebar) */}
        <div className="col-span-2 flex flex-col gap-4 h-full justify-between">
          <div className="flex-3 text-white rounded-3xl overflow-auto p-8">
            <div className="">
              <h1 className="text-4xl text-right">Available Balance</h1>
              <p className="text-6xl text-[#08D59C] text-right">{balance}€</p>
            </div>
          </div>
          <div className="flex-8 bg-[#161A40] text-white rounded-3xl overflow-auto p-4 flex flex-col justify-center grow">
            <h1 className="text-xl">Recent Transactions</h1>
            <TransactionsList transactions={transactions} />
          </div>
          <div
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-900 rounded-3xl flex justify-center items-center max-h-12 cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            <img src={plus} className="max-h-12" />
          </div>
          <NewEntryModal
            open={open}
            setOpen={setOpen}
            addTransaction={addTransaction}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
