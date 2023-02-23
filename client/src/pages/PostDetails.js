import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegComment, FaTrash, FaPen, FaRegStar } from "react-icons/fa";
import { accessToken } from "../helpers/utils";

const PostDetails = ({ authState }) => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();

  useEffect(() => {
    if (!accessToken()) {
      navigate("/login");
    } else {
      axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
        setPostObject(response.data);
        setLikes(response.data.Likes);
      });
      axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
        setComments(response.data);
      });
    }
  }, []);

  console.log(postObject);
  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: accessToken() },
      })
      .then(() => {
        console.log("success");
      });
    navigate("/");
    window.location.reload();
  };

  const addComment = () => {
    console.log(id);
    axios
      .post(
        `http://localhost:3001/comments`,
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: accessToken(),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  return (
    <div className="details">
      {authState.username === postObject.username && (
        <div className="settings">
          <Link to={`/details/${id}/edit`}>
            <FaPen className="icon" />
          </Link>
          <FaTrash className="icon" onClick={() => deletePost(id)} />
        </div>
      )}
      <p>posted by @{postObject.username}</p>
      <h2>{postObject.title}</h2>
      <p>{postObject.postText}</p>
      <div className="likes">
        <FaRegStar />
        {likes.length}
      </div>
      <h3>{comments.length} comments:</h3>
      <ul>
        {comments.map((comment, index) => {
          return (
            <li className="comment" key={index}>
              <strong>@{comment.username}: </strong>
              {comment.commentBody}
            </li>
          );
        })}
      </ul>
      <div className="leave-comment">
        <input
          type="text"
          maxLength={30}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          id="commentBody"
          name="commentBody"
          value={newComment}
          placeholder="add comment.."
          required
        />
        <FaRegComment onClick={addComment} className="icon" />
      </div>
      <Link to="/" className="button cancel">
        Back
      </Link>
    </div>
  );
};

export default PostDetails;
