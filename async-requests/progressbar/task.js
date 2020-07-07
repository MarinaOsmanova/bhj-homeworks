'use strict';

const form = document.getElementById('form');
const progressBar = document.getElementById('progress');

form.addEventListener('submit', (submitEvent) => {
    progressBar.value = 0;
    let formData = new FormData(form);
    let request = new XMLHttpRequest();
    request.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.upload.onprogress = function(event) {
        let progress = event.loaded / event.total;
        progressBar.value = progress;
    };
    request.send(formData);
    submitEvent.preventDefault();
});
