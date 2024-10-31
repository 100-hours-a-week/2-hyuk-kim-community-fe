import showToast from "/community/assets/js/util/Toast.js";

let checkNickname = false;

document.addEventListener('DOMContentLoaded', () => {
    const nicknameInput = document.querySelector('.input-nickname');
    const editButton = document.querySelector("#button-edit");
    const modal = document.querySelector('modal-component');
    const deleteButton = document.querySelector('#signout-button');

    nicknameInput.addEventListener("input", (event) => {
        validateNickname(event.target.value);
        activeLoginButton();
    });


    editButton.disabled = true;
    editButton.addEventListener("click", (event) => {
        // 토스트
        showToast("수정 완료");
    })



    // modal
    deleteButton.addEventListener("click", (event) => {
        console.log("delete post popup!!");
        showModal();
    });

    modal.addEventListener('modal-ok', () => {
        console.log("확인!!");
        // 게시글 삭제
        window.location.href = "LoginPage.html";
    });

    modal.addEventListener('modal-cancel', () => {
        console.log("취소!!");
        // 취소 버튼 클릭 후 처리할 로직 추가
    });

});

function validateNickname(nickname) {
    const nicknameRegex = /^[^\s]{1,10}$/; // 1자 이상 10자 이하, 공백 없음

    // 닉네임 입력 여부 검사
    if (nickname.length === 0) {
        visibleHelper("nickname", "*닉네임을 입력해주세요.");
        checkNickname = false;
        return;
    }

    // 닉네임 길이 검사
    if (nickname.length > 10) {
        visibleHelper("nickname", "*닉네임은 최대 10자 까지 작성 가능합니다.");
        checkNickname = false;
        return;
    }

    // 공백 검사
    if (!nicknameRegex.test(nickname)) {
        visibleHelper("nickname", "*띄어쓰기를 없애주세요.");
        checkNickname = false;
        return;
    }

    // 닉네임 중복 검사
    // if (existingNicknames.includes(nickname)) {
    //     visibleHelper("nickname", "*중복된 닉네임 입니다.");
    //     checkNickname = false;
    //     return;
    // }

    // 모든 검증을 통과한 경우
    invisibleHelper("nickname");
    checkNickname = true;
}

function visibleHelper(key, text) {
    const helperTextElement = document.querySelector(".helper-text");
    helperTextElement.textContent = text;
    helperTextElement.style.visibility = "visible";
}

function invisibleHelper(key) {
    console.log("valid success!!")
    // const helperTextElement = document.querySelector(".helper-text");
    const helperTextElement = document.querySelector(".helper-text");
    helperTextElement.style.visibility = "hidden";
}

function activeLoginButton() {
    console.log(checkNickname)
    const loginButton = document.querySelector("#button-edit");
    if (checkNickname) {
        loginButton.style.backgroundColor = "#7F6AEE";
        loginButton.disabled = false;
    } else {
        loginButton.style.backgroundColor = "#ACA0EB";
        loginButton.disabled = true;
    }
}

function showModal() {
    // document에서 모달 컴포넌트 선택하여 호출
    const modal = document.querySelector("modal-component");
    console.log(modal);
    modal.showModal("게시글을 삭제하시겠습니까?", "삭제한 내용은 복구 할 수 없습니다.");
}





