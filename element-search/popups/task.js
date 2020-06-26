'use strict';

function closeModal() {
    this.closest('.modal_active').classList.remove('modal_active');
}

const mcList = Array.from(document.getElementsByClassName("modal__close"));
for (let i=0; i<mcList.length; i++) {
    mcList[i].onclick = closeModal;
}

document.getElementsByClassName('show-success')[0].onclick = function() {
    this.closest('.modal_active').classList.remove('modal_active');
    document.getElementById('modal_success').classList.add('modal_active');
}

const modalMain = document.getElementById("modal_main");
modalMain.classList.add('modal_active');