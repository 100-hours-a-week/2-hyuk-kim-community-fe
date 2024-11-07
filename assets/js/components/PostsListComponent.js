import updateNumberForm from "../util/manageNumber.js";
import {
    GET_POST_LIST_HEADER,
    GET_POST_LIST_URL,
} from "../api/constants.js";
import apiFetch from "../api/ApiFetch.js";

let fields = [];

class PostsListComponent extends HTMLElement {
    constructor() {
        super()
        console.log("PostsListComponent connected!!");
        this.attachShadow({mode: 'open'})
    }

    async connectedCallback() {
        await getPostList();
        this.shadowRoot.innerHTML = this.template(fields);
        this.renderPosts(fields);
    }

    template(fields) {
        return `
        <link rel="stylesheet" type="text/css" href="/assets/css/PostPreviewComponent.css">
        <link rel="stylesheet" type="text/css" href="/assets/css/PostsListComponent.css">
        <div id="post-list">
  
        ${Object.keys(fields).map((key) => {
            return `
            <section id="post-preview" data-id="${key}">
                <article id="post-info-article">
                    <p id="post-title">${fields[key].title}</p>
                    <div class="post-info">
                        <div class="post-metadata">
                            <span class="text-metadata">좋아요&nbsp</span> <span id="count-like" class="count">${fields[key].countLike}</span>
                            <span class="text-metadata">댓글&nbsp</span> <span id="count-comment" class="count">${fields[key].countComment}</span>
                            <span class="text-metadata">조회수&nbsp</span> <span id="count-view" class="count">${fields[key].countView}</span>
                            <span class="date-post">${fields[key].date}</span>
                        </div>
                    </div>
                </article>
                <div class="line"></div>
                <div class="author-info">
                    <img class="profile-img" sizes="" src="/assets/images/profile.webp" alt="profile">
                    <p class="author-name">${fields[key].nickname}</p>    
                </div>
            </section>
            `
        }).join('')}
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


async function getPostList() {
    fields = await apiFetch(GET_POST_LIST_URL, GET_POST_LIST_HEADER).then((result) => {
        console.log("get post success!! : " + JSON.stringify(result));
        if(result) {
            Object.keys(result).forEach((key) => {
                result[key].countLike = updateNumberForm(result[key].countLike);
                result[key].countComment = updateNumberForm(Object.keys(result[key].comment).length);
                result[key].countView = updateNumberForm(result[key].countView);
            })

            return(result);
        } else console.log("create post failed!!");
    }).catch(console.error);

    console.log("fields.length fetch : " + JSON.stringify(fields));
    // fields = [
    //     { id: 0, title: '제목제목', like: 11111111, comment:2, view:3, date:'2021-01-01 00:00:00', author:'김상혁' },
    //     { id: 1, title: '제제목목', like: 1, comment:2111111111, view:3, date:'2031-01-01 00:00:00', author:'김상' },
    //     { id: 2, title: '긴글긴글', like: 1, comment:2, view:3111111111, date:'2041-01-01 00:00:00', author:'김' },
    //     { id: 0, title: '제목제목', like: 1, comment:2, view:3, date:'2021-01-01 00:00:00', author:'김상혁' },
    //     { id: 1, title: '제제목목', like: 1, comment:2, view:3, date:'2031-01-01 00:00:00', author:'김상' },
    //     { id: 2, title: '긴글긴글', like: 1, comment:2, view:3, date:'2041-01-01 00:00:00', author:'김' },
    //     { id: 0, title: '제목제목', like: 1, comment:2, view:3, date:'2021-01-01 00:00:00', author:'김상혁' },
    //     { id: 1, title: '제제목목', like: 1, comment:2, view:3, date:'2031-01-01 00:00:00', author:'김상' },
    //     { id: 2, title: '긴글긴글', like: 1, comment:2, view:3, date:'2041-01-01 00:00:00', author:'김' },
    // ]
}

async function fetchGetPostList() {
    console.log("")

}

window.customElements.define('post-list-component', PostsListComponent);