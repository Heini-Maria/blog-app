import React from "react";
import { Link } from "react-router-dom";
import { FaRegComment, FaRegStar } from "react-icons/fa";
import prettyDate from "./utils";

const Post = ({ post, index }) => {
  return (
    <div className="post">
      <p>@{post.username}</p>
      <h3>{post.title}</h3>
      <span>{prettyDate(post.createdAt)}</span>
      <p>{post.postText}</p>
      <div className="stats">
        <ul>
          <li>
            <FaRegStar /> 
          </li>
          <li>
            <FaRegComment /> 
          </li>
        </ul>
        <Link to={`/details/${post.id}`}className="button">View</Link>
      </div>
    </div>
  );
};

export default Post;
