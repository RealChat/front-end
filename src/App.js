import React, { Component,useState, useEffect, useContext } from 'react'

import Login from './Components/Login'
import Signup from "./Components/Signup"
import Profile from './Components/Profile'
import ChatApp from './Components/ChatApp'

// Uncaught SyntaxError: Unexpected token '!'

// React context API

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SocketClient from './SocketClient'
import Context from './Context'



export function App(){
  const {setUser} = useContext(Context)
    useEffect(()=>{
      const u = localStorage.getItem('user');
      if(u){
        setUser(JSON.parse(u));
      }
    },[])
    return (
      <Router>
      <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
            <ChatApp />
        </Route>
          <Route path="/login">
            <Login />
            </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
      </Switch>
      </div>
      </Router>
    )
  }

export default App
