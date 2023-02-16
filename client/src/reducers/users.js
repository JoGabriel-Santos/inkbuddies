import * as actionType from "../constants/actionTypes";

const authReducer = (users = [], action) => {
    switch (action.type) {
        case actionType.FETCH_ALL:
            return action.payload;

        case actionType.AUTH:
        case actionType.UPDATE:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return users;

        case actionType.LOGOUT:
            localStorage.clear();

            return users;

        default:
            return users;
    }
}

export default authReducer;