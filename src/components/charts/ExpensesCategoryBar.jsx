// components/charts/ExpensesCategoryBar.js
import { useRef, useMemo } from "react";
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
//Import interpolateReds from d3-scale-chromatic
import { interpolateReds } from "d3-scale-chromatic";

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

  //Generate colors using interpolateReds
  const barColors = yData.map((_, index) => {
    const t = index / (yData.length - 1) || 0; //Normalize index to [0,1]
    return interpolateReds(t);
  });

  //Define chart data and options
  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: "Amount",
        data: yData,
        backgroundColor: yData.map(() => "rgba(243, 103, 18, 0.5)"), // Semi-transparent fill
        borderColor: "#F36712",
        borderWidth: 3,
        borderRadius: 15,
      },
    ],
  };

  // const createGradient = (ctx, chartArea, color) => {
  //   const gradient = ctx.createLinearGradient(
  //     0,
  //     chartArea.top,
  //     0,
  //     chartArea.bottom
  //   );
  //   gradient.addColorStop(0, color);
  //   gradient.addColorStop(1, `${color}00`);
  //   return gradient;
  // };

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
