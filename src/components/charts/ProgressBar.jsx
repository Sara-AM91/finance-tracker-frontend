import { useState, useEffect } from "react";
import GoalModal from "../GoalModal";

const ProgressBar = ({ balance }) => {
  const [value, setValue] = useState(0);
  const [goal, setGoal] = useState(0);
  const [reached, setReached] = useState(false);
  const [open, setOpen] = useState(false);

  // Check if the goal is reached
  useEffect(() => {
    if (goal > 0 && balance >= goal) {
      setReached(true);
    } else {
      setReached(false);
    }
  }, [balance, goal]);

  // Calculate the progress value
  useEffect(() => {
    if (goal > 0) {
      const progress = Math.round((balance / goal) * 100);
      setValue(progress > 100 ? 100 : progress); // Clamp to 100%
    } else {
      setValue(0); // Set to 0 if the goal is not set
    }
  }, [goal, balance]);

  // Retrieve goal from local storage
  useEffect(() => {
    const retrievedGoal = parseFloat(localStorage.getItem("goal")); // Ensure it's a number
    if (!isNaN(retrievedGoal)) {
      setGoal(retrievedGoal);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center h-full">
      {" "}
      {/* Ensure the container is full height */}
      <div className="flex gap-10 items-center justify-between px-2">
        <div className="flex flex-row items-center gap-4">
          <h2 className="text-xl text-left">Balance Goal</h2>
          <h2 className="font-bold text-[#01FFB9] text-2xl">
            {reached ? "100%" : `${value}%`}
          </h2>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col items-end w-full gap-2">
          <p className="text-right">
            {balance}€/{goal}€
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
            className="bg-gradient-to-r from-cyan-500 to-teal-400 text-white py-2 px-4 rounded-lg text-base self-center xl:self-end mt-2"
            onClick={() => {
              setOpen(true);
            }}
          >
            {goal ? "Set New Goal" : "Set Goal"}
          </button>
        </div>
      </div>
      {open && <GoalModal setOpen={setOpen} setGoal={setGoal} goal={goal} />}
    </div>
  );
};

export default ProgressBar;
