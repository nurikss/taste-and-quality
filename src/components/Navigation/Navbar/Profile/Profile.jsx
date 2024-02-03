import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UsersService } from '../../../../Service/Service';
import cls from './Profile.module.scss'
import { Link } from 'react-router-dom';

function Profile() {
    const [profileInfo, setProfileInfo] = useState([])
    const handleGetUser = async () => {
        const { data } = await UsersService.GetUsers()
        console.log(data);
        setProfileInfo(data)
    }
    useEffect(() => {
        handleGetUser()
    }, [])
    return (
        <div className={cls.prof_div}>
            {profileInfo && profileInfo.map((el) => {
                return(
                    <>
                        <img src={el.profileImg} alt="" />
                        <h2>Your login: {el.login} <br/> Your password: {el.password}</h2>
                        <ul>
                            <li><Link to={'/basket'} className={cls.basket}>Посмотреть историю покупок</Link></li>
                        </ul>
                    </>
                )
            })}
        </div>
    );
}

export default Profile;