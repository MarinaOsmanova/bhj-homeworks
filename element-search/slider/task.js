'use strict';

let currentSliderIndex = 0;
const sliders = Array.from(document.getElementsByClassName('slider__item'));
const sliderDots = Array.from(document.getElementsByClassName('slider__dot'));
const sliderNumber = sliders.length;

function showSlide(index) {
    // прячем все активные слайды (это устойчиво к ошибкам, если вдруг как-то сделали, что несколько слайдов показаны)
    const activeSliders = Array.from(document.getElementsByClassName('slider__item_active'));
    for (let i=0; i<activeSliders.length; i++) {
        activeSliders[i].classList.remove('slider__item_active');
    }
    // делаем все активные точки не активными
    const activeDots = Array.from(document.getElementsByClassName('slider__dot_active'));
    for (let i=0; i<activeDots.length; i++) {
        activeDots[i].classList.remove('slider__dot_active');
    }

    if (sliders[index]) {
        sliders[index].classList.add('slider__item_active');
    }
    if (sliderDots[index]) {
        sliderDots[index].classList.add('slider__dot_active');
    }
}

function changeSlideByArrow() {
    if (this.classList.contains('slider__arrow_next')) {
        if (currentSliderIndex + 1 < sliderNumber) {
            currentSliderIndex++;
        } else {
            currentSliderIndex = 0;
        }
    } else {
        if (currentSliderIndex > 0) {
            currentSliderIndex--;
        } else {
            currentSliderIndex = sliderNumber - 1;
        }
    }
    showSlide(currentSliderIndex);
}

showSlide(0);
const arrows = Array.from(document.getElementsByClassName('slider__arrow'));
for (let i=0; i<arrows.length; i++) {
    arrows[i].onclick = changeSlideByArrow;
}

for (let i=0; i<sliderDots.length; i++) {
    sliderDots[i].onclick = function() {
        currentSliderIndex = i;
        showSlide(i);
    }
}