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
    const movieRow = document.getElementById('movie-row');
    movieRow.innerHTML = ''; // Clear out the existing movies

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('col-12', 'col-lg-6', 'col-xl-3', 'p-3', 'mb-5', 'movie');
        movieElement.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="vote-color">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        movieRow.appendChild(movieElement);
    });

    // Update vote color for each movie
    const voteColorElements = document.querySelectorAll('.vote-color');
    voteColorElements.forEach(element => {
        const voteAverage = parseFloat(element.textContent);
        const colorClass = getColor(voteAverage);
        element.classList.add(colorClass);
    });
}


function getColor(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
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
