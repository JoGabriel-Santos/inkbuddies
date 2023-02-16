import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "../actions/users";
import { fetchPenpals } from "../actions/penpal";

import Friend from "../components/Friend";
import Letter from "../components/Letter";
import Message from "../components/Message";

function Friends() {
    const dispatch = useDispatch();

    const [penpalMessages, setPenpalMessages] = useState([]);

    const userLogged = JSON.parse(localStorage.getItem("profile"));
    const penpals = useSelector((state) => state.penpals);

    penpals?.map((penpal) => {

        if (penpal.penpal_1 === userLogged.result._id) {
            dispatch(getUser(penpal.penpal_2));

        } else {
            dispatch(getUser(penpal.penpal_1));
        }
    })

    function handleGetPenpalInfo(penpalId) {

        penpals?.map((penpal) => {

            if (penpal.penpal_1 === penpalId || penpal.penpal_2 === penpalId) {
                setPenpalMessages(penpal);
            }
        })
    }

    useEffect(() => {

        dispatch(fetchPenpals(userLogged.result._id));
    }, [])

    return (
        <section className="section-friends">
            <div className="all-friends">
                <div className="friends-header">
                    <div className="friends-quantity">
                        <i className="bi bi-people-fill"></i>
                        <h2>Friends - {penpals?.length}</h2>
                    </div>

                    <i className="bi bi-sort-down filter"></i>
                </div>

                <div className="friend-list">
                    <Friend penpalId={handleGetPenpalInfo} penpalsQuantity={penpals.length}/>
                </div>
            </div>

            <div className="messages">
                <div className="user">
                    <div className="user--info">
                        <h2 className="user-name">Gabriello</h2>

                        <div className="additional-info">
                            <div className="country">
                                <i className="bi bi-geo-alt-fill"></i>
                                <h2 className="user-info--text">Brazil</h2>
                            </div>

                            <div className="birth">
                                <i className="bi bi-balloon-fill"></i>
                                <h2 className="user-info--text">Jan 20th (22)</h2>
                            </div>

                            <div className="gender">
                                <i className="bi bi-gender-male"/>
                                <h2 className="user-info--text">Male</h2>
                            </div>
                        </div>
                    </div>

                    <div className="user-photo">
                        <img src={require("../util/profile-gabriellou.png")} alt=""/>
                    </div>
                </div>

                <Letter/>

                <div className="container grid grid--3-cols margin-bottom-md">
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                </div>
            </div>
        </section>
    );
}

export default Friends;