import React from "react";
import Header from "./Components/Header";
import "./style.css";
import { createContext, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./Components/Home";

export const ThemeContext = createContext(null);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div id={theme}>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Home />
        </div>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
