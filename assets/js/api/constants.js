// const BASE_URL = 'http://localhost:3001/api';
const BASE_URL = 'http://3.39.229.64:3001/api';

/*
URL HEADER 두개로 나누는 게 아닌 login 변수 내에 url, method 두개로 나누는 게 더 좋을듯.
-> 현재 프로젝트에서 하지 말고 리액트로 재구성하면서 변경할 예정!
 */

//user
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const LOGIN_HEADER = `POST`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const LOGOUT_HEADER = `POST`;
export const SIGNUP_URL = `${BASE_URL}/users/signup`;
export const SIGNUP_HEADER = `POST`;
export const GET_NICKNAME_URL = `${BASE_URL}/users/nickname`;
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
export const GET_POST_EDIT_URL = `${BASE_URL}/posts/:postId/edit`;
export const GET_POST_HEADER = `GET`;
export const PATCH_POST_URL = `${BASE_URL}/posts/:postId`;
export const PATCH_POST_HEADER = `PATCH`;
export const GET_POST_LIST_URL = `${BASE_URL}/posts`;
export const GET_POST_LIST_HEADER = `GET`;
export const DELETE_POST_URL = `${BASE_URL}/posts/:postId`;
export const DELETE_POST_HEADER = `DELETE`;

//comment
export const CREATE_COMMENT_URL = `${BASE_URL}/comments`;
export const CREATE_COMMENT_HEADER = `POST`;
export const UPDATE_COMMENT_URL = `${BASE_URL}/comments/:commentId`;
export const UPDATE_COMMENT_HEADER = `PATCH`;
export const DELETE_COMMENT_URL = `${BASE_URL}/comments/:commentId`;
export const DELETE_COMMENT_HEADER = `DELETE`;
