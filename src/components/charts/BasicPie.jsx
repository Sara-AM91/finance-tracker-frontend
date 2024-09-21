import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie() {
  return (
    <div className="w-full h-full flex justify-center items-center  pt-3 -mb-4">
      <div className="">
        <PieChart
          sx={(theme) => ({
            [`.css-1mhcdve-MuiPieArc-root`]: {
              stroke: "#161A40",
            },
            "& .MuiChartsLegend-series text": {
              fontSize: "1em !important",
              fill: "#FFFFFF !important",
            },
          })}
          colors={["#F36713", "#FF208B", "#FF9883", "#EB2139"]}
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
                { id: 3, value: 30, label: "series D" },
              ],
              innerRadius: 50,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -45,
              endAngle: 225,
              cx: "50%",
              cy: "50%",
            },
          ]}
          slotProps={{
            legend: {
              direction: "column",
              position: { vertical: "middle", horizontal: "right" },
              padding: 2,
            },
          }}
          width={400}
          height={200}
        />
      </div>
    </div>
  );
}
