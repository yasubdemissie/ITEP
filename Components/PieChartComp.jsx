import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import propType from "prop-types";

export default function PieChartComp({ Data }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <ResponsiveContainer style={{ boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" }} width={400} height={400}>
      <PieChart width={800} height={400}>
        <Pie
          data={Data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          legendType="circle"
        >
          {Data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

PieChartComp.propTypes = {
  Data: propType.array,
};
