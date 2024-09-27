import { useState, useEffect } from "react";
import GoalModal from "../GoalModal";

const ProgressBar = ({ balance }) => {
  const [value, setValue] = useState(0);
  const [goal, setGoal] = useState(0);

  const [reached, setReached] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if ((balance === goal && goal !== 0) || (balance > goal && goal !== 0)) {
      setReached(true);
    } else {
      setReached(false); //Reset if condition is not met
    }
  }, [balance, goal]);

  useEffect(() => {
    const progress = Math.round(
      (parseFloat(balance).toFixed(2) / parseFloat(goal)).toFixed(2) * 100
    );
    setValue(progress);
    console.log(
      "Goal:",
      parseFloat(goal).toFixed(2),
      "Balance:",
      parseFloat(balance).toFixed(2)
    );
  }, [goal, balance]);

  useEffect(() => {
    const retrievedGoal = localStorage.getItem("goal");
    setGoal(retrievedGoal);
  }, [goal]);

  return (
    <>
      <div className="flex gap-10 items-center justify-between px-2">
        <div className="flex flex-row items-center gap-4">
          <h2 className="text-xl text-left">Balance Goal</h2>
          <h2 className="font-bold text-[#01FFB9] text-2xl">
            {reached ? "100%" : `${value}%`}
          </h2>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col items-end w-full gap-2">
          <p>
            {balance}/{goal}
          </p>
          <div className="w-full bg-gray-400 h-4 rounded-r-full overflow-hidden">
            <div
              className={`h-4 rounded-r-full ${
                reached
                  ? "bg-[#01FFB9]"
                  : "bg-gradient-to-r from-[#F36713] to-[#7F3BCB]"
              }`}
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <button
            className="px-2 py-1 bg-[#7F3BCB] rounded-lg mt-2"
            onClick={() => {
              setOpen(true);
            }}
          >
            {goal ? "Set New Goal" : "Set Goal"}
          </button>
        </div>
      </div>
      {open && <GoalModal setOpen={setOpen} setGoal={setGoal} goal={goal} />}
    </>
  );
};

export default ProgressBar;
