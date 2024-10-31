let validateTitle = false;
let validateContent = false;
let helperText;

document.addEventListener('DOMContentLoaded', () => {
    const inputTitle = document.querySelector(".input-title");
    const inputContent = document.querySelector(".input-content");
    helperText = document.querySelector(".helper-text");
    const endButton = document.querySelector(".button-purple");

    endButton.addEventListener("click", (e) => {window.location.href="Posts.html"})

    inputTitle.addEventListener("input", () => {
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

    inputContent.addEventListener("input", () => {
        if (inputContent.value.length > 0) {
            validateContent = true;
        } else {
            validateContent = false;
        }
        updateEndButton(endButton);
    });
});

function updateEndButton(endButton) {
    if (validateTitle && validateContent) {
        endButton.style.backgroundColor = "#7F6AEE";
        endButton.disabled = false;
        helperText.style.visibility = "hidden";
    } else {
        endButton.style.backgroundColor = "#ACA0EB";
        endButton.disabled = true;
        helperText.style.visibility = "visible";
    }
}