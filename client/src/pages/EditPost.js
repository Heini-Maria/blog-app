import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormFields from "../Components/FormFields";
import { accessToken } from "../helpers/utils";
import axios from "axios";

const EditPost = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    if (!accessToken()) {
      navigate("/login");
    } else {
      axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
        setPost(response.data);
      });
    }
  }, []);

  const editPost = (obj, id) => {
    axios
      .put(`http://localhost:3001/posts/${id}`, obj, {
        headers: { accessToken: accessToken() },
      })
      .then(() => {
        navigate(`/details/${id}`);
      });
  };

  return (
    <div className="new-post-view">
      <h2>Edit Post</h2>
      <form
        action="/"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            title: formData.get("title") ?? "",
            postText: formData.get("postText") ?? "",
          };
          editPost(obj, id);
        }}
      >
        <FormFields post={post} />
      </form>
    </div>
  );
};

export default EditPost;
