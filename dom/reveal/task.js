'use strict';

const delta = 70; // зазор для лучшего эффекта появления/исчезновения
const revealDivs = Array.from(document.getElementsByClassName('reveal'));

const showElement = function() {
    const viewportHeight = window.innerHeight;
    revealDivs.forEach(element => {
        const domRect = element.getBoundingClientRect();
        if (domRect.top + delta > viewportHeight || domRect.bottom < delta) {
            // элемент не в поле зрения
            element.classList.remove('reveal_active');
        } else {
            element.classList.add('reveal_active');
        }
    });
}

document.addEventListener('scroll', showElement);