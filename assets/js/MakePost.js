import { CREATE_POST_URL, CREATE_POST_HEADER } from './api/constants.js';
import apiFetch from '../js/api/ApiFetch.js';
import showToast from './util/Toast.js';

let validateTitle = false;
let validateContent = false;
let helperText;

document.addEventListener('DOMContentLoaded', () => {
    const inputTitle = document.querySelector('.input-title');
    const inputContent = document.querySelector('.input-content');
    helperText = document.querySelector('.helper-text');
    const endButton = document.querySelector('.button-purple');

    // endButton.addEventListener("click", (e) => {window.location.href="Posts.html"})

    inputTitle.addEventListener('input', () => {
        if (inputTitle.value.length > 26) {
            inputTitle.value = inputTitle.value.slice(0, 26);
        }
        if (inputTitle.value.length > 0) {
            validateTitle = true;
        } else {
            validateTitle = false;
        }

        updateEndButton(endButton);
    });

    inputContent.addEventListener('input', () => {
        if (inputContent.value.length > 0) {
            validateContent = true;
        } else {
            validateContent = false;
        }
        updateEndButton(endButton);
    });

    endButton.addEventListener('click', async e => {
        if (!sessionStorage.getItem('email')) return;
        await fetchCreatePost(
            sessionStorage.getItem('email'),
            inputTitle.value,
            inputContent.value,
        );
        // const result = 'asdf';
        // window.location.href=`./../../html/Post.html?id=${result}`;
    });
});

async function fetchCreatePost(email, title, content) {
    const body = {
        email: email,
        title: title,
        content: content,
    };
    apiFetch(CREATE_POST_URL, CREATE_POST_HEADER, body)
        .then(result => {
            console.log('create post success!! : ' + result);
            if (result) {
                showToast('생성 완료');
                const url = `./../../html/Post.html?id=${result}`;
                window.location.href = url;
            } else console.log('create post failed!!');
        })
        .catch(console.error);
}

function updateEndButton(endButton) {
    if (validateTitle && validateContent) {
        endButton.style.backgroundColor = '#7F6AEE';
        endButton.disabled = false;
        helperText.style.visibility = 'hidden';
    } else {
        endButton.style.backgroundColor = '#ACA0EB';
        endButton.disabled = true;
        helperText.style.visibility = 'visible';
    }
}
