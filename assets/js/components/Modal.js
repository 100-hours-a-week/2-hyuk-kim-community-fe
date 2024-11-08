class Modal extends HTMLElement {
    constructor() {
        super();
        console.log('PostsListComponent connected!!');
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
        this.shadowRoot.querySelector('#cancel').onclick = () => {
            this.handleCancel();
        };
        this.shadowRoot.querySelector('#ok').onclick = () => {
            this.handleOk();
        };
    }

    template() {
        return `
        <link rel="stylesheet" type="text/css" href="/assets/css/Modal.css">
        <link rel="stylesheet" type="text/css" href="/assets/css/Common.css">
        <section id="modal-container">
            <p id="title"> 모달 제목 </p>
            <p id="content"> 모달 내용 </p>
            <div>
                <button id="cancel" class="modal-button" type="button">취소</button>
                <button id="ok" class="modal-button" type="button">확인</button>
            </div>
        </section>
        `;
    }

    showModal(title, content) {
        this.shadowRoot.querySelector('#title').textContent = title;
        this.shadowRoot.querySelector('#content').textContent = content;
        this.shadowRoot.querySelector('#modal-container').style.visibility =
            'visible';
        // .classList.remove("modal-hidden");
    }

    closeModal() {
        this.shadowRoot.querySelector('#modal-container').style.visibility =
            'hidden';
    }

    handleCancel() {
        this.closeModal();
        this.dispatchEvent(
            new CustomEvent('modal-cancel', { bubbles: true, composed: true }),
        );
    }

    handleOk() {
        this.closeModal();
        this.dispatchEvent(
            new CustomEvent('modal-ok', { bubbles: true, composed: true }),
        );
    }
}

window.customElements.define('modal-component', Modal);
