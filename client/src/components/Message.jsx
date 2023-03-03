import React, { useEffect, useState } from "react";

function Message(props) {

    const userLogged = JSON.parse(localStorage.getItem("profile"));
    const [sendDate, setSendDate] = useState();

    useEffect(() => {
        const currentDate = new Date();
        const messageSentDate = new Date(props.message.sendDate);

        const difference = currentDate.getTime() - messageSentDate.getTime();
        const differenceInHours = difference / (1000 * 60 * 60);
        const differenceInDays = Math.floor(difference / (1000 * 60 * 60 * 24));

        const sendDate =
            differenceInDays >= 1 ? `${differenceInDays} day${differenceInDays === 1 ? "" : "s"}` :
                differenceInHours >= 1 ? `${Math.floor(differenceInHours)} hour${differenceInHours === 1 ? "" : "s"}` : "just now";

        setSendDate(messageSentDate.toLocaleString() + " (" + sendDate + ")");
    })

    return (
        <div className="message-card">
            <div className="message-header">
                <div className="viewed">
                    {
                        props.message.viewed ? <i className="bi bi-check-all"></i> : <i className="bi bi-check"></i>
                    }
                </div>

                <div className="stamp">
                    <img src={require("../util/stamps/christ-the-redeemer.png")} alt=""/>
                </div>
            </div>

            <div className="message-content">
                <p className="content">
                    {props.message.message}
                </p>
            </div>

            <div className="message-user_info">
                {
                    props.message.sender === userLogged.result.name ? <h2>Me</h2> : <h2>{props.message.sender}</h2>
                }

                <p>{sendDate}</p>
            </div>
        </div>
    );
}

export default Message;