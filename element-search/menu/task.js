'use strict';

function hideSubMenu() {
    const activeSubMenu = Array.from(document.getElementsByClassName('menu_active'));
    for (let i=0; i<activeSubMenu.length; i++) {
        activeSubMenu[i].classList.remove('menu_active');
    }
}

function menuClickHandler() {
    hideSubMenu();
    const parentItem = this.closest('.menu__item');
    const subMenu = parentItem.querySelector('.menu_sub');
    if (subMenu) {
        subMenu.classList.add('menu_active');
        return false;
    }
}

const menuLinks = Array.from(document.getElementsByClassName('menu__link'));
for (let i=0; i<menuLinks.length; i++) {
    menuLinks[i].onclick = menuClickHandler;
}
