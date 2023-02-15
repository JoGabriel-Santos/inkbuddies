import * as actionType from "../constants/actionTypes";

const authReducer = (state = { userData: null }, action) => {
    switch (action.type) {
        case actionType.FETCH_ALL:
            return action.payload;

        case actionType.AUTH:
        case actionType.UPDATE:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return null;

        case actionType.LOGOUT:
            localStorage.clear();

            return null;

        default:
            return null;
    }
}

export default authReducer;