import { useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpSourcesPie = () => {
  const chartRef = useRef(null);

  const data = [2500, 1630, 340, 1200];
  const labels = ["Groceries", "House", "Entertainment", "Car"];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Expenses",
        data: data,
        backgroundColor: [
          "rgb(243, 103, 19, 0.8)",
          "rgb(234, 84, 53, 0.8)",
          "rgb(227, 64, 87, 0.8)",
          "rgb(255, 32, 139, 0.8)",
        ],
        hoverBackgroundColor: [
          "rgb(243, 103, 19)",
          "rgb(234, 84, 53)",
          "rgb(227, 64, 87)",
          "rgb(255, 32, 139)",
        ],
        borderColor: "#161A40", // Make the border transparent
        borderWidth: 5, // Adjust this value for more or less spacing
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: false,
        text: "Sources of Expenses",
      },
    },
  };

  return (
    <div style={{ width: "100%", padding: "4px" }}>
      <Doughnut ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default ExpSourcesPie;
