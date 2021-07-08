const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm password");

function showFailure(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add("error");
    const small = formControl.querySelector("small");
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.remove("error");
    formControl.classList.add("success");
}

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value)) {
        showSuccess(input);
    } else {
        showFailure(input, `Email must be of format example@email.com`)
    }
}

function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === "") {
            showFailure(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}

function checkLength(input, min, max) {
    if (input.value.length > 0 && input.value.length < min) {
        showFailure(input, `${getFieldName(input)} must be atleast ${min} characters`);
    } else if (input.value.length > max) {
        showFailure(input, `${getFieldName(input)} must be less than ${max} characters`);
    }
}

function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showFailure(input2, "Passwords do not match!");
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    checkRequired([username, email, password, confirmPassword]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email)
    checkPasswordsMatch(password, confirmPassword);
})