fetch('/.env')
    .then(response => response.text())
    .then(response => response.split('=').pop())
    .then(movieDetailsScript)

async function movieDetailsScript(api_key) {

    const params = new URLSearchParams(document.location.search);
    const movieId = params.get("movie_id");

    const movieDetails = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`)
        .then((response) => (response.json()))
        .then((json) => json)

    const titleMovie = document.querySelector("#title-movie");
    titleMovie.textContent = movieDetails.title;

    const descriptionMovie = document.querySelector("#movie-description");
    descriptionMovie.textContent = movieDetails.overview;

    const posterMovie = document.querySelector("#movie-poster")
    posterMovie.src = "https://image.tmdb.org/t/p/w500" + movieDetails.poster_path;

    const durationMovie = document.querySelector("#movie-duration");
    durationMovie.textContent = "Duree : " + movieDetails.runtime + " min";

    const articleMovie = document.querySelector("#movie-article");
    const movieGenres = document.createElement("p");

    for (const genre of movieDetails.genres) {
        movieGenres.textContent += genre.name + " ";
    }

    movieGenres.id = "movie-genres";
    articleMovie.appendChild(movieGenres);
}