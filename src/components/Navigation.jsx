// src/components/Navigation.jsx

import React from 'react';
import { signOut } from "next-auth/react";

//import { Link } from 'react-router-dom';
import Link from "next/link"

import './Navigation.Module.css';

const Navigation = () => {
    return (
        <div className="navbar">
            <button className="nav-item">
                <Link href="/Home" passHref>
                    <div className="nav-link">
                        <img src="https://cdn.icon-icons.com/icons2/3831/PNG/512/mail_icon_234081.png" alt="mail logo" className="mail-logo" />
                        <span>My Profile</span>
                    </div>
                </Link>
            </button>
            <button className="nav-item">
                <Link href="/FindARoommate" passHref>
                    <div className="nav-link">
                        <img src= 'https://cdn.iconscout.com/icon/free/png-256/free-message-icon-download-in-svg-png-gif-file-formats--text-communication-conversation-chat-pack-sign-symbols-icons-1976874.png' alt="msg logo" className ="msg-logo" />
                        <span>Roommates</span>
                    </div>
                </Link>
            </button>

           <button
                className="nav-item"
                onClick={(e) => {
                    e.preventDefault(); // Prevent default button behavior
                    signOut({ callbackUrl: "/" }); // Logs out the user and redirects
                }}
            >
                <div className="Logout">
                    <img
                        src="https://cdn.iconscout.com/icon/free/png-256/free-logout-icon-download-in-svg-png-gif-file-formats--sign-out-exit-log-user-interface-pack-icons-1502401.png"
                        alt="logout logo"
                        className="mail-logo"
                    />
                    <span>Log Out</span>
                </div>
            </button>
        </div> 
    );
};

export default Navigation;