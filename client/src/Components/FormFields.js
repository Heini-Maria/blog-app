import React from "react";
import { Link } from "react-router-dom";

const FormFields = () => {
  return (
    <div className="form">
      <label htmlFor="title">*Title:</label>
      <input type="text" name="title" id="title" required />
      <label htmlFor="text">*Text:</label>
      <textarea name="text" id="text" cols="10" rows="8" required></textarea>
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
