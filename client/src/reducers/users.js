import * as actionType from "../constants/actionTypes";

const authReducer = (state = { users: [], penpals: [] }, action) => {
    switch (action.type) {
        case actionType.FETCH_USER:
            return { ...state, penpals: [...state.penpals, action.payload] };

        case actionType.FETCH_ALL:
            return { ...state, users: action.payload };

        case actionType.AUTH:
        case actionType.UPDATE:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return state;

        case actionType.LOGOUT:
            localStorage.clear();

            return state;

        default:
            return state;
    }
}

export default authReducer;