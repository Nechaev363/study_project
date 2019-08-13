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

const slider = (elemet, speed = 3000, dote = false, arrow = false, carusel = false) => {
    let slider = document.querySelector(elemet),
        slides = slider.querySelectorAll('.slide'),
        currentSlide = 0,
        interval,
        dots,
        arro;

    const dot = () => {
        if (!dote) {
            return;
        }

        const creatDots = (father) => {
            let creatUl = document.createElement('ul');

            father.appendChild(creatUl);
            creatUl.classList.add('slider-dots');

            let ul = father.querySelector('.slider-dots');
            for (let i = 1; i <= slides.length; i++) {
                let creatLi = document.createElement('li'),
                    creatBut = document.createElement('button');

                ul.appendChild(creatLi);
                creatLi.appendChild(creatBut);
                creatLi.classList.add('dot');

                if (i === 1){
                    creatLi.classList.add('slick-active');
                }
            }
        };
        creatDots(slider);

        dots = slider.querySelectorAll('.dot');
    };
    dot();

    const arrows = () => {
        if (!arrow) {
            return;
        }

        const creatArrow = (father) =>{
            let creatDiv,
                creatSpan;

            for (let i = 0; i <= 1; i++){
                creatDiv = document.createElement('div');
                creatSpan = document.createElement('span');
                father.append(creatDiv);
                creatDiv.classList.add('slider-arrow');
                creatDiv.appendChild(creatSpan);
            }

            document.querySelectorAll('.slider-arrow')[0].classList.add('prev');
            document.querySelectorAll('.slider-arrow')[1].classList.add('next')
        };

        creatArrow(slider);
        arro = slider.querySelectorAll('.slider-arrow');
    };
    arrows();

    const prevSlide = (elem, index, strClass) => {
        if (elem[0].classList.contains('slide')) {
            elem[index].style.display = 'none';
        }
        elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
        if (elem[0].classList.contains('slide')) {
            elem[index].style.display = 'inline-block';
        }
        elem[index].classList.add(strClass);
    };

    const nexteSlide = () => {
        slides[currentSlide].className = 'slide';
        currentSlide = (currentSlide+1)%slides.length;
        slides[currentSlide].className = 'slide showing';
    };

    const autoPlaySlide = () => {
        if (carusel) {
            prevSlide(slides, currentSlide, 'active');
            if (dote) {
                prevSlide(dots, currentSlide, 'slick-active');
            }
            nexteSlide();

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            nextSlide(slides, currentSlide, 'active');
            if (dote) {
                nextSlide(dots, currentSlide, 'slick-active');
            }
        } else{
            prevSlide(slides, currentSlide, 'active');
            if (dote) {
                prevSlide(dots, currentSlide, 'slick-active');
            }
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            nextSlide(slides, currentSlide, 'active');
            if (dote) {
                nextSlide(dots, currentSlide, 'slick-active');
            }
        }
    };

    const startSlide = () => {
        interval = setInterval(autoPlaySlide, speed);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
        event.preventDefault();

        let target = event.target;
        
        if (!target.matches('.slider-arrow span, .dot button')){
            return;
        }
    
        prevSlide(slides, currentSlide, 'active');
        prevSlide(dots, currentSlide, 'slick-active');

        if (target.matches('.slider-arrow.next')) {
            currentSlide++;
        } else if (target.matches('.slider-arrow.prev')) {
            currentSlide--;
        } else if (target.closest('.dot')) {
            dots.forEach((elem, index) => {
                if (elem === target.closest('.dot')) {
                    currentSlide = index;
                }
            });
        }

        if (currentSlide >= slides.length ) {
            currentSlide = 0;
        }
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        nextSlide(slides, currentSlide, 'active');
        nextSlide(dots, currentSlide, 'slick-active');
    });

    slider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.slider-arrow') || event.target.matches('.dot button')) {
            stopSlide();
        }
    });

    slider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.slider-arrow') || event.target.matches('.dot button')) {
            startSlide();
        }
    });

    startSlide();
};
slider('.main-slider', 1000, true, false);
slider('.gallery-slider', 2000, false, true);


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

const sendForm = (idForm) => {
    const errorMessage = 'Что-то пошло не так...';
    const form = document.getElementById(idForm);
    const thanks = document.getElementById('thanks');
    const statusMessage = document.createElement('div');


    statusMessage.style.cssText = `font-size: 1rem; margin: 1rem 0; color: white`;
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


    const ckeckForm = (form) => {
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
                } else {
                    thanks.style.display = 'inline-block';
                }
                thanks.addEventListener('click', (event) => {
                    let target = event.target;

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

                statusMessage.textContent = errorMessage;
                console.error(error);

            });
    }
    ckeckForm(idForm);

};


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

//service-slider 

const serviceSlider = () => {

    const sliderServ = document.querySelector('.services-slider');
    const slide = sliderServ.querySelectorAll('.slider-singler');
    const allSliders = sliderServ.querySelector('.all-sliders');
    let arro;

    let left = 0;
    let i = 0;
    sliderServ.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;
        target = target.closest('.slider-arrow');
        console.log(target);
        if (!target.matches('.prev, .next')) {
            return;
        }
        if (target.matches('.prev')) {
            left = left - 225;
            if (left <= -1125) {
                left = 0;
            } else {
                left = left - 225;
            }
            allSliders.style.left = left + 'px';
        }
        if (target.matches('.next')) {
            left = left - 325;
            if (left <= -1125) {
                left = 0;
            }


            allSliders.style.left = left + 'px';
        }

    });
    const arrow = () => {
        if (!arrow) {
            return;
        }

        const createArrow = (procreator) => {
            let createDiv;
            let createSpan;

            for (let i = 0; i <= 1; i++) {
                createDiv = document.createElement('div');
                createSpan = document.createElement('span');
                procreator.append(createDiv);
                createDiv.classList.add('slider-arrow');
                createDiv.appendChild(createSpan);

            }

            document.querySelectorAll('.slider-arrow')[0].classList.add('prev');
            document.querySelectorAll('.slider-arrow')[1].classList.add('next');
        };
        createArrow(sliderServ);
        arro = sliderServ.querySelectorAll('.slider-arrow');


    };


    arrow();

}

serviceSlider();


