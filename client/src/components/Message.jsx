import React, { useEffect, useState } from "react";

function Message(props) {

    const userLogged = JSON.parse(localStorage.getItem("profile"));
    const [sendDate, setSendDate] = useState();

    useEffect(() => {
        const currentDate = new Date();
        const messageSentDate = new Date(props.message.date);

        let difference = currentDate.getTime() - messageSentDate.getTime();
        let differenceInHours = difference / (1000 * 60 * 60);

        if (differenceInHours >= 24) {
            let differenceInDays = Math.floor(difference / (1000 * 60 * 60 * 24));

            if (differenceInDays <= 1) {
                differenceInDays = Math.floor(differenceInDays);
                differenceInDays.toString();
                setSendDate(differenceInDays + " day");

            } else {
                differenceInDays = Math.floor(differenceInDays);
                differenceInDays.toString();
                setSendDate(differenceInDays + " days");
            }

        } else {
            if (differenceInHours <= 1) {
                differenceInHours = Math.floor(differenceInHours);
                differenceInHours.toString();
                setSendDate(differenceInHours + " hour");

            } else {
                differenceInHours = Math.floor(differenceInHours);
                differenceInHours.toString();
                setSendDate(differenceInHours + " hours");
            }
        }
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

                <p>{sendDate} ago</p>
            </div>
        </div>
    );
}

export default Message;