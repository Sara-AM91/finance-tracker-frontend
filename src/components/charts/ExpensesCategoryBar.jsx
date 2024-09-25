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

const ExpensesCategoryBar = ({ categories, onBarClick }) => {
  const chartRef = useRef(null);

  const xLabels = categories.map((category) => category.name);
  const yData = categories.map((category) => category.amount);
  const barColors = categories.map((category) => category.color);
  const percentages = categories.map((category) => category.percentage);

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
    <div style={{ width: "100%", height: "100%" }} className="px-4">
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
