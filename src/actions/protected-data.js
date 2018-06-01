import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const FETCH_NEXT_QUESTION = 'FETCH_NEXT_QUESTION';
export const fetchNextQuestion = () => ({
    type: FETCH_NEXT_QUESTION
});

export const SUBMIT_ANSWER_REQUEST = 'SUBMIT_ANSWER_REQUEST';
export const submitAnswerRequest = answer => ({
    type: SUBMIT_ANSWER_REQUEST
});

export const SUBMIT_ANSWER_SUCCESS = 'SUBMIT_ANSWER_SUCCESS';
export const submitAnswerSuccess = data => ({
    type: SUBMIT_ANSWER_SUCCESS,
    data
});

export const SUBMIT_ANSWER_ERROR = 'SUBMIT_ANSWER_ERROR';
export const submitAnswerError = err => ({
    type: SUBMIT_ANSWER_ERROR,
    err
});

export const TOGGLE_ANSWERED = 'TOGGLE_ANSWERED'
export const toggleAnswered = () => ({
  type: TOGGLE_ANSWERED
})

export const fetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/questions`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(fetchProtectedDataSuccess(data)))
        .then(data => console.log(data))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};

//Call this action on submit input answer
export const postAnswer = (answer) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    console.log(answer);
    dispatch(submitAnswerRequest());
    return fetch(`${API_BASE_URL}/questions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(answer)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res =>
             res.json())
        .then(data => dispatch(submitAnswerSuccess(data)))
        .then(data => console.log(data))
        .catch(err => {
            dispatch(submitAnswerError(err));
        });
};


