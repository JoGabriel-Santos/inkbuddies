import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "../actions/users";
import { fetchPenpals, sendLetter } from "../actions/penpal";

import Friend from "../components/Friend";
import Letter from "../components/Letter";
import Message from "../components/Message";

import { calculateDistance } from "../helpers/calculateDistance";

function Friends() {
    const dispatch = useDispatch();

    const [penpalInfo, setPenpalInfo] = useState({ penpal: {}, penpalMessages: [{}] });
    const [penpalDistance, setPenpalDistance] = useState({});
    const [penpalSelected, setPenpalSelected] = useState();
    const [showMessages, setShowMessages] = useState([]);

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

        penpals?.map((penpal) => {

            if (userLogged.result._id === penpal.penpal_1 && penpalInfo._id === penpal.penpal_2 ||
                userLogged.result._id === penpal.penpal_2 && penpalInfo._id === penpal.penpal_1) {

                setShowMessages(penpal.letters);
            }
        })

        setPenpalSelected(penpalInfo._id);

        setPenpalDistance(
            calculateDistance(
                penpalInfo.latLong.lat, penpalInfo.latLong.lng,
                userLogged.result.latLong.lat, userLogged.result.latLong.lng
            ))
    }

    function handleMessageSend(message) {

        if (message.sendDate !== '') {

            dispatch(sendLetter({ idPenpal: penpalInfo.penpalMessages._id, message: message }));
        }
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
                    <Friend penpalId={handleGetPenpalInfo} penpalSelected={penpalSelected} penpalsQuantity={penpals.length}/>
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

                            <div className="distance">
                                <i className="bi bi-arrow-left-right"></i>
                                <h2 className="user-info--text">{penpalDistance?.distance}km away</h2>
                            </div>

                            <div className="time-arrive">
                                <i className="bi bi-clock-history"></i>
                                <h2 className="user-info--text">Letter delivers in {penpalDistance?.hours} hours</h2>
                            </div>
                        </div>
                    </div>

                    <div className={`user-photo ${displayIcons}`}>
                        <img src={penpalInfo?.profilePicture} alt=""/>
                    </div>
                </div>

                <Letter
                    penpalInfo={penpalInfo}
                    senderInfo={
                        {
                            country: userLogged.result.country,
                            sender: userLogged.result.name
                        }
                    }
                    timeToArrive={penpalDistance}
                    message={handleMessageSend}/>

                <div className="container grid grid--3-cols margin-bottom-md">
                    {
                        showMessages?.map((message, key) => (
                            <Message message={message} key={key}/>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}

export default Friends;