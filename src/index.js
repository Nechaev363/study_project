'use strict';

//header
const header = () => {
    const getClub = document.querySelector('p');
    const clubs = document.querySelector('ul');
    const openPopup = document.querySelector('.open-popup');
    const callbackForm = document.getElementById('callback_form');
    const callbackBtn = document.querySelector('.callback-btn');
    const freeVisitForm = document.getElementById('free_visit_form');
    const animateImg = document.querySelector('img');
    const gift = document.getElementById('gift');


    getClub.addEventListener('click', () => {
        if (!clubs.style.display || clubs.style.display === 'none') {
            clubs.style.display = 'inline-block';
        } else {
            clubs.style.display = 'none';
        }
    });

    openPopup.addEventListener('click', () => {
        freeVisitForm.style.display = 'flex';
    });

    freeVisitForm.addEventListener('click', (event) => {
        let target = event.target;
        if (target.matches('.close_icon')) {
            freeVisitForm.style.display = 'none';
        }
        target = target.closest('.overlay');
        if (target) {
            freeVisitForm.style.display = 'none';
        }
    });
    callbackBtn.addEventListener('click', () => {
        callbackForm.style.display = 'flex';
    });
    callbackForm.addEventListener('click', (event) => {
        let target = event.target;
        if (target.matches('.close_icon')) {
            callbackForm.style.display = 'none';
        }
        target = target.closest('.overlay');
        if (target) {
            callbackForm.style.display = 'none';
        }
    });

    animateImg.addEventListener('click', () => {
        gift.style.display = 'flex';
    });
    gift.addEventListener('click', (event) => {
        let target = event.target;
        if (target.matches('.close_icon') || target.matches('.close-btn')) {
            gift.style.display = 'none';
        }
        target = target.closest('.overlay');
        if (target) {
            gift.style.display = 'none';
        }
        if (!target) {
            animateImg.style.display = 'none';
        }
    });



};

header();

// ajax-send-form
const sendForm = (idForm) => {
    const errorMessage = 'Что-то пошло не так...';
    const loadMessage = 'Загрузка...';
    const successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';
    const form = document.getElementById(idForm);
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `font-size: 1rem; margin: 1rem 0; color: white`;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMessage);
        const formData = new FormData(form);
        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });
        statusMessage.textContent = loadMessage;
        postData(body)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                statusMessage.textContent = successMessage;
                const input = form.querySelectorAll('input').forEach((elem) => {
                    elem.value = '';
                });
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            });
    });

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: 'include'
        });
    };

}

sendForm('form1');
sendForm('form2');


document.querySelectorAll('input[type="text"]').forEach((element) => {
    element.addEventListener('input', (elem) => {
        elem.target.value = elem.target.value.replace(/[A-z\.\?,0-9\-\+=!@#№\$%\^&\*~]/gi, '');

    });
});

document.querySelectorAll('input[type="tel"]').forEach((element) => {
    element.addEventListener('input', (elem) => {
        elem.target.value = elem.target.value.replace(/[A-z-А-я,\-=!@#№\$%\^&\*\.\/<>\?\(\)~]/gi, '');
    });
});

// slider

const slider = () => {
    const slideText = document.querySelectorAll('.slide-text');
    const headSlider = document.querySelector('.head-slider');
    const mainSlide = document.querySelector('.main-slider');
    const slideHeader = document.querySelectorAll('.slide_header');
   
    
   let i = 0;
    

    const autoPlaySlide = () => {
       slideHeader[i].style.display = 'none';
       i++;
       if(i >= slideHeader.length) {
           i = 0;
       }
       slideHeader[i].style.display = 'inline-block';

    };

    const startSlide = () => {
        setInterval(autoPlaySlide, 2000);
    }
    startSlide();
    
}

slider();