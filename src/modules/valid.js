const valid = () => {
    const inputValueText = document.querySelectorAll('input[type="text"]');
    const inputValueTel = document.querySelectorAll('input[type="tel"]');
    let statusInputError = 'Необходимо запонить форму';

    inputValueText.forEach((elements) => {
        elements.addEventListener('input', (elem) => { 
        let target = elem.target;
            
        if(target.type === 'text' && !target.classList.contains('promo')) {
            target.value = target.value.replace(/[A-z\.\?,0-9\-\+=!@#№\$%\^&\*~]/gi, '');
        } 
    });
    inputValueTel.forEach((elements) => {
        elements.addEventListener('input', (elem) => {
            let target = elem.target;
            target.value = target.value.replace(/[A-z-А-я,\-=!@#№\$%\^&\*\.\/<>\?\(\)~]/gi, '');
        })
    })
})
}

export default valid;