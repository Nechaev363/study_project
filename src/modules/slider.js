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

            father.querySelectorAll('.slider-arrow')[0].classList.add('prev');
            father.querySelectorAll('.slider-arrow')[1].classList.add('next');
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

    const autoPlaySlide = () => {
        if (!carusel) {
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
    
        if (!carusel){
            prevSlide(slides, currentSlide, 'active');
        }
        if (dote) {
            prevSlide(dots, currentSlide, 'slick-active');
        }

        if (target.closest('.slider-arrow.next')) {
            currentSlide++;
            if (carusel){
                let maLeft = slides[0].style.marginLeft,
                    colSl = slides.length;
                colSl = (colSl - 5) * 200;
                maLeft = maLeft.slice(1, -2);

                if (+maLeft <= colSl){
                    maLeft = +maLeft + 225;
                    slides[0].style.marginLeft = '-' + maLeft + 'px';
                }
            }
        } else if (target.closest('.slider-arrow.prev')) {
            currentSlide--;

            if (carusel){
                let maLeft = slides[0].style.marginLeft;
                    maLeft = maLeft.slice(0, -2);

                if (maLeft === '' || +maLeft === 0){
                    maLeft = 0;
                    slides[0].style.marginLeft = maLeft + 'px';
                } else {
                    maLeft = +maLeft + 225;
                    slides[0].style.marginLeft = maLeft + 'px';
                }
            }
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

        if (!carusel){
            nextSlide(slides, currentSlide, 'active');
        }
        if (dote) {
            nextSlide(dots, currentSlide, 'slick-active');
        }
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
export default slider;