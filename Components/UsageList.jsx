import { useProvider } from "../hooks/useProvider";
import List from "./List";

function UsageList() {
  const { data } = useProvider();

  return (
    <ul className="w-full bg-black/15 text-red-600 italic">
      {data.map((item, index) => (
        <li
          key={index}
            className="text-center shadow-sm p-2 w-full"
        >
          <List item={item} />
        </li>
      ))}
    </ul>
  );
}

export default UsageList;
