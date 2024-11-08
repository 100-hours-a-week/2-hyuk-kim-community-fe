import apiFetch from "../api/ApiFetch.js";
import {
    DELETE_COMMENT_URL, DELETE_COMMENT_HEADER,
    UPDATE_COMMENT_URL, UPDATE_COMMENT_HEADER,
    CREATE_COMMENT_URL, CREATE_COMMENT_HEADER
} from "../api/constants.js";

let fields = [];
let updateCommentId = "";
let postId = "";

class Comment extends HTMLElement {
    constructor() {
        super()
        console.log("HeaderComponent connected!!");
        this.attachShadow({mode: 'open'})
        this.addEventListener("loadComments", (event) => {
            this.renderComments(event.detail);
        });
    }

    connectedCallback() {
    }

    renderComments(event) {
        fields = window.commentData;
        postId = window.postIdData;
        console.log("postId : ", postId);
        this.shadowRoot.innerHTML = this.template(fields);
        this.renderPosts();
    }

    template(fields) {
        return`
        <link rel="stylesheet" href="/assets/css/Comment.css">
        <link rel="stylesheet" href="/assets/css/Common.css">
        <div class="form-comment">
          <textarea class="textarea-comment" placeholder="댓글을 남겨주세요!"></textarea>
          <div class="line"></div>
          <button type="button" id="create-button" class="button-purple">댓글 등록</button>
        </div>
          <!--  여기부터 댓글 리스트!!-->
        ${Object.keys(fields).map((key) => {
            return `
          <article id="article-comment-list" data-id="${key}">
          <div id="email-date" data-email="${fields[key].email}"></div>
            <div class="post-metadata">
                <div class="comment-data">
                    <div class="author-info">
                        <img class="img-profile" src="/assets/images/profile.webp" alt="profile">
                        <p class="author-name">${fields[key].nickname}</p>
                        <span class="date-post">${fields[key].date}</span>
                    </div>
                    <p class="content">${fields[key].content}</p>
                </div>
                <div class="area-button">
                  <button type="button" id="button-comment-update" class="button-comment"> 수정 </button>
                  <button type="button" id="button-comment-delete" class="button-comment"> 삭제 </button>
                </div>
            </div>
          </div>
          </article>
            `
        }).join('')}
        `
    };

    renderPosts() {
        // const postListContainer = document.getElementById("post-list-container");
        // postListContainer.innerHTML = template(fields);
        const textAreaComment = this.shadowRoot.querySelector(".textarea-comment");
        const buttonCreate = this.shadowRoot.querySelector("#create-button");

        buttonCreate.addEventListener("click", (event) => {
            if (updateCommentId === "") {
                console.log("content : ", textAreaComment.value);
                console.log("email : ", sessionStorage.getItem("email"));
                fetchCreateComment(textAreaComment.value, sessionStorage.getItem("email"));
            } else {
                fetchUpdateComment(updateCommentId, textAreaComment.value, sessionStorage.getItem("email"));
                updateCommentId = "";
                buttonCreate.textContent = "댓글 등록";
            }
            textAreaComment.value = "";
        })

        console.log("add event!! ; " + this.shadowRoot.querySelectorAll("#article-comment-list").length);
        this.shadowRoot.querySelectorAll("#article-comment-list").forEach((comment) => {
            const buttonArea = comment.querySelector(".area-button");
            const buttonUpdate = comment.querySelector("#button-comment-update");
            const buttonDelete = comment.querySelector("#button-comment-delete");

            const commentId = comment.getAttribute("data-id");
            const commentEmail = comment.querySelector("#email-date").getAttribute("data-email");

            if(commentEmail !== sessionStorage.getItem("email")) {
                buttonArea.style.visibility = 'hidden';
                return;
            }

            buttonUpdate.addEventListener("click", function () {
                const commentId = comment.getAttribute("data-id");
                textAreaComment.textContent = comment.querySelector(".content").textContent;
                updateCommentId = commentId;
                buttonCreate.textContent = "댓글 수정";
                // fetchUpdateComment(commentId, textAreaComment.textContent, sessionStorage.getItem("email"));
            });

            buttonDelete.addEventListener("click", function () {
                // 팝업!
                fetchDeleteComment(commentId);
            });
        });
    }
}

async function fetchCreateComment(content, email) {
    const body = ({
        postId: postId,
        content: content,
        email: email,
    });
    apiFetch(CREATE_COMMENT_URL, CREATE_COMMENT_HEADER, body).then((result) => {
        console.log("create comment success!! : " + result);
        if(result) {
            // showToast("생성 완료");
        } else console.log("create comment failed!!");
    }).catch(console.error);
}

async function fetchUpdateComment(id, content, email) {
    const body = ({
        email: email,
        content: content,
    });
    apiFetch(UPDATE_COMMENT_URL.replace(":commentId", id), UPDATE_COMMENT_HEADER, body).then((result) => {
        console.log("create post success!! : " + result);
        if(result) {
            // showToast("생성 완료");

        } else console.log("create post failed!!");
    }).catch(console.error);
}

function fetchDeleteComment(id) {
    apiFetch(DELETE_COMMENT_URL.replace(":commentId", id), DELETE_COMMENT_HEADER).then((result) => {
        if(result) {
            console.log("delete comment success!! : " + result);
        } else console.log("create comment failed!!");
    }).catch(console.error);
}

window.customElements.define('comment-component', Comment);