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

// slider

const slider = () => {
    const slideHeader = document.querySelectorAll('.slide_header');
    let i = 0;

    const autoPlaySlide = () => {
        slideHeader[i].style.display = 'none';
        i++;
        if (i >= slideHeader.length) {
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

// ajax-send-form

const sendForm = (idForm, checkId) => {
    const errorMessage = 'Что-то пошло не так...';
    const form = document.getElementById(idForm);
    const thanks = document.getElementById('thanks');
    const statusMessage = document.createElement('div');
    const check = document.getElementById(checkId);

    statusMessage.style.cssText = `font-size: 1rem; margin: 1rem 0; color: white`;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMessage);
        const formData = new FormData(form);
        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });
        postData(body)
            .then((response) => {

                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                thanks.addEventListener('click', (event) => {
                    let target = event.target;
                    if (target.matches('.btn')) {
                        thanks.style.display = 'inline-block'
                    }

                    if (target.matches('.close_icon')) {
                        thanks.style.display = 'none';
                    } else if (target.matches('.close-btn')) {
                        thanks.style.display = 'none';
                    }
                    target = target.closest('.overlay');
                    if (target) {
                        thanks.style.display = 'none';


                    }
                });

                const input = form.querySelectorAll('input').forEach((elem) => {
                    elem.value = '';
                });
            })
            .catch((error) => {
                thanks.style.display = 'none';
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
sendForm('banner-form');
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
        sendForm('form1');
        sendForm('form2');
        sendForm('banner-form');
    }

});