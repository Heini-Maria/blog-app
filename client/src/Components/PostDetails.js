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
  const post = results.data.posts[key];
  return (
    <div className="details">
      <div className="settings">
        <Link to={`/details/${post.id}/edit`}>
          <FaPen className="icon" />
        </Link>
        <FaTrash className="icon" />
      </div>
      <h2>{post.title}</h2>
      <span>posted on {prettyDate(post.created)}</span>
      <p>{post.text}</p>
      <div className="likes">
        <FaRegStar className="icon" />
        {post.likes}
      </div>
      <h3>{post.comments.length} comments:</h3>
      <ul>
        {post.comments.map((comment, index) => (
          <li className="comment" key={index}>
            {comment}
          </li>
        ))}
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
