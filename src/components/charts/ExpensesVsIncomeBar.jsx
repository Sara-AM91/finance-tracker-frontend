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
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
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

    const expenseForMonth = transactions
      .filter(
        (t) => new Date(t.date).getMonth() === month && t.type === "expense"
      )
      .reduce((sum, t) => sum + t.amount, 0);

    return { incomeForMonth, expenseForMonth };
  });

  const incomeData = groupedByMonth.map((g) => g.incomeForMonth);
  const expenseData = groupedByMonth.map((g) => g.expenseForMonth);

  const uData = expenseData;
  const pData = incomeData;

  const expenseMax = Math.max(...expenseData);
  const maxExpenseMonthIndex = expenseData.indexOf(expenseMax);
  const maxExpense = {
    amount: expenseMax,
    month: monthNames[maxExpenseMonthIndex],
  };

  const incomeMax = Math.max(...incomeData);
  const maxIncomeMonthIndex = incomeData.indexOf(incomeMax);
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

  const overallMax = Math.max(...uData, ...pData);
  const yMax = overallMax + overallMax * 0.1;

  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: "Income",
        data: pData,
        backgroundColor: pData.map(() => "rgba(1, 255, 185, 0.5)"), // Semi-transparent fill
        borderColor: "#01FFB9",
        borderWidth: 3,
        borderRadius: 15,
      },
      {
        label: "Expenses",
        data: uData,
        backgroundColor: uData.map(() => "rgba(243, 103, 18, 0.5)"), // Semi-transparent fill
        borderColor: "#F36712",
        borderWidth: 3,
        borderRadius: 15,
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
        formatter: (value) => (value > 0 ? value.toFixed(2) : ""), // Format for display
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: yMax, // Increase max Y value to create space above the highest point
        grid: {
          color: "#343756",
        },
      },
      x: {
        grid: {
          color: "#343756",
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
