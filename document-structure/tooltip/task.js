'use strict';

const delta = 2; // зазор в пикселях между подсказкой и текстом (красивее чем вплотную)

function hideTooltips() {
    Array.from(document.getElementsByClassName('tooltip')).forEach(element => {
        element.remove();
    });
}

function showTooltip() {
    const sibling = this.nextSibling;
    const tooltipIsShowed = sibling.classList && sibling.classList.contains('tooltip_active');
    hideTooltips();
    if (tooltipIsShowed) {
        return false;
    }
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip tooltip_active';
    tooltip.innerText = this.title;
    const position = this.dataset['position'];
    if (!position) {
        position = 'bottom';
    }
    this.insertAdjacentElement('afterEnd', tooltip);

    const linkRect = this.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    let top = 0;
    let left = 0;
    switch (position) {
        case 'top':
            left = (linkRect.left + linkRect.right - tooltipRect.width) / 2;
            top = linkRect.top - tooltipRect.height - delta;
            break;
        case 'right':
            left = linkRect.right + delta;
            top = (linkRect.top + linkRect.bottom - tooltipRect.height) / 2;
            break;
        case 'bottom':
            left = (linkRect.left + linkRect.right - tooltipRect.width) / 2;
            top = linkRect.bottom + delta;
            break;
        case 'left':
            left = linkRect.left - tooltipRect.width - delta;
            top = (linkRect.top + linkRect.bottom - tooltipRect.height) / 2;
    }
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
    return false;
}

Array.from(document.getElementsByClassName('has-tooltip')).forEach(element => {
    element.onclick = showTooltip;
});
