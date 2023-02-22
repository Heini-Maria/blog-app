import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../Components/Post";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

const Home = () => {
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3001/posts`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
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
