import {
    UPDATE_PASSWORD_HEADER,
    UPDATE_PASSWORD_URL,
} from './api/constants.js';
import apiFetch from '../js/api/ApiFetch.js';
import showToast from '../js/util/Toast.js';

let checkPassword = false;
let checkPasswordRe = false;
let authComponent;

document.addEventListener('DOMContentLoaded', () => {
    authComponent = document.querySelector('auth-component');
    const passwordInput = authComponent.getInput('password');
    const passwordReInput = authComponent.getInput('password-re');

    const editButton = document.querySelector('#login-button');

    passwordInput.addEventListener('input', event => {
        validatePassword(event.target.value);
        validatePasswordRe(passwordReInput.value, event.target.value);
        activeLoginButton();
    });

    passwordReInput.addEventListener('input', event => {
        // validatePassword(event.target.value);
        validatePasswordRe(event.target.value, passwordInput.value);
        activeLoginButton();
    });

    editButton.disabled = true;
    editButton.addEventListener('click', event => {
        fetchUpdatePassword(
            sessionStorage.getItem('email'),
            passwordInput.value,
        );
    });
});

async function fetchUpdatePassword(email, password) {
    const body = {
        email: email,
        password: password,
    };
    apiFetch(UPDATE_PASSWORD_URL, UPDATE_PASSWORD_HEADER, body)
        .then(result => {
            console.log('update password success!! : ' + result);
            if (result) {
                showToast('수정 완료');
            } else console.log('update password failed!!');
        })
        .catch(console.error);
}

function validatePassword(password) {
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?~-]).{8,20}$/;
    if (password.length === 0) {
        visibleHelper('password', '*비밀번호를 입력해주세요');
        checkPassword = false;
    } else if (passwordRegex.test(password)) {
        invisibleHelper('password');
        checkPassword = true;
    } else {
        visibleHelper('password', '*비밀번호가 다릅니다.');
        checkPassword = false;
    }
}

function validatePasswordRe(passwordRe, password) {
    if (passwordRe.length === 0) {
        visibleHelper('password-re', '*비밀번호를 한번더 입력해주세요');
        checkPasswordRe = false;
    } else if (passwordRe === password) {
        invisibleHelper('password-re');
        checkPasswordRe = true;
    } else {
        visibleHelper('password-re', '*비밀번호가 다릅니다.');
        checkPasswordRe = false;
    }
}

function visibleHelper(key, text) {
    const helperTextElement = authComponent.getHelperText(key);
    helperTextElement.textContent = text;
    helperTextElement.style.visibility = 'visible';
}

function invisibleHelper(key) {
    console.log('valid success!!');
    // const helperTextElement = document.querySelector(".helper-text");
    const helperTextElement = authComponent.getHelperText(key);
    helperTextElement.style.visibility = 'hidden';
}

function activeLoginButton() {
    console.log(checkPasswordRe, '&&', checkPassword);
    const loginButton = document.querySelector('#login-button');
    if (checkPasswordRe && checkPassword) {
        loginButton.style.backgroundColor = '#7F6AEE';
        loginButton.disabled = false;
    } else {
        loginButton.style.backgroundColor = '#ACA0EB';
        loginButton.disabled = true;
    }
}
