'use strict';

const rotators = Array.from(document.getElementsByClassName('rotator'));
rotators.forEach(element => {
    initRotate(element);
});

function initRotate(rotator) {
    // сразу установлю цвета всем элементам ротатора
    const items = Array.from(document.getElementsByClassName('rotator__case'));
    items.forEach(element => {
        const color = element.dataset.color;
        element.style.color = color;
    });

    const currentItem = rotator.querySelector('.rotator__case_active');
    let timeout = 0;
    if (currentItem) {
        timeout = currentItem.dataset.speed;
    }
    setTimeout(doRotate, timeout, rotator);
}

function doRotate(rotator) {
    const items = Array.from(document.getElementsByClassName('rotator__case'));
    const currentItem = rotator.querySelector('.rotator__case_active');
    // вычислю индекс элемента, на который надо переключиться
    let index = items.indexOf(currentItem);
    if (++index == items.length) {
        index = 0;
    }
    currentItem.classList.remove('rotator__case_active'); // выключаю текущий элемент
    const newCurrentItem = items[index];
    newCurrentItem.classList.add('rotator__case_active'); // включаю следующий элемент
    const timeout = newCurrentItem.dataset.speed;
    setTimeout(doRotate, timeout, rotator);
}