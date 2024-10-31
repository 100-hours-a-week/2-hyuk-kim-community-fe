import updateNumberForm from "/community/assets/js/util/manageNumber.js";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

let countLike;
let countView;
let countComment;

document.addEventListener('DOMContentLoaded', () => {
    console.log("postId: " + postId);
    const updateButton = document.querySelector('#button-update-post');
    const deleteButton = document.querySelector('#button-delete-post');
    manageNumber();

    const modal = document.querySelector('modal-component');

    updateButton.addEventListener("click", (event) => {
        window.location.href = "EditPost.html";
    });

    deleteButton.addEventListener("click", (event) => {
        console.log("delete post popup!!");
        showModal();
    });

    modal.addEventListener('modal-ok', () => {
        console.log("확인!!");
        // 게시글 삭제
        window.location.href = "Posts.html";
    });

    modal.addEventListener('modal-cancel', () => {
        console.log("취소!!");
        // 취소 버튼 클릭 후 처리할 로직 추가
    });
});

function showModal() {
    // document에서 모달 컴포넌트 선택하여 호출
    const modal = document.querySelector("modal-component");
    console.log(modal);
    modal.showModal("게시글을 삭제하시겠습니까?", "삭제한 내용은 복구 할 수 없습니다.");
}

function manageNumber() {
    countLike = document.querySelector("#count-like");
    countView = document.querySelector("#count-view");
    countComment = document.querySelector("#count-comment");
    countLike.innerText = updateNumberForm(countLike.innerText);
    countView.innerText = updateNumberForm(countView.innerText);
    countComment.innerText = updateNumberForm(countComment.innerText);
}