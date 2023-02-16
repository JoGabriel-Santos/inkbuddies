import * as actionType from "../constants/actionTypes";

const penpalReducer = (penpals = [], action) => {
    switch (action.type) {
        case actionType.FETCH_PENPALS:
            return action.payload;

        case actionType.CREATE_PENPAL:
            return [...penpals, action.payload];

        default:
            return penpals;
    }
}

export default penpalReducer;