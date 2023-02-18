import React from "react";
import { useState } from "react";
import { FaRegComment, FaRegStar } from "react-icons/fa";
import prettyDate from "./utils";

const Post = ({ post, index }) => {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <span>{prettyDate(post.created)}</span>
      <p>{post.text}</p>
      <div className="stats">
        <ul>
          <li>
            <FaRegStar /> {post.likes}
          </li>
          <li>
            <FaRegComment /> {post.comments.length}
          </li>
        </ul>
        <button>Comment</button>
      </div>
    </div>
  );
};

export default Post;
