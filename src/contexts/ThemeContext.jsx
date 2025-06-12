import { createContext, useState } from "react";

//first create the context with a captital letter
const ThemeContext = createContext();
//second is create the wrapper, its a function that destructures the {children} and returns the .Provider
const ThemeWrapper = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(true);
  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
//last always make sure to export the context and the wrapper
export { ThemeContext, ThemeWrapper };
