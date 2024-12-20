import updateNumberForm from './util/manageNumber.js';
import apiFetch from './api/ApiFetch.js';
import {
    GET_POST_HEADER,
    GET_POST_URL,
    DELETE_POST_URL,
    DELETE_POST_HEADER,
} from './api/constants.js';

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
let backgroundModal;

let countLike;
let countView;
let countComment;

document.addEventListener('DOMContentLoaded', () => {
    console.log(`post page!! :  ${postId}`);
    const updateButton = document.querySelector('#button-update-post');
    const deleteButton = document.querySelector('#button-delete-post');
    backgroundModal = document.querySelector('#background-modal');
    manageNumber();
    fetchGetPost(postId, document);

    const modal = document.querySelector('modal-component');

    updateButton.addEventListener('click', event => {
        window.location.href = `EditPost.html?id=${postId}`;
    });

    deleteButton.addEventListener('click', event => {
        console.log('delete post popup!!');
        showModal();
    });

    modal.addEventListener('modal-cancel', () => {
        console.log('취소!!');
        backgroundModal.style.visibility = 'hidden';
    });

    modal.addEventListener('modal-ok', () => {
        console.log('확인!!');
        fetchDeletePost(postId);
        window.location.href = 'Posts.html';
    });
});

async function fetchGetPost(id, document) {
    apiFetch(GET_POST_URL.replace(':postId', id), GET_POST_HEADER)
        .then(result => {
            console.log(`get post success!! : ${result}`);
            if (result) {
                document.querySelector('#post-title').textContent = result['title'];
                document.querySelector('.author-name').textContent = result['nickname'];
                document.querySelector('.date-post').textContent = result['date'];
                document.querySelector('.content').textContent = result['content'];
                document.querySelector('#count-like').textContent = result['count_like'];
                document.querySelector('#count-view').textContent = result['count_view'];
                document.querySelector('#count-comment').textContent = Object.keys(result['comment']).length;

                window.commentData = result['comment'];
                window.postIdData = result['postId'];
                const commentEvent = new CustomEvent('loadComments', {
                    detail: result['comment'],
                });
                document
                    .querySelector('comment-component')
                    .dispatchEvent(commentEvent);
            } else console.log('create post failed!!');
        })
        .catch(console.error);
}

async function fetchDeletePost(id) {
    apiFetch(DELETE_POST_URL.replace(':postId', id), DELETE_POST_HEADER)
        .then(result => {
            if (result) {
                console.log(`delete post success!! : ${result}`);
            } else console.log('create post failed!!');
        })
        .catch(console.error);
}

function showModal() {
    // document에서 모달 컴포넌트 선택하여 호출
    const modal = document.querySelector('modal-component');
    backgroundModal.style.visibility = 'visible';
    // wrap.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    console.log(modal);
    modal.showModal( '게시글을 삭제하시겠습니까?', '삭제한 내용은 복구 할 수 없습니다.' );
}

function manageNumber() {
    countLike = document.querySelector('#count-like');
    countView = document.querySelector('#count-view');
    countComment = document.querySelector('#count-comment');
    countLike.innerText = updateNumberForm(countLike.innerText);
    countView.innerText = updateNumberForm(countView.innerText);
    countComment.innerText = updateNumberForm(countComment.innerText);
}
