import React from "react";
import ReactSwitch from "react-switch";
import { FaSistrix } from "react-icons/fa";

const Header = ({ toggleTheme, theme }) => {
  return (
    <header className="">
      <h1>Micro Blog</h1>
      <div className="switch">
        <ReactSwitch onChange={toggleTheme} chkecked={theme === "dark"} />
      </div>
      <form action="submit" className="search-bar">
        <input type="text" placeholder="search.." />
        <button>
          <FaSistrix />
        </button>
      </form>
      <button>Create a post</button>
    </header>
  );
};

export default Header;
