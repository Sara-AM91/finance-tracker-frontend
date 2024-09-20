import { useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const IncSourcesPie = () => {
  const chartRef = useRef(null);

  const data = [25000, 1630, 10640, 1200];
  const labels = ["Salary", "Side Hustle", "Investments", "Hobby"];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Expenses",
        data: data,
        backgroundColor: [
          "rgb(1, 225, 185)",
          "rgb(18, 170, 226)",
          "rgb(27, 237, 255)",
          "rgb(99, 63, 215)",
        ],
        hoverBackgroundColor: [
          "rgb(21, 245, 205)",
          "rgb(38, 190, 246)",
          "rgb(47, 257, 275)",
          "rgb(119, 83, 235)",
        ],
        borderColor: "#161A40", // Make the border transparent
        borderWidth: 5, // Adjust this value for more or less spacing
      },
    ],
  };

  const options = {
    //maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 40,
          boxHeight: 20,
          useBorderRadius: true,
          borderRadius: 5,
          padding: 10,
        },
      },
      title: {
        display: false,
        text: "Sources of Expenses",
      },
    },
  };

  return (
    <div style={{ height: "100%" }}>
      <Doughnut ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default IncSourcesPie;
