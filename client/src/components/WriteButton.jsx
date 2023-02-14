import React from "react";

const OpenTextBoxButton = ({ onClick }) => (

    <button className="send-letter" onClick={onClick}>
        <i className="bi bi-pen"></i>
        Write a letter
    </button>
);

export default OpenTextBoxButton;