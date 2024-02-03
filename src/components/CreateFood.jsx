import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FoodService } from '../Service/Service';
import { useForm } from 'react-hook-form';

function CreateFood(props) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const handleSetPosts = async (data) => {
    const post = {
      title: data.title,desc: data.description,img: data.photo,price: data.price,id: Date.now(),
    };
    const response = await FoodService.PostPost(post);
    console.log(response.data);
    reset();
    navigate('/food');
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleSetPosts)}>
        <input {...register('title')} placeholder='title' />
        <input {...register('description')} placeholder="description" />
        <input {...register('price')} placeholder="price" />
        <input {...register('photo')} placeholder="photo" />

        <button type="submit">Отправить</button>
      </form>
      {/* {posts &&
        posts.map(({ author, id, title }) => (
          <div key={id}>
            author: <Link to={`/${id}`}> {author}</Link> title: {title}
          </div>
        ))} */}
    </div>
  );
}

export default CreateFood;
