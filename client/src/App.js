import logo from "./logo.svg";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState, useEffect } from 'react';

//MY PAGES
import MyBody from "./Site/homepage";
import MyNavbar from "./Site/navbar";
import LoginPage from "./Site/loginpage";
import { LoginForm } from "./Site/login";
import Employee from "./Site/employee";
import Farmer from "./Site/farmer";
import SigninPage from './Site/signinpage';
import API from "./API.js"
import MyPage from './Site/mypage';


function App() {
  const [user, setUser] = useState("");
  const [isLogged, setLogged] = useState(false);
  const [message, setMessage] = useState({type:"", msg:""})
    
  
  //LOGIN LOGOUT

  useEffect(() => {
    const checkAuth = async () => {
      try {        
        const user = await API.getAdmin();
        setUser(user);
        setLogged(true);
      } catch (err) {
        setLogged(false)
        console.log(err.error);
      }
    };
    checkAuth();


  }, []);


  const doLogin = async (credentials) => {
    try {   
      const user = await API.login(credentials);
      setUser(user);
      setLogged(true);
      console.log(user);
    }
    catch (err) {
      setMessage({type:"danger", msg:`Login non effettuato. ${err}`})
      throw err;
    }
  }
  
  const doLogout = async () => {
    await API.logout()
    //Inizializzo gli stati
    setLogged(false);
    setUser("");
    setMessage({type:"success", msg:"Logout effettuato correttamente"})
  }
  

  return (
  <Router>
      <MyNavbar logout={doLogout} isLogged = {isLogged}/>
      <Container fluid className="below-nav vh-100">
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />          
              
          {/* Generic Error Page */}
          <Route path='/error' element = {
            <ErrorPage/>
          }/>
          
            {/*Route di Login*/}
          <Route path="/sign-in" element = {<SigninPage/>}/> 
          
          <Route path ="/loginpage/" element = {isLogged?<Navigate replace to="/home"/> : <LoginForm login = {doLogin}/>} />
            {/*Route di Registrazione*/}
          
          {/* BODY PER HOMEPAGE */}

          //<Route exact path="/home" element={<MyBody />} />
          <Route exact path="/home" element = {!isLogged? <MyBody/>
          :
          <MyPage user = {user} />}
          />
          {/**Route for the main page of the shop employee */}
          <Route exact path="/employee" element={<Employee />} />
          {/**Route for the main page of the shop employee */}
          <Route exact path="/farmer" element={<Farmer />} />
          
        </Routes>

      </Container>
    </Router>
    
  );
}
function ErrorPage() {
  return (
    <Container fluid className='center vh-100 below-nav'>
      <h1>Page not found</h1>
      <Link to='/'>Go Back to Home</Link>
    </Container>
  )
}

export default App;
