import React from "react";

function Users(props) {

    return (
        <div className="users">
            <div className="user">
                <img className="user-image" src={ props.userInfo.profilePicture } alt=""/>

                <div className="user-content">
                    <p className="user-name">{ props.userInfo.name }</p>
                </div>
            </div>
        </div>
    )
}

export default Users;