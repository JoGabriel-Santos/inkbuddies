import React, { useState } from "react";

import OpenTextBoxButton from "./WriteButton";

function Letter() {
    const [isTextBoxOpen, setIsTextBoxOpen] = useState(false);

    const openTextBox = () => setIsTextBoxOpen(true);
    const closeTextBox = () => setIsTextBoxOpen(false);

    return (
        <React.Fragment>
            <OpenTextBoxButton onClick={isTextBoxOpen ? closeTextBox : openTextBox}/>

            {isTextBoxOpen && (
                <div className="textbox-overlay">
                    <div className="textbox">
                        <div className="textbox-header">
                            <button className="close-button" onClick={closeTextBox}><i className="bi bi-x"></i></button>

                            <div className="send-button">
                                <i className="bi bi-send"></i>
                                <h5>Send</h5>
                            </div>
                        </div>

                        <div className="textbox-recipient">
                            <div className="textbox-recipient--card">
                                <img className="textbox-recipient--photo" src={require("../util/friend.png")} alt=""/>

                                <div className="friend-card--info">
                                    <h2>Sofia</h2>
                                    <p>Brazil</p>
                                </div>
                            </div>

                            <div className="stamp stamp-recipient">
                                <img src={require("../util/stamps/christ-the-redeemer.png")} alt=""/>
                            </div>
                        </div>

                        <div className="textbox-message">
                            <textarea className="textbox-message" placeholder="Tap here to begin writing..." rows={10} cols={50}/>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default Letter;