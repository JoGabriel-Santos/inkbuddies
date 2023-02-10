import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("profile"));

    return (
        <React.Fragment>
            {
                user ? (
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
                                <img className="hero-image" src={ require("../util/logo.png") } alt=""/>
                            </div>
                        </div>

                        <div className="arrow-down">
                            <a href="#">
                                <i className="bi bi-caret-down-fill"></i>
                            </a>
                        </div>
                    </section>

                ) : history.push("/signin")
            }

        </React.Fragment>
    );
}

export default Home;