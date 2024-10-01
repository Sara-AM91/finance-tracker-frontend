import React, { useMemo, useRef } from "react";
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

//Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IncomesCategoryLine = ({ transactions }) => {
  const chartRef = useRef(null);

  //Step 1: Filter transactions to only include expenses
  const expenseTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.type === "income"),
    [transactions]
  );

  //Step 2: Aggregate the expenses by category
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

  //Step 3: Extract labels and data for the line chart
  const xLabels = Object.keys(categoryData);
  const yData = xLabels.map((category) =>
    categoryData[category].amount.toFixed(2)
  );

  //Define the color scheme for the line (optional)
  const lineColor = "#C52222";

  //Create the chart data
  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: "Amount",
        data: yData,
        borderColor: lineColor, //Set line color
        backgroundColor: lineColor,
        fill: false,
        tension: 0.4, //Make the line slightly curved
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

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
    <div style={{ width: "100%", height: "110%", backgroundColor: "#161A40" }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default IncomesCategoryLine;
