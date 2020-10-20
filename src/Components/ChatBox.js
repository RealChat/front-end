import React, { useContext, useState } from 'react'
import './CSS/ChatBox.css'
import { Context } from "../Context"
import SocketClient from '../SocketClient'

function ChatBox(){ 
        const {user} = useContext(Context)
        const [text, changeText] = useState("")
        const {contacts,messages,currentContact} = useContext(Context);
        const CONTACT = contacts.find(user=>user.uid==currentContact) || {};
        const MESSAGES = messages.find(conv=>conv.uid==currentContact)?.messages || [{}];
        
        function send(){
            SocketClient.sendMessage(text);
            changeText("")
            //send it to backend
            /*a post request with body {
                id:sender,
                id of receiver,
                text,
                time
            }*/
        }
        return (
            <div className="chatbox">
                <header>
                    <h1>{CONTACT.name}</h1>
                </header>
                <div className="sections">
                    {
                        MESSAGES.map(message=>{
                            return <div style={{display:"flex",flexDirection:"column"}}>
                                <div className={`${message.user ? 'message_sender':'message_receiver'} message`}>{message.text}</div>
                                {/* {
                                    message.user && <div className="message message_sender">{message.text}</div>
                                }
                                {
                                    !message.user && <div className="message message_receiver">{message.text}</div>
                                } */}
                            </div>
                        })
                    }
                </div>
                <footer>
               {/* <div id="search-container">
                    <div>
                        <div class="material-icons icon">search</div>
                            <input id="search" type="text" placeholder="item..." />
                    </div>
                </div> */}
                <div id="text-container">
                    <input value={text} onChange={e=>changeText(e.target.value)} type="text" placeholder="Type a message.."/>
                   <button onClick={send}>send</button> 
                </div>
                <div id="icon">icon</div>
                </footer>
            </div>
        )
}

export default ChatBox
