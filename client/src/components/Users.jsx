import React from "react";

function Users(props) {

    return (
        <div className="users">
            <div className="user-info">
                <img className="user-image" src={ props.userInfo.profilePicture } alt=""/>

                <div className="user-content">
                    <p className="user-username">{ props.userInfo.name }</p>
                    <p className="user-attribute">{ props.userInfo.gender }</p>
                </div>
            </div>
        </div>
    )
}

export default Users;