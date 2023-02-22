import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  let navigate = useNavigate();

  console.log(AuthContext);
  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        localStorage.setItem("accessToken", res.data);
        setAuthState(true);
        navigate("/");
      }
    });
  };
  return (
    <div className="login">
      <div className="form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login} type="submit">
          Login
        </button>
      </div>
      <Link to="/registration">Register</Link>
    </div>
  );
};

export default Login;
