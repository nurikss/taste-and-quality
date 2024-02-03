import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Posts({ author, handledeletePost, id, title }) {
  return (
    <div>
      author: <Link to={`/${id}`}> {author}</Link> title: {title}
      <button onClick={() => handledeletePost(id)}>delete</button>
    </div>
  );
}

export default Posts;
