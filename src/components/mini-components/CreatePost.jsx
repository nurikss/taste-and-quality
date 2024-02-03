import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreatePost({}) {
  const [posts, setPosts] = useState([]);
  const [inp2, setInp2] = useState("");
  const [inp3, setInp3] = useState("");
  const handleSetPosts = async () => {
    const { data } = await axios.post(`http://localhost:3000/posts/`, {
      title: inp2,
      author: inp3,
    });
    setPosts((prev) => [...prev, data]);
  };
  const handledeletePost = async (id) => {
    await axios.delete(`http://localhost:3000/posts/${id}`);
    setPosts((prev) => [...prev].filter((el) => el.id !== id));
  };

  const handleGetPosts = async () => {
    const { data } = await axios("http://localhost:3000/posts");
    if (data) {
      setPosts(data);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);
  return (
    <div>
      <input value={inp2} onChange={(e) => setInp2(e.target.value)} />
      <input value={inp3} onChange={(e) => setInp3(e.target.value)} />
      <button onClick={handleSetPosts}>Отправить</button>
      {posts &&
        posts.map(({ author, id, title }) => (
          <div key={id}>
            author: <Link to={`/${id}`}> {author}</Link> title: {title}
            <button onClick={() => handledeletePost(id)}>delete</button>
          </div>
        ))}
    </div>
  );
}

export default CreatePost;
