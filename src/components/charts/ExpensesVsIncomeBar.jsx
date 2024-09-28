import { useRef, useEffect } from "react";
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

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ExpensesVsIncomeBar = ({ transactions, setMaxInc, setMaxExp }) => {
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
    console.log(incomeForMonth);
    const expenseForMonth = transactions
      .filter(
        (t) => new Date(t.date).getMonth() === month && t.type === "expense"
      )
      .reduce((sum, t) => sum + t.amount, 0);

    return { incomeForMonth, expenseForMonth };
  });

  const incomeData = groupedByMonth.map((g) => g.incomeForMonth);
  const expenseData = groupedByMonth.map((g) => g.expenseForMonth);

  const uData = incomeData;
  const pData = expenseData;

  const expenseMax = Math.max(...incomeData);
  const maxExpenseMonthIndex = expenseData.indexOf(expenseMax);
  const maxExpense = {
    amount: expenseMax,
    month: monthNames[maxExpenseMonthIndex],
  };

  const incomeMax = Math.max(...incomeData);
  const maxIncomeMonthIndex = expenseData.indexOf(incomeMax);
  const maxIncome = {
    amount: incomeMax,
    month: monthNames[maxIncomeMonthIndex],
  };

  useEffect(() => {
    setMaxInc(maxIncome);
    setMaxExp(maxExpense);
  }, [transactions]);

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

  // Create chart data with gradient fill
  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: "Income",
        data: pData,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }
          return pData.map((value) =>
            createGradient(ctx, chartArea, "#01FFB9", "#01FFB9", 1)
          );
        },
        //text B7B7B7
        borderRadius: 20,
        hoverBackgroundColor: "#01FFB9",
      },
      {
        label: "Expenses",
        data: uData,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }
          return uData.map((value) =>
            createGradient(ctx, chartArea, "#F36712", "#F36712", 1)
          );
        },
        borderRadius: 20,
        hoverBackgroundColor: "rgba(243,103,18,1)",
      },
    ],
  };

  // Gradient function
  const createGradient = (ctx, chartArea, color1, color2) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, `${color1}`); // Full opacity at the top
    gradient.addColorStop(0.7, `${color2}`); // Mostly opaque in the middle
    gradient.addColorStop(1, `${color2}00`); // Transparent at the bottom
    return gradient;
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
    <div style={{ width: "100%", height: "90%" }} className="px-4">
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default ExpensesVsIncomeBar;
