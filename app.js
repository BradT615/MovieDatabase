// TMDB 
const API_KEY = 'api_key=bfac323cd6003abb6795dd6ba81cf289';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc&' + API_KEY + '&page=1&limit=24';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + 'search/movie?' + API_KEY;
const MOVIE_DETAILS_URL = BASE_URL + 'movie/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Check if we're not on details page
if (!window.location.href.endsWith("details.html")) {
    getMovies(API_URL);
}

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
        const { id, title, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('col-lg-6', 'col-xl-3', 'p-0', 'movie');
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
        movieElement.addEventListener('click', () => {
            localStorage.setItem('movie', id);
            window.location.href = './details.html';
        });
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

window.onload = function() {
    if (window.location.href.endsWith("details.html")) {
        const movieId = localStorage.getItem('movie');
        const main = document.getElementById('main');

        // Fetch movie details
        fetch(`${MOVIE_DETAILS_URL}${movieId}?${API_KEY}`)
        .then(response => response.json())
        .then(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');

            movieElement.innerHTML = `
                <div class="movie-img">
                    <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
                </div>
                <div class="movie-info">
                    <div class="movie-title">
                        <h3>${movie.title}</h3>
                    </div>
                    <div class="overview">
                        <h3>Overview</h3>
                        <p>${movie.overview}</p>
                        <h3>Score: ${movie.vote_average}</h3>
                    </div>
                </div>
            `;

            main.appendChild(movieElement);
        })
        .catch(error => console.log(error));

        localStorage.removeItem('movie');
    }
}
