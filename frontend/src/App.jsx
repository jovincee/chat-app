import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Login from './pages/login/Login.jsx';
import SignUp from './pages/signup/Signup.jsx';

function App() {


  return (
    //full height, padding of 4 on all directions
    //call Login page first
    <div className='p-4 h-screen flex items-center justify-center'>
      {/* <Login/> */}
      <SignUp/>
      
    </div>
  )
}

export default App;
