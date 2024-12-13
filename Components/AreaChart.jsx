import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState, useEffect } from "react";
import { useProvider } from "../hooks/useProvider";
function AreaChartComp() {
  const { data } = useProvider();
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    const options = { weekday: "short" };
    setUpdatedData(
      data.map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString("en-US", options),
      }))
    );
  }, [data]);

  return (
    <ResponsiveContainer
      style={{ boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", borderRadius: "10px" }}
      width={500}
      height={200}
    >
      <AreaChart
        width={500}
        height={200}
        data={updatedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d53232" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#c78484" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="energy_generated"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AreaChartComp;
