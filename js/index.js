const API_KEY = 'bd63a026-460b-44c2-99c0-8cf091da46e0';
const API_URL_POPULAR ='https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_SEARCH ='https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

getMovies(API_URL_POPULAR);

async function getMovies(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const responseData = await response.json();
    renderMovies(responseData);
}

function getClassByRate(vote) {
    if (vote >=7) {
        return "green";
    } else if (vote >5) {
        return "orange";
    } else {
        return "red";
    }
}

function renderMovies(data) {
    const moviesEl = document.querySelector(".movies");
    // Очистить предыдущие фильмы
    document.querySelector(".movies").innerHTML = "";
    data.films.forEach(movie => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img
          src="${movie.posterUrlPreview}"
          class="movie__cover"
          alt="${movie.nameRu}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
          (genre) => ` ${genre.genre}`
        )}
        </div>
            ${
                movie.rating &&
                `<div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>`
          }
        </div>`;
      moviesEl.appendChild(movieEl);
    });
  }

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if (search.value){
        getMovies(apiSearchUrl);

        search.value = "";
    }
});