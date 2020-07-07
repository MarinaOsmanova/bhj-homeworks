'use strict';

let pollData;
let pollResults;

function showPollResults() {
    const items = document.getElementById('poll__answers');
    items.innerHTML = '';
    for (let i=0; i<pollResults.length; i++) {
        let resultItem = pollResults[i];
        let item = document.createElement('div');
        item.innerHTML = `${resultItem.answer}: <strong>${resultItem.votes}</strong>`;
        items.append(item);
    }
}

function buttonClickHandler() {
    alert('Спасибо, ваш голос засчитан!');
    let request = new XMLHttpRequest();
    request.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.addEventListener('readystatechange', function() {
        if (this.readyState == request.DONE && this.status == 200) {
            pollResults = JSON.parse(this.responseText).stat;
            showPollResults();
        }
    });
    let params = `vote=${pollData.id}&answer=${this.dataset.id}&`;
    request.send(params);
}

function showPoll() {
    if (!pollData) {
        return;
    }
    document.getElementById('poll__title').innerHTML = pollData.data.title;
    const items = document.getElementById('poll__answers');
    let answers = pollData.data.answers;
    items.innerHTML = '';
    for (let i=0; i<answers.length; i++) {
        let item = document.createElement('button');
        item.className = 'poll__answer';
        item.dataset.id = i;
        item.innerHTML = answers[i];
        item.onclick = buttonClickHandler;
        items.append(item);
    }
}

let request = new XMLHttpRequest();
request.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php');
request.addEventListener('readystatechange', function() {
    if (this.readyState == request.DONE && this.status == 200) {
        pollData = JSON.parse(this.responseText);
        showPoll();
    }
});
request.send();