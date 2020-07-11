'use strict';

const storageItemName = 'my_editor';
const myStorage = window.localStorage;

const editor = document.getElementById('editor');

editor.value = myStorage.getItem(storageItemName);

editor.addEventListener('input', function() {
    myStorage.setItem(storageItemName, this.value);
});

document.getElementById('clear_button').onclick = function() {
    editor.value = '';
    myStorage.setItem(storageItemName, '');
}
