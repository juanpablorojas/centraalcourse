'use strict';
const sideNav = document.getElementById("sideNav");
const button = document.getElementById("points");

function evento() {
    toggle();
    removeListener();
}

function removeListener() {
    document.removeEventListener('click', evento);
}

function action(event) {
    event.stopPropagation();
    if (!sideNav.classList.contains('active')) {
        document.addEventListener('click', evento)
    } else {
        removeListener();
    }
    toggle();
}

function toggle() {
    sideNav.classList.toggle('active');
    button.classList.toggle('active');
}
