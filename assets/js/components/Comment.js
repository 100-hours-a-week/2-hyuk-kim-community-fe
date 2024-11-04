let fields = [];

class Comment extends HTMLElement {
    constructor() {
        super()
        console.log("HeaderComponent connected!!");
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        getCommentList();
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

function getCommentList() {
    fields = [
        { id: 0, authorId:'0', author:'김상혁', content: '내용내용', date:'2021-01-01 00:00:00'},
        { id: 1, authorId:'0', author:'김상혁', content: '내용용', date:'2021-01-01 00:00:00'},
        { id: 2, authorId:'0', author:'김상혁', content: '내내용', date:'2021-01-01 00:00:00'},
        { id: 3, authorId:'0', author:'김상혁', content: '내용', date:'2021-01-01 00:00:00'},
        { id: 4, authorId:'0', author:'김상혁', content: '용내', date:'2021-01-01 00:00:00'},
    ]

    // fields.forEach((field) => {
    //     field.like = updateNumberForm(field.like);
    //     field.comment = updateNumberForm(field.comment);
    //     field.view = updateNumberForm(field.view);
    // })
}

window.customElements.define('comment-component', Comment);