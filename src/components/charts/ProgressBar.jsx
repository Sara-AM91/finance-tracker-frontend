import { useState, useEffect } from "react";
import GoalModal from "../GoalModal";

const ProgressBar = ({ balance }) => {
  const [value, setValue] = useState(0);
  const [goal, setGoal] = useState(0);
  const [reached, setReached] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (goal > 0) {
      const progress = (balance / goal) * 100;
      console.log(
        `Progress: ${progress}% - Balance: ${balance}, Goal: ${goal}`
      );

      setReached(balance >= goal && progress >= 100);

      setValue(Math.min(100, parseFloat(progress.toFixed(2))));
    } else {
      setValue(0);
      setReached(false); // If there's no goal, you haven't reached it
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
      <div className="flex flex-col sm:flex-row gap-10 items-center justify-between px-2">
        <div className="flex flex-row items-center gap-4">
          <h2 className="text-xl text-left">Balance Goal</h2>
          {/* Only show "100%" when `reached` is true */}
          <h2 className="font-bold text-[#01FFB9] text-2xl">
            {reached ? "100%" : `${value}%`}
          </h2>
        </div>

        <div className="flex flex-col items-end w-full gap-2">
          <p className="text-right">
            {balance}€/{goal}€
          </p>
          <div className="w-full bg-gray-400 h-4 rounded-r-full overflow-hidden">
            {/* Update the progress bar color based on `reached` */}
            <div
              className={`h-4 rounded-r-full ${
                reached
                  ? "bg-[#01FFB9]" // Green when goal is reached
                  : "bg-gradient-to-r from-[#F36713] to-[#7F3BCB]" // Gradient when not reached
              }`}
              style={{ width: `${value}%` }} // Show the correct width based on progress
            ></div>
          </div>
          <button
            className="bg-gradient-to-r from-cyan-500 to-teal-400 text-white py-2 px-4 rounded-lg text-base self-start sm:self-center xl:self-end mt-2"
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
