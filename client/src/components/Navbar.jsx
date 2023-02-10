import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: "LOGOUT" });

        history.push("/signin");
        setUser(null);
    };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));

    }, [location]);

    return (
        <header className="header">
            <a className="logo-link" href="/"><h1 className="logo">InkBuddies</h1></a>

            {
                user ?
                    <>
                        <nav className="main-navigation">
                            <ul className="main-navigation-list">
                                <li><a className="main-navigation-link" href="/">Home</a></li>
                                <li><a className="main-navigation-link" href="/friends">Friends</a></li>
                                <li><a className="main-navigation-link" href="/newpal">Meet new pal</a></li>
                                <li><a className="main-navigation-link" href="/drafts">Stamps</a></li>

                                <li><a className="main-navigation-link navigation-cta" onClick={logout} href="#">Logout</a></li>
                            </ul>
                        </nav>

                        <button className="button-navigation-mobile">
                            <ion-icon className="icon-navigation-mobile" name="menu-outline"></ion-icon>
                            <ion-icon className="icon-navigation-mobile" name="close-outline"></ion-icon>
                        </button>
                    </>

                    :

                    (
                        location.pathname === "/signup" ?

                            <a className="main-navigation-link" href="/signin">Já possui uma conta?</a>
                            :
                            <a className="main-navigation-link" href="/signup">Ainda não possui uma conta?</a>
                    )
            }

        </header>
    );
}

export default Navbar;