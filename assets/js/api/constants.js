const BASE_URL = 'http://localhost:3001/api';

//user
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const LOGIN_HEADER = `POST`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const LOGOUT_HEADER = `POST`;
export const SIGNUP_URL = `${BASE_URL}/users/signup`;
export const SIGNUP_HEADER = `POST`;
export const UPDATE_NICKNAME_URL = `${BASE_URL}/users/nickname`;
export const UPDATE_NICKNAME_HEADER = `PATCH`;
export const UPDATE_PASSWORD_URL = `${BASE_URL}/users/password`;
export const UPDATE_PASSWORD_HEADER = `PATCH`;
export const DELETE_URL = `${BASE_URL}/users/`;
export const DELETE_HEADER = `DELETE`;

//board

export const constants = {
    LOGIN_URL,
    LOGIN_HEADER,
};