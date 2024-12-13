import { useEffect, useState } from "react";
import PieChartComp from "../Components/PieChartComp";
import AreaChartComp from "../Components/AreaChart";
import BarChartComp from "../Components/BarChartComp";

function Statistics() {
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div className="flex flex-wrap">
      <PieChartComp Data={pieData} />
      <BarChartComp data={data} />
      <AreaChartComp data={data} />
    </div>
  );
}

export default Statistics;
