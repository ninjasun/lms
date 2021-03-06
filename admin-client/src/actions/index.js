import axios from 'axios';
import {browserHistory} from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_COURSES,
    ADD_COURSE,
    ADD_COURSE_ERROR,
    FETCH_ASSIGNMENT,
    ADD_ASSIGNMENT,
    ADD_ASSIGNMENT_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password}) {
    return function (dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, {email, password})
            .then(response => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch({type: AUTH_USER});
                // - Save the JWT token
                localStorage.setItem('token', response.data.token);
                // - redirect to the route '/feature'
                browserHistory.push('/');
            })
            .catch(() => {
                // If request is bad...
                // - Show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function addCourseError(error) {
    return {
        type: ADD_COURSE_ERROR,
        payload: error
    }
}
export function addAssignmentError(error) {
    return {
        type: ADD_ASSIGNMENT_ERROR,
        payload:error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');

    return {
        type: UNAUTH_USER
    }
}

export function fetchCourses() {
    console.log("fetchCourses")
    return function (dispatch) {
        axios.get(ROOT_URL, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: FETCH_COURSES,
                    payload: response.data.coursesList
                })
            })
    }
}

export function signupUser({email, password}) {
    return function (dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signup`, {email, password})
            .then(response => {

                dispatch({type: AUTH_USER});
                // - Save the JWT token
                localStorage.setItem('token', response.data.token);

                browserHistory.push('/');
            })
            .catch(response => {
                // If request is bad...
                // - Show an error to the user
                dispatch(authError(response.data.error));
            });
    }
}

export function addCourse({title, description, imgPath, categories}) {
    return function (dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/courses`,
            {title, description, imgPath, categories},
            {headers: {authorization: localStorage.getItem('token')}}
        )
            .then(response => {

                dispatch({
                    type: ADD_COURSE,
                    payload: response.data.id
                });

                browserHistory.push('/courses');
            })
            .catch(response => {
                // If request is bad...
                // - Show an error to the user
                dispatch(addCourseError(response.data.error));
            });
    }
}

export function fetchAssignment() {
    console.log("fetchAssignment")
    return function (dispatch) {
        axios.get(`${ROOT_URL}/assignment`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: FETCH_ASSIGNMENT,
                    payload: response.data.assignmentList
                })
            })
    }
}


export function addAssignment({title, description, users, courses}) {
    return function (dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/assignment`,
            {title, description, users, courses},
            {headers: {authorization: localStorage.getItem('token')}}
        )
            .then(response => {

                dispatch({
                    type: ADD_ASSIGNMENT,
                    payload: response.data.id
                });

                browserHistory.push('/assignment');
            })
            .catch(response => {
                // If request is bad...
                // - Show an error to the user
                dispatch(addAssignmentError(response.data.error));
            });
    }
}
