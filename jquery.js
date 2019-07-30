(() => {

    const $ = (selector) => {
        const elem = document.querySelectorAll(selector);
        const obj = {
            hide() {
                elem.forEach(item => {
                    item.style.display = 'none';
                });
                return this;
            },
            show() {
                elem.forEach(item => {
                    item.style.display = '';
                });
                return this;
            },
            toogle() {
                elem.forEach(item => {
                    if (item.style.display === 'none') {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
                return this;
            },
            addClass(className) {
                elem.forEach(item => {
                    item.classList.add(className);
                });
                return this;
            },
            removeClass(className) {
                elem.forEach(item => {
                    item.classList.remove(className);
                });
                return this;
            },
            toggleClass(className) {
                elem.forEach(item => {
                    item.classList.toggle(className);
                });
                return this;
            },
            click(callBack) {
                elem.forEach(item => {
                    item.addEventListener('click', callBack);
                });
                return this;
            },
            on(eventOn, callBack) {
                elem.forEach(item => {
                    item.addEventListener(eventOn, callBack);
                });
                return this;
            }
        };
        return obj;

    };
    window.$ = $;

})();