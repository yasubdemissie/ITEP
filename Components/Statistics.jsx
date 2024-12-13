import PieChartComp from "../Components/PieChartComp";
import AreaChartComp from "../Components/AreaChart";
import BarChartComp from "../Components/BarChartComp";
import { useProvider } from "../hooks/useProvider";

function Statistics() {
  // const [data, setData] = useState([]);
  // const [pieData, setPieData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const { error, isLoading, data, pieData } = useProvider();

  if (error)
    return (
      <div className="text-red-500 flex items-center justify-center p-16 bg-red-300/15">
        There is an Error Loding the Data
      </div>
    );

  if (isLoading) return <div>...loading</div>;

  return (
    <div className="flex flex-wrap">
      <div className="flex">
        <PieChartComp Data={pieData} />
        <BarChartComp data={data} />
      </div>

      <AreaChartComp data={data} />
    </div>
  );
}

export default Statistics;
