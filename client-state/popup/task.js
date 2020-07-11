'use strict';

const cookieName = 'modalIsClosed';

const modalDiv = document.getElementById("subscribe-modal");

const getCookie = (name) => {
    const value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}

modalDiv.querySelector('.modal__close_times').onclick = function() {
    this.closest('.modal_active').classList.remove('modal_active');
    document.cookie = `${cookieName}=1`;
}

if (!getCookie(cookieName)) {
    modalDiv.classList.add('modal_active');
}