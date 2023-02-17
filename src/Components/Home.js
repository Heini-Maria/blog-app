import React from "react";
import posts from "./data";
import Post from "./Post";

const Home = () => {
  return (
    <div className="home">
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  );
};

export default Home;
