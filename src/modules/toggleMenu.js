const toggleMenu = () => {
    const main = document.querySelector('main');
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = menu.querySelectorAll('ul>li');
    
   

    const handLerMenu = () => {
        menu.classList.toggle('active-menu');
    };
    
    main.addEventListener('click', (event) => {
        let target = event.target;
        target = target.closest('.menu');
        if (!target) {
            menu.style.display = `none`;
        } else {
            menu.style.transform = `translateX(100%)`;
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