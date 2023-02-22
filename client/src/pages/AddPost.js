import React, { useEffect, useContext } from "react";
import FormFields from "../Components/FormFields";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const AddPost = () => {
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);
  const onSubmit = (obj) => {
    axios
      .post(`http://localhost:3001/posts`, obj, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className="new-post-view">
      <h2>New Fact</h2>
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
          onSubmit(obj);
        }}
      >
        <FormFields post={""} />
      </form>
    </div>
  );
};

export default AddPost;
