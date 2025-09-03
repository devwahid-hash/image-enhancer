import React from 'react'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import ForgetPassword from './pages/ForgetPassword'


const App = () => {
   getCurrentUser()
   const {userData}=useSelector(state=>state.user)
  return (
    <div>
    <Routes>
       <Route path='/' element={userData?<Home/>:<Navigate to="/signin"/>}/>
       <Route path='forgetpassword' element={!userData?<ForgetPassword/>:<Navigate to="/"/>}/>
       <Route path='/register' element={!userData?<Register/>:<Navigate to="/"/>}/>
       <Route path='/signin' element={!userData?<SignIn/>:<Navigate to="/"/>}/>
    </Routes>
    </div>
  )
}

export default App