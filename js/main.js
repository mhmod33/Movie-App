//////////////api   api_key=970488c28a191c69880523a4aef98154  https://api.themoviedb.org/3/   discover/movie?sort_by=popularity.desc&

// let api_key = "api_key=970488c28a191c69880523a4aef98154";
// let base_key = "discover/movie?sort_by=popularity.desc&";
let api_url =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=970488c28a191c69880523a4aef98154";
let image_url = "https://image.tmdb.org/t/p/w500";
let search_url =
  "https://api.themoviedb.org/3/search/movie?api_key=970488c28a191c69880523a4aef98154";

let form = document.getElementById("form");
getMovie(api_url);
function getMovie(api_url) {
  fetch(api_url)
    .then((Response) => Response.json())
    .then((data) => {
      showMovie(data.results);
    });
}
function showMovie(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    let movieEle = document.createElement("div");
    movieEle.classList.add("movie");
    movieEle.innerHTML = `
    <div>
            <img src="${image_url + movie.poster_path}">

            <div class="movie-info">
                <h3>${movie.original_title}</h3>
                <span class="${changeColor(movie.vote_average)}">${
      movie.vote_average
    }</span>
            </div>

            <div class="overview">
            <h3>Overview</h3>
                ${movie.overview}
            </div>
        </div>
    `;
    console.log(movie);
    let main = document.getElementById("main");
    main.appendChild(movieEle);
  });
}

function changeColor(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("keyup", (e) => {
  e.preventDefault();

  let search = document.getElementById("search");
  let searchTerm = search.value;
  if (searchTerm) {
    getMovie(search_url + "&query=" + searchTerm);
  } else getMovie(search_url + "&query=" + searchTerm);
});
