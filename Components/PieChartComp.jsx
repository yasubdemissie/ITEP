import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import propType from "prop-types";
import { useProvider } from "../hooks/useProvider";

export default function PieChartComp() {
  const { pieData: Data } = useProvider();
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="col-span-5">
      <ResponsiveContainer
        style={{
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          display: "flex",
          borderRadius: "10px",
          justifyContent: "right",
          margin: "10px 30px 30px 10px",
        }}
        width={400}
        height={300}
      >
        <PieChart width={300} height={400} margin={{}}>
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
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign=""
            iconType="star"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

PieChartComp.propTypes = {
  Data: propType.array,
};
