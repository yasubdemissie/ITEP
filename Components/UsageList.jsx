import { useProvider } from "../hooks/useProvider";

function UsageList() {
  const { data } = useProvider();

  return (
    <ul className="w-full bg-black/15 text-red-600 italic">
      {data.map((item, index) => (
        <li
          key={index}
        //   className="text-center shadow-sm p-2 w-[400px] justify-between"
        >
          <span>{item.date}</span> - <span className="text-red-500">4000</span>
        </li>
      ))}
    </ul>
  );
}

export default UsageList;
