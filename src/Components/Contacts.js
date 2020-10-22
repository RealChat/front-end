import React, { Component, useState, useContext } from "react";
import "./CSS/Contacts.css";
import { Context } from "../Context";
import { useEffect } from "react";

function Contacts() {
    const { contacts, setCurrentContact, currentContact } = useContext(Context);
    console.log(contacts);
    return (
        <div class="container">
            <div className="search"></div>
            <div className="friends">
                {contacts.length == 0 && <div>Loading contacts...</div>}
                {contacts.map((user) => {
                    return (
                        <div
                            className={`${
                                user.uid == currentContact
                                    ? "active_contact"
                                    : ""
                            } contact`}
                            onClick={(e) => setCurrentContact(user.uid)}
                        >
                            {user.name} - {user.online ? "On" : "Off"}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default Contacts;
