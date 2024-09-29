import { PieChart } from "@mui/x-charts/PieChart";
import FilterCategory from "../FilterCategory";
import { useEffect, useState } from "react";
import * as d3 from "d3-scale-chromatic";

export default function ExpensesPie({ transactions }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataExp = FilterCategory(transactions, "expense");

    const data = dataExp.map(({ category, totalAmount }) => ({
      value: totalAmount,
      label: category,
    }));
    const sorted = data.sort((a, b) => b.value - a.value);

    const firstFour = sorted.splice(0, 5);
    //console.log(firstFour);
    setData(firstFour);
  }, [transactions]);

  const warmColors = data
    .map((_, index) => d3.interpolateWarm(index / data.length))
    .reverse();

  return (
    <div className="flex justify-center items-center pt-3 ">
      <PieChart
        sx={(theme) => ({
          [`.css-1mhcdve-MuiPieArc-root`]: {
            stroke: "#161A40", // Chart border stroke
          },
          "& .MuiChartsLegend-series text": {
            fontSize: "1em !important",
            fill: "#FFFFFF !important", // Change legend text color
          },
        })}
        colors={warmColors} // Use cool color interpolation
        series={[
          {
            data: data,
            innerRadius: 50,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            cx: "50%", // X center position of the pie chart
            cy: "50%", // Y center position of the pie chart
          },
        ]}
        slotProps={{
          legend: {
            direction: "column",
            position: { vertical: "middle", horizontal: "right" }, // Legend on the right
            padding: 2,
            itemSpacing: 10, // Space between legend items
          },
        }}
        width={400}
        height={300} // Increased height to accommodate the legend
        legendposition="right" // Ensure legend stays on the right
      />
    </div>
  );
}
