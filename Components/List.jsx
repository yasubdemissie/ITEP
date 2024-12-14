import { useEffect, useState } from "react";
import { useProvider } from "../hooks/useProvider";
import propType from "prop-types";

function List({ item }) {
  //   const { data } = useProvider();
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    const options = { weekday: "short", month: "long", year: "numeric" };
    setUpdatedData({
      ...item,
      date: new Date(item.date).toLocaleDateString("en-US", options),
    });
  }, [item]);

  return (
    <div
      className="w-full rounded-lg p-4 shadow-lg"
      style={{
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2)",
        width: "500px",
        borderRadius: "10px",
        margin: "3px",
      }}
    >
      {/* <ul className="w-full"> */}
      {/* {data.map((item, index) => ( */}
      <li className="w-full p-3 m-2 flex justify-between items-center">
        <span>Energy Generated</span>
        <span>
          {updatedData.energy_generated}V{" "}
          <span
            style={{
              fontWeight: "lighter",
              color: "gray",
              fontSize: "13px",
              fontStyle: "italic"
            }}
          >
            {updatedData.date}
          </span>
        </span>
      </li>
      {/* ))} */}
      {/* </ul> */}
    </div>
  );
}

List.propTypes = {
  item: propType.object,
};

export default List;
