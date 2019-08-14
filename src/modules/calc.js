const calc = () => {

    const formCalk = document.querySelector('#card_order'),
        totalPrice = document.getElementById('price-total'),
        radioButton = formCalk.querySelectorAll('input[name="club-name"]'),
        inputMonth = formCalk.querySelectorAll('.time input'),
        promoCod = formCalk.querySelector('.price input');
    let priceMonth,
        radioButtonActive;

    const selectClub = () => {

        radioButton.forEach((e) => {

            if (e.checked) {
                radioButtonActive = e.id;
            }
        });
    };



    const parsingPrice = () => {

        pricingMonth();



        inputMonth.forEach((e) => {

            e.setAttribute('data-price', priceMonth[e.id]);

        });



        if (inputMonth.length > 0) {

            inputMonth[0].click();

        }

    };
    const saleS = () => {

        let totalP = totalPrice.textContent;
        if (promoCod.value === 'ÒÅËÎ2019') {

            let sale = totalP * 30 / 100;

            totalP = totalP - sale;



            totalP = Math.ceil(totalP);

        }

        setTotalPrice(totalP);

    }

    const setTotalPrice = (total) => {

        totalPrice.textContent = total;

    };

    const pricingMonth = () => {
        selectClub();
        if (radioButtonActive === 'card_leto_mozaika') {
            priceMonth = {
                m1: 1999,
                m2: 9900,
                m3: 13900,
                m4: 19900
            };
        } else if (radioButtonActive === 'card_leto_schelkovo') {
            priceMonth = {
                m1: 2999,
                m2: 14900,
                m3: 21900,
                m4: 24900
            };
        }
    };

    parsingPrice();

    promoCod.addEventListener('input', () => {

        saleS();

    })

    radioButton.forEach((e) => {

        e.addEventListener('click', () => {

            promoCod.value = '';

            parsingPrice();

        });

    });

    inputMonth.forEach((e) => {

        e.addEventListener('click', () => {
            promoCod.value = '';
            setTotalPrice(e.getAttribute('data-price'));

        });
    });

};
export default calc;