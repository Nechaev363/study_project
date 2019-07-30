'use strict';

let books = document.querySelectorAll('.books');

let book = document.querySelectorAll('.book');




let adv = document.querySelector('.adv')

adv.remove('adv');


books[0].removeChild(book[1]);
books[0].removeChild(book[0]);
books[0].removeChild(book[4]);
books[0].removeChild(book[3]);
books[0].removeChild(book[5]);
books[0].removeChild(book[2]);

books[0].appendChild(book[1]);
books[0].appendChild(book[0]);
books[0].appendChild(book[4]);
books[0].appendChild(book[3]);
books[0].appendChild(book[5]);
books[0].appendChild(book[2]);


document.body.style.backgroundImage = 'url(./image/adv.jpg)', 'no-repeat', '100%';
let h2 = document.querySelectorAll('a');

h2[2].textContent = 'Книга 3. this и Прототипы Объектов';







let ul = document.querySelectorAll('ul');
let li = document.querySelectorAll('li');



ul[1].removeChild(li[6]);
ul[1].removeChild(li[7]);
ul[1].removeChild(li[9]);
ul[1].removeChild(li[12]);
ul[1].removeChild(li[14]);
ul[1].removeChild(li[10]);
ul[1].removeChild(li[11]);
ul[1].removeChild(li[13]);
ul[1].removeChild(li[15]);
ul[1].removeChild(li[8]);
ul[1].removeChild(li[16]);


ul[1].appendChild(li[6]);
ul[1].appendChild(li[7]);
ul[1].appendChild(li[9]);
ul[1].appendChild(li[12]);
ul[1].appendChild(li[14]);
ul[1].appendChild(li[10]);
ul[1].appendChild(li[11]);
ul[1].appendChild(li[13]);
ul[1].appendChild(li[15]);
ul[1].appendChild(li[8]);
ul[1].appendChild(li[16]);

ul[4].removeChild(li[36]);
ul[4].removeChild(li[37]);
ul[4].removeChild(li[45]);
ul[4].removeChild(li[39]);
ul[4].removeChild(li[40]);
ul[4].removeChild(li[38]);
ul[4].removeChild(li[42]);
ul[4].removeChild(li[43]);
ul[4].removeChild(li[41]);
ul[4].removeChild(li[44]);
ul[4].removeChild(li[46]);

ul[4].appendChild(li[36]);
ul[4].appendChild(li[37]);
ul[4].appendChild(li[45]);
ul[4].appendChild(li[39]);
ul[4].appendChild(li[40]);
ul[4].appendChild(li[38]);
ul[4].appendChild(li[42]);
ul[4].appendChild(li[43]);
ul[4].appendChild(li[41]);
ul[4].appendChild(li[44]);
ul[4].appendChild(li[46]);


let newLi = document.createElement('li');
newLi.textContent = 'Глава 8: За пределами ES6';

ul[5].appendChild(newLi);

 ul[5].insertBefore(li[56], li[57]);

