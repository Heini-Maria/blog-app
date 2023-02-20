import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPost from "./fetchPosts";
import prettyDate from "./utils";
import { FaRegComment, FaTrash, FaPen, FaRegStar } from "react-icons/fa";

const PostDetails = () => {
  const { id } = useParams();
  const results = useQuery(["posts"], fetchPost);
  if (results.isLoading) {
    return <p>Loading...</p>;
  }
  console.log(results.data);
  const key = id - 1;
  const post = results.data[key];
  return (
    <div className="details">
      <div className="settings">
        <Link to={`/details/${post.id}/edit`}>
          <FaPen className="icon" />
        </Link>
        <FaTrash className="icon" />
      </div>
      <p>posted by @{post.username}</p>
      <h2>{post.title}</h2>
      <span>posted on {prettyDate(post.createdAt)}</span>
      <p>{post.postText}</p>
      <div className="likes">
        <FaRegStar className="icon" />
      </div>
      <h3> comments:</h3>
      <ul>
        {/* {post.comments.map((comment, index) => (
          <li className="comment" key={index}>
            {comment}
          </li>
        ))} */}
      </ul>
      <div className="leave-comment">
        <input
          type="text"
          maxLength={30}
          placeholder="add comment.."
          required
        />
        <FaRegComment className="icon" />
      </div>
      <Link to="/" className="button cancel">
        Back
      </Link>
    </div>
  );
};

export default PostDetails;
