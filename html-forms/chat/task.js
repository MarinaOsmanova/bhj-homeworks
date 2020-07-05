'use strict';

const robotAnswers = [
    'Мы ничего не будем вам продавать!',
    'Вы сами-то поняли что написали?',
    'Добрый день! До свидания!',
    'Где ваша совесть?',
    'Все операторы заняты! Не пишите нам больше',
    'У нас обед, приходите завтра',
    'Вы не купили ни одного товара чтобы так с нами разговаривать!',
    'Вы всё написали?'
];

const robotQuestions = [
    'Есть кто живой?',
    'Так и будем молчать?',
    'Ау! Ну вы будете что-нибудь покупать?'
];;

const redButton = document.querySelector('.chat-widget');
const messageField = document.getElementById('chat-widget__input');
const chat = document.querySelector('.chat-widget__messages-container');
let robotQuestionTimer = null;

function getTimeString() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
}

function addMessageToChat(message, isUserMessage) {
    let newMessage =
        `<div class="message${isUserMessage ? ' message_client' : ''}">` +
        `<div class="message__time">${getTimeString()}</div>` +
        `<div class="message__text">${message}</div></div>`;
    chat.innerHTML += newMessage;
    chat.scrollTop = 100000;
}

// функция возвращает случайное целое число в даипазоне от 0 до max (не включительно)
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateRobotMessage() {
    const index = getRandomInt(robotAnswers.length);
    const message = robotAnswers[index];
    addMessageToChat(message, false);
}

function generateRobotQuestion() {
    const index = getRandomInt(robotQuestions.length);
    const message = robotQuestions[index];
    addMessageToChat(message, false);
}

redButton.addEventListener('click', e => {
    // показываем чат и активируем таймер вопроса от робота
    document.querySelector('.chat-widget').classList.add('chat-widget_active');
    robotQuestionTimer = setInterval(generateRobotQuestion, 30000);
});

messageField.addEventListener('keyup', e => {
    if (e.key == 'Enter') {
        const message = messageField.value.trim();
        if (message.length) {
            addMessageToChat(message, true); // добавляем сообщение в чат
            messageField.value = '';  // очищаем поле ввода
            setTimeout(generateRobotMessage, 300); // через небольшую задержку (для красоты) заставляем робота ответить
        }
    }
    clearInterval(robotQuestionTimer);
    robotQuestionTimer = setInterval(generateRobotQuestion, 30000);
});