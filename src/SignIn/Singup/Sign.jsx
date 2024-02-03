import React from 'react';
import cls from './Sign.module.scss';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Signin = () => {
  const user = localStorage.getItem('user');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');

  const onSubmit = async (body) => {
    try {
      setIsLoading(true);

     
      const response = await axios.get(`http://localhost:3000/users?email=${body.email}`);

      if (response.data.length > 0) {
        const userExists = response.data[0];

        if (userExists.password === body.password) {
          localStorage.setItem('user', JSON.stringify(userExists));
          navigate('/');
        } else {
          setErrorMessage('Неверный пароль, повторите попытку');
        }
      } else {
        setErrorMessage('Пользователь с таким email не найден');
      }
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        setErrorMessage('Неверный пароль, повторите попытку');
      } else if (error.response?.status === 404) {
        setErrorMessage('Пользователь не найден');
      } else {
        setErrorMessage('Что-то пошло не так, попробуйте снова');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <div className={cls.root}>
      <div className={cls.card}>
        <h1>Войти</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={cls.login}>
            <input
              type="email"
              placeholder="Ваш Email"
              {...register('email', {
                required: 'Email обязателен',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: 'Введите корректный email',
                },
              })}
            />
            {errors.email && <span className={cls.errorMessage}>{errors.email.message}</span>}
          </div>
          <div className={cls.password}>
            <input
              type="password"
              placeholder="Пароль"
              {...register('password', {
                required: 'Пароль обязателен',
                minLength: {
                  value: 6,
                  message: 'Пароль должен быть не менее 6 символов',
                },
              })}
            />
            {errors.password && <span className={cls.errorMessage}>{errors.password.message}</span>}
            {errorMessage && <span className={cls.errorMessage}>{errorMessage}</span>}
            <button type="submit" disabled={isLoading}>
              Войти
            </button>
          </div>
        </form>
        <div className={cls.link}>
          У вас нет аккаунта? <Link to="/register"><div className={cls.signUp}>Зарегистрируйтесь</div></Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;