import { useState } from "react";
import ExpensesVsIncomeBar from "./charts/ExpensesVsIncomeBar";
import ExpensesVsIncomeLine from "./charts/ExpensesVsIncomeLine";
import BasicPie from "./charts/BasicPie";
import ProgressBar from "./charts/ProgressBar";
import TransactionsList from "./TransactionsList";
import greenWave from "../assets/greenWave2.png";
import redWave from "../assets/redWave.png";
import plus from "../assets/plus.png";

const Dashboard = () => {
  const [bar, setBar] = useState(true);
  const [balance, setBalance] = useState(14500);
  const [maxExp, setMaxExp] = useState({ month: "June", amount: "1600" });
  const [maxInc, setMaxInc] = useState({ month: "April", amount: "2500" });

  const toggleChart = () => {
    setBar(!bar);
  };

  const d = new Date();
  let year = d.getFullYear();

  return (
    <div className="h-full flex flex-col">
      {/* Main grid layout */}
      <div className="grid grid-cols-6 gap-4 flex-grow">
        {/* Left Grid (Income & Expenses + Other items) */}
        <div className="col-span-4 grid grid-cols-4 gap-4 h-full">
          <div className="col-span-3 bg-[#161A40] p-4 text-white rounded-3xl flex flex-col">
            <div className="flex justify-between">
              <div>
                <h1 className="text-xl">Income & Expenses</h1>
                <h2>{year}</h2>
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
                  className="text-xs font-semibold border border-solid border-cyan-700"
                  onClick={toggleChart}
                >
                  {bar ? "Line Chart" : "Bar Chart"}
                </button>
              </div>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <div className="w-full h-full">
                {bar ? <ExpensesVsIncomeBar /> : <ExpensesVsIncomeLine />}
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
                <BasicPie />
              </div>
            </div>
          </div>

          <div className="col-span-2 bg-[#161A40] p-4 text-white rounded-3xl">
            <h1 className="text-xl">Sources Income</h1>
            <div className="flex-grow flex items-center justify-center">
              <div className="h-full max-w-full max-h-full">
                <BasicPie />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="col-span-4 bg-[#161A40] p-4 text-white rounded-3xl overflow-hidden text-center">
            <ProgressBar balance={balance} />
          </div>
        </div>

        {/* Right Grid (Sidebar) */}
        <div className="col-span-2 grid grid-rows-12 gap-4 h-full">
          <div className="row-span-3 bg-[#161A40] text-white rounded-3xl overflow-auto p-8">
            <div className="flex flex-col items-end gap-2">
              <h1 className="text-4xl">Available Balance</h1>
              <p className="text-6xl text-[#08D59C]">{balance}</p>
            </div>
          </div>
          <div className="row-span-8 bg-[#161A40] text-white rounded-3xl overflow-auto p-4 flex items-center">
            <TransactionsList />
          </div>
          <div className="row-span-1 bg-gradient-to-r from-purple-600 to-indigo-900 rounded-3xl overflow-auto flex justify-center items-center">
            <img src={plus} className=" max-h-12 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
