'use strict';

function tabClickHandler() {
    const wrapper = this.closest('.tabs');
    const tabsList = Array.from(wrapper.getElementsByClassName('tab'));
    const contentsList = Array.from(wrapper.getElementsByClassName('tab__content'));
    contentsList.forEach((el) => {
        el.classList.remove('tab__content_active');
    });
    const tabIndex = tabsList.lastIndexOf(this);
    for (let i=0; i<tabsList.length; i++) {
        if (i == tabIndex) {
            tabsList[i].classList.add('tab_active');
            contentsList[i].classList.add('tab__content_active');
        } else {
            tabsList[i].classList.remove('tab_active');
        }
    }
}

const allTabsList = Array.from(document.getElementsByClassName('tab'));
allTabsList.forEach((tab) => {
    tab.addEventListener('click', tabClickHandler);
});
