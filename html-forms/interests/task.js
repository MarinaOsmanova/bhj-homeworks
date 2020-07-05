'use strict';

function setCheckedForChilds(checkbox, checked) {
    const liElement = checkbox.closest('li.interest');
    Array.from(liElement.querySelectorAll('ul.interests input.interest__check')).forEach(element => {
        element.checked = checked;
    });
}

function setCheckedForParents(checkbox) {
    const ulElement = checkbox.closest('ul.interests');
    if (!ulElement) {
        return;
    }
    const parentCheckbox = ulElement.closest('li.interest').querySelector('label input.interest__check');
    let checkedExists = Boolean( ulElement.querySelector('li>label>input.interest__check:checked') );
    let uncheckedExists = Boolean( ulElement.querySelector('li>label>input.interest__check:not(:checked)') );
    if (checkedExists) {
        parentCheckbox.checked = true;
        parentCheckbox.indeterminate = uncheckedExists;
    } else {
        parentCheckbox.checked = false;
        parentCheckbox.indeterminate = false;
    }
    setCheckedForParents(parentCheckbox);
}

function onChangeCheckbox() {
    const checked = this.checked;
    setCheckedForChilds(this, checked);
    setCheckedForParents(this);
}

Array.from(document.querySelectorAll('.interest__check')).forEach(element => {
    element.onchange = onChangeCheckbox
});
