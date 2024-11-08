let isLoginPage = false;
let fields = [];
let cssFileName;

class AuthComponent extends HTMLElement {
    constructor() {
        super();
        console.log('HeaderComponent connected!!');
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        checkReferrer();
        this.shadowRoot.innerHTML = this.template();
    }

    template() {
        const fieldsHTML = fields
            .map(field => {
                return `
            <p id="${field.id}-text" class="text-guide"> ${field.label} </p>
            <input id="${field.id}-input" type="${field.type}" class="input-userinfo" placeholder="${field.placeholder}">
            <p id="${field.id}-helper-text" class="helper-text"> *helper text </p>
        `;
            })
            .join('');

        return `
        <link rel="stylesheet" href="/assets/css/AuthComponent.css">
        <link rel="stylesheet" href="/assets/css/${cssFileName}.css">
        <link rel="stylesheet" href="/assets/css/Common.css">
        <article id="article-auth">
            ${fieldsHTML}
        </article>
    `;
    }
    get getEmailInput() {
        return this.shadowRoot.getElementById('email-input');
    }

    get getPasswordInput() {
        return this.shadowRoot.getElementById('password-input');
    }

    getInput(text) {
        return this.shadowRoot.getElementById(`${text}-input`);
    }

    getHelperText(text) {
        return this.shadowRoot.getElementById(`${text}-helper-text`);
    }
}

function checkReferrer() {
    const pageNow = window.location.pathname;
    console.log('pageNow: ' + pageNow);
    if (pageNow.includes('SignUpPage')) {
        isLoginPage = false;
        cssFileName = 'SignUpPage';
        fields = [
            {
                id: 'email',
                label: '이메일*',
                type: 'email',
                placeholder: '이메일을 입력하세요',
            },
            {
                id: 'password',
                label: '비밀번호*',
                type: 'password',
                placeholder: '비밀번호를 입력하세요',
            },
            {
                id: 'password-re',
                label: '비밀번호 확인*',
                type: 'password',
                placeholder: '비밀번호를 한번 더 입력하세요',
            },
            {
                id: 'nickname',
                label: '닉네임*',
                type: 'text',
                placeholder: '닉네임을 입력하세요',
            },
        ];
    } else if (pageNow.includes('EditPasswordPage')) {
        cssFileName = 'EditPasswordPage';
        fields = [
            {
                id: 'password',
                label: '비밀번호',
                type: 'password',
                placeholder: '비밀번호를 입력하세요',
            },
            {
                id: 'password-re',
                label: '비밀번호 확인',
                type: 'password',
                placeholder: '비밀번호를 한번 더 입력하세요',
            },
        ];
    } else {
        // if (pageNow.includes('LoginPage')) {
        isLoginPage = true;
        cssFileName = 'LoginPage';
        fields = [
            {
                id: 'email',
                label: '이메일',
                type: 'email',
                placeholder: '이메일을 입력하세요',
            },
            {
                id: 'password',
                label: '비밀번호',
                type: 'password',
                placeholder: '비밀번호를 입력하세요',
            },
        ];
    }
}

window.customElements.define('auth-component', AuthComponent);
export { AuthComponent };
