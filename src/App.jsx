import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PieChartComp from "../Components/PieChartComp";
import AreaChartComp from "../Components/AreaChart";
import BarChartComp from "../Components/BarChartComp";
function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const options = { year: "numeric", month: "short", weekday: "short" };

  //     setData( data => data.map(element => {
  //       return {...element, date: new Date(element.date).toLocaleDateString("en-US", options)}

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

  if (isLoading) return <div>...loading</div>;

  return (
    <main className="grid justify-center items-center">
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex justify-center items-center">
          {data.map((item, index) => (
            <p className=" bg-slate-500/35 p-4 m-4" key={index}>
              {item.step_counter}
            </p>
          ))}
        </div>
        <PieChartComp Data={pieData} />
        <BarChartComp data={data} />
        <AreaChartComp data={data} />
      </div>
    </main>
  );
}

export default App;
