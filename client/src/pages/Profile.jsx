import React, { useState } from "react";

import { months } from "../helpers/months";

function Profile() {
    const userLogged = JSON.parse(localStorage.getItem("profile"));

    const [userInfo, setUserInfo] = useState(
        {
            name: userLogged.result.name,
            profilePicture: userLogged.result.profilePicture,
            birthday: userLogged.result.birthday,
            gender: userLogged.result.gender,
            aboutMe: userLogged.result.aboutMe
        });

    const [userBirthday, setUserBirthday] = useState({ year: '', month: '', day: '', ordinal: '', age: '' });
    const [selected, setSelected] = useState(null);

    const convertToBase64 = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setUserInfo({ ...userInfo, profilePicture: reader.result.toString() });
        }
    }

    const handleChangeBirthday = (event) => {
        setUserInfo({ ...userInfo, birthday: event.target.value })

        let ordinal = '';

        const date = event.target.value;
        const dateArray = date.split("-").map(value => parseInt(value, 10));

        const birthdate = new Date(dateArray[1].toString() + "/" + dateArray[2].toString() + "/" + dateArray[0].toString());
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();

        if (today.getMonth() < birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())) {
            age--;
        }

        switch (dateArray[2]) {
            case 1:
                ordinal = 'st';
                break;

            case 2:
                ordinal = 'nd';
                break;

            case 3:
                ordinal = 'rd';
                break;

            default:
                ordinal = 'th';
                break;
        }

        if (age < 0) {
            age = 0;
        }

        setUserBirthday({ year: dateArray[0], month: dateArray[1], day: dateArray[2], ordinal: ordinal, age: age })
    }


    const handleChangeGender = (event) => {
        setUserInfo({ ...userInfo, gender: event.target.value });

        setSelected(event.target.value);
    };

    const handleChangeAbout = (event) => {

        setUserInfo({ ...userInfo, aboutMe: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const birthday = months[userBirthday.month - 1] + " " + userBirthday.day + userBirthday.ordinal + " (" + userBirthday.age + ")";

        setUserInfo({ ...userInfo, birthday: birthday });

        console.log(birthday)
    }

    return (
        <section className="section-profile">

            <div className="user">
                <div className="user--info">
                    <h2 className="user-name">{userInfo.name === "" ? userLogged.result.name : userInfo.name}</h2>

                    <div className="country-and-birth">
                        <div className="country">
                            <i className="bi bi-geo-alt-fill"></i>
                            <h2 className="user-info--text">Brazil</h2>
                        </div>

                        <div className="birth">
                            <i className="bi bi-balloon-fill"></i>
                            <h2 className="user-info--text">{userInfo.birthday}</h2>
                        </div>
                    </div>
                </div>

                <div className="user-photo">
                    <img src={userInfo.profilePicture} alt=""/>
                </div>
            </div>

            <div className="cta">
                <div className="cta-text-box">
                    <form className="cta-form" onSubmit={handleSubmit}>
                        <div className="cta-form-name">
                            <label htmlFor="full-name">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={userInfo.name}
                                onChange={(event) => setUserInfo({ ...userInfo, name: event.target.value })}
                            />
                        </div>

                        <div className="cta-form-picture">
                            <label htmlFor="picture">Upload profile picture</label>
                            <label className="file-input">
                                Select...
                                <input className="input" type="file" id="file-input" onChange={event => convertToBase64(event)}/>
                            </label>

                        </div>

                        <div className="cta-form-birthday">
                            <label htmlFor="birthday">Birthday</label>
                            <input id="user-birthday"
                                   type="date"
                                   value={userInfo.birthday}
                                   onChange={(event) => handleChangeBirthday(event)}
                            />
                        </div>

                        <div className="cta-form-gender">
                            <label htmlFor="gender">Gender</label>

                            <div className="cta-gender">
                                <label className="checkbox-container"> Male
                                    <input
                                        id="checkbox-group"
                                        type="checkbox"
                                        value={"Male"}
                                        checked={selected === "Male"}
                                        onChange={(event) => handleChangeGender(event)}
                                    />
                                    <span className="checkmark"></span>
                                </label>

                                <label className="checkbox-container"> Female
                                    <input
                                        id="checkbox-group"
                                        type="checkbox"
                                        value={"Female"}
                                        checked={selected === "Female"}
                                        onChange={(event) => handleChangeGender(event)}
                                    />
                                    <span className="checkmark"></span>
                                </label>

                                <label className="checkbox-container"> Non-binary
                                    <input
                                        id="checkbox-group"
                                        type="checkbox"
                                        value={"Non-binary"}
                                        checked={selected === "Non-binary"}
                                        onChange={(event) => handleChangeGender(event)}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>

                        <div className="cta-form-about">
                            <label htmlFor="about">About me</label>
                            <textarea
                                cols="30"
                                rows="10"
                                value={userInfo.aboutMe}
                                onChange={(event) => handleChangeAbout(event)}
                            ></textarea>
                        </div>

                        <button className="button button--form" type={"submit"}>
                            Save changes
                        </button>
                    </form>
                </div>

                <div className="cta-image-box"></div>
            </div>
        </section>
    )
}

export default Profile;