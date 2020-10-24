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
import sound from "./helpers/sound";
import sounds from "./helpers/sound";

export function App() {
    const {
        setUser,
        user,
        setContacts,
        setMessages,
        currentContact,
        setCurrentContact,
    } = useContext(Context);
    useEffect(() => {
        let u = localStorage.getItem("user");
        if (u) {
            console.log(u);
            u = JSON.parse(u);
            setUser(u);
        }
        SocketClient.on("allUsers", (users) => {
            if(users.length==0){
                setContacts([])
                return;
            }
            let allUsers = users.map((user) => ({ ...user, uid: user._id }));
            setContacts(allUsers);
            setCurrentContact(allUsers[0].uid);
        });
        SocketClient.on("newUser", (userId) => {
            setContacts((users) =>
                users.map((e) => {
                    return e.uid === userId ? { ...e, online: true } : e;
                })
            );
        });
        SocketClient.on("userLeft", (userId) => {
            setContacts((users) =>
                users.map((e) => {
                    return e.uid === userId ? { ...e, online: false } : e;
                })
            );
        });
        SocketClient.on("receiveMessage", (data) => {
            sounds.NEW_MESSAGE.play();
            let from = data.from;
            console.log(data);
            setMessages((prev) => {
                if (!prev[from]) {
                    prev[from] = [];
                }
                return {
                    ...prev,
                    [from]: [...prev[from], { text: data.text, unread: true }],
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
