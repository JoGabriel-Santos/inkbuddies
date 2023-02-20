import React from "react";
import { useSelector } from "react-redux";

function Friend(props) {
    const { penpals } = useSelector((state) => state.users);

    let userPenpals = [];

    if (penpals.length === props.penpalsQuantity) {

        penpals?.map((penpal) => {

            userPenpals.push(penpal[0]);
        })
    }

    function handlePenpalClick(penpalInfo) {

        props.penpalId(penpalInfo);
    }

    return (
        <React.Fragment>
            {
                userPenpals?.map((penpal, key) => (
                    <div className="friend-card" onClick={() => handlePenpalClick(penpal)} key={key}>
                        <img className="friend-card--photo" src={penpal.profilePicture} alt=""/>

                        <div className="friend-card--user">
                            <div className="friend-card--info">
                                <h2>{penpal.name}</h2>
                                <p>{penpal.country}</p>
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

export default React.memo(Friend);