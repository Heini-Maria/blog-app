import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPost from "./fetchPost";
import FormFields from "./FormFields";


const EditPost = () => {
  const { id } = useParams();
  const results = useQuery(["posts"], fetchPost);
  if (results.isLoading) {
    return <p>Loading...</p>;
  }
  console.log(results.data);
  const key = id - 1;
  const post = results.data[key];
return(
  <div className="new-post-view">
      <h2>Edit Post</h2>
      <form action="/" method="POST">
        <FormFields post={post}/>
      </form>
    </div>
)
}

export default EditPost;