import React from "react";

const Header = ({ toggleTheme, theme }) => {
  return (
    <header className="header">
      <div>
        <h1>Nerdy Facts</h1>
        <span>micro blog</span>
      </div>
      <div className="switch-container">
        <p>switch to {theme === "light" ? "dark" : "light"}</p>
        <label className="switch">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <span className="slider"></span>
        </label>
      </div>
      <button>Create a fact</button>
      <div id="shadow"></div>
    </header>
  );
};

export default Header;
