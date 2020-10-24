import React, { Component, useState, useContext } from "react";
import "./CSS/Contacts.css";
import { Context } from "../Context";
import { useEffect } from "react";

function Contacts() {
    const {
        contacts,
        setCurrentContact,
        currentContact,
        messages,
    } = useContext(Context);
    return (
        <div class="container">
            <div className="search"></div>
            <div className="friends">
                {!contacts && <div>Loading contacts...</div>}
                {contacts?.length == 0 && <div>No contacts to show.</div>}
                {contacts?.map((user) => {
                    const MESSAGES = messages[user.uid] || [];
                    const unreadMessages = MESSAGES.filter((m) => m.unread)
                        .length;
                    return (
                        <div
                            className={`${
                                user.uid === currentContact
                                    ? "active_contact"
                                    : ""
                            } contact`}
                            onClick={(e) => setCurrentContact(user.uid)}
                        >
                            <div className="contact_name">
                                {user.username}
                                {user.online && <div className="online"></div>}
                            </div>
                            {unreadMessages > 0 &&
                                user.uid !== currentContact && (
                                    <div className="badge">
                                        {unreadMessages}
                                    </div>
                                )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default Contacts;
