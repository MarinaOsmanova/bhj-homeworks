'use strict';

const book = document.querySelector('.book');
const bookClassList = book.classList;

const fontSizeButtons = Array.from(document.querySelectorAll('.book__control_font-size .font-size'));
const fontColorButtons = Array.from(document.querySelectorAll('.book__control_color .color'));
const bgColorButtons = Array.from(document.querySelectorAll('.book__control_background .color'));

function fontSizeClickHandler() {
    bookClassList.remove('book_fs-small');
    bookClassList.remove('book_fs-big');
    
    fontSizeButtons.forEach(element => {
        element.classList.remove('font-size_active');
    });
    const buttonClassList = this.classList;
    buttonClassList.add('font-size_active');
    if (buttonClassList.contains('font-size_small')) {
        bookClassList.add('book_fs-small');
    } else if (buttonClassList.contains('font-size_big')) {
        bookClassList.add('book_fs-big');
    }
    return false;
}

function fontColorClickHandler() {
    bookClassList.remove('book_color-gray');
    bookClassList.remove('book_color-whitesmoke');
    
    fontColorButtons.forEach(element => {
        element.classList.remove('color_active');
    });
    const buttonClassList = this.classList;
    buttonClassList.add('color_active');
    if (buttonClassList.contains('color_gray')) {
        bookClassList.add('book_color-gray');
    } else if (buttonClassList.contains('color_whitesmoke')) {
        bookClassList.add('book_color-whitesmoke');
    }
    return false;
}

function bgColorClickHandler() {
    bookClassList.remove('book_bg-gray');
    bookClassList.remove('book_bg-black');
    
    bgColorButtons.forEach(element => {
        element.classList.remove('color_active');
    });
    const buttonClassList = this.classList;
    buttonClassList.add('color_active');
    if (buttonClassList.contains('color_black')) {
        bookClassList.add('book_bg-black');
    } else if (buttonClassList.contains('color_gray')) {
        bookClassList.add('book_bg-gray');
    }
    return false;
}

fontSizeButtons.forEach(element => {
    element.onclick = fontSizeClickHandler;
});

fontColorButtons.forEach(element => {
    element.onclick = fontColorClickHandler;
});

bgColorButtons.forEach(element => {
    element.onclick = bgColorClickHandler;
});