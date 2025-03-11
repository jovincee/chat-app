import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Login from './pages/login/Login.jsx';
import SignUp from './pages/signup/SignUp.jsx';
import Home from './pages/home/Home.jsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext.jsx';

function App() {
  //define authorized user here: user that has logged in
  const { authUser } = useAuthContext();


  return (
    //full height, padding of 4 on all directions
    //call Login page first
    //define routes here in App.jsx
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={authUser ? <Navigate to='/'/> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/'/> : <SignUp />} />
      </Routes>
      <Toaster />
      
    </div>
  )
}

export default App;
