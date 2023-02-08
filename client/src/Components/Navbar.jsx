import React from "react";

function Navbar() {

    return (
        <header className="header">
            <h1 className="logo">InkBuddies</h1>

            <nav className="main-navigation">
                <ul className="main-navigation-list">
                    <li><a className="main-navigation-link" href="/">Home</a></li>
                    <li><a className="main-navigation-link" href="/friends">Friends</a></li>
                    <li><a className="main-navigation-link" href="/newpal">Meet new pal</a></li>
                    <li><a className="main-navigation-link" href="/drafts">Drafts</a></li>

                    <li><a className="main-navigation-link navigation-cta" href="#">My profile</a></li>
                </ul>
            </nav>

            <button className="button-navigation-mobile">
                <ion-icon className="icon-navigation-mobile" name="menu-outline"></ion-icon>
                <ion-icon className="icon-navigation-mobile" name="close-outline"></ion-icon>
            </button>
        </header>
    );
}

export default Navbar;