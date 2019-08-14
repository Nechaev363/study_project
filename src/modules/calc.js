const calc = () => {
    const formCalk = document.querySelector('#card_order'),
        totalPrice = document.getElementById('price-total'),
        radioButton = formCalk.querySelectorAll('input[name="club-name"]'),
        inputMonth = formCalk.querySelectorAll('.time input'),
        promocode = formCalk.querySelector('.price input');
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

        if(inputMonth.length > 0){
            inputMonth[0].click();
        }
    };

    const sale = () => {
        let totalSale = totalPrice.textContent;
        if(promocode.value === 'ТЕЛО2019') {
            let sale = totalSale * 30 / 100;
            totalSale = totalSale - sale;

            totalSale = Math.ceil(totalSale);
        }
        setTotalPrice(totalSale);
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

    promocode.addEventListener('change', () => {
        sale()
    });
    
    radioButton.forEach((e) => {
        e.addEventListener('click', () => {
            parsingPrice();
        });
    });

    inputMonth.forEach((e) => {
        e.addEventListener('click', () => {
            setTotalPrice(e.getAttribute('data-price'));
        });
    });
};
export default calc;