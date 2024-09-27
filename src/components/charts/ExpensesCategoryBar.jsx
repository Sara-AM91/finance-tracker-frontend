// components/charts/ExpensesCategoryBar.js
import React, { useRef, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ExpensesCategoryBar = ({ transactions, onBarClick }) => {
  const chartRef = useRef(null);
  const expenseTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.type === "expense"),
    [transactions]
  );

  const categoryData = useMemo(() => {
    const categoryMap = {};

    expenseTransactions.forEach((transaction) => {
      const categoryTitle = transaction.category?.title || "Unknown";
      if (!categoryMap[categoryTitle]) {
        categoryMap[categoryTitle] = { amount: 0 };
      }
      categoryMap[categoryTitle].amount += parseFloat(transaction.amount) || 0;
    });

    return categoryMap;
  }, [expenseTransactions]);

  const xLabels = Object.keys(categoryData);
  const yData = xLabels.map((category) =>
    categoryData[category].amount.toFixed(2)
  );

  // Define colors for each category (optional)
  const categoryColors = {
    // Shopping: "#FACC15",
    // Healthcare: "#22C55E",
    // Auto: "#22C55E",
    // Entertainment: "#FF208B",
    // Rent: "#175481",
    // Bills: "#F97316",
    // Transportation: "#7F3BCB",
    // "Utilities & Bills": "#F36713",
  };

  const barColors = xLabels.map(
    (category) => categoryColors[category] || "#EB2139"
  );

  // Step 5: Define chart data and options
  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: "Amount",
        data: yData,
        backgroundColor: barColors,
        borderRadius: 20,
        hoverBackgroundColor: barColors,
      },
    ],
  };

  const createGradient = (ctx, chartArea, color) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, `${color}00`);
    return gradient;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value) => `${value}$`,
        color: "#fff",
        font: { weight: "bold" },
        clip: true, // Clip labels that overflow
        display: false, // Only show labels above 100
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#B7B7B7" },
        grid: { color: "#343756" },
      },
      x: {
        ticks: {
          color: "#B7B7B7",
          autoSkip: false, // Do not skip labels automatically
          maxRotation: 45, // Rotate labels to prevent overlap
          minRotation: 45,
        },
        grid: { color: "#343756" },
      },
    },
  };
  const onClick = (event) => {
    const chart = chartRef.current;
    if (!chart) return;

    const elements = chart.getElementsAtEventForMode(
      event.nativeEvent,
      "nearest",
      { intersect: true },
      true
    );

    if (elements.length) {
      const datasetIndex = elements[0].datasetIndex;
      const index = elements[0].index;
      const clickedCategory = categories[index].name;
      onBarClick(clickedCategory);
    }
  };
  return (
    <div style={{ width: "100%", height: "120%", backgroundColor: "#161A40" }}>
      <Bar
        ref={chartRef}
        data={chartData}
        options={options}
        onClick={onClick}
      />
    </div>
  );
};

export default ExpensesCategoryBar;
