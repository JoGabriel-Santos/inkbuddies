import React from "react";
import { useDispatch } from "react-redux";
import { createPenpal } from "../actions/penpal";

function Users({ userInfo }) {
    const dispatch = useDispatch();

    const userLogged = JSON.parse(localStorage.getItem("profile"));

    const handleClickUser = (event) => {
        event.preventDefault();

        dispatch(createPenpal({ penpal_1: userLogged.result._id, penpal_2: userInfo._id }));
    };

    console.log(userInfo)

    return (
        <div className="users" onClick={(event) => handleClickUser(event)}>
            <div className="user-info">
                <img className="user-image" src={userInfo.profilePicture} alt=""/>

                <div className="user-content">
                    <p className="user-username">{userInfo.name}</p>

                    <div className="user-details">
                        <p className="user-attribute">{userInfo.country}</p>
                        <p className="user-attribute">{userInfo.gender}</p>
                        <p className="user-attribute">{userInfo.birthday}</p>
                    </div>

                    <p className="user-about">{userInfo.aboutMe}</p>
                </div>
            </div>
        </div>
    )
}

export default Users;