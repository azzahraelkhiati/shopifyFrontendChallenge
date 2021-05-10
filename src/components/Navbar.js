import React from "react";
import logo from "../assets/images/logo.png";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-item">
                    <a href="#home">
                        <img src={logo} alt="Logo" /> MOVIE AWARD
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
