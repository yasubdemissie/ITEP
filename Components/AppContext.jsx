import { createContext, useEffect, useState } from "react";
import propType from "prop-types";

const Context = createContext();

export function AppContext({ children }) {
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

  return <Context.Provider value={{
    data,
    setData,
    pieData,
    setPieData,
    isLoading,
    setIsLoading,
    error,
    setError,
  }}>{children}</Context.Provider>;
}

AppContext.propTypes = {
  children: propType.node,
};

export default Context;
