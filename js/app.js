const title = document.getElementById('title');
const year = document.getElementById('year');
const type = document.getElementById('type');
const searchBtn = document.querySelector('#searchBtn');
const message = document.getElementById('message');
const moviePoster = document.getElementById('moviePoster');
const movieInfo = document.getElementById('movieInfo');

const init = () => {
    eventListeners();
}

const eventListeners = () => {
    searchBtn.addEventListener('click', searchMovie);
}

const url = () => {
    let url = 'https://www.omdbapi.com/?';
    let movieTitle = title.value.trim(' ');
    let movieYear = year.value.trim(' ');
    let movieType = type.value;

    if (movieTitle) {
        url += `t=${ movieTitle.split(' ').join('+')}&`;
    }
    if (movieYear) {
        url += `y=${movieYear}&`;
    }
    if (movieType !== '') {
        url += `type=${movieType}&`;
    }
    return url + 'plot=full&' + 'apikey=376e9ad';
}

function searchMovie() {
    const xhr = new XMLHttpRequest();

    //Open new connection
    xhr.open('GET', url(), true);

    //Load connection status
    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            if (response.Response === 'False') {
                message.textContent = `Sorry! No matching movie found`;
                moviePoster.textContent = '';
                movieInfo.textContent = '';
            } else {
                message.textContent = '';
                displayMovie(response);
            }
        }
    }
    xhr.send();
}

const displayMovie = (movie) => {
    let ratings = '';
    let html1 = '',
        html2 = '';

    movie.Ratings.forEach((rating) => {
        ratings += `<p><span class="source">${rating.Source}</span><span class="value">${rating.Value}</span></p>`;
    });

    html1 += `
            <img src="${movie.Poster}" class="rounded border p-2" width="100%" alt="Movie Cover">
            <p>Type: ${movie.Type}</p>
            <p>Directed by: ${movie.Director}</p>
            <a class="btn btn-primary" href="${movie.Website}">Visit Official Website</a>
    `;

    html2 += `
            <div>
                <h2 class="text-light">${movie.Title}</h2>
                <p class="text-primary">${movie.Genre}</p>
                <p><span class="text-muted">Year: ${movie.Year}</span> <span class="text-warning">Released: ${movie.Released}</span></p>
            </div>

            <div class="d-flex">
                <p><li class="text-info mr-5">${movie.Runtime}</li></p>
                <p class="text-light">Language: ${movie.Language}</p>
            </div>

            <div">
                <p id="writer" class="border border-secondary rounded p-2 my-3">
                    <span class="text-secondary">WRITTEN BY: </span>${movie.Writer}
                </p>
            </div>

            <div>
                <p id="plot">${movie.Plot}</p>
                <p class="text-info"><span class="text-secondary">Actors: </span>${movie.Actors}</p>
            </div>
    
            <div id="ratingsSection">
                <h5 class="text-warning">Ratings</h5>
                ${ratings}
            </div>

            <div id="additionalInfo" class="">
                <p>DVD: ${movie.DVD}</p>
                <p>Production: ${movie.Production}</p>
            </div>
        `;
    moviePoster.innerHTML = html1;
    movieInfo.innerHTML = html2;
}

init();