'use strict';
    import "@babel/polyfill";
    import 'nodelist-foreach-polyfill';
    import elementClosest from 'element-closest';
    elementClosest(window);
    import 'formdata-polyfill';
    
    import 'es6-promise';
    
    import 'fetch-polyfill';
  

    import countTimer from './modules/countTimer';
    import toggleMenu from './modules/toggleMenu';
    import togglePopup from './modules/togglePopup';
    import tabs from './modules/tabs';
    import slider from './modules/slider';
    import calc from './modules/calculator';
    import sendForm from './modules/sendForm';



    //Timer
    countTimer('31 december 2019');
    // menu
    toggleMenu();
    //popup
    togglePopup();
    //Табы
    tabs();
    // slider
    slider();
    // calculator
    calc();
    //send-ajax-form
    sendForm('form1');
    sendForm('form2');
    sendForm('form3');