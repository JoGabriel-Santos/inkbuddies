import React from "react";

import Friend from "../components/Friend";
import Message from "../components/Message";

function Friends() {

    return (
        <section className="section-friends">
            <div className="all-friends">
                <div className="friends-header">
                    <div className="friends-quantity">
                        <i className="bi bi-people-fill"></i>
                        <h2>Friends - 4</h2>
                    </div>

                    <i className="bi bi-sort-down filter"></i>
                </div>

                <div className="friend-list">
                    <Friend/>
                    <Friend/>
                    <Friend/>
                    <Friend/>
                </div>

            </div>

            <div className="messages">
                <div className="user">
                    <div className="user--info">
                        <h2 className="user-name">Gabriello</h2>

                        <div className="country-and-birth">
                            <div className="country">
                                <i className="bi bi-geo-alt-fill"></i>
                                <h2 className="user-info--text">Brazil</h2>
                            </div>

                            <div className="birth">
                                <i className="bi bi-balloon-fill"></i>
                                <h2 className="user-info--text">Jan 20th (22)</h2>
                            </div>
                        </div>
                    </div>

                    <div className="user-photo">
                        <img src={ require("../util/profile-gabriellou.png") } alt=""/>
                    </div>
                </div>

                <div className="container grid grid--3-cols margin-bottom-md">
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                </div>

                <button className="send-letter">
                    <i className="bi bi-pen"></i>
                    Write a letter
                </button>
            </div>
        </section>
    );
}

export default Friends;