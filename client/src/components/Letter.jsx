import React, { useEffect, useState } from "react";

import OpenTextBoxButton from "./WriteButton";

function Letter(props) {
    const [isTextBoxOpen, setIsTextBoxOpen] = useState(false);
    const [letter, setLetter] = useState(
        {
            viewed: false,
            country: props.senderInfo.country,
            sender: props.senderInfo.sender,
            message: '',
            date: '',
        });

    const openTextBox = () => setIsTextBoxOpen(true);
    const closeTextBox = () => setIsTextBoxOpen(false);

    function handleLetterSend() {

        setLetter({ ...letter, date: new Date() })
    }

    useEffect(() => {
        props.message(letter)

    }, [letter.date])

    return (
        <React.Fragment>
            <OpenTextBoxButton onClick={isTextBoxOpen ? closeTextBox : openTextBox}/>

            {isTextBoxOpen && (
                <div className="textbox-overlay">
                    <div className="textbox">
                        <div className="textbox-header">
                            <button className="close-button" onClick={closeTextBox}><i className="bi bi-x"></i></button>

                            <div className="send-button" onClick={handleLetterSend}>
                                <i className="bi bi-send"></i>
                                <h5>Send</h5>
                            </div>
                        </div>

                        <div className="textbox-recipient">
                            <div className="textbox-recipient--card">
                                <img className="textbox-recipient--photo" src={props.penpalInfo.profilePicture} alt=""/>

                                <div className="friend-card--info">
                                    <h2>{props.penpalInfo.name}</h2>
                                    <p>{props.penpalInfo.country}</p>
                                </div>
                            </div>

                            <div className="stamp stamp-recipient">
                                <img src={require("../util/stamps/christ-the-redeemer.png")} alt=""/>
                            </div>
                        </div>

                        <div className="textbox-message">
                            <textarea
                                className="textbox-message"
                                placeholder="Tap here to begin writing..."
                                value={letter.message}
                                onChange={(event) => setLetter({ ...letter, message: event.target.value })}
                                rows={10} cols={50}/>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default Letter;