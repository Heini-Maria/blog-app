import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegComment, FaTrash, FaPen, FaRegStar } from "react-icons/fa";
import {shortDate} from "./utils";
import axios from "axios";

const PostDetails = () => {
  const { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState()
 
  useEffect(() => {
  axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
    setPostObject(response.data);
  })
  axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
    setComments(response.data);
  })
 }, [])

 const onClick = () => {
  axios.post(`http://localhost:3001/comments`, {commentBody: newComment , PostId: id }).then((response) => {
  const commentToAdd = {commentBody: newComment} 
  setComments([...comments, commentToAdd])
  setNewComment("");
  });
};
const date = postObject.createdAt;
console.log(shortDate(date))
  return (
    <div className="details">
      <div className="settings">
        <Link to={`/details/${id}/edit`}>
          <FaPen className="icon" />
        </Link>
        <FaTrash className="icon" />
      </div>
      <p>posted by @{postObject.username}</p>
      <h2>{postObject.title}</h2>
      <span>posted on {postObject.createdAt}</span>
      <p>{postObject.postText}</p>
      <div className="likes">
        <FaRegStar className="icon" />
      </div>
      <h3> comments:</h3>
      <ul>
        {comments.map((comment, index) => { return (
          <li className="comment" key={index}>
            {comment.commentBody}
          </li>
        )})}
      </ul>
      <div className="leave-comment">
        <input
          type="text"
          maxLength={30}
          onChange={(e) => {setNewComment(e.target.value)}}
          id="commentBody"
          name="commentBody"
          value={newComment}
          placeholder="add comment.."
          required
        />
        <FaRegComment onClick={onClick} className="icon" />
      </div>
      <Link to="/" className="button cancel">
        Back
      </Link>
    </div>
  );
};

export default PostDetails;
