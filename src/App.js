import React, { Component, useState, useEffect, useContext } from "react";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import ChatApp from "./Components/ChatApp";

// Uncaught SyntaxError: Unexpected token '!'

// React context API

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SocketClient from "./SocketClient";
import Context from "./Context";

export function App() {
    const { setUser, user, setContacts, setMessages } = useContext(Context);
    useEffect(() => {
        let u = localStorage.getItem("user");
        if (u) {
            console.log(u);
            u = JSON.parse(u);
            setUser(u);
        }
        SocketClient.on("allUsers", (users) => {
            let allUsers = users.map((user) => ({ ...user, uid: user._id }));
            allUsers = allUsers.filter((us) => us.uid !== u._id);
            setContacts(allUsers);
        });
        SocketClient.on("receiveMessage", (data) => {
            let from = data.from;
            console.log(data);
            setMessages((prev) => {
                if (!prev[from]) {
                    prev[from] = [];
                }
                return {
                    ...prev,
                    [from]: [...prev[from], { text: data.text }],
                };
            });
        });
    }, []);
    useEffect(() => {
        if (user) {
            SocketClient.emit("join", user);
        }
    }, [user]);
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
                        <Profile />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
