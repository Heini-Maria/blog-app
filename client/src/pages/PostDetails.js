import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaRegComment, FaTrash, FaPen, FaRegStar } from "react-icons/fa";
import { shortDate } from "../Components/utils";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

const PostDetails = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [likes, setLikes] = useState([])
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();
  const { authState } = useContext(AuthContext);
  

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
      setLikes(response.data.Likes)
    });
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }
  }, []);
  
  console.log(likes.length);

  const deletePost = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`, {headers: {accessToken: localStorage.getItem("accessToken")}, }).then(() => {
     console.log("success")
    })
    navigate("/")
  }

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
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if(response.data.error) {
          alert(response.data.error);
        } else {
        const commentToAdd = { commentBody: newComment, username: response.data.username};
        setComments([...comments, commentToAdd]);
        setNewComment("");
        }
      });
  };
  const date = postObject.createdAt;
  console.log(date);
  return (
    <div className="details">
      {authState.username === postObject.username && (
         <div className="settings">
         <Link to={`/details/${id}/edit`}>
           <FaPen className="icon" />
         </Link>
         <FaTrash className="icon" onClick={()=>deletePost(id)} />
       </div>
      )}
      <p>posted by @{postObject.username}</p>
      <h2>{postObject.title}</h2>
      <span>posted on {postObject.createdAt}</span>
      <p>{postObject.postText}</p>
      <div className="likes">
        <FaRegStar className="icon" />
       {likes.length}
      </div>
      <h3>{comments.length} comments:</h3>
      <ul>
        {comments.map((comment, index) => {
          return (
            <li className="comment" key={index}>
             <strong>@{comment.username}: </strong>{comment.commentBody}
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
