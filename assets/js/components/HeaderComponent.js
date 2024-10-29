class HeaderComponent extends HTMLElement {
    constructor() {
        super()
        console.log("HeaderComponent connected!!");
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template()
    }

    template() {
        return `
        <link rel="stylesheet" type="text/css" href="/assets/css/Header.css">
        <header>
            <div class="header">
                <p id="logo">아무 말 대잔치</p>
            </div>
        </header>
        `
    }
}

window.customElements.define('header-component', HeaderComponent);
// export default headerComponent;
