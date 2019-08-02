const togglePopup = () => {
    const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');
        const popupClose = document.querySelector('.popup-close');

        let count = 0;
        let animatePopup;

        const animateSnowPopup = () => {
            animatePopup = requestAnimationFrame(animateSnowPopup);

            count += 0.05;
            if (count <= 1) {
                popup.style.opacity = count;
            } else {
                cancelAnimationFrame(animateSnowPopup);
            }
        };
        animateSnowPopup();
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                if (document.documentElement.offsetWidth < 768) {
                    popup.style.display = 'block';
                    popup.style.opacity = 1;
                } else {
                    popup.style.display = 'block';
                    count = 0;
                    animatePopup = requestAnimationFrame(animateSnowPopup);
                }
                
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
        popup.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.popup-content');
            if(!target) {
                popup.style.display = 'none';
            }
        });

};







export default togglePopup;