let fields = [];

class PostsListComponent extends HTMLElement {
    constructor() {
        super()
        console.log("PostsListComponent connected!!");
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        getPostList();
        this.shadowRoot.innerHTML = this.template(fields);
        this.renderPosts(fields);
    }

    template(fields) {
        return `
        <link rel="stylesheet" type="text/css" href="/assets/css/PostPreviewComponent.css">
        <link rel="stylesheet" type="text/css" href="/assets/css/PostsListComponent.css">
        <div id="post-list">
        ${fields.map((field) => `
            <section id="post-preview" data-id="${field.id}">
                <article id="post-info-article">
                    <p id="post-title">${field.title}</p>
                    <div class="post-info">
                        <div class="post-metadata">
                            <span class="text-metadata">좋아요&nbsp</span> <span id="count-like" class="count">${field.like}</span>
                            <span class="text-metadata">댓글&nbsp</span> <span id="count-comment" class="count">${field.comment}</span>
                            <span class="text-metadata">조회수&nbsp</span> <span id="count-view" class="count">${field.view}</span>
                            <span class="date-post">${field.date}</span>
                        </div>
                    </div>
                </article>
                <div class="line"></div>
                <div class="author-info">
                    <img class="profile-img"sizes="" src="/assets/images/profile.webp" alt="profile">
                    <p class="author-name">작성자</p>    
                </div>
            </section>
            `
        ,).join('')}
        </div>
        `
    }

    renderPosts(fields) {
        // const postListContainer = document.getElementById("post-list-container");
        // postListContainer.innerHTML = template(fields);
        console.log("add event!! ; " + this.shadowRoot.querySelectorAll("#post-preview").length);
        // 각 post-preview 섹션에 클릭 이벤트 추가
        this.shadowRoot.querySelectorAll("#post-preview").forEach((post) => {
            post.addEventListener("click", function () {
                const postId = post.getAttribute("data-id");
                console.log("clicked post! : " + postId);
                window.location.href = `Post.html?id=${postId}`;
            });
        });
    }

}


function getPostList() {
    fields = [
        { id: 0, title: '제목제목', like: 1, comment:2, view:3, date:'2021-01-01 00:00:00', author:'김상혁' },
        { id: 1, title: '제제목목', like: 1, comment:2, view:3, date:'2031-01-01 00:00:00', author:'김상' },
        { id: 2, title: '긴글긴글', like: 1, comment:2, view:3, date:'2041-01-01 00:00:00', author:'김' },
        { id: 0, title: '제목제목', like: 1, comment:2, view:3, date:'2021-01-01 00:00:00', author:'김상혁' },
        { id: 1, title: '제제목목', like: 1, comment:2, view:3, date:'2031-01-01 00:00:00', author:'김상' },
        { id: 2, title: '긴글긴글', like: 1, comment:2, view:3, date:'2041-01-01 00:00:00', author:'김' },
        { id: 0, title: '제목제목', like: 1, comment:2, view:3, date:'2021-01-01 00:00:00', author:'김상혁' },
        { id: 1, title: '제제목목', like: 1, comment:2, view:3, date:'2031-01-01 00:00:00', author:'김상' },
        { id: 2, title: '긴글긴글', like: 1, comment:2, view:3, date:'2041-01-01 00:00:00', author:'김' },
    ]
}

window.customElements.define('post-list-component', PostsListComponent);