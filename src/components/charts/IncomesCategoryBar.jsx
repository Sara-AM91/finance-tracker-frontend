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

// Import interpolateGreens from d3-scale-chromatic
import { interpolateGreens } from "d3-scale-chromatic";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const IncomesCategoryBar = ({ transactions, onBarClick }) => {
  const chartRef = useRef(null);

  // Filter transactions to include only incomes
  const incomeTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.type === "income"),
    [transactions]
  );

  // Aggregate the incomes by category
  const categoryData = useMemo(() => {
    const categoryMap = {};

    incomeTransactions.forEach((transaction) => {
      const categoryTitle = transaction.category?.title || "Unknown";
      if (!categoryMap[categoryTitle]) {
        categoryMap[categoryTitle] = { amount: 0 };
      }
      categoryMap[categoryTitle].amount += parseFloat(transaction.amount) || 0;
    });

    return categoryMap;
  }, [incomeTransactions]);

  // Extract labels and data for the bar chart
  const xLabels = Object.keys(categoryData);
  const yData = xLabels.map((category) =>
    parseFloat(categoryData[category].amount.toFixed(2))
  );

  // Generate colors using interpolateGreens
  const barColors = yData.map((_, index) => {
    const t = index / (yData.length - 1) || 0; // Normalize index to [0,1]
    return interpolateGreens(t);
  });

  // Define chart data
  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: "Amount",
        data: yData,
        backgroundColor: yData.map(() => "rgba(1, 255, 185, 0.5)"), // Semi-transparent fill
        borderColor: "#01FFB9",
        borderWidth: 3,
        borderRadius: 15,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        color: "white", // Change text color to white
        anchor: "end", // Position labels at the end of the bars
        align: "top", // Align the labels at the bottom of the anchor
        offset: 5, // Space between the bar and the label

        // Custom function to determine when to show the label
        formatter: (value) => (value > 0 ? value : ""), // Show only if value > 0
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
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
        grid: { color: "#343756" },
      },
    },
  };

  // Fix the onClick handler
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
      const clickedCategory = xLabels[index];
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

export default IncomesCategoryBar;
