import React, { useMemo, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";

//Import interpolateReds from d3-scale-chromatic
import { interpolateReds } from "d3-scale-chromatic";

//Register chart.js components
ChartJS.register();

const IncomesCategoryLine = ({ transactions }) => {
  const chartRef = useRef(null);

  //Step 1: Filter transactions to include only expenses
  const incomeTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.type === "expense"),
    [transactions]
  );

  //Step 2: Aggregate the expenses by category
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

  //Step 3: Extract labels and data for the line chart
  const xLabels = Object.keys(categoryData);
  const yData = xLabels.map((category) =>
    parseFloat(categoryData[category].amount.toFixed(2))
  );

  //Step 4: Generate colors using interpolateReds
  const colors = yData.map((_, index) => {
    const t = index / (yData.length - 1); //Normalize index to [0,1]
    return interpolateReds(t);
  });

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

  //Step 5: Create the chart data
  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: "Amount",
        data: yData,
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

  //Step 6: Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 3,
        tension: 0.4,
      },
      point: {
        radius: 5,
        hoverRadius: 7,
      },
    },
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
