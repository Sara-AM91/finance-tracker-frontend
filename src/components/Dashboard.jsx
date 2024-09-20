import ExpensesVsIncome from "./charts/ExpensesVsIncome";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-6 gap-4 p-4 m-10">
      <div className=" col-span-4 grid grid-cols-4 gap-4">
        <div className="col-span-3 bg-[#161A40] p-4 text-white rounded-lg">
          <div className="flex justify-between">
            <h1 className="text-xl">Income & Expenses</h1>
            <div className="flex justify-between gap-6">
              <div className="flex gap-2 align-middle">
                <p className="text-xs">Expenses</p>
                <div className="h-5 w-12 bg-[#F36712] text-xs rounded-md"></div>
              </div>
              <div className="flex gap-2 align-middle">
                <p className="text-xs">Incomes</p>
                <div className="h-5 w-12 bg-[#08D59C] text-xs rounded-md"></div>
              </div>

              <p className="text-xs font-semibold">Line Chart</p>
            </div>
          </div>
          <ExpensesVsIncome />
        </div>
        <div className="col-span-1 bg-[#161A40] p-4 text-white rounded-lg">
          01
        </div>
        <div className="col-span-2 bg-[#161A40] p-4 text-white rounded-lg">
          01
        </div>
        <div className="col-span-2 bg-[#161A40] p-4 text-white rounded-lg">
          01
        </div>
        <div className="col-span-4 bg-[#161A40] p-4 text-white rounded-lg">
          01
        </div>
      </div>
      <div className="col-span-2 grid grid-rows-12 gap-4">
        <div className="row-span-2 bg-[#161A40] row-start-12 text-white rounded-lg">
          01
        </div>
        <div className="row-span-8 bg-[#161A40] row-start-4 text-white rounded-lg">
          02
        </div>
        <div className="row-span-3 bg-[#161A40] row-start-1 text-white rounded-lg">
          03
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
