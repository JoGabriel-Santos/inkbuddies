import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUsers } from "../actions/users";

import Users from "../components/Users";

function Home() {
    const history = useHistory();
    const dispatch = useDispatch();

    const userLogged = JSON.parse(localStorage.getItem("profile"));
    const { users } = useSelector((state) => state.users);

    let allUsers = null;

    if (users !== null) {

        allUsers = users.filter(user => userLogged.result.email !== user.email);
    }

    useEffect(() => {
        dispatch(getUsers());

    }, []);

    return (
        <React.Fragment>
            {
                userLogged ? (
                    <>
                        <section className="section-hero">
                            <div className="hero">
                                <div className="hero-text-box">
                                    <h1 className="heading-primary">
                                        Speak your mind – <br/> one letter at a time!
                                    </h1>

                                    <p className="hero-description">
                                        Match with someone that shares your passion, write a letter and collect stamps from around the world
                                    </p>

                                    <a className="button button--full margin-right-sm" href="#">Add friend by ID</a>
                                    <a className="button button--outline" href="#">Learn more</a>
                                </div>

                                <div className="hero-image-box">
                                    <img className="hero-image" src={require("../util/logo.png")} alt=""/>
                                </div>
                            </div>

                            <div className="arrow-down">
                                <a href="#">
                                    <i className="bi bi-caret-down-fill"></i>
                                </a>
                            </div>
                        </section>

                        <section className="section-user" id="adoption">
                            <div className="container center-text">
                                <span className="subheading"> Ready to meet a new pal? </span>

                                <h2 className="heading-secondary">
                                    Start connecting with the world on InkBuddies
                                </h2>
                            </div>

                            <div className="container grid grid--3-cols margin-bottom-md">
                                {

                                    allUsers?.map((userInfo, key) => (

                                        <div key={key}>
                                            <Users userInfo={userInfo} currentUserEmail={userLogged.result.email}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </section>
                    </>
                ) : history.push("/signin")
            }

        </React.Fragment>
    );
}

export default Home;