import showToast from "/community/assets/js/util/Toast.js";

let checkPassword = false;
let checkPasswordRe = false;
let authComponent;

document.addEventListener('DOMContentLoaded', () => {
    authComponent = document.querySelector('auth-component');
    const passwordInput = authComponent.getInput("password");
    const passwordReInput = authComponent.getInput("password-re");

    const editButton = document.querySelector("#login-button");

    passwordInput.addEventListener("input", (event) => {
        validatePassword(event.target.value);
        validatePasswordRe(passwordReInput.value, event.target.value);
        activeLoginButton();
    });

    passwordReInput.addEventListener("input", (event) => {
        // validatePassword(event.target.value);
        validatePasswordRe(event.target.value, passwordInput.value);
        activeLoginButton();
    });


    editButton.disabled = true;
    editButton.addEventListener("click", (event) => {
        // 토스트
        showToast("수정 완료");
    })


});


function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?~-]).{8,20}$/;
    if (password.length === 0) {
        visibleHelper("password","*비밀번호를 입력해주세요");
        checkPassword = false;
    } else if (passwordRegex.test(password)) {
        invisibleHelper("password");
        checkPassword = true;
    } else {
        visibleHelper("password","*비밀번호가 다릅니다.");
        checkPassword = false;
    }
}

function validatePasswordRe(passwordRe, password) {
    if (passwordRe.length === 0) {
        visibleHelper("password-re","*비밀번호를 한번더 입력해주세요");
        checkPasswordRe = false;
    } else if (passwordRe === password) {
        invisibleHelper("password-re");
        checkPasswordRe = true;
    } else {
        visibleHelper("password-re","*비밀번호가 다릅니다.");
        checkPasswordRe = false;
    }
}

function visibleHelper(key, text) {
    const helperTextElement = authComponent.getHelperText(key);
    helperTextElement.textContent = text;
    helperTextElement.style.visibility = "visible";
}

function invisibleHelper(key) {
    console.log("valid success!!")
    // const helperTextElement = document.querySelector(".helper-text");
    const helperTextElement = authComponent.getHelperText(key);
    helperTextElement.style.visibility = "hidden";
}

function activeLoginButton() {
    console.log(checkPasswordRe, "&&", checkPassword)
    const loginButton = document.querySelector("#login-button");
    if (checkPasswordRe && checkPassword) {
        loginButton.style.backgroundColor = "#7F6AEE";
        loginButton.disabled = false;
    } else {
        loginButton.style.backgroundColor = "#ACA0EB";
        loginButton.disabled = true;
    }
}




