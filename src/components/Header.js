import React from "react";
import arrow from "../assets/icons/bottom-arrow.svg";

function Header() {
    return (
        <div id="home" className="header">
            <div className="container">
                <div className="header-content">
                    <div>
                        <p>Movie Award</p>
                        <p>Entrepreneur's Voice</p>
                        <a href="#main-view" className="start-voting">
                            Start Voting Now
                        </a>
                    </div>
                    <a className="header-arrow" href="#main-view">
                        <img src={arrow} alt="Arrow" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Header;
