import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "../Pages/Dashboard";
import AreaChartComp from "../Components/AreaChart";
import { AppContext } from "../Components/AppContext";

function App() {
  return (
    <div className="grid h-dvh grid-cols-12 grid-rows-12 space-y-0 gap-y-0">
      <h1 className="col-span-12 max-h-20 row-span-1 h-full text-4xl m-0 shadow-sm">
        {/* HEADER */}
      </h1>
      <div className="col-span-2 row-span-11 shadow-lg bg-black"></div>
      <div className="p-4">
        <AppContext>
          <BrowserRouter>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/areachart" element={<AreaChartComp />} />
            </Routes>
          </BrowserRouter>
        </AppContext>
      </div>
    </div>
  );
}

export default App;
