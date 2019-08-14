const serviceSlide = () => {
    const sliderServ = document.querySelector('.services-slider');
    const allSliders = sliderServ.querySelector('.all-sliders');
    let arro;
    const arrows = () => {

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

        creatArrow(sliderServ);
        arro = sliderServ.querySelectorAll('.slider-arrow');
    };
    arrows();

    let left = 0;
    sliderServ.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;
        target = target.closest('.slider-arrow');
        
        if (!target.matches('.prev, .next')) {
            return;
        };
        if (target.matches('.prev')) {
            
            if(left <= -1125) {
                left = 0;
                
            }else {
                left = left -225
            }
            allSliders.style.left = left + 'px'
            
        }
        if(target.matches('.next')) {
            if (left < 0) {
                left = left + 225;
            } else {
                left = -1125;
            }
            allSliders.style.left = left + 'px';
        }
        
    })

};
export default serviceSlide;