let buttonBack;
let buttonProfile;


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
        checkReferrer();

        buttonBack.onclick = () => {
            goBack();
        }
        buttonProfile.onclick = () => {
            window.location.href = "EditProfile.html";
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
