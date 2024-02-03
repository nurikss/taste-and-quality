import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SinglePost(props) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const getSinglePost = async () => {
    const { data } = await axios(`http://localhost:3000/posts/${id}`);
    setAuthor(data.author);
    setTitle(data.title);
  };
  useEffect(() => {
    getSinglePost();
  }, []);
  return (
    <div>
      этот автор с ID {id}
      Его зовут {author}
      Он использует телефон марки {title}
    </div>
  );
}

export default SinglePost;
