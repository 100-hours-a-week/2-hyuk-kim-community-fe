import apiFetch from './api/ApiFetch.js';
import {
    GET_POST_EDIT_URL,
    GET_POST_HEADER,
    PATCH_POST_URL,
    PATCH_POST_HEADER,
} from './api/constants.js';

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

let validateTitle = false;
let validateContent = false;

document.addEventListener('DOMContentLoaded', () => {
    const inputTitle = document.querySelector('.input-title');
    const inputContent = document.querySelector('.input-content');
    const endButton = document.querySelector('.button-purple');
    fetchGetPostEdit();

    endButton.addEventListener('click', e => {
        fetchUpdatePost(inputTitle.value, inputContent.value);
        window.location.href = `Post.html?id=${postId}`;
    });

    inputTitle.addEventListener('input', () => {
        if (inputTitle.value.length > 26) {
            inputTitle.value = inputTitle.value.slice(0, 26);
        }
        validateTitle = inputTitle.value.length > 0;
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
});

async function fetchGetPostEdit() {
    apiFetch(GET_POST_EDIT_URL.replace(':postId', postId), GET_POST_HEADER)
        .then(result => {
            console.log('get post success!! : ' + result);
            if (result) {
                document.querySelector('.input-title').value = result['title'];
                document.querySelector('.input-content').textContent =
                    result['content'];
            } else console.log('get post failed!!');
        })
        .catch(console.error);
}

async function fetchUpdatePost(title, content) {
    const body = { title, content };
    apiFetch(PATCH_POST_URL.replace(':postId', postId), PATCH_POST_HEADER, body)
        .then(result => {
            if (result) {
                console.log(`patch post success!! : ${result}`);
            } else console.log('patch post failed!!');
        })
        .catch(console.error);
}

function updateEndButton(endButton) {
    console.log(validateTitle, ' / ', validateContent);
    if (validateTitle && validateContent) {
        endButton.style.backgroundColor = '#7F6AEE';
        endButton.disabled = false;
    } else {
        endButton.style.backgroundColor = '#ACA0EB';
        endButton.disabled = true;
    }
}
