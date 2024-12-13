import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "../Pages/Dashboard";
import AreaChartComp from "../Components/AreaChart";

function App() {
  const data = [
    {
      step_counter: 12345,
      battery_status: "full",
      battery_percentage: 85,
      energy_generated: 12.5,
      light_intensity: 320,
      proximity_alert: true,
      error_logs: [],
      date: "2013-01-01",
    },
    {
      step_counter: 12345,
      battery_status: "full",
      battery_percentage: 85,
      energy_generated: 14.5,
      light_intensity: 320,
      proximity_alert: true,
      error_logs: [],
      date: "2013-01-02",
    },
    {
      step_counter: 12345,
      battery_status: "full",
      battery_percentage: 85,
      energy_generated: 18.5,
      light_intensity: 320,
      proximity_alert: true,
      error_logs: [],
      date: "2013-01-03",
    },
    {
      step_counter: 12345,
      battery_status: "full",
      battery_percentage: 85,
      energy_generated: 13.5,
      light_intensity: 320,
      proximity_alert: true,
      error_logs: [],
      date: "2013-01-04",
    },
    {
      step_counter: 12345,
      battery_status: "full",
      battery_percentage: 85,
      energy_generated: 22.5,
      light_intensity: 320,
      proximity_alert: true,
      error_logs: [],
      date: "2013-01-05",
    },
  ];
  return (
    <div className="grid h-dvh max-h-fit grid-cols-12 grid-rows-12">
      <h1 className="col-span-12 max-h-20 row-span-1 h-full text-4xl m-0 shadow-sm">
        {/* HEADER */}
      </h1>
      <div className="col-span-2 row-auto shadow-lg bg-black"></div>
      <div className="p-4">
        <BrowserRouter>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/areachart" element={<AreaChartComp data={data} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
