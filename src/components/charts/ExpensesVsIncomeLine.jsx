import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Filler,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  Filler,
  PointElement,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpensesVsIncomeLine = () => {
  const chartRef = useRef(null);

  const uData = [
    4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890,
  ];
  const pData = [
    2400, 1398, 4800, 3908, 4800, 3800, 4300, 2400, 1398, 2800, 3908, 4800,
  ];

  const xLabels = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const createGradient = (ctx, chartArea, color1, color2) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, `${color1}66`); // Full opacity at the top
    gradient.addColorStop(0.7, `${color2}33`); // Mostly opaque in the middle
    gradient.addColorStop(1, `${color2}00`); // Transparent at the bottom
    return gradient;
  };
  // Create chart data with gradient fill
  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: "Income",
        data: pData,
        borderColor: "#01FFB9",
        backgroundColor: "rgba(8,213,156,1)",
        fill: false,
        tension: 0.4,
        borderDash: [5, 5],
      },
      {
        label: "Expenses",
        data: uData,
        borderColor: "#F36712",
        // backgroundColor: "rgba(243,103,18,0.4)",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          return createGradient(ctx, chartArea, "#F36712", "#F36712", 1);
        },
        fill: true,
        tension: 0.4,
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
        position: "top",
      },
      title: {
        display: false,
        text: "Income vs Expenses",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#343756", // Change this to your desired grid color
        },
      },
      x: {
        grid: {
          color: "#343756", // Change this to your desired grid color
        },
      },
    },
  };

  return (
    <div style={{ width: "100%" }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default ExpensesVsIncomeLine;
