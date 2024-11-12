import { SIGNUP_URL, SIGNUP_HEADER } from './api/constants.js';
import apiFetch from '../js/api/ApiFetch.js';

let checkEmail = false;
let checkPassword = false;
let checkPasswordRe = false;
let checkNickname = false;
let authComponent;

document.addEventListener('DOMContentLoaded', () => {
    authComponent = document.querySelector('auth-component');
    const emailInput = authComponent.getInput('email');
    const passwordInput = authComponent.getInput('password');
    const passwordReInput = authComponent.getInput('password-re');
    const nickNameInput = authComponent.getInput('nickname');

    const signupButton = document.querySelector('#signup-button');
    const loginButton = document.querySelector('#login-button');

    signupButton.disabled = true;
    signupButton.addEventListener('click', event => {
        fetchSignUp(emailInput.value, passwordInput.value, nickNameInput.value)
            .then(response => {
                console.log('signup success!!');
                window.location.href = './../../html/LoginPage.html';
            })
            .catch(error => {
                if (error.status === 409) {
                    visibleHelper('email', '*중복된 이메일입니다.');
                } else {
                    console.error('Unexpected error:', error);
                }
            });
    });

    loginButton.addEventListener('click', event => {
        window.location.href = 'LoginPage.html';
    });

    emailInput.addEventListener('input', event => {
        validateEmail(event.target.value);
        activeLoginButton();
    });

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

    nickNameInput.addEventListener('input', event => {
        validateNickname(event.target.value);
        activeLoginButton();
    });
});

async function fetchSignUp(email, password, nickname) {
    const body = {
        email: email,
        password: password,
        nickname: nickname,
    };
    return apiFetch(SIGNUP_URL, SIGNUP_HEADER, body);
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
        invisibleHelper('email');
        checkEmail = true;
    } else {
        visibleHelper(
            'email',
            '*올바른 이메일 주소 형식을 입력해주세요 (예: \nexample@example.com)',
        );
        checkEmail = false;
    }
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

function validateNickname(nickname) {
    const nicknameRegex = /^[^\s]{1,10}$/; // 1자 이상 10자 이하, 공백 없음

    // 닉네임 입력 여부 검사
    if (nickname.length === 0) {
        visibleHelper('nickname', '*닉네임을 입력해주세요.');
        checkNickname = false;
        return;
    }

    // 닉네임 길이 검사
    if (nickname.length > 10) {
        visibleHelper('nickname', '*닉네임은 최대 10자 까지 작성 가능합니다.');
        checkNickname = false;
        return;
    }

    // 공백 검사
    if (!nicknameRegex.test(nickname)) {
        visibleHelper('nickname', '*띄어쓰기를 없애주세요.');
        checkNickname = false;
        return;
    }

    // 닉네임 중복 검사
    // if (existingNicknames.includes(nickname)) {
    //     visibleHelper("nickname", "*중복된 닉네임 입니다.");
    //     checkNickname = false;
    //     return;
    // }

    // 모든 검증을 통과한 경우
    invisibleHelper('nickname');
    checkNickname = true;
}

function visibleHelper(key, text) {
    // const helperTextElement = document.querySelector(".helper-text");
    // const helperTextElement = authComponent.getPasswordHelperText;
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
    const loginButton = document.querySelector('#signup-button');
    if (checkEmail && checkPassword && checkPasswordRe && checkNickname) {
        loginButton.style.backgroundColor = '#7F6AEE';
        loginButton.disabled = false;
    } else {
        loginButton.style.backgroundColor = '#ACA0EB';
        loginButton.disabled = true;
    }
}
