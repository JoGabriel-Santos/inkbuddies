import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "../actions/users";
import { fetchPenpals } from "../actions/penpal";

import Friend from "../components/Friend";
import Letter from "../components/Letter";
import Message from "../components/Message";

function Friends() {
    const dispatch = useDispatch();

    const [penpalInfo, setPenpalInfo] = useState({ penpal: {}, penpalMessages: [{}] });

    const userLogged = JSON.parse(localStorage.getItem("profile"));
    const penpals = useSelector((state) => state.penpals);

    let displayIcons = "";

    if (penpalInfo.name === undefined) {
        displayIcons = "none";
    }

    useMemo(() => {
        penpals?.map((penpal) => {

            if (penpal.penpal_1 === userLogged.result._id) {
                dispatch(getUser(penpal.penpal_2));

            } else {
                dispatch(getUser(penpal.penpal_1));
            }
        })
    }, [penpals])

    function handleGetPenpalInfo(penpalInfo) {

        penpals?.map((penpal) => {

            if (penpal.penpal_1 === penpalInfo._id || penpal.penpal_2 === penpalInfo._id) {

                setPenpalInfo({ ...penpalInfo, penpalMessages: penpal });
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
                        <h2 className="user-name">{penpalInfo?.name}</h2>

                        <div className={`additional-info ${displayIcons}`}>
                            <div className="country">
                                <i className="bi bi-geo-alt-fill"></i>
                                <h2 className="user-info--text">{penpalInfo?.country}</h2>
                            </div>

                            <div className="birth">
                                <i className="bi bi-balloon-fill"></i>
                                <h2 className="user-info--text">{penpalInfo?.birthday}</h2>
                            </div>

                            <div className="gender">
                                {penpalInfo?.gender === "Male" && <i className="bi bi-gender-male"></i>}
                                {penpalInfo?.gender === "Female" && <i className="bi bi-gender-female"></i>}
                                {penpalInfo?.gender === "Non-binary" && <i className="bi bi-gender-ambiguous"></i>}

                                <h2 className="user-info--text">{penpalInfo?.gender}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="user-photo">
                        <img src={penpalInfo?.profilePicture} alt=""/>
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

export default React.memo(Friends);