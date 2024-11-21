import apiFetch from '../api/ApiFetch.js';
import {
    DELETE_COMMENT_URL,
    DELETE_COMMENT_HEADER,
    UPDATE_COMMENT_URL,
    UPDATE_COMMENT_HEADER,
    CREATE_COMMENT_URL,
    CREATE_COMMENT_HEADER,
} from '../api/constants.js';
import showToast from '../util/Toast.js';

let fields = [];
let updateCommentId = '';
let postId = '';

class Comment extends HTMLElement {
    constructor() {
        super();
        console.log('HeaderComponent connected!!');
        this.attachShadow({ mode: 'open' });
        this.addEventListener('loadComments', event => {
            this.renderComments(event.detail);
        });
    }

    connectedCallback() {}

    renderComments(event) {
        fields = window.commentData;
        postId = window.postIdData;
        console.log('postId : ', postId);
        this.shadowRoot.innerHTML = this.template(fields);
        this.renderPosts();
    }

    template(fields) {
        return `
        <link rel="stylesheet" href="/assets/css/Comment.css">
        <link rel="stylesheet" href="/assets/css/Common.css">
        <div class="form-comment">
          <textarea class="textarea-comment" placeholder="댓글을 남겨주세요!"></textarea>
          <div class="line"></div>
          <button type="button" id="create-button" class="button-purple">댓글 등록</button>
        </div>
          <!--  여기부터 댓글 리스트!!-->
        ${Object.keys(fields)
            .map(key => {
                return `
          <article id="article-comment-list" data-id="${fields[key].id}">
          <div id="user-data" data-user="${fields[key].user_id}"></div>
            <div class="post-metadata">
                <div class="comment-data">
                    <div class="author-info">
                        <img class="img-profile" src="/assets/images/profile.webp" alt="profile">
                        <p class="author-name">${fields[key].nickname}</p>
                        <span class="date-post">${fields[key].createat}</span>
                    </div>
                    <p class="content">${fields[key].content}</p>
                </div>
                <div class="area-button">
                  <button type="button" id="button-comment-update" class="button-comment"> 수정 </button>
                  <button type="button" id="button-comment-delete" class="button-comment"> 삭제 </button>
                </div>
                <modal-component id="modal-comment-${fields[key].id}"></modal-component> 
            </div>
          </div>
          </article>
            `;
            })
            .join('')}
        `;
    }

    renderPosts() {
        const textAreaComment =
            this.shadowRoot.querySelector('.textarea-comment');
        const buttonCreate = this.shadowRoot.querySelector('#create-button');
        buttonCreate.style.backgroundColor = '#ACA0EB';
        buttonCreate.disabled = true;

        textAreaComment.addEventListener('input', () => {
            buttonCreate.style.backgroundColor = textAreaComment.value.length > 0 ? '#7F6AEE' : '#ACA0EB';
            buttonCreate.disabled = textAreaComment.value.length === 0;
        });

        buttonCreate.addEventListener('click', event => {
            if (updateCommentId === '') {
                console.log('content : ', textAreaComment.value);
                console.log('userId : ', sessionStorage.getItem('userId'));
                fetchCreateComment(
                    textAreaComment.value,
                    sessionStorage.getItem('userId'),
                );
            } else {
                fetchUpdateComment(
                    updateCommentId,
                    textAreaComment.value,
                    sessionStorage.getItem('userId'),
                );
                updateCommentId = '';
                buttonCreate.textContent = '댓글 등록';
            }
            this.renderPosts();
            textAreaComment.value = '';
        });

        console.log(
            'add event!! ; ' +
                this.shadowRoot.querySelectorAll('#article-comment-list')
                    .length,
        );
        this.shadowRoot
            .querySelectorAll('#article-comment-list')
            .forEach(comment => {
                const buttonArea = comment.querySelector('.area-button');
                const buttonUpdate = comment.querySelector(
                    '#button-comment-update',
                );
                const buttonDelete = comment.querySelector(
                    '#button-comment-delete',
                );

                const commentId = comment.getAttribute('data-id');
                const commentUser = comment
                    .querySelector('#user-data')
                    .getAttribute('data-user');
                const modalId = '#modal-comment-' + commentId;
                const modal = this.shadowRoot.querySelector(modalId);
                if (commentUser !== sessionStorage.getItem('userId')) {
                    buttonArea.style.visibility = 'hidden';
                    return;
                }

                buttonUpdate.addEventListener('click', function () {
                    const commentId = comment.getAttribute('data-id');
                    textAreaComment.value =
                        comment.querySelector('.content').textContent;
                    updateCommentId = commentId;
                    buttonCreate.textContent = '댓글 수정';
                });

                buttonDelete.addEventListener('click', function () {
                    console.log('delete post popup!!');
                    showModal(modal);
                });

                modal.addEventListener('modal-cancel', () => {
                    console.log('취소!!');
                });

                modal.addEventListener('modal-ok', () => {
                    console.log('확인!!');
                    fetchDeleteComment(commentId);
                });
            });
    }
}

async function fetchCreateComment(content, userId) {
    const body = { postId, content, userId };
    try {
        const result = await apiFetch(CREATE_COMMENT_URL, CREATE_COMMENT_HEADER, body);
        if (result) {
            window.location.reload();
            showToast('생성 완료');
        } else {
            console.log('create comment failed!!');
        }
    } catch (error) {
        console.error(error);
    }
}

async function fetchUpdateComment(id, content, userId) {
    const body = { userId, content };
    try {
        const result = await apiFetch(UPDATE_COMMENT_URL.replace(':commentId', id), UPDATE_COMMENT_HEADER, body);
        if (result) {
            showToast('생성 완료');
            window.location.reload();
        } else {
            console.log('create post failed!!');
        }
    } catch (error) {
        console.error(error);
    }
}

async function fetchDeleteComment(id) {
    try {
        const result = await apiFetch(DELETE_COMMENT_URL.replace(':commentId', id), DELETE_COMMENT_HEADER);
        if (result) {
            showToast('삭제 완료');
            window.location.reload();
        } else {
            console.log('create comment failed!!');
        }
    } catch (error) {
        console.error(error);
    }
}

function showModal(modal) {
    modal.showModal(
        '댓글을 삭제하시겠습니까?',
        '삭제한 내용은 복구 할 수 없습니다.',
    );
}

window.customElements.define('comment-component', Comment);
