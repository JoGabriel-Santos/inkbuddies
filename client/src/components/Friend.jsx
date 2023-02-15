import React from "react";

function Friend() {

    return (
        <div className="friend-card">
            <img className="friend-card--photo" src={require("../util/friend.png")} alt=""/>

            <div className="friend-card--user">
                <div className="friend-card--info">
                    <h2>Sofia</h2>
                    <p>Brazil</p>
                </div>

                <div className="friend-card--time">
                    <h4>yesterday</h4>
                </div>
            </div>
        </div>
    );
}

export default Friend;