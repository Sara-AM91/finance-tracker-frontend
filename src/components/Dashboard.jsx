import { useEffect, useState, useMemo, useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import { AuthContext } from "../contexts/AuthContext";

import { Link, useOutletContext } from "react-router-dom";
import ExpensesVsIncomeBar from "./charts/ExpensesVsIncomeBar";
import ExpensesVsIncomeLine from "./charts/ExpensesVsIncomeLine";
import IncomePie from "./charts/IncomePie";
import ExpensesPie from "./charts/ExpensesPie";
import ProgressBar from "./charts/ProgressBar";
import TransactionsList from "./TransactionsList";
import NewEntryModal from "./NewEntryModal";
import greenWave from "../assets/greenWave2.png";
import redWave from "../assets/redWave2.png";
import plus from "../assets/plus.png";
//import { useOutletContext } from "react-router-dom";
import CalculateBalance from "../utils/CalculateBalance";

const Dashboard = () => {
  const { transactions, addTransaction, loading, error } =
    useContext(TransactionContext);
  const { user } = useContext(AuthContext);
  const { isMobile } = useOutletContext();

  const [isBarChart, setIsBarChart] = useState(false);
  const [balance, setBalance] = useState(0);
  const [maxInc, setMaxInc] = useState({});
  const [maxExp, setMaxExp] = useState({});
  const [animate, setAnimate] = useState(false);
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(null);

  //const { addTransaction } = useOutletContext();

  // Automatically set the default year to the latest year from transactions
  //this helps data load when component mounts without having to reselect year

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

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

  useEffect(() => {
    if (year) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 500); // Animation duration

      return () => clearTimeout(timer); // Cleanup
    }
  }, [year]);

  const [isMedium, setIsMedium] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMedium(window.innerWidth <= 1296);
    };

    // Call the function immediately to ensure the correct screen size is detected
    handleResize();

    // Add event listener to handle resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return !isMedium ? (
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
                    className="bg-[#161a40] border-b border-indigo-300 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 mb-2"
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
                  <ExpensesVsIncomeLine
                    transactions={yearlyTransactions}
                    setMaxInc={setMaxInc}
                    setMaxExp={setMaxExp}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Other Grid Items */}
          <div className="col-span-1 bg-[#161A40] p-4 text-white rounded-3xl overflow-auto flex flex-col items-center justify-around gap-6">
            <div className="flex flex-col items-center">
              <p className="text-lg">Max. Income</p>
              <p className="text-3xl">{maxInc.amount}€</p>
              <div className={animate ? "swipe swipe--delay" : ""}>
                <img src={greenWave} />
              </div>

              <p className="text-lg">{maxInc.month}</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-lg">Max. Expenses</p>
              <p className="text-3xl">{maxExp.amount}€</p>
              <div className={animate ? "swipe swipe--delay" : ""}>
                <img src={redWave} className=" my-3" alt="Red Wave" />
              </div>
              <p className="text-lg">{maxExp.month}</p>
            </div>
          </div>

          <div className="col-span-2 bg-[#161A40] p-4 text-white rounded-3xl">
            <h1 className="text-xl">Top 5 Sources Income</h1>
            <p className="text-left text-base text-gray-400">
              Here you can view your top categories for income
            </p>
            <div className="flex-grow flex items-center justify-center">
              <div className="h-full max-w-full max-h-full">
                <IncomePie transactions={yearlyTransactions} />
              </div>
            </div>
          </div>

          <div className="col-span-2 bg-[#161A40] p-4 text-white rounded-3xl">
            <h1 className="text-xl">Top 5 Sources Expenses</h1>
            <p className="text-left text-base text-gray-400">
              Here you can view your top categories for expenses
            </p>
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
          <div className="flex-8 bg-[#161A40] text-white rounded-3xl overflow-auto p-4 flex flex-col grow">
            <h1 className="text-xl mb-2">Recent Transactions</h1>
            <div className="flex flex-col justify-center grow">
              <TransactionsList transactions={transactions} />
            </div>

            <Link to="/transactions-list" className="self-start">
              <button className="bg-gradient-to-r from-cyan-500 to-teal-400 text-white py-2 px-4 rounded-lg text-base mx-4 mb-4">
                View All
              </button>
            </Link>
          </div>
          {/*} <div
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-900 rounded-3xl flex justify-center items-center max-h-12 cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            <img src={plus} className="max-h-12" />
          </div>*/}
          <NewEntryModal
            open={open}
            setOpen={setOpen}
            addTransaction={addTransaction}
          />
        </div>
      </div>
      <button
        className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl fixed bottom-10 right-10"
        onClick={() => {
          setOpen(true);
        }}
      >
        +
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="col-span-1 sm:col-span-4">
        <div className="text-white rounded-3xl overflow-auto p-4 sm:p-8">
          <h1 className="text-4xl text-right">Available Balance</h1>
          <p className="text-6xl text-[#08D59C] text-right">{balance}€</p>
        </div>
      </div>
      <div className="col-span-1 sm:col-span-4 lg:col-span-3 bg-[#161A40] p-2 md:p-4 text-white rounded-3xl">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl">Income & Expenses</h1>
            <h2>
              <select
                id="year"
                name="year"
                aria-label="Select Year"
                className="bg-[#161a40] border-b border-indigo-300 text-white text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 mb-2"
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
          <div className="grid-rows-2 grid gap-2 sm:gap-6 items-center">
            <div className="flex gap-2">
              <div className="flex gap-2 items-center">
                <p className="text-xs">Expenses</p>
                <div className="h-5 w-12 bg-[#F36712] rounded-md"></div>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-xs">Incomes</p>
                <div className="h-5 w-12 bg-[#08D59C] rounded-md"></div>
              </div>
            </div>
            <button
              className="px-3 py-1 bg-[#293458] text-white text-sm font-semibold rounded-md hover:bg-cyan-800 transition-colors duration-200 w-24 justify-self-end"
              onClick={toggleChart}
            >
              {isBarChart ? "Line Chart" : "Bar Chart"}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full h-[300px] md:h-[400px]">
            {isBarChart ? (
              <ExpensesVsIncomeBar
                transactions={yearlyTransactions}
                setMaxInc={setMaxInc}
                setMaxExp={setMaxExp}
              />
            ) : (
              <ExpensesVsIncomeLine
                transactions={yearlyTransactions}
                setMaxInc={setMaxInc}
                setMaxExp={setMaxExp}
              />
            )}
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 col-span-1 sm:col-span-4 bg-[#161A40] p-2 md:p-4 text-white rounded-3xl flex flex-row lg:flex-col justify-around">
        <div className="flex flex-col items-center">
          <p className="text-lg">Max. Income</p>
          <p className="text-3xl">{maxInc.amount}€</p>
          <div className={animate ? "swipe swipe--delay" : ""}>
            <img src={greenWave} />
          </div>
          <p className="text-lg">{maxInc.month}</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-lg">Max. Expenses</p>
          <p className="text-3xl">{maxExp.amount}€</p>
          <div className={animate ? "swipe swipe--delay" : ""}>
            <img src={redWave} className=" my-3" alt="Red Wave" />
          </div>
          <p className="text-lg">{maxExp.month}</p>
        </div>
      </div>
      <div className="col-span-1 sm:col-span-4 md:col-span-2 bg-[#161A40] p-4 text-white rounded-3xl">
        <h1 className="text-xl">Sources Income</h1>
        <div className="flex-grow flex items-center justify-center">
          <div className="h-full max-w-full max-h-full">
            <IncomePie transactions={yearlyTransactions} />
          </div>
        </div>
      </div>

      <div className="col-span-1 sm:col-span-4 md:col-span-2 bg-[#161A40] p-4 text-white rounded-3xl">
        <h1 className="text-xl">Sources Expenses</h1>
        <div className="flex-grow flex items-center justify-center">
          <div className="h-full max-w-full max-h-full">
            <ExpensesPie transactions={yearlyTransactions} />
          </div>
        </div>
      </div>
      <div className="col-span-1 sm:col-span-4 bg-[#161A40] text-white rounded-3xl overflow-auto p-4 flex flex-col grow">
        <h1 className="text-xl mb-2">Recent Transactions</h1>
        <div className="flex flex-col justify-center grow">
          <TransactionsList transactions={transactions} />
        </div>

        <Link to="/transactions-list" className="self-end">
          <button className="bg-gradient-to-r from-cyan-500 to-teal-400 text-white py-2 px-4 rounded-lg text-base mx-4 mb-4">
            View All
          </button>
        </Link>
      </div>
      <div className="col-span-1 sm:col-span-4 bg-[#161A40] p-4 text-white rounded-3xl overflow-hidden ">
        <ProgressBar balance={balance} />
      </div>
      <button
        className="bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl fixed bottom-10 right-10"
        onClick={() => {
          setOpen(true);
        }}
      >
        +
      </button>
      <NewEntryModal
        open={open}
        setOpen={setOpen}
        addTransaction={addTransaction}
      />
    </div>
  );
};

export default Dashboard;
