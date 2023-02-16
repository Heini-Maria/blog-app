import React from "react";

const Header = () => {
  return (
    <header className="bg-red mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
      <h1>Micro Blog</h1>
      <button>Mode</button>
      <input type="search" />
      <button>Create a post</button>
    </header>
  );
};

export default Header;
