import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Food from '../Navigation/Navbar/Food/Food'
import Contacts from '../Navigation/Navbar/Contacts/Contacts'
import Address from '../Navigation/Navbar/Address/Address'
import Profile from '../Navigation/Navbar/Profile/Profile'
import Main from '../Main/Main'
import Navbar from '../Navigation/Navbar/Navbar'
import Register from '../../SignIn/Register/Register'
import CreateFood from '../CreateFood'
import '../../App.csss/App.css'
import Sign from '../../SignIn/Singup/Sign'
import Basket from '../Navigation/Navbar/Profile/Basket/Basket'
const App = () => {
  return (
    <div>
      <Navbar/>
      <div className='container'>
      <Routes>
      <Route path='/sign' element={<Sign/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Main />} />
      <Route path='/food' element={<Food />} />
      <Route path='/contact' element={<Contacts />} />
      <Route path='/address' element={<Address />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/createFood' element={<CreateFood />} />
      <Route path='/basket' element={<Basket />} />
      </Routes>
      </div>

    </div>
  )
}

export default App
