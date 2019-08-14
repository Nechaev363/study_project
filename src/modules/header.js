const header = () => {
    const getClub = document.querySelector('.clubs-list');
    const clubs = document.querySelector('ul');
    const openPopup = document.querySelector('.open-popup');
    const callbackForm = document.getElementById('callback_form');
    const callbackBtn = document.querySelector('.callback-btn');
    const freeVisitForm = document.getElementById('free_visit_form');
    const animateImg = document.querySelector('.fixed-gift img');
    const gift = document.getElementById('gift');

    if (getClub) {


        getClub.addEventListener('click', () => {
            if (!clubs.style.display || clubs.style.display === 'none') {
                clubs.style.display = 'inline-block';
            } else {
                clubs.style.display = 'none';
            }
        });
    }

    if (openPopup) {
        openPopup.addEventListener('click', () => {
            freeVisitForm.style.display = 'flex';
        });
    }
    if (freeVisitForm) {
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
    }
    if (callbackBtn) {
        callbackBtn.addEventListener('click', () => {
            callbackForm.style.display = 'flex';
        });
    }
    if (callbackForm) {
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
    }
    if (animateImg) {

        animateImg.addEventListener('click', () => {
            gift.style.display = 'flex';
        });
    }
    if (gift) {
        gift.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('.close_icon') || target.classList.contains('.close-btn') || target.classList.contains('.overlay')) {
                gift.style.display = 'none';


            }
            target = target.closest('overlay');
            if (!target) {
                gift.style.display = 'none';
            }
            if (!target) {
                animateImg.style.display = 'none';
            }
        });
    }

};

export default header;