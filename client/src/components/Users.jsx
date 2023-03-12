import React from "react";
import { useDispatch } from "react-redux";
import { createPenpal } from "../actions/penpal";

function Users(props) {
    const dispatch = useDispatch();

    const userLogged = JSON.parse(localStorage.getItem("profile"));

    const handleClickUser = (event) => {
        event.preventDefault();

        dispatch(createPenpal({ penpal_1: userLogged.result._id, penpal_2: props.userInfo._id }));
    };

    return (
        <div className="users" onClick={(event) => handleClickUser(event)}>
            <div className="user-info">
                <img className="user-image" src={props.userInfo.profilePicture} alt=""/>

                <div className="user-content">
                    <p className="user-username">{props.userInfo.name}</p>
                    <p className="user-attribute">{props.userInfo.gender}</p>
                    <p className="user-about">{props.userInfo.aboutMe}</p>
                </div>
            </div>
        </div>
    )
}

export default Users;