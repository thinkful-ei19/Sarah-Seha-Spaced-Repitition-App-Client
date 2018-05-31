import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    FETCH_NEXT_QUESTION,
    SUBMIT_ANSWER_REQUEST,
    SUBMIT_ANSWER_SUCCESS,
    SUBMIT_ANSWER_ERROR
} from '../actions/protected-data';

const initialState = {
    data: {},
    loading: null,
    error: null,
    // currentQuestion: 0,
    toggleButton: 'submit',
    countTotal: 0,
    countCorrect: 0
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        console.log(action.data)
        return Object.assign({}, state, {
            data: action.data,
            error: null,
            // currentQuestion: 0
        });
    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === FETCH_NEXT_QUESTION) {
        return Object.assign({}, state, {
            currentQuestion: state.currentQuestion + 1
        });
    } else if (action.type === SUBMIT_ANSWER_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error:null
        });
    } else if (action.type === SUBMIT_ANSWER_SUCCESS) {
        console.log(action.data)
        return Object.assign({}, state, {
            feedback: action.data,
            error: null,
            // currentQuestion: 0
        });
    } else if (action.type === SUBMIT_ANSWER_ERROR) {
        return Object.assign({}, state, {
            error: action.error,
            loading: null
        });
    } 
    // else if (action.type === FETCH_NEXT_QUESTION) {
    //     return Object.assign({}, state, {
    //         currentQuestion: state.currentQuestion + 1
    //     });
    // }
    return state;
}
