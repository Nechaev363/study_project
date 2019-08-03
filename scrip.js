const searchForm = document.querySelector('#serch-form');
const movie = document.querySelector('#movie');
const urlPoster = 'https://image.tmdb.org/t/p/w500';


function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    if (searchText.trim().length === 0) {
        movie.innerHTML = '<h4 class="col-12 text-center">Поле не должно быть пустым</h4>';
        return;
    }
    movie.innerHTML = '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div>';
    fetch('https://api.themoviedb.org/3/search/multi?api_key=24e04c32de151cd883c3391e00c63043&language=ru&query=' + searchText)
        .then((value) => {
            if (value.status !== 200) {
                return Promise.reject(new Error(value.status));
            }
            return value.json();
        })
        .then((output) => {
            let inner = '';
            if (output.results.length === 0) {
                inner = '<h6 class="col-12 text-center">По вашему запросу ничего не найдено</h6>';
            }
            output.results.forEach((item) => {
                let nameItem = item.name || item.title;
                const poster = item.poster_path ? urlPoster + item.poster_path : './img/cover54191.jpg';
                let dataInfo = '';
                if (item.media_type !== 'person') dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
                inner += `
                <div class="col-12 col-md-4 col-x-3 item">
                    <img src="${poster}" alt="${nameItem}" ${dataInfo}>
                    <h5><p>${nameItem}</p></h5>
                </div>
                `;

            });
            movie.innerHTML = inner;

            addEventMedia();

        })
        .catch((reason) => {
            movie.innerHTML = 'Что-то пошло не так...';
            console.error(reason || reason.status);
        });

}
searchForm.addEventListener('submit', apiSearch);

function addEventMedia() {
    const media = movie.querySelectorAll('img[data-id]');
    media.forEach((elem) => {
        elem.style.cursor = 'pointer';
        elem.addEventListener('click', showFullInfo);
    });
}

function showFullInfo() {
    let url = '';
    if (this.dataset.type === 'movie') {
        url = 'https://api.themoviedb.org/3/movie/' + this.dataset.id + '?api_key=24e04c32de151cd883c3391e00c63043&language=ru';
    } else if (this.dataset.type === 'tv') {
        url = 'https://api.themoviedb.org/3/tv/' + this.dataset.id + '?api_key=24e04c32de151cd883c3391e00c63043&language=ru';
    } else {
        movie.innerHTML = '<h4 class="col-12 text-center">Произошла ошибка</h4>';

    }

    fetch(url)
        .then((value) => {
            if (value.status !== 200) {
                return Promise.reject(new Error(value.status));
            }
            return value.json();
        })
        .then((output) => {
           
            movie.innerHTML = `
            <h2 class="col-12 text-center">${output.name || output.title}</h2>
            <div class="shadow">
            <div class="col-12">
            <img src='${urlPoster + output.poster_path}'alt='${output.name || output.title}'>
            ${(output.homepage) ? `<p class='text-center'> <a href="${output.homepage}" target="_blank">Официальная страница</a> </p>` : ''}
            ${(output.imdb_id) ? `<p class='text-center'> <a href="https://imdb.com/title/${output.imdb_id}" target="_blank">IMDB.com</a> </p>` : ''}
            </div>
        </div>
        <div class="col-8">
            <p>Рейтинг: ${output.vote_average}</p>
            <p>Статус: ${output.status}</p>
            <p>Премьера: ${output.first_air_date || output.release_date}</p>
            ${(output.last_episode_to_air) ? `<p>Сезонов: ${output.number_of_seasons} | Серий: ${output.last_episode_to_air.episode_number}</p>` : '' }
            <p class='text-justify'>Описание: ${output.overview}</p>
            </div>
            
            <br>
            <div class='youtube'></div>
            </div>
            `;

            getVideo(this.dataset.type, this.dataset.id);

        })

        .catch((reason) => {
            movie.innerHTML = 'Что-то пошло не так...';
            console.error(reason || reason.status);
        });
}
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.themoviedb.org/3/trending/all/week?api_key=24e04c32de151cd883c3391e00c63043&language=ru')
        .then((value) => {
            if (value.status !== 200) {
                return Promise.reject(new Error(value.status));
            }
            return value.json();
        })
        .then((output) => {
            let inner = '<h2 class="col-12 text-center">Популярные за неделю!</h2>';
            if (output.results.length === 0) {
                inner = '<h6 class="col-12 text-center">По вашему запросу ничего не найдео</h6>';
            }
            output.results.forEach((item) => {
                let nameItem = item.name || item.title;
                let mediaType = item.title ? 'movie' : 'tv';
                const poster = item.poster_path ? urlPoster + item.poster_path : './img/cover54191.jpg';
                let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;
                inner += `
                <div class="col-12 col-md-4 col-x-3 item">
                    <img src="${poster}" alt="${nameItem}" ${dataInfo}>
                    <h5><p>${nameItem}</p></h5>
                </div>
                `;

            });
            movie.innerHTML = inner;

            addEventMedia();

        })
        .catch((reason) => {
            movie.innerHTML = 'Что-то пошло не так...';
            console.error(reason || reason.status);
        });
});

function getVideo(type, id) {
    let youtube = movie.querySelector('.youtube');

    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=24e04c32de151cd883c3391e00c63043&language=ru`)
        .then((value) => {
            if (value.status !== 200) {
                return Promise.reject(new Error(value.status));
            }
            return value.json();
        })
        .then((output) => {
            let videoFrame = '<h2 class="col-12 text-center">Трейлеры</h2>';
            output.results.forEach((item) => {
            videoFrame +='<iframe width="1120" height="715" src="https://www.youtube.com/embed/'+ item.key +'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        });

            youtube.innerHTML = videoFrame;

        })
        .catch((reason) => {
            youtube.innerHTML = 'Видео отсутствует';
            console.error(reason || reason.status);
        });
    

}