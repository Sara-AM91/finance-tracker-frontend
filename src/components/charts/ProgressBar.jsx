import React from "react";
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
      setReached(false); // Optional: Reset if condition is not met
    }
  }, [balance, goal]);

  useEffect(() => {
    const progress = Math.round((balance / goal) * 100);
    setValue(progress);
  }, [goal, balance]);

  useEffect(() => {
    const retrievedGoal = localStorage.getItem("goal");
    console.log("Retrieved Storage:", retrievedGoal);
    setGoal(retrievedGoal);
  }, [goal]);

  return (
    <>
      <div className="flex gap-10 items-center justify-between px-2">
        <div className="flex flex-row items-center gap-4">
          <h2 className="text-xl text-left">Income Goal</h2>
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
