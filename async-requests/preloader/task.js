'use strict';

const storageItemName = 'valute_list';
const myStorage = window.localStorage;

function showValutes(data) {
    const itemsDiv = document.getElementById('items');
    itemsDiv.innerHTML = '';
    for (let key in data) {
        let item = data[key];
        itemsDiv.innerHTML +=
            '<div class="item">'+
            `<div class="item__code">${item.CharCode}</div>`+
            `<div class="item__value">${item.Value}</div>`+
            '<div class="item__currency">руб.</div></div>';
    }
    document.getElementById('loader').classList.remove('loader_active');
}

let valutes = JSON.parse(myStorage.getItem(storageItemName));
if (valutes && Object.keys(valutes).length > 0) {
    showValutes(valutes);
}

var request = new XMLHttpRequest();
request.open('GET', 'https://netology-slow-rest.herokuapp.com');
request.addEventListener('readystatechange', function() {
    if (this.readyState == request.DONE && this.status == 200) {
        let data = JSON.parse(this.responseText);
        let valutes = data.response.Valute;
        myStorage.setItem(storageItemName, JSON.stringify(valutes));
        showValutes(valutes);
    }
});
request.send();
