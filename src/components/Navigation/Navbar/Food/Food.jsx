import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import cls from './Food.module.scss'
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FoodService, UsersService } from '../../../../Service/Service';
import BasicExample from '../../../mini-components/Cards';
import axios from 'axios';
function Food(handleButtonClick) {
    const [Foods, setFoods] = useState([])
    const [users, setUsers] = useState([])


    const handleGetUser = async () => {
      const { data } = await UsersService.GetUsers();
      console.log( data );  
      setUsers(data)
    }
    const handleSetPosts = async () => {
        const { data } = await FoodService.GetPost()
        setFoods(data)
        console.log(data);
      };
     const hangleGetBusket = async ()=>{
      const {data} = await axios("http://localhost:3000/basket")
      console.log(data);
     } 

      useEffect(() => {
        handleSetPosts()
        hangleGetBusket()
        handleGetUser()
      }, [])
  return (
    <div className={cls.boss}>
        {Foods && Foods.map((el) => {
            return (
            <BasicExample el={el} handleSetPosts={handleSetPosts}/>)
        })}
        {/* {users && users.map((elem) => {
          return (
            <BasicExample elem={elem} handleGetUser={handleGetUser}/>
          )
        })} */}
        {handleButtonClick ? console.log('adsADSFSDGRf') : console.log('sadsfdgfhg')}
        {/* <button className={cls.buyBtn} onClick={() => {
          console.log('сработало');
        }} >Купить</button>} */}
    </div>
  );
}

export default Food;