import React from "react";
import Header from "./Components/Header";
import "./style.css";
import { createContext, useState } from "react";
import Home from "./Components/Home";

export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div id={theme}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Home />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
