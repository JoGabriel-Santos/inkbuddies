import { AUTH, FETCH_ALL, UPDATE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers();
        dispatch({ type: FETCH_ALL, payload: data });

    } catch (error) {

        console.log(error.message);
    }
}

export const updateUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(user);
        dispatch({ type: UPDATE, data });

    } catch (error) {

        console.log(error.message);
    }
}

export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        router.push('/');

    } catch (error) {

        console.log(error);
    }
}

export const signup = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        router.push('/');

    } catch (error) {

        console.log(error);
    }
}