import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUser } from "../actions/users";

import { months } from "../helpers/months";

import Geolocation from "../components/Geolocation";

function Profile() {
    const dispatch = useDispatch();
    const history = useHistory();

    const userLogged = JSON.parse(localStorage.getItem("profile"));

    const [userInfo, setUserInfo] = useState(
        {
            name: userLogged.result.name,
            profilePicture: userLogged.result.profilePicture,
            birthday: userLogged.result.birthday,
            gender: userLogged.result.gender,
            aboutMe: userLogged.result.aboutMe,
            country: userLogged.result.country,
            latLong: userLogged.result.latLong,
        });

    const [userBirthday, setUserBirthday] = useState({ year: '', month: '', day: '', ordinal: '', age: '' });

    const logout = () => {
        dispatch({ type: "LOGOUT" });

        history.push("/signin");
    };

    const convertToBase64 = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setUserInfo({ ...userInfo, profilePicture: reader.result.toString() });
        }
    }

    const handleChangeAbout = (event) => {

        setUserInfo({ ...userInfo, aboutMe: event.target.value });
    };

    const handleChangeBirthday = (event) => {
        const date = event.target.value;
        const [year, month, day] = date.split("-").map(str => parseInt(str, 10));

        const birthdate = new Date(Date.UTC(year, month - 1, day));
        const today = new Date();

        let age = Math.floor((today - birthdate) / (365.25 * 24 * 60 * 60 * 1000));
        if (isNaN(age) || age < 0) {
            age = 0;
        }

        const ordinals = ['th', 'st', 'nd', 'rd'];
        const ordinal = ordinals[(day % 100 > 10 && day % 100 < 14) ? 0 : Math.min(day % 10, 3)];

        setUserBirthday({ year, month, day, ordinal, age });
    }

    const handleChangeCountry = (userCountry, userLatLong) => {

        setUserInfo({ ...userInfo, country: userCountry, latLong: userLatLong });
    }

    const handleChangeGender = (event) => {
        if (event.target.value !== "") {
            setUserInfo({ ...userInfo, gender: event.target.value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        dispatch(updateUser(userInfo));
    }

    useEffect(() => {
        const birthday = months[userBirthday.month - 1] + " " + userBirthday.day + userBirthday.ordinal + " (" + userBirthday.age + ")";

        if (birthday !== "undefined  ()")
            setUserInfo({ ...userInfo, birthday: birthday });

    }, [userBirthday])

    return (
        <section className="section-profile">

            <div className="user">
                <div className="user--info">
                    <h2 className="user-name">{userInfo.name === "" ? userLogged.result.name : userInfo.name}</h2>

                    <div className="additional-info">
                        <div className="country">
                            <i className="bi bi-geo-alt-fill"></i>

                            {
                                userInfo.country === undefined || userInfo.country === null || userInfo.country === '' ?
                                    <Geolocation changeCountry={handleChangeCountry}/> : <h2 className="user-info--text">{userInfo.country}</h2>
                            }
                        </div>

                        <div className="birth">
                            {userInfo.birthday !== undefined && <i className="bi bi-balloon-fill"></i>}
                            <h2 className="user-info--text">{userInfo.birthday}</h2>
                        </div>

                        <div className="gender">
                            {userInfo.gender === "Male" && <i className="bi bi-gender-male"></i>}
                            {userInfo.gender === "Female" && <i className="bi bi-gender-female"></i>}
                            {userInfo.gender === "Non-binary" && <i className="bi bi-gender-ambiguous"></i>}

                            <h2 className="user-info--text">{userInfo.gender}</h2>
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
                                   onChange={(event) => handleChangeBirthday(event)}
                            />
                        </div>

                        <div className="cta-form-select">
                            <label htmlFor="select-gender">Gender</label>
                            <select id="select-gender" onChange={(event) => handleChangeGender(event)}>
                                <option value="">Select...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-binary">Non-binary</option>
                            </select>
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

                        <button className="button button--form bg-red" onClick={logout}>
                            Logout
                        </button>
                    </form>
                </div>

                <div className="cta-image-box"></div>
            </div>
        </section>
    )
}

export default Profile;