import React from "react";
import { Link } from "react-router-dom";

const FormFields = ({ post }) => {
  return (
    <div className="form">
      <label htmlFor="title">*Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        defaultValue={post.title}
        required
      />
      <label htmlFor="postText">*Text:</label>
      <textarea
        name="postText"
        id="postText"
        cols="10"
        rows="8"
        defaultValue={post.postText}
        required
      ></textarea>
      <p>* required</p>
      <div>
        <Link className="button cancel" to="/">
          Cancel
        </Link>
        <button type="submit">Save</button>
      </div>
    </div>
  );
};

export default FormFields;
