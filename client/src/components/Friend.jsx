import React from "react";
import { useSelector } from "react-redux";

function Friend(props) {
    const { penpals } = useSelector((state) => state.users);

    let userPenpals = [];

    let cardBackground = "";

    if (penpals.length === props.penpalsQuantity) {

        penpals?.map((penpal) => {

            userPenpals.push(penpal[0]);
        })
    }

    userPenpals.sort((penpalA, penpalB) => {
        if (penpalA.name > penpalB.name) return 1;
        if (penpalA.name < penpalB.name) return -1;

        return 0;
    });

    function handlePenpalClick(penpalInfo) {

        props.penpalId(penpalInfo);
    }

    return (
        <React.Fragment>
            {
                userPenpals?.map((penpal, key) => (
                    <div className={`friend-card ${props.penpalSelected === penpal._id ? cardBackground = "card-selected" : cardBackground = ""}`}
                         onClick={() => handlePenpalClick(penpal)}
                         key={key}>

                        <img className="friend-card--photo" src={penpal.profilePicture} alt=""/>

                        <div className="friend-card--user">
                            <div className="friend-card--info">
                                <h2 className="friend--name">{penpal.name}</h2>
                                <p className="friend--count">{penpal.country}</p>
                            </div>

                            <div className="friend-card--time">
                                <h4>yesterday</h4>
                            </div>
                        </div>
                    </div>
                ))
            }
        </React.Fragment>
    );
}

export default Friend;