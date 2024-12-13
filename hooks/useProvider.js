import { useContext } from "react";
import Context from "../Components/AppContext";

export function useProvider() {
  const provider = useContext(Context);
  if (!provider) throw new Error("There is no such provider");
  return provider;
}
