import React from "react";

function Message() {

    return (
        <div className="message-card">
            <div className="message-header">
                <div className="viewed">
                    <i className="bi bi-check-all"></i>
                </div>

                <div className="stamp">
                    <img src={require("../util/stamps/christ-the-redeemer.png")} alt=""/>
                </div>
            </div>

            <div className="message-content">
                <p className="content">
                    I love games, technology and computer programming.
                    In my spare time I like to watch movies and series, as well as play the guitar.
                    I also have two stress relievers which are my cat and my dog, they are incredible.
                </p>
            </div>

            <div className="message-user_info">
                <h2>Me</h2>
                <p>2 days ago</p>
            </div>
        </div>
    );
}

export default Message;