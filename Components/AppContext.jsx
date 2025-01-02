import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const Context = createContext();

export function AppContext({ children }) {
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://127.0.0.1:5000/provide`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const fetchedData = await response.json();
        console.log("Fetched Data:", fetchedData); // Log the response for debugging

        setData(fetchedData.data || []);
        setPieData(fetchedData.data || []);
      } catch (e) {
        console.error("Error fetching data:", e.message);
        setError(e.message || "Unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData(); // Initial fetch
    intervalId = setInterval(fetchData, 60000); // Fetch every 60 seconds

    return () => {
      clearInterval(intervalId); // Cleanup on component unmount
    };
  }, []);

  return (
    <Context.Provider
      value={{
        data,
        setData,
        pieData,
        setPieData,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </Context.Provider>
  );
}

AppContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;
