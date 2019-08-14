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

export default header;