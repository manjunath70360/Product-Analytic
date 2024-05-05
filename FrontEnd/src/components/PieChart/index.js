import React from "react";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts";

const CustomPieChart = (props) => {
  const { pieChartData } = props;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={pieChartData}
          startAngle={0}
          endAngle={360}
          innerRadius="40%"
          outerRadius="70%"
          fill="#8884d8"
          paddingAngle={5}
          dataKey="itemCount"
        >
          {pieChartData.map((entry) => (
            <Cell key={entry.category} fill={getRandomColor()} />
          ))}
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{ color: "#333", fontSize: "12px" }}
          payload={pieChartData.map((entry) => ({
            id: entry.category,
            type: "circle",
            value: entry.category,
            color: getRandomColor(),
          }))}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Function to generate random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default CustomPieChart;
