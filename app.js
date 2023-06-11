//TMDB 
const API_KEY = 'api_key=bfac323cd6003abb6795dd6ba81cf289';
const BASE_URL = 'https://api.themoviedb.org/3/';

const API_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc&' + API_KEY + '&page=1&limit=24';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


getMovies(API_URL);

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            showMovies(data.results);
        });
}

function showMovies(data) {
    const movieRow = document.getElementById('movies');
    movieRow.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('col-m-6', 'col-xl-3','p-0', 'movie');
        movieElement.innerHTML = `
            <div class="movie">
                <div class="movie-img">
                    <img src="${IMG_URL + poster_path}" alt="${title}">
                </div>
                <div class="movie-info">
                    <div class="score">
                        <h3>${vote_average}</h3>
                    </div>
                    <div class="movie-title">
                        <h3>${title}</h3>
                    </div>
                </div>
            </div>
        `;
        movieRow.appendChild(movieElement);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCH_URL + '&query=' + searchTerm);
    } else {
        getMovies(API_URL);
    }
});

//will add later
// {/* <div class="overview">
//     <div class="overview-title">
//         <h3>Overview</h3>
//     </div>
//     <div class="overview-content">
//         ${overview}
//     </div>
// </div> */}