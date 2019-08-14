
const sendForm = (idForm) => {
    const errorMessage = 'Что-то пошло не так...';
    const form = document.getElementById(idForm);
    const thanks = document.getElementById('thanks');
    const statusMessage = document.createElement('div');


    statusMessage.style.cssText = `font-size: 1rem; margin: 1rem 0; color: white`;
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


    const ckeckForm = (form) => {
        event.preventDefault();

        form.appendChild(statusMessage);
        const formData = new FormData(form);
        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });

        postData(body)
            .then((response) => {

                if (response.status !== 200) {
                    throw new Error('status network not 200');
                } else {
                    thanks.style.display = 'inline-block';
                }
                thanks.addEventListener('click', (event) => {
                    let target = event.target;

                    if (target.matches('.close_icon')) {
                        thanks.style.display = 'none';
                    } else if (target.matches('.close-btn')) {
                        thanks.style.display = 'none';
                    }
                    target = target.closest('.overlay');
                    if (target) {
                        thanks.style.display = 'none';


                    }
                });

                const input = form.querySelectorAll('input').forEach((elem) => {
                    elem.value = '';
                });
            })
            .catch((error) => {

                statusMessage.textContent = errorMessage;
                console.error(error);

            });
    }
    ckeckForm(idForm);

};

export default sendForm;