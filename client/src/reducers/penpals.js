import * as actionType from "../constants/actionTypes";

const penpalReducer = (penpals = [], action) => {
    switch (action.type) {
        case actionType.FETCH_PENPALS:
            return action.payload;

        case actionType.CREATE_PENPAL:
            return [...penpals, action.payload];

        case actionType.SEND_LETTER:

            for (let index = 0; index < penpals.length; index++) {
                if (penpals[index]._id === action.payload._id) {
                    penpals[index].letters = action.payload.letters;
                    break;
                }
            }

            return penpals;

        default:
            return penpals;
    }
}

export default penpalReducer;