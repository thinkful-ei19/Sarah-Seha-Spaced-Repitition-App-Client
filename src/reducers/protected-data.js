import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    FETCH_NEXT_QUESTION
} from '../actions/protected-data';

const initialState = {
    data: [],
    loading: null,
    error: null,
    currentQuestion: 0
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        console.log(action.data)
        return Object.assign({}, state, {
            data: action.data,
            error: null,
            currentQuestion: 0
        });
    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === FETCH_NEXT_QUESTION) {
        return Object.assign({}, state, {
            currentQuestion: state.currentQuestion + 1
        });
    }
    return state;
}
