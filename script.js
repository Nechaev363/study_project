
$('button').click(() => {
    console.log('test');
});

$('#check').on('change', (event) => {
    console.log(event.target.checked);
});

