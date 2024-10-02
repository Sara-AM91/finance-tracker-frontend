import React, { useMemo, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { interpolateGreens } from "d3-scale-chromatic";

// Register chart.js components
ChartJS.register();

const IncomesCategoryLine = ({ transactions }) => {
  const chartRef = useRef(null);

  // Step 1: Filter transactions to include only incomes
  const incomeTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.type === "income"),
    [transactions]
  );

  // Step 2: Aggregate the incomes by category
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

  // Step 3: Extract labels and data for the line chart
  const xLabels = Object.keys(categoryData);
  const yData = xLabels.map((category) =>
    parseFloat(categoryData[category].amount.toFixed(2))
  );

  // Step 4: Generate colors using interpolateGreens
  const colors = yData.map((_, index) => {
    const t = index / (yData.length - 1); // Normalize index to [0,1]
    return interpolateGreens(t);
  });

  // Step 5: Create the chart data
  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: "Amount",
        data: yData,
        borderColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }

          // Create gradient
          const gradient = ctx.createLinearGradient(
            chartArea.left,
            0,
            chartArea.right,
            0
          );

          // Ensure there are valid colors to work with
          if (!colors || colors.length === 0) {
            console.error("Colors array is empty or undefined:", colors);
            return "rgba(0, 0, 0, 0)"; // Return a default transparent color
          }

          // Handle case for a single color (to avoid division by zero)
          if (colors.length === 1) {
            gradient.addColorStop(0, colors[0]);
            gradient.addColorStop(1, colors[0]);
          } else {
            colors.forEach((color, index) => {
              const t = index / (colors.length - 1);

              // Debugging statement to check index, t, and color values
              console.log(
                "Index:",
                index,
                "Colors length:",
                colors.length,
                "t:",
                t,
                "Color:",
                color
              );

              // Check if `t` is finite
              if (!isFinite(t)) {
                console.error(
                  "Invalid 't' value:",
                  t,
                  "Index:",
                  index,
                  "Colors length:",
                  colors.length
                );
                return;
              }

              // Check if color is a valid string
              if (typeof color !== "string" || color.trim() === "") {
                console.error(
                  "Invalid color value at index",
                  index,
                  ":",
                  color
                );
                return;
              }

              // Add color stop to gradient
              gradient.addColorStop(t, color);
            });
          }

          return gradient;
        },
        pointBackgroundColor: colors,
        pointBorderColor: colors,
        fill: false,
        tension: 0.4, // Slightly curved line
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 3,
      },
    ],
  };

  // Step 6: Chart options
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
