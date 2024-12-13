import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import Dashboard from "../Pages/Dashboard";
import Controller from "../Pages/Controller";
import AreaChartComp from "../Components/AreaChart";
import { AppContext } from "../Components/AppContext";

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        <div className="grid h-dvh grid-cols-12 grid-rows-12 space-y-0 gap-y-0">
          <div className="col-span-12 max-h-20 row-span-1 h-full m-0 shadow-sm flex justify-between px-5">
            <div>Logo</div>
            <nav className="flex items-center justify-between h-full w-1/5">
              <NavLink to={"/"}>Dashboard</NavLink>
              <NavLink to={"/controllers"}>Controllers</NavLink>
            </nav>
          </div>
          <div className="col-span-2 row-span-11 shadow-lg bg-slate-100"></div>
          <div className="p-4">
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/areachart" element={<AreaChartComp />} />
              <Route path="/areachart" element={<Controller />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AppContext>
  );
}

export default App;
