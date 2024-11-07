let fields = [];

class Comment extends HTMLElement {
    constructor() {
        super()
        console.log("HeaderComponent connected!!");
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        // getCommentList();
        fields = window.commentData;
        this.shadowRoot.innerHTML = this.template(fields);
    }

    template(fields) {
        return`
        ${fields.map((field) => `
        <link rel="stylesheet" href="/assets/css/Comment.css">
        <link rel="stylesheet" href="/assets/css/Common.css">
          <!--  여기는 상단 게시글 정보!!-->
          <article id="article-comment-list">
            <div class="post-metadata">
              <div class="author-info">
                <img class="img-profile" src="/assets/images/profile.webp" alt="profile">
                <p class="author-name">${field.author}</p>
                <span class="date-post">${field.date}</span>
              </div>
              <p class="content">${field.content}</p>
            </div>
            <div class="area-button">
              <button type="button" class="button-comment"> 수정 </button>
              <button type="button" class="button-comment"> 삭제 </button>
            </div>
          </article>
        `).join('')}
        `
    };
}

window.customElements.define('comment-component', Comment);