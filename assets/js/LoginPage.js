import { LOGIN_HEADER, LOGIN_URL } from './api/constants.js';
import apiFetch from '../js/api/ApiFetch.js';
import showToast from '../js/util/Toast.js';

let checkEmail = false;
let checkPassword = false;
let authComponent;

document.addEventListener('DOMContentLoaded', () => {
    authComponent = document.querySelector('auth-component');
    const emailInput = authComponent.getEmailInput;
    const passwordInput = authComponent.getPasswordInput;

    const loginButton = document.querySelector('#login-button');
    const signupButton = document.querySelector('#signup-button');

    emailInput.addEventListener('input', event => {
        validateEmail(event.target.value);
        activeLoginButton();
    });

    passwordInput.addEventListener('input', event => {
        validatePassword(event.target.value);
        activeLoginButton();
    });

    loginButton.addEventListener('click', async () => { // 화살표 함수로 변경
        try {
            const response = await fetchLogin(emailInput.value, passwordInput.value);
            sessionStorage.setItem('email', emailInput.value);
            sessionStorage.setItem('sessionId', response.data.sessionId);
            window.location.href = './../../html/Posts.html';
        } catch (error) {
            if (error.status === 400) showToast(error.response.message);
        }
    });

    signupButton.addEventListener('click', () => { // 화살표 함수로 변경
        window.location.href = '/html/SignUpPage.html';
    });
});

async function fetchLogin(email, password) {
    const body = { email, password }; // 비구조화 할당
    console.log(`Sending body: ${body}`); // 템플릿 리터럴로 변경
    return apiFetch(LOGIN_URL, LOGIN_HEADER, body);
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
        invisibleHelper();
        checkEmail = true;
    } else {
        visibleHelper('*올바른 이메일 주소 형식을 입력해주세요 (예: \nexample@example.com)',);
        checkEmail = false;
    }
}

function validatePassword(password) {
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?~-]).{8,20}$/;
    if (password.length === 0) {
        visibleHelper('*비밀번호를 입력해주세요');
        checkPassword = false;
    } else if (passwordRegex.test(password)) {
        invisibleHelper();
        checkPassword = true;
    } else {
        visibleHelper('*비밀번호가 다릅니다.');
        checkPassword = false;
    }
}

function visibleHelper(text) {
    const helperTextElement = authComponent.getHelperText('password');
    helperTextElement.textContent = text;
    helperTextElement.style.visibility = 'visible';
}

function invisibleHelper() {
    const helperTextElement = authComponent.getHelperText('password');
    helperTextElement.style.visibility = 'hidden';
}

function activeLoginButton() {
    const loginButton = document.querySelector('#login-button');
    if (checkEmail && checkPassword) {
        loginButton.style.backgroundColor = '#7F6AEE';
        loginButton.disabled = false;
    } else {
        loginButton.style.backgroundColor = '#ACA0EB';
        loginButton.disabled = true;
    }
}
