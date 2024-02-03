import React, { useState } from 'react';
import cls from './Navbar.module.scss'
import { Link, NavLink } from 'react-router-dom';
import { FoodService } from '../../../Service/Service';

function Navbar(props) {
    const [inp1, setInp1] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const handleGetFood = async () => {
        const { data } =await FoodService.GetPost()
        console.log(data);
    }
    return (
        <div className={cls.nav}>
                <div className={cls.logo}>
                <h4><NavLink to={'/'} className={cls.navlink}>Вкус и Качество</NavLink></h4>
                </div>
                <div className={cls.navl}>
                <ul>
                    <li><Link to={'/food'} className={cls.navlink}>Еда</Link></li>
                    <li><Link to={'/contact'} className={cls.navlink}>Контакты</Link></li>
                    <li><Link to={'/address'} className={cls.navlink}>Адрес</Link></li>
                    {/* {/* <li><Link to={'/delivery'} className={cls.navlink}>Доставка</Link></li> */}
                    {/* <li><Link to={'/sales'} className={cls.navlink}>Акции</Link></li> */}
                    <li><Link to={'/profile'} className={cls.navlink}>Профиль</Link></li> 
                    {
                        isAdmin && 

                    <li><Link to={'/createFood'} className={cls.navlink}>Добавить еду</Link></li>
                    }
                </ul>
                </div>
                <div className={cls.search}>
                    <input placeholder='Название еды:' type='text' value={inp1} onChange={(e) => setInp1(e.target.value)}/>
                    <button onClick={handleGetFood}>Ок</button>
                    {/* <button className={cls.register} >Reg</button> */}
                    
                            <Link to={'/register'} className={cls.register}>Reg</Link>
                    
                </div>
                
        </div>
    );
}

export default Navbar;