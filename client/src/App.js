import React from "react";
import Header from "./Components/Header";
import "./style.css";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./Components/Home";
import AddPost from "./Components/AddPost";
import PostDetails from "./Components/PostDetails";
import EditPost from "./Components/EditPost";

export const ThemeContext = createContext(null);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
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
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <div className="background" id={theme}>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <Routes>
              <Route path="details/:id/edit" element={<EditPost />} />
              <Route path="details/:id" element={<PostDetails />} />
              <Route path="/post" element={<AddPost />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </ThemeContext.Provider>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
