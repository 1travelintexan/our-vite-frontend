import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const HomePage = () => {
  //this is consuming the context or 'getting' the data from the context
  const theData = useContext(ThemeContext);
  console.log("the data", theData);
  return <div>HomePage</div>;
};
