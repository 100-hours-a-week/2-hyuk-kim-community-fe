const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

document.addEventListener('DOMContentLoaded', () => {
    console.log("postId: " + postId);
    const updateButton = document.querySelector('#button-update-post');
    const deleteButton = document.querySelector('#button-delete-post');

    updateButton.addEventListener("click", (event) => {
        window.location.href = "EditPost.html";
    });

    deleteButton.addEventListener("click", (event) => {
        console.log("delete post popup!!");
    });
});