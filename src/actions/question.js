import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';


export const FETCH_QUESTION_REQUEST = 'FETCH_QUESTION_REQUEST';
export const fetchQuestionRequest = question => ({
    type: FETCH_QUESTION_REQUEST
});

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = question => ({
    type: FETCH_QUESTION_SUCCESS,
    payload:question
});

export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';
export const fetchQuestionError = err => ({
    type: FETCH_QUESTION_ERROR,
    err
});

export const SUBMIT_ANSWER_REQUEST = 'SUBMIT_ANSWER_REQUEST';
export const submitAnswerRequest = answer => ({
    type: SUBMIT_ANSWER_REQUEST
});

export const SUBMIT_ANSWER_SUCCESS = 'SUBMIT_ANSWER_SUCCESS';
export const submitAnswerSuccess = answer => ({
    type: SUBMIT_ANSWER_SUCCESS,
    payload:answer
});

export const SUBMIT_ANSWER_ERROR = 'SUBMIT_ANSWER_ERROR';
export const submitAnswerError = err => ({
    type: SUBMIT_ANSWER_ERROR,
    err
});

export const USER_ANSWER_CORRECT = 'USER_ANSWER_CORRECT';
const feedbackForRight= () => ({
    type: USER_ANSWER_CORRECT
});

export const USER_ANSWER_WRONG = 'USER_ANSWER_WRONG';
const feedbackForWrong = () => ({
    type: USER_ANSWER_WRONG
});

export const FETCH_FEEDBACK_FOR_CORRECT_ANS = 'FETCH_FEEDBACK_FOR_CORRECT_ANS';
export const fetchFeedbackForCorrectAns = () => ({
    type: FETCH_FEEDBACK_FOR_CORRECT_ANS,
    payload: "Yes! You got it!"
});

export const FETCH_FEEDBACK_FOR_WRONG_ANS = 'FETCH_FEEDBACK_FOR_WRONG_ANS';
export const fetchFeedbackForWrongAns = () => ({
    type: FETCH_FEEDBACK_FOR_WRONG_ANS,
    payload: "Sorry! It is incorrect answer!"
});

// add==> FEEDBACK_FOR_CORRECT_ANS and FEEDBACK_FOR_INCORRECT_ANS

export const fetchQuestion = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(fetchQuestionRequest());
    return fetch(`${API_BASE_URL}/questions`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(question => dispatch(fetchQuestionSuccess(question)))
        .catch(err => {
            dispatch(fetchQuestionError(err));
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
            'Content-Type': 'application/jason',
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(answer => dispatch(submitAnswerSuccess(answer)))
        .catch(err => {
            dispatch(submitAnswerError(err));
        });
};

export const userAnswerCorrect = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(feedbackForRight());
    return fetch(`${API_BASE_URL}/questions/correct`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(() => dispatch(fetchQuestion()))
        .then(() => dispatch(fetchFeedbackForCorrectAns()))
        .catch(err => dispatch(fetchQuestionError(err)));
}

export const userAnswerWrong = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(feedbackForWrong());
    return fetch(`${API_BASE_URL}/questions/correct`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(() => dispatch(fetchQuestion()))
        .then(() => dispatch(fetchFeedbackForWrongAns()))
        .catch(err => dispatch(fetchQuestionError(err)));
};