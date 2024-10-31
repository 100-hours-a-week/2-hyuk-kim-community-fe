document.addEventListener('DOMContentLoaded', () => {
    const postButton = document.querySelector(".button-purple");
    postButton.addEventListener("click", (event) => {
        window.location.href = "MakePost.html";
    })
    postButton.addEventListener("mouseenter", (event) => {
        console.log("enter!!");
        postButton.style.backgroundColor = "#7F6AEE";
    });

    postButton.addEventListener("mouseleave", (event) => {
        console.log("out!!");
        postButton.style.backgroundColor = "#ACA0EB"; // 원래 색으로 되돌리기 위해 초기화
    });
});