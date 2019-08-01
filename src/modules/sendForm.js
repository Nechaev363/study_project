const sendForm = (id) => {
    const errorMessage = 'Что-то пошло не так...';
    const loadMessage = 'Загрузка...';
    const successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';


    const form = document.getElementById(id);

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMessage);
        const formData = new FormData(form);
        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });
        statusMessage.textContent = loadMessage;
        postData(body)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                statusMessage.textContent = successMessage;
                const input = form.querySelectorAll('input').forEach((elem) => {
                    elem.value = '';
                });
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            });
    });
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
    
}
document.querySelectorAll('.form-phone').forEach((element) => {
    element.addEventListener('input', (elem) => {
        elem.target.value = elem.target.value.replace(/[A-z-А-я,\-=!@#№\$%\^&\*\.\/<>\?\(\)~]/gi, '');

    });
});
document.querySelectorAll('input[type="text"]').forEach((element) => {
    element.addEventListener('input', (elem) => {
        elem.target.value = elem.target.value.replace(/[A-z\.\?,0-9\-\+=!@#№\$%\^&\*~]/gi, '');

    });
});

export default sendForm;