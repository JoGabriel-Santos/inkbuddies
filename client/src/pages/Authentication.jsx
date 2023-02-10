import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';

import FileBase from 'react-file-base64'

import useInput from "../hooks/use-input";

import { signin, signup } from "../actions/users";

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');

function Authentication() {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [profilePicture, setProfilePicture] = useState();

    let formIsValid = false;

    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName,
    } = useInput(isNotEmpty);

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
    } = useInput(isEmail);

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword,
    } = useInput(isNotEmpty);

    if (nameIsValid && emailIsValid && passwordIsValid) {
        formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();

        let form = { name: nameValue, email: emailValue, password: passwordValue, profilePicture: profilePicture };

        if (location.pathname === "/signin") {

            dispatch(signin(form, history))

        } else {

            dispatch(signup(form, history))
        }

        resetName();
        resetEmail();
        resetPassword();
    };

    return (
        <section className="section-cta">
            <div className="container">
                <div className="cta">
                    <div className="cta-text-box">
                        <h2 className="heading-secondary">
                            InkBuddies
                        </h2>

                        <p className="cta-text">
                            Connecting people around the world <br/>
                            Your letter will be on its way!
                        </p>

                        <form className="cta-form" onSubmit={ (event) => submitHandler(event) }>
                            <div className="cta-form-name">
                                <label htmlFor="full-name">Nome de usuário</label>
                                <input
                                    className={ `${ nameHasError && 'border-red' }` }
                                    onChange={ nameChangeHandler }
                                    onBlur={ nameBlurHandler }
                                    value={ nameValue }
                                    placeholder="João Gabriel" type="text"
                                />
                            </div>

                            {
                                location.pathname === "/signup" ?
                                    <div className="cta-form-name">
                                        <label htmlFor="full-name">Email</label>
                                        <input
                                            className={ `${ emailHasError && 'border-red' }` }
                                            onChange={ emailChangeHandler }
                                            onBlur={ emailBlurHandler }
                                            value={ emailValue }
                                            placeholder="gabriel@gmail.com" type="email"
                                        />
                                    </div>

                                    : null
                            }

                            <div className="cta-form-email">
                                <label htmlFor="password">Senha</label>
                                <input
                                    className={ `${ passwordHasError && 'border-red' }` }
                                    onChange={ passwordChangeHandler }
                                    onBlur={ passwordBlurHandler }
                                    value={ passwordValue }
                                    placeholder="********" type="password"
                                />
                            </div>

                            {
                                location.pathname === "/signin" ?
                                    <div className="cta-form-select">
                                        <label htmlFor="select-where">Deseja salvar suas credenciais?</label>
                                        <select id="select-where" name="" required>
                                            <option value="option-1">Sim</option>
                                            <option value="option-2">Não</option>
                                        </select>
                                    </div>

                                    : null
                            }

                            {
                                location.pathname === "/signup" ?
                                    <div className="cta-form-name">
                                        <label htmlFor="select-where">Upload profile picture</label>
                                        <FileBase type="file" multiple={ false } onDone={ ({ base64 }) => setProfilePicture(base64) }/>
                                    </div>

                                    : null
                            }

                            <button className="button button--form" type={ "submit" }>
                                { location.pathname === "/signin" ? "Entrar" : "Cadastrar-se" }
                            </button>
                        </form>
                    </div>

                    {
                        location.pathname === "/signup" && profilePicture ?
                            <div className="cta-image-box--avatar" style={ { backgroundImage: `url(${ profilePicture })` } }></div>
                            :
                            <div className="cta-image-box"></div>
                    }
                </div>
            </div>
        </section>
    );
}

export default Authentication;