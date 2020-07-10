'use strict';

let cart = {};
let animateTimer;
const deltaLen = 20; // на столько пикселей будет сокращаться расстояние до цели при анимации за каждый "тик" таймера
const tickTimer = 10; // промежуток времени (миллисекунды) между "тиками" таймера анимации

const animationImageId = 'animation_image';
const storageItemName = 'my_cart';
const myStorage = window.localStorage;

const cartWrapper = document.querySelector('.cart');
const cartProducts = cartWrapper.querySelector('.cart__products');

function valueChangeHandler() {
    const controlBlock = this.closest('.product__quantity-controls');
    const valueBlock = controlBlock.querySelector('.product__quantity-value');
    if (this.classList.contains('product__quantity-control_inc')) {
        valueBlock.textContent++;
    } else if (valueBlock.textContent > 1) {
        valueBlock.textContent--;
    }
}

function saveCart() {
    myStorage.setItem(storageItemName, JSON.stringify(cart));
}

function addProductToCart(productId, quantity, imageSrc) {
    if (productId in cart) {
        cart[productId]['qty'] += quantity;
    } else {
        cart[productId] = {'qty': quantity, 'src': imageSrc};
    }
    saveCart();
}

function deleteProductFromCart(productId) {
    if (productId in cart) {
        delete cart[productId];
        saveCart();
    }
}

function createCartElement(productId) {
    const item = document.createElement('div');
    item.className = 'cart__product';
    item.dataset.id = productId;

    const img = document.createElement('img');
    img.className = 'cart__product-image';
    img.src = cart[productId]['src'];

    const countDiv = document.createElement('div');
    countDiv.className = 'cart__product-count';
    countDiv.innerHTML = cart[productId]['qty'];

    const deleteDiv = document.createElement('a');
    deleteDiv.className = 'cart__product-delete';
    deleteDiv.href = '#';
    deleteDiv.innerHTML = '&times;';
    deleteDiv.onclick = productDeleteHandler;

    item.appendChild(img);
    item.appendChild(countDiv);
    item.appendChild(deleteDiv);
    return item;
}

function repaintCart() {
    if (Object.keys(cart).length > 0) {
        cartWrapper.classList.add('cart_active');
    } else {
        cartWrapper.classList.remove('cart_active');
    }
    cartProducts.innerHTML = '';
    for (let productId in cart) {
        cartProducts.appendChild( createCartElement(productId) );
    }
}

function getDestinationRectByProductId(productId) {
    if (productId in cart) {
        const element =  cartProducts.querySelector(`div[data-id="${productId}"] img`);
        if (element) {
            return element.getBoundingClientRect();
        }
    }
    return cartWrapper.getBoundingClientRect();
}

function animateAddProduct(productId, image) {
    clearInterval(animateTimer);
    const prevAnimationImage = document.getElementById(animationImageId);
    if (prevAnimationImage) {
        prevAnimationImage.remove();
    }
    cartWrapper.classList.add('cart_active');
    window.scrollTo(0, 0);
    const animationImage = image.cloneNode(true);
    animationImage.classList.add('product_animation');
    animationImage.id = animationImageId;
    animationImage.dataset['id'] = productId;
    document.querySelector('body').appendChild(animationImage);
    const sourceRect = image.getBoundingClientRect();
    animationImage.style.top = sourceRect.top + 'px';
    animationImage.style.left = sourceRect.left + 'px';
    animateTimer = setInterval(moveImage, tickTimer);
}

function moveImage() {
    const image = document.getElementById(animationImageId);
    const productId = image.dataset['id'];
    const sourceRect = image.getBoundingClientRect();
    const destinationRect = getDestinationRectByProductId(productId);
    const deltaX = (destinationRect.width < 120 ? destinationRect.left : destinationRect.width/2) - sourceRect.left;
    const deltaY = sourceRect.top - destinationRect.top;

    const len =  Math.sqrt(deltaX *deltaX + deltaY*deltaY);
    if (len <= deltaLen) {
        clearInterval(animateTimer);
        image.remove();
        repaintCart();
        return;
    }
    const newX = sourceRect.left + deltaLen * deltaX / len;
    const newY = sourceRect.top - deltaLen * deltaY / len;
    image.style.top = newY + 'px';
    image.style.left = newX + 'px';
}

function productAddHandler() {
    const productWrapper = this.closest('.product');
    const productId = productWrapper.dataset['id'];
    const quantity = parseInt(productWrapper.querySelector('.product__quantity-value').textContent);
    const imgElement = productWrapper.querySelector('.product__image');
    addProductToCart(productId, quantity, imgElement.src);
    animateAddProduct(productId, imgElement);
}

function productDeleteHandler() {
    const productWrapper = this.closest('.cart__product');
    const productId = productWrapper.dataset['id'];
    deleteProductFromCart(productId);
    repaintCart();
    return false;
}

function loadCart() {
    cart = JSON.parse(myStorage.getItem(storageItemName));
    if (!cart) {
        cart = {};
        return;
    }
    repaintCart();
}

loadCart();

Array.from(document.getElementsByClassName('product__quantity-control')).forEach(element => {
    element.onclick = valueChangeHandler;
});

Array.from(document.getElementsByClassName('product__add')).forEach(element => {
    element.onclick = productAddHandler;
});