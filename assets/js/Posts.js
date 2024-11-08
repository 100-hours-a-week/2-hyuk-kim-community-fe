let postsListComponent;

document.addEventListener('DOMContentLoaded', () => {
    const postButton = document.querySelector('.button-purple');
    postsListComponent = document.querySelector('post-list-component');

    postButton.addEventListener('click', event => {
        window.location.href = 'MakePost.html';
    });
});
