'use strict';

const deadCounter = document.getElementById("dead");
const lostCounter = document.getElementById("lost");

function clearStat() {
    deadCounter.textContent = 0;
    lostCounter.textContent = 0;
}

function changeGameState() {
    if (this.classList.contains('hole_has-mole')) {
        deadCounter.textContent++;
        if (deadCounter.textContent == 10) {
            alert('Победа!');
            clearStat();
        }
    } else {
        lostCounter.textContent++;
        if (lostCounter.textContent == 5) {
            alert('Вы проиграли!');
            clearStat();
        }
    }
}

for (let i=1; i<10; i++) {
    let cell = document.getElementById("hole" + i);
    cell.onclick = changeGameState;
}