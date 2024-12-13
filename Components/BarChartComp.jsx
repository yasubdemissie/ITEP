import propType from "prop-types";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
function BarChartComp({ data }) {
  return (
    <ResponsiveContainer style={{ boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" }} width={400} height={200}>
      <BarChart width={150} height={40} data={data}>
        <Bar dataKey="energy_generated" fill="#8884d8" />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
}

BarChartComp.propTypes = {
  data: propType.array,
};

export default BarChartComp;
