import React from "react";
import FormFields from "./FormFields";

const AddPost = () => {
  return (
    <div className="new-post-view">
      <h2>New Fact</h2>
      <form action="/api" method="POST">
        <FormFields post={""} />
      </form>
    </div>
  );
};

export default AddPost;
