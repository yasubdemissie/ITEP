import PieChartComp from "../Components/PieChartComp";
import AreaChartComp from "../Components/AreaChart";
import BarChartComp from "../Components/BarChartComp";
import { useProvider } from "../hooks/useProvider";
import UsageList from "./UsageList";

function Statistics() {
  const { error, isLoading, data, pieData } = useProvider();

  if (error)
    return (
      <div className="text-red-500 flex items-center justify-center p-16 bg-red-300/15">
        There is an Error Loding the Data
      </div>
    );

  if (isLoading) return <div>...loading</div>;

  return (
    <div className="grid">
      <div className="flex">
        <PieChartComp />
        {/* <BarChartComp /> */}
        <UsageList />
      </div>
      <AreaChartComp />
    </div>
  );
}

export default Statistics;
