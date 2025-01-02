import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
} from "recharts";
import { useProvider } from "../hooks/useProvider";

export default function PieChartComp() {
  const { pieData: Data } = useProvider();

  console.log("Pie Data:", Data);

  if (!Data || Data.length === 0) {
    return <div>No data available</div>;
  }

  const transformedData = Data.map((item) => ({
    name: `Step ${item.step}`,
    value: parseFloat(item.power),
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="col-span-5">
      <PieChart width={700} height={300}>
        <Pie
          data={transformedData}
          cx={120}
          cy={150}
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {transformedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </div>
  );
}
