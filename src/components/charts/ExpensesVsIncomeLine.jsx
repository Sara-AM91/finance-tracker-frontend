import { useRef, useEffect } from "react";
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
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin

// Register chart.js components
ChartJS.register(
  Filler,
  PointElement,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ExpensesVsIncomeLine = ({ transactions }) => {
  const chartRef = useRef(null);

  const months = Array(12)
    .fill(0)
    .map((_, i) => i); // [0, 1, 2, ..., 11]

  const groupedByMonth = months.map((month) => {
    const incomeForMonth = transactions
      .filter(
        (t) => new Date(t.date).getMonth() === month && t.type === "income"
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const expenseForMonth = transactions
      .filter(
        (t) => new Date(t.date).getMonth() === month && t.type === "expense"
      )
      .reduce((sum, t) => sum + t.amount, 0);

    return { incomeForMonth, expenseForMonth };
  });

  //console.log(groupedByMonth, transactions);
  const incomeData = groupedByMonth.map((g) => g.incomeForMonth);
  const expenseData = groupedByMonth.map((g) => g.expenseForMonth);

  const uData = expenseData;
  const pData = incomeData;
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

  const overallMax = Math.max(...uData, ...pData);
  const yMax = overallMax + overallMax * 0.1; // Add 10% to the max value
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
      datalabels: {
        color: "white",
        anchor: "end",
        align: "top", // Keep the labels above the points
        offset: 5, // Space between the point and the label
        formatter: (value) => (value > 0 ? value.toFixed(2) : ""),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#343756",
        },
        max: yMax,
      },
      x: {
        grid: {
          color: "#343756",
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "20px",
        overflow: "hidden",
      }}
      className="relative flex items-center justify-center"
    >
      <div style={{ width: "100%", height: "90%" }}>
        {/* Chart with constrained size */}
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ExpensesVsIncomeLine;
