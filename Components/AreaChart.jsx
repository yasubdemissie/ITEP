import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
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
    console.log(data)
    setUpdatedData(
      data.map((item) => ({
        ...item,
        date: new Date(item.time).toLocaleDateString("en-US", options),
        energy_generated:item.power,
        step_counter:item.step,
      }))
    );
  }, [data]);

  return (
    <div className="grid-span-5">
      <ResponsiveContainer
        style={{
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          margin: "10px 30px 30px 10px",
          display: "flex",
        }}
        width={700}
        height={300}
      >
        <div className="grid">
          <span className="text-center text-xl font-semibold italic">Energy Generated</span>
        
        </div>
        <AreaChart
          width={500}
          height={200}
          data={updatedData}
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2929ef" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#009e57" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend align="right" verticalAlign="top" />
          <Area
            type="monotone"
            dataKey="energy_generated"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChartComp;
