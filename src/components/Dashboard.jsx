import { useState } from "react";
import ExpensesVsIncomeBar from "./charts/ExpensesVsIncomeBar";
import ExpensesVsIncomeLine from "./charts/ExpensesVsIncomeLine";
import ExpSourcesPie from "./charts/ExpSourcesPie";

const Dashboard = () => {
  const [bar, setBar] = useState(true);
  const toggleChart = () => {
    setBar(!bar);
  };

  const d = new Date();
  let year = d.getFullYear();

  return (
    <div className="grid grid-cols-6 gap-4 p-4 w-full h-full">
      <div className="col-span-4 grid grid-cols-4 gap-4 h-full">
        <div className="col-span-3 bg-[#161A40] p-4 text-white rounded-lg flex flex-col h-full">
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl">Income & Expenses</h1>
              <h2>{year}</h2>
            </div>
            <div className="flex justify-between gap-6 items-center">
              <div className="flex gap-2 items-center">
                <div className="text-xs">Expenses</div>
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
            {bar ? <ExpensesVsIncomeBar /> : <ExpensesVsIncomeLine />}
          </div>
        </div>
        <div className="col-span-1 bg-[#161A40] p-4 text-white rounded-lg h-full">
          01
        </div>
        <div className="col-span-2 bg-[#161A40] p-4 text-white rounded-lg h-full">
          <h1 className="text-xl">Sources Expenses</h1>
          <ExpSourcesPie />
        </div>
        <div className="col-span-2 bg-[#161A40] p-4 text-white rounded-lg h-full">
          03
        </div>
        <div className="col-span-4 bg-[#161A40] p-4 text-white rounded-lg h-full">
          04
        </div>
      </div>
      <div className="col-span-2 grid grid-rows-12 gap-4 h-full">
        <div className="row-span-2 bg-[#161A40] text-white rounded-lg">01</div>
        <div className="row-span-8 bg-[#161A40] text-white rounded-lg">02</div>
        <div className="row-span-3 bg-[#161A40] text-white rounded-lg">03</div>
      </div>
    </div>
  );
};

export default Dashboard;
