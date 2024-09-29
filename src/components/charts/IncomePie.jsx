import { PieChart, PiePlot } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import FilterCategory from "../../utils/FilterCategory";
import * as d3 from "d3-scale-chromatic"; // Importing D3 for dynamic color scales

export default function IncomePie({ transactions }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Filter transactions for income
    const dataInc = FilterCategory(transactions, "income");

    // Prepare the data for the chart
    const data = dataInc.map(({ category, totalAmount }) => ({
      value: totalAmount,
      label: category, // Assuming you use category.title in your data
    }));

    const sorted = data.sort((a, b) => b.value - a.value);

    const firstFour = sorted.splice(0, 5);
    // console.log(firstFour);
    setData(firstFour);
  }, [transactions]);

  const customColors = ["#01FFB9", "#007F7F", "#00BFFF", "#4B0082", "#3CB371"];
  const colors = data.map(
    (_, index) => customColors[index % customColors.length]
  );
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
        colors={colors} // Use cool color interpolation
        series={[
          {
            data: data,
            innerRadius: 50,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            cx: "50%", // X center position of the pie chart
            cy: "50%", // Y center position of the pie chart
            arcLabel: (item) => `${item.value}€`,
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
