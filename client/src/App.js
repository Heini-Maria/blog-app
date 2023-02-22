import React from "react";
import Header from "./Components/Header";
import "./style.css";
import { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import PostDetails from "./pages/PostDetails";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

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
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  console.log(authState);
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <QueryClientProvider client={queryClient}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className="background" id={theme}>
              <Header theme={theme} toggleTheme={toggleTheme} />
              <Routes>
                <Route path="details/:id/edit" element={<EditPost />} />
                <Route path="details/:id" element={<PostDetails />} />
                <Route path="/post" element={<AddPost />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home authState={authState} />} />
              </Routes>
            </div>
          </ThemeContext.Provider>
        </QueryClientProvider>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
