'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';


import header from './modules/header';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import serviceSlide from './modules/serviceSlide';
import calc from './modules/calc';
import valid from './modules/valid';



//header

header();

// ajax-send-form
const statusContect = document.createElement('div');
statusContect.style.cssText = `font-size: 1rem; margin: 1rem 0; color: red`;
document.body.addEventListener('submit', (event) => {
    event.preventDefault();
    let target = event.target,
        check = '';
    target = target.closest('form');
    if (!target.classList.contains('footer_form')) {
        check = target.querySelector('input[type="checkbox"]').checked;
    } else {
        check = true;
    }

    if (!check) {
        target.appendChild(statusContect);
        statusContect.textContent = 'Необходимо согласиться на обработку данных...';
    }
    if (target && check) {
        sendForm(target);
        statusContect.textContent = '';
    }

});

//slider

slider('.main-slider', 1000, true, false);
slider('.gallery-slider', 2000, true, true);

//carusel

serviceSlide();

//calculator

calc();

//valid

valid();