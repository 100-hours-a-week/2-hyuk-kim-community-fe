const BASE_URL = 'http://localhost:3001/api';

//user
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const LOGIN_HEADER = `POST`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const LOGOUT_HEADER = `POST`;
export const SIGNUP_URL = `${BASE_URL}/users/signup`;
export const SIGNUP_HEADER = `POST`;
export const GET_NICKNAME_URL = `${BASE_URL}/users/:email/nickname`;
export const GET_NICKNAME_HEADER = `GET`;
export const UPDATE_NICKNAME_URL = `${BASE_URL}/users/nickname`;
export const UPDATE_NICKNAME_HEADER = `PATCH`;
export const UPDATE_PASSWORD_URL = `${BASE_URL}/users/password`;
export const UPDATE_PASSWORD_HEADER = `PATCH`;
export const DELETE_USER_URL = `${BASE_URL}/users/`;
export const DELETE_USER_HEADER = `DELETE`;

//board
export const CREATE_POST_URL = `${BASE_URL}/posts`;
export const CREATE_POST_HEADER = `POST`;
export const GET_POST_URL = `${BASE_URL}/posts/:postId`;
export const GET_POST_HEADER = `GET`;

export const constants = {
    LOGIN_URL,
    LOGIN_HEADER,
};