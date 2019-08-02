const toggleMenu = () => {
    const main = document.querySelector('main');
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = menu.querySelectorAll('ul>li');
    const a = document.querySelectorAll('a');
   

    const handLerMenu = () => {
        if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
            menu.style.transform = `translate(0)`;
        } else {
            menu.style.transform = `translate(-100%)`;
        }
    };
    main.addEventListener('click', (event) => {
        let target = event.target;
        target = target.closest('.menu');
        if (!target) {
            menu.style.transform = `translate(-100%)`;
        } else {
            menu.style.transform = `translate(0)`;
        }
    });


    menu.addEventListener('click', (el) => {
        let target = el.target;
        if (target === closeBtn) {
            handLerMenu();
        }

        for (let i = 0; i < a.length; i++) {
            target = target.closest('a');
            if (target === menuItems[i]) {
                handLerMenu();
            }
        }
    });

    btnMenu.addEventListener('click', handLerMenu);

};
export default toggleMenu;