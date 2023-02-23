import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "../Components/Post";
import { accessToken } from "../helpers/utils";

const Home = ({ authState }) => {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    if (!accessToken()) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3001/posts`, {
          headers: { accessToken: accessToken() },
        })
        .then((response) => {
          setPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
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
