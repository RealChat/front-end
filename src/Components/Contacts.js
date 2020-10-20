import React, { Component, useState, useContext } from 'react'
import './CSS/Contacts.css'
import { Context } from '../Context'

function Contacts() {
    const [count, setCount] = useState(0)
    const { contacts, setCurrentContact, currentContact } = useContext(Context);
    const update = () => {
        setCount(count + 1);
    }
    return (
        <div class="container">
            <div className="search"></div>
            <div className="friends">
                {contacts.length == 0 && <div>Loading contacts...</div>}
                {contacts.map(user => {
                    return <div className={`${user.uid == currentContact ? 'active_contact' : ''} contact`} onClick={e => setCurrentContact(user.uid)} >{user.name}</div>
                })}
            </div>
        </div>
    )
}
export default Contacts
