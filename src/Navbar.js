import {React, useState, useEffect} from "react";

import Login from "./Login";
import Logout from "./Logout";
import App from "./App";

import logo from './logo.svg';

import Cookies from 'js-cookie';

import './App.css'

const Navbar = () => {
  const [token, setToken] = useState('')
  useEffect(() => {
    
    if (Cookies.get('token')){
      setToken(Cookies.get('token'))
    }

  }, []);

  return(
    <>
      {token ? 
        <>
          <br/>
          <Logout/>
          <App />
        </>
        :
        <>
          <br/>
          <img src={logo} alt="Logo FIUBA" className="logo-img" />
          <div className="Title center">ASISTENCIA</div>
          <Login />
        </>
      }
      <br/>
    </>
  )
};

export default Navbar;
