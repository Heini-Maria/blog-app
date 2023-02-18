import React from "react";
import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
import fetchPosts from "./fetchPosts";

const Home = () => {
  const results = useQuery(["posts"], fetchPosts);
  if (results.isLoading) {
    return <p>Loading...</p>;
  }
  const posts = results.data.posts;

  console.log(posts);
  return (
    <div className="home">
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  );
};

export default Home;
