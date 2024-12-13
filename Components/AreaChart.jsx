import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import propType from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
function AreaChartComp({ data }) {
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    const options = { weekday: "short", month: "short" };
    setUpdatedData(
      data.map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString("en-US", options),
      }))
    );
  }, [data]);

  return (
    <ResponsiveContainer style={{ boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" }} width={500} height={200}>
      <AreaChart
        width={730}
        height={200}
        data={updatedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d53232" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#c78484" stopOpacity={0} />
          </linearGradient>
          {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient> */}
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
        {/* <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
}

AreaChartComp.propTypes = {
  data: propType.array,
};

export default AreaChartComp;
