import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { prettyDate, accessToken } from "../helpers/utils";
import axios from "axios";

const Post = ({ post, likedPosts }) => {
  const [thisPost, setThisPost] = useState(post);
  const [thisLiked, setThisLiked] = useState(likedPosts);

  const likeAPost = (postId) => {
    axios
      .post(
        `http://localhost:3001/likes`,
        { PostId: postId },
        {
          headers: {
            accessToken: accessToken(),
          },
        }
      )
      .then((response) => {
        if (response.data.like) {
          setThisPost({ ...thisPost, Likes: [...thisPost.Likes, 0] });
        } else {
          const likeArray = thisPost.Likes;
          likeArray.pop();
          setThisPost({ ...thisPost, Likes: likeArray });
        }
        if (thisLiked.includes(post.id)) {
          setThisLiked(
            likedPosts.filter((id) => {
              return id != post.id;
            })
          );
        } else {
          setThisLiked([...likedPosts, post.id]);
        }
      });
  };
  return (
    <div className="post">
      <p>@{post.username}</p>
      <h3>{post.title}</h3>
      <span>{prettyDate(post.createdAt)}</span>
      <p>{post.post}</p>
      <div className="stats">
        {thisLiked.includes(post.id) ? (
          <p>
            <FaStar
              className="liked"
              onClick={() => {
                likeAPost(post.id);
              }}
            />
            {thisPost.Likes.length}
          </p>
        ) : (
          <p>
            <FaRegStar
              className="unliked"
              onClick={() => {
                likeAPost(post.id);
              }}
            />
            {thisPost.Likes.length}
          </p>
        )}

        <Link to={`/details/${post.id}`} className="button">
          View
        </Link>
      </div>
    </div>
  );
};

export default Post;
