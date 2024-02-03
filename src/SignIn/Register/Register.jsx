

// import axios from 'axios';
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {FoodService, UsersService} from '../../Service/Service'
// import { useForm } from 'react-hook-form';
// import cls from './Register.module.scss'
// function Register(props) {
//   const navigate = useNavigate();
//   const { register, handleSubmit, reset } = useForm();

//   const handleSetPosts = async (data) => {
//     const post = {
//       login: data.login,password: data.password,isAdmin: false, basket: [], profileImg: 'https://thumbs.dreamstime.com/b/%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BC%D0%B5%D1%81%D1%82%D0%BE%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8F-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-%D1%81%D0%B5%D1%80%D1%8B%D0%B9-%D1%81%D0%B8%D0%BB%D1%83%D1%8D%D1%82-%D0%BD%D0%B5%D1%82-%D1%84%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B8-173997790.jpg',id: Date.now(),
//     };
//     const response = await UsersService.PostUsers(post)
//     console.log(response.data);
//     reset();
//     navigate('/');
//   };
//   return (
//     <div className={cls.boss_div}>
//       <form onSubmit={handleSubmit(handleSetPosts)} className={cls.form}>
//         <input {...register('login')} placeholder="Login" />
//         <input {...register('password')} placeholder="Password" />

//         <button type="submit">Отправить</button>
//         <div className="text"><p>Уже есть аккаунт?</p><Link to={'/sign'}>Войти</Link></div>
//       </form>
      
//     </div>
//   );
// }

// export default Register;



import React, { useState } from 'react';
import cls from './Register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Register = () => {
  const { register, handleSubmit, reset, setError, clearErrors, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const checkUserExistence = async (login, email) => {
    try {
      const loginResponse = await axios.get(`http://localhost:3000/users?login=${login}`);
      const emailResponse = await axios.get(`http://localhost:3000/users?email=${email}`);
      return {
        loginExists: loginResponse.data.length > 0,
        emailExists: emailResponse.data.length > 0,
      };
    } catch (error) {
      console.error(error);
      return { loginExists: false, emailExists: false };
    }
  };

  const handleSetPosts = async (data) => {
    
    if (data.login.length < 3 || data.login.length > 20) {
      setError('login', { type: 'manual', message: 'Логин должен содержать от 3 до 20 символов' });
      return;
    }

    if (data.password.length < 5) {
      setError('password', { type: 'manual', message: 'Пароль должен содержать не менее 5 символов' });
      return;
    }

    const userExists = await checkUserExistence(data.login, data.email);

    if (userExists.loginExists) {
      setError('login', { type: 'manual', message: 'Пользователь с таким логином уже существует' });
      setErrorMessage('Пользователь с таким логином уже существует');
      return;
    }

    if (userExists.emailExists) {
      setError('email', { type: 'manual', message: 'Пользователь с таким email уже существует' });
      setErrorMessage('Пользователь с таким email уже существует');
      return;
    }

    // Проверка на совпадение паролей
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { type: 'manual', message: 'Пароли не совпадают' });
      setErrorMessage('Пароли не совпадают');
      return;
    }

    const post = {
      login: data.login,
      password: data.password,
      email: data.email,
      isAdmin: false,
      id: Date.now(),
    };

    try {
      const response = await axios.post("http://localhost:3000/users", post)
      reset();
      clearErrors();
      navigate('/sign');
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage('Ошибка при регистрации. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <div className={cls.main}>
      <form onSubmit={handleSubmit(handleSetPosts)} className={cls.card}>
        <h1>Регистрация</h1>
        <input
          {...register('login', {
            required: 'Логин обязателен',
            minLength: { value: 3, message: 'Логин должен содержать от 3 символов' },
            maxLength: { value: 20, message: 'Логин должен содержать не более 20 символов' },
          })}
          placeholder="Логин"
        />
        {errors.login && <p className={cls.errorMessage}>{errors.login.message}</p>}
        <input
          {...register('email', {
            required: 'email обязателен',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              message: 'Некорректный формат email',
            },
          })}
          placeholder="Email"
        />
        {errors.email && <p className={cls.errorMessage}>{errors.email.message}</p>}
          <div>
          <input
            {...register('password', {
              required: 'Пароль обязателен',
              minLength: { value: 5, message: 'Пароль должен содержать не менее 5 символов' },
            })}
            type="password"
            placeholder="Пароль"
          />
          <input
            {...register('confirmPassword', { required: 'Подтвердите пароль' })}
            type="password"
            placeholder="Подтвердите пароль"
            />
        </div>
        <div className={cls.pas}>
          {errors.password && <p className={cls.errorMessage}>{errors.password.message}</p>}
          {errors.confirmPassword && <p className={cls.errorMessage}>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">Зарегистрироваться</button>
        <p>Есть аккаунт?</p> <Link to="/sign"><span className={cls.link}>Войти</span></Link>
      </form>
    </div>
  );
}

export  default Register;
