import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const options = { year: "numeric", month: "short", weekday: "short" };

  // function callBack(err, data) {
  //   if (err) {
  //     setError(err);
  //   } else {
  //     setData( data => data.map(element => {
  //       return {...element, date: new Date(element.date).toLocaleDateString("en-US", options)}
  //     }))
  // }

  useEffect(() => {
    setIsLoading(true);
    async function getData(callBack) {
      try {
        const response = await fetch(`http://localhost:3500/${callBack}`);
        if (!response.ok) setError("Error fetching data");
        const data = await response.json();
        if (callBack === "data") setData(data);
        else setPieData(data);

        console.log(data);
      } catch (e) {
        setError(e);
      }
    }

    getData("data");

    getData("pieData");
    setIsLoading(false);
  }, []);

  if (error)
    return (
      <div className="text-red-500 flex items-center justify-center p-16 bg-red-300/15">
        There is an Error Loding the Data
      </div>
    );

  return (
    <main
      className="grid justify-center items-center"
      onClick={() => setCount((x) => ++x)}
    >
      <h1>Yasub Demissie {count}</h1>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex justify-center items-center">
          {data.map((item, index) => (
            <p className=" bg-slate-500/35 p-4 m-4" key={index}>
              {item.step_counter}
            </p>
          ))}
        </div>
        <PieChart width={800} height={400}>
          <Pie
            data={pieData}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            legendType="circle"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={730}
            height={200}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
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
      </div>
      {/* <ResponsiveContainer> */}
      {/* <PieChart
          width={800}
          height={400}
          // onMouseEnter={this.onPieEnter}
        >
          <Pie
            data={pieData}
            cx={420}
            cy={200}
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="name"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart> */}
      {/* </ResponsiveContainer> */}
    </main>
  );
}

export default App;
