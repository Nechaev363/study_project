 document.cookie = 'hello=world';


let data = new Date().getDate;
document.cookie = 'javascript=8.0; expires=' + data.toGMTString();

const setCookie = (name, value, date, path, domain, secure) => {
    let cookie = `${name}=${value}`;


    if (date) {
    let cookieData = new Date(date);
    cookie += '; expires=' + cookieData.toGMTString();
    }

    cookie += path ? `; path=${path}` : '';

    cookie += domain ? `; domain=${domain}` : '';

    cookie += secure ? `; secure` : '';

    document.cookie = cookie;
};

setCookie('car', 'Tesla', data);




