import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ toggleTheme, theme }) => {
  return (
    <header className="header">
      <div>
        <h1>Nerdy Facts</h1>
        <span>micro blog</span>
      </div>
      <div className="header-actions">
        <div className="switch-container">
          <p>switch to {theme === "light" ? "dark" : "light"} mode</p>
          <label className="switch">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <span className="slider"></span>
          </label>
        </div>
        <NavLink className="button" to="/login">
          Login
        </NavLink>
        <NavLink className="button" to="post">
          Add a fact
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
