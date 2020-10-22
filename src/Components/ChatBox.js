import React, { useContext, useState } from "react";
import "./CSS/ChatBox.css";
import { Context } from "../Context";
import socket from "../SocketClient";

function ChatBox() {
    const { user } = useContext(Context);
    const [text, changeText] = useState("");
    const { contacts, messages, currentContact, setMessages } = useContext(Context);
    const CONTACT = contacts.find((user) => user.uid == currentContact) || {};
    const MESSAGES = messages[currentContact] || []

    function send() {
        socket.emit("message", { text });
        changeText("");
        setMessages(prev=>{
            if(!prev[currentContact]){
                prev[currentContact] = []
            }
            return {
                ...prev, 
                [currentContact] : [...prev[currentContact], {text, user:true}]
            }
        })
    }
    return (
        <div className="chatbox">
            <header>
                <h1 style={{ marginLeft: 10 }}>{CONTACT.name}</h1>
            </header>
            <div className="sections">
                {MESSAGES.map((message) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                className={`${
                                    message.user
                                        ? "message_sender"
                                        : "message_receiver"
                                } message`}
                            >
                                {message.text}
                            </div>
                            {/* {
                                    message.user && <div className="message message_sender">{message.text}</div>
                                }
                                {
                                    !message.user && <div className="message message_receiver">{message.text}</div>
                                } */}
                        </div>
                    );
                })}
            </div>
            <footer>
                {/* <div id="search-container">
                    <div>
                        <div class="material-icons icon">search</div>
                            <input id="search" type="text" placeholder="item..." />
                    </div>
                </div> */}
                <div id="text-container">
                    <input
                        value={text}
                        onChange={(e) => changeText(e.target.value)}
                        type="text"
                        placeholder="Type a message.."
                    />
                    <button onClick={send}>send</button>
                </div>
                <div id="icon">icon</div>
            </footer>
        </div>
    );
}

export default ChatBox;
