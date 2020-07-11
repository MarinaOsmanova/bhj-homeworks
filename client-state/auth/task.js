'use strict';

const storageItemName = 'my_auth_user_id';
const myStorage = window.localStorage;

const welcomeBlock = document.getElementById('welcome');
const signInBlock = document.getElementById('signin');
const form = document.getElementById('signin__form');

function showWelcomeBlock(userId) {
    document.getElementById('user_id').innerText = userId;
    welcomeBlock.classList.add('welcome_active');
}

function clearFormFields() {
    Array.from(form.querySelectorAll('input')).forEach(element => {
        element.value = '';
    });
}

document.getElementById('signin__btn').onclick = function() {
    let formData = new FormData(form);
    let request = new XMLHttpRequest();
    request.open('POST', 'https://netology-slow-rest.herokuapp.com/auth.php');
    request.addEventListener('readystatechange', function() {
        if (this.readyState == request.DONE && this.status == 200) {
            let data = JSON.parse(this.responseText);
            if (data.success) {
                myStorage.setItem(storageItemName, data.user_id);
                signInBlock.classList.remove('signin_active');
                showWelcomeBlock(data.user_id);
            } else {
                alert('Неверный логин/пароль');
            }
        }
    });
    request.send(formData);
    clearFormFields();
    return false;
}

document.getElementById('signout__btn').onclick = function() {
    myStorage.removeItem(storageItemName);
    welcomeBlock.classList.remove('welcome_active');
    signInBlock.classList.add('signin_active');
    return false;
}

let userId = myStorage.getItem(storageItemName);
if (userId) {
    showWelcomeBlock(userId);
} else {
    signInBlock.classList.add('signin_active');
}