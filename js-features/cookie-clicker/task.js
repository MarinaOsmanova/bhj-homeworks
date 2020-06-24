'use strict';
const clickerCounter = document.getElementById("clicker__counter");
const image = document.getElementById("cookie");

function changeSizes() {
    this.width = this.width == 300 ? 200 : 300;
    clickerCounter.textContent++;
}
image.onclick = changeSizes;