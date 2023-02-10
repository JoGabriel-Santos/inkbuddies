import { useReducer } from "react";

const initialInputState = {
    value: '',
    isTouched: false
}

const inputStateReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT':
            return { isTouched: state.isTouched, value: action.value };

        case 'BLUR':
            return { isTouched: true, value: state.value };

        case 'RESET':
            return { isTouched: false, value: '' };

        default:
            return inputStateReducer;
    }
}

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInputState
    );

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event) => {
        dispatch({ type: 'INPUT', value: event.target.value });
    };

    const inputBlurHandler = (event) => {
        dispatch({ type: 'BLUR' });
    };

    const reset = () => {
        dispatch({ type: 'RESET' });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        valueChangeHandler,
        inputBlurHandler,
        hasError,
        reset
    }
}

export default useInput;