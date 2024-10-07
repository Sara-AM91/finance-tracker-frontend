import { PieChart } from "@mui/x-charts/PieChart";
import FilterCategory from "../../utils/FilterCategory";
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

  const customColors = ["#F36712", "#FF7F50", "#FF4500", "#FF1493", "#FF69B4"];
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
            cx: "70%", // X center position of the pie chart
            cy: "50%", // Y center position of the pie chart
          },
        ]}
        slotProps={{ legend: { hidden: true } }}
        width={400}
        height={300} // Increased height to accommodate the legend
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: colors[index],
                width: "12px",
                height: "12px",
                marginRight: "8px",
              }}
            ></div>
            <span style={{ color: "#FFFFFF" }}>{item.label}</span>{" "}
            {/* Label with white text */}
          </div>
        ))}
      </div>
    </div>
  );
}
