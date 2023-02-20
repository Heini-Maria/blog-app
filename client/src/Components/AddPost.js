import React from "react";
import FormFields from "./FormFields";
import axios from "axios";

const AddPost = () => {
  const onSubmit = (obj) => {
    axios.post(`http://localhost:3001/posts`, obj).then((res) =>{
      console.log('it worked');
    })
  }
  return (
    <div className="new-post-view">
      <h2>New Fact</h2>
      <form action="/" method="POST" onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {
          title: formData.get("title") ?? "",
          username: formData.get("username") ?? "",
          postText: formData.get("postText") ?? ""
        }
        onSubmit(obj)
      }}>
        <FormFields post={""} />
      </form>
    </div>
  );
};

export default AddPost;
