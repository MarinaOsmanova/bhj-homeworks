'use strict';

const buttons = Array.from(document.getElementsByClassName('dropdown__value'));
const links = Array.from(document.getElementsByClassName('dropdown__link'));

function btnClickHandler() {
    const parentItem = this.closest('.dropdown');
    const itemList = parentItem.querySelector('.dropdown__list');
    let menuIsOpen = itemList.classList.contains('dropdown__list_active');
    if (menuIsOpen) {
        itemList.classList.remove('dropdown__list_active');
    } else {
        itemList.classList.add('dropdown__list_active');
    };
};

function linkClickHandler() {
    const parentItem = this.closest('.dropdown');
    const divValue = parentItem.querySelector('.dropdown__value');
    divValue.textContent = this.textContent;
    const itemList = parentItem.querySelector('.dropdown__list');
    itemList.classList.remove('dropdown__list_active');
    return false;
};

buttons.forEach((b) => {
    b.addEventListener('click', btnClickHandler);
});

links.forEach((el) => {
    el.onclick = linkClickHandler;
});

