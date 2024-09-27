// components/charts/ExpensesCategoryLine.js
import { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpensesCategoryLine = ({ categories }) => {
  const chartRef = useRef(null);

  // Extract labels and data from categories
  const xLabels = categories.map((category) => category.name);
  const yData = categories.map((category) => category.amount);
  const lineColors = categories.map((category) => category.color);

  // Create chart data
  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: "Amount",
        data: yData,
        borderColor: lineColors,
        backgroundColor: lineColors,
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#343756",
        },
        ticks: {
          color: "#B7B7B7",
        },
      },
      x: {
        grid: {
          color: "#343756",
        },
        ticks: {
          color: "#B7B7B7",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "90%" }} className="px-4">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default ExpensesCategoryLine;
