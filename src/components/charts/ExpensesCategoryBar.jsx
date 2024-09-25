// components/charts/ExpensesCategoryBar.js
import React, { useRef } from "react";
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

import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin

// Register chart.js components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the plugin
);

const ExpensesCategoryBar = ({ categories }) => {
  const chartRef = useRef(null);

  // Extract labels, data, colors, and percentages from categories
  const xLabels = categories.map((category) => category.name);
  const yData = categories.map((category) => category.amount);
  const barColors = categories.map((category) => category.color);
  const percentages = categories.map((category) => category.percentage);

  // Create chart data with gradient fills
  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: "Amount",
        data: yData,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // Return solid colors if chartArea is not available
            return barColors;
          }

          return yData.map((_, index) =>
            createGradient(ctx, chartArea, barColors[index])
          );
        },
        borderRadius: 20,
        hoverBackgroundColor: barColors,
      },
    ],
  };

  // Gradient function
  const createGradient = (ctx, chartArea, color) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, `${color}00`); // Transparent at the bottom
    return gradient;
  };

  // Chart options with data labels
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value, context) => {
          const percentage = percentages[context.dataIndex];
          return `${percentage}%`;
        },
        color: "#fff",
        font: {
          weight: "bold",
        },
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
    <div style={{ width: "100%", height: "100%" }} className="px-4">
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default ExpensesCategoryBar;
