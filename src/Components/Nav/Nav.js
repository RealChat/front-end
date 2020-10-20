import React, { Component, useContext } from 'react'
import './Nav.css'
import { FaBeer, FaHome, FaUserAlt, FaUsers } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi'
import Tab from "./Tab"
import { useHistory, Link } from 'react-router-dom';
import Context from '../../Context';

function Nav() {
    const history = useHistory()
    const {setUser} = useContext(Context);
    return (
        <div className="Nav">
            <Link to='/'><Tab label="Home" icon={FaHome} size={32} /></Link>
            <Link to='/profile'><Tab label="Profile" icon={FaUserAlt} size={32} /></Link>
            <Tab onClick={()=>{
                localStorage.removeItem('user')
                setUser(null);
                history.push('/login')
            }} label="Logout" icon={FiLogOut} size={32} />
        </div>
    )
}

export default Nav