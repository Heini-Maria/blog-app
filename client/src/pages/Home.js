import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../Components/Post";
import { accessToken } from "../helpers/utils";

const Home = ({ authState, posts, likedPosts }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!accessToken()) {
      navigate("/login");
    }
  }, []);
  console.log(authState);
  return (
    <div className="home">
      {posts.map((post, key) => {
        return <Post post={post} key={key} likedPosts={likedPosts} />;
      })}
    </div>
  );
};

export default Home;
