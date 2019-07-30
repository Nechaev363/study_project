const checkBox = document.getElementById('check');
const checkShow = document.getElementById('show');
const pass = document.getElementById('pass');

checkBox.addEventListener('change', () => {
    // if  (checkBox.checked) {
    //     localStorage.setItem('check', true);
    // } else {
    //     localStorage.setItem('check', false);
    // }
    localStorage.setItem('check', checkBox.checked);

});

if (localStorage.getItem('check') === 'true') {
    checkBox.checked = true;
}

checkShow.addEventListener('change', () => {
    pass.type = checkShow.checked ? 'text' : 'password';
});