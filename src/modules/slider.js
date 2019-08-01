const slider = () => {
    const portfolioContent = document.querySelector('.portfolio-content');
    const slide = document.querySelectorAll('.portfolio-item');
    const portfolioBtn = document.querySelectorAll('.portfolio-btn');

    const portfolioDots = document.querySelector('.portfolio-dots');



    for (let i = 0; i < slide.length; i++) {
        const li = document.createElement('li');
        li.classList.add('dot');
        portfolioDots.appendChild(li);

    }

    const dot = document.querySelectorAll('.dot');



    let currentsSlide = 0;
    let interval;

    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);

    };

    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {

        prevSlide(slide, currentsSlide, 'portfolio-item-active');
        prevSlide(dot, currentsSlide, 'dot-active');
        currentsSlide++;
        if (currentsSlide >= slide.length) {
            currentsSlide = 0;
        }
        nextSlide(slide, currentsSlide, 'portfolio-item-active');
        nextSlide(dot, currentsSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    portfolioContent.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;

        if (!target.matches('.portfolio-btn, .dot')) {
            return;
        }

        prevSlide(slide, currentsSlide, 'portfolio-item-active');
        prevSlide(dot, currentsSlide, 'dot-active');

        if (target.matches('#arrow-right')) {
            currentsSlide++;
        } else if (target.matches('#arrow-left')) {
            currentsSlide--;
        } else if (target.matches('.dot')) {
            dot.forEach((elem, index) => {
                if (elem === target) {
                    currentsSlide = index;
                }
            });
        }
        if (currentsSlide >= slide.length) {
            currentsSlide = 0;
        }
        if (currentsSlide < 0) {
            currentsSlide = slide.length - 1;
        }
        nextSlide(slide, currentsSlide, 'portfolio-item-active');
        nextSlide(dot, currentsSlide, 'dot-active');
    });
    portfolioContent.addEventListener('mouseover', (event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
            stopSlide();
        }
    });
    
    portfolioContent.addEventListener('mouseout', (event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
            startSlide();
        }
    });
    let img = document.querySelectorAll('.command__photo').forEach((elem) => {
        startSlide(1000);
        let save = elem.getAttribute('src');
    elem.addEventListener('mouseenter', (event) => {
        event.target.src = event.target.dataset.img;
    });
    elem.addEventListener('mouseout', (event) => {
        event.target.src = save;
    });
});
};

export default slider;