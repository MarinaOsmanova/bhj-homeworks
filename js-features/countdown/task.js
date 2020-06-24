'use strict';

function winMessage() {
    alert ('Вы победили!');
}

const addText = function() {
    const timer = document.getElementById("timer");
    timer.textContent--;
    if (timer.textContent == 0) {
        setTimeout(winMessage, 10);
        clearInterval(timerId);
    }
}

let timerId = setInterval(addText, 1000);
    
