import { FETCH_PENPALS, CREATE_PENPAL, SEND_LETTER } from "../constants/actionTypes";

import * as api from "../api/index.js";

export const fetchPenpals = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchPenpals(id);
        dispatch({ type: FETCH_PENPALS, payload: data });

    } catch (error) {

        console.log(error.message);
    }
}

export const createPenpal = (penpalData) => async (dispatch) => {
    try {
        const { data } = await api.createPenpal(penpalData);
        dispatch({ type: CREATE_PENPAL, payload: data });

    } catch (error) {

        console.log(error.message);
    }
}

export const sendLetter = (letterData) => async (dispatch) => {
    try {
        const { data } = await api.sendLetter(letterData);
        dispatch({ type: SEND_LETTER, payload: data });

    } catch (error) {

        console.log(error.message);
    }
}