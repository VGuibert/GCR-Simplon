fetch('/.env')
    .then(response => response.text())
    .then(response => response.split('=').pop())
    .then(main)

async function main(api_key) {

    let todayDate = new Date();
    let strDate = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;

    const moviesByReleaseDateDesc = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=1&primary_release_date.lte=${strDate}&sort_by=primary_release_date.desc&vote_count.gte=10`)
        .then((response) => (response.json()))
        .then((json) => json.results)


    for (const movie of moviesByReleaseDateDesc) {

        const movieDetails = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${api_key}`)
            .then((response) => (response.json()))
            .then((json) => json)

        const cardSection = document.querySelector("#film-a-laffiche")
        const cardFrame = document.createElement("article");
        const cardTitle = document.createElement("h4");
        const cardMovieReleaseDate = document.createElement("date");
        const cardMoviePoster = document.createElement("img");
        const cardMovieOverview = document.createElement("p");
        const cardDuration = document.createElement("p");
        const cardGenres = document.createElement("p");

        for (const genre of movieDetails.genres) {
            cardGenres.textContent += genre.name + " ";
        }
        cardGenres.className = "card-genre"

        cardFrame.addEventListener("click", () => window.location = `pages/movieDetails.html?movie_id=${movie.id}`)

        cardDuration.textContent = movieDetails.runtime + " min";
        cardDuration.className = "card-duration"

        cardMovieOverview.textContent = movie.overview;
        cardMovieOverview.className = "card-overview"

        cardMoviePoster.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;

        cardMovieReleaseDate.textContent = "Date de sortie : " + movie.release_date;

        cardTitle.textContent = "Titre : " + movie.title;

        cardSection.appendChild(cardFrame);
        cardFrame.appendChild(cardTitle);
        cardFrame.appendChild(cardMoviePoster);
        cardFrame.appendChild(cardGenres);
        cardFrame.appendChild(cardMovieOverview);
        cardFrame.appendChild(cardMovieReleaseDate);
        cardFrame.appendChild(cardDuration);

    }

}