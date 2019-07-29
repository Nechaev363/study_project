let button = document.querySelectorAll('button'),
    message = document.querySelector('.message');

    let coin = ['Орел', 'Решка'];

    let score = [0, 0];

    let dropCoin = (event) => {
        let playerChoise = event.target.textContent;
        let random = Math.floor(Math.random() * coin.length);
        let lot = coin[random];

        let output;
        if(playerChoise === lot) {
            output = 'Выиграл';
            score[0]++;
        } else {
            output = 'Проиграл';
            score[1]++;
        }

        message.innerHTML = `<div> Результат: ${lot}</div>
        <div>${output}</div>
        <div> Выиграл ${score[0]} раз, Проиграл ${score[1]}</div>
        `;
    
    };
    button.forEach((button) => {
        button.addEventListener('click', dropCoin);
    });