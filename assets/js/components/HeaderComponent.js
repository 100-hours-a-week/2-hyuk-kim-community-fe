let buttonBack;
let buttonProfile;
let menu;

class HeaderComponent extends HTMLElement {
    constructor() {
        super()
        console.log("HeaderComponent connected!!");
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template()
        buttonBack = this.shadowRoot.querySelector('#button-back');
        buttonProfile = this.shadowRoot.querySelector('#button-profile');
        menu = this.shadowRoot.querySelector('#menu');
        menu.style.visibility = 'hidden';

        this.shadowRoot.querySelector('#menu-edit-profile').onclick = () => {window.location.href = "EditProfile.html";};
        this.shadowRoot.querySelector('#menu-edit-password').onclick = () => {window.location.href = "EditPasswordPage.html";};
        this.shadowRoot.querySelector('#menu-logout').onclick = () => {
            sessionStorage.removeItem("email");
            window.location.href = "LoginPage.html";
        };
        checkReferrer();

        buttonBack.onclick = () => {
            goBack();
        }
        buttonProfile.onclick = (event) => {
            console.log("clicked profile image!!");
            const profileRightX = buttonProfile.getBoundingClientRect().right;
            const profileBottomY = buttonProfile.getBoundingClientRect().bottom;
            const menuWidth = menu.offsetWidth;
            const offset = 8;

            menu.style.position = 'absolute';
            menu.style.left = `${profileRightX - menuWidth}px`;
            menu.style.top = `${profileBottomY + offset}px`;

            menu.style.visibility = menu.style.visibility === 'visible' ? 'hidden' : 'visible';
        }

    }

    template() {
        return `
        <link rel="stylesheet" type="text/css" href="/assets/css/Header.css">
        <header>
            <div class="header">
                <button id="button-back" type="button">
<!--                    <img src="/assets/images/back.svg" alt="back"></img>-->
                </button> 
                <p id="logo">아무 말 대잔치</p>
                <button id="button-profile" type="button">
<!--                    <img src="/assets/images/profile.webp" alt="profile"></img>-->
                </button> 
                <div id="menu">
                    <p id="menu-edit-profile" class="menu" type="button">회원정보수정</p>
                    <p id="menu-edit-password" class="menu" type="button">비밀번호수정</p>
                    <p id="menu-logout" class="menu" type="button">로그아웃</p>
                </div>
            </div>
        </header>
        `
    }
}

function checkReferrer() {
    const pageNow = window.location.pathname;
    console.log("buttonBack: " + buttonBack + " / buttonProfile: " + buttonProfile);
    console.log("pageNow: " + pageNow);
    if (pageNow.includes('LoginPage') || pageNow.includes('EditProfilePage')
        || pageNow.includes('EditPasswordPage') || pageNow.includes('Posts')) {
        buttonBack.style.visibility = "hidden";
        // buttonBack.display = "none";
    }
    if (pageNow.includes('LoginPage') || pageNow.includes('SignUpPage')){
        buttonProfile.style.visibility = "hidden";
        // buttonProfile.display = "none";
    }
}


function goBack() {
    window.history.go(-1);
}
window.customElements.define('header-component', HeaderComponent);
// export default headerComponent;
