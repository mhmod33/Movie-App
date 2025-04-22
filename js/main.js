///////////////////////   api   api_key=970488c28a191c69880523a4aef98154  https://api.themoviedb.org/3/   discover/movie?sort_by=popularity.desc& ////////////////////

// let api_key = "api_key=970488c28a191c69880523a4aef98154";
// let base_key = "discover/movie?sort_by=popularity.desc&";


//////////////////////////////////////////////// ready the api //////////////////////////////////////////////
let api_url =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=970488c28a191c69880523a4aef98154";
let image_url = "https://image.tmdb.org/t/p/w500";
let search_url =
  "https://api.themoviedb.org/3/search/movie?api_key=970488c28a191c69880523a4aef98154";

let main = document.getElementById("main");

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

// //////////////////////////////////////////  get elements ///////////////////////////////////

let form = document.getElementById("form");
let tags = document.getElementById("tags");

let HeaderTitle = document.createElement("h3");
HeaderTitle.classList.add("Categ_title");
HeaderTitle.textContent = "Search With Category";

let prev = document.getElementById("prev");
let next = document.getElementById("next");
let current = document.getElementById("current");
let currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = "";
var totalPages = 100;
// //////////////////////////////////////////  starting functions ///////////////////////////////////

getGenre();
function getGenre() {
  tags.innerHTML = "";
  let selected = [];


  //***************another way//***************

  // genres.forEach((genre) => {
  //   let tag = document.createElement("div");
  //   tag.classList.add("tag");

  //   tag.innerText = genre.name;
  //   tag.id = genre.id;

  //   tags.appendChild(tag);
  // });

  tags.appendChild(HeaderTitle);
  genres.forEach((genre) => {
    let tag = document.createElement("div");
    tag.classList.add("tag");
    // tag.innerHTML = `
    // <div class="tag">${genre.name}</div>
    // `;
    tag.id = genre.id;
    tag.innerText = genre.name;

    tag.addEventListener("click", () => {
      if (selected.length == 0) {
        selected.push(genre.id);
      } else {
        if (selected.includes(genre.id)) {
          selected.forEach((id, idx) => {
            if (id == genre.id) {
              selected.splice(idx, 1);
            }
          });
        } else {
          selected.push(genre.id);
        }
      }
      // console.log(selected);
      getMovie(api_url + "&with_genres=" + encodeURI(selected.join(",")));
    });
    tags.append(tag);
  });
}

getMovie(api_url);
function getMovie(api_url) {
  lastUrl = api_url;
  fetch(api_url)
    .then((Response) => Response.json())
    .then((data) => {
      if (data.results.length !== 0) {
        showMovie(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;
        totalPages = data.total_pages;
        current.innerHTML = currentPage;
        if (currentPage <= 1) {
          prev.classList.add("disabled");
          next.classList.remove("disabled");
        } else if (currentPage >= totalPages) {
          prev.classList.remove("disabled");
          next.classList.add("disabled");
        } else {
          prev.classList.remove("disabled");
          next.classList.remove("disabled");
        }
      } else {
        main.innerHTML = `<h1 class="no_res">No Movies Found</h1>`;
      }
    });
}

function activGenre() {
  const TagsDiv = document.getElementById("tags");
  const tags = document.querySelectorAll(".tag");
  let clearBtn;

  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      tag.classList.toggle("active");

      if (!clearBtn) {
        clearBtn = document.createElement("button");
        clearBtn.innerText = "Clear";
        clearBtn.classList.add("clearCategsBtn");
        TagsDiv.appendChild(clearBtn);

        clearBtn.addEventListener("click", () => {
          tags.forEach((t) => t.classList.remove("active"));
          selected = [];
          getMovie(api_url);
        });
      }
    });
  });
}

activGenre();

function showMovie(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    let movieEle = document.createElement("div");
    movieEle.classList.add("movie");
    movieEle.innerHTML = `
    <div>
            <img src="${
              image_url + movie.poster_path
                ? image_url + movie.poster_path
                : "https://placehold.com/1080x1580.png"
            }">

            <div class="movie-info">
                <h3>${movie.original_title}</h3>
                <span class="${changeColor(movie.vote_average)}">${
      movie.vote_average
    }</span>
            </div>

            <div class="overview">
            <h3>Overview</h3>
                ${movie.overview}
                <br>
                <button class="knoMore" id="${movie.id}"> Know More </button>
            </div>

        </div>
    `;
    main.appendChild(movieEle);
    let id = movie.id;

    let closebtn = document.querySelector(".closebtn");
    document.getElementById(id).addEventListener("click", () => {
      console.log(id);
      openNav(movie);
    });

    closebtn.addEventListener("click", () => {
      document.getElementById("myNav").classList.remove("atcv");
    });
  });
}

let overlay_content = document.querySelector(".overlay-content");

function openNav(movie) {
  let id = movie.id;
  let movieApi = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=970488c28a191c69880523a4aef98154`;
  fetch(movieApi)
    .then((Response) => Response.json())
    .then((videos) => {
      if (videos) {
        document.getElementById("myNav").classList.toggle("atcv");
        if (videos.results.length > 0) {
          var Embed = [];

          videos.results.forEach((video) => {
            let { key, name, site } = video;

            if (site == "YouTube") {
              Embed.push(`
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}?si=CIRCssnb9nPEcMuo" title="${name}" class="embed hide"
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                `);
            }
          });
          overlay_content.innerHTML = Embed.join("");

          indexedVid = 0;
          showVid();
        } else {
          overlay_content.innerHTML = `<h1 class="no_res">No Movies Found</h1>`;
        }
      }
    });
}

var indexedVid = 0;
var totalVids = 0;
function showVid() {
  let embedVids = document.querySelectorAll(".embed");
  totalVids = embedVids.length;
  embedVids.forEach((selectedEmbed, idx) => {
    if (indexedVid == idx) {
      selectedEmbed.classList.add("show");
      selectedEmbed.classList.remove("hide");
    } else {
      selectedEmbed.classList.add("hide");
      selectedEmbed.classList.remove("show");
    }
  });
}

let arrowRight = document.getElementById("arrow-right");
arrowRight.addEventListener("click", () => {
  if (totalVids > 0) {
    indexedVid++;
  } else {
    indexedVid = totalVids - 1;
  }

  showVid();
});
let arrowLeft = document.getElementById("arrow-left");
arrowLeft.addEventListener("click", () => {
  if (totalVids > totalVids - 1) {
    indexedVid--;
  } else {
    indexedVid = 0;
  }
  showVid();
});

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
  selected = [];
  getGenre();
  let search = document.getElementById("search");
  let searchTerm = search.value;
  if (searchTerm) {
    getMovie(search_url + "&query=" + searchTerm);
  } else getMovie(search_url + "&query=" + searchTerm);
});

prev.addEventListener("click", () => {
  if (prevPage > 0) {
    pageCall(prevPage);
  }
});

next.addEventListener("click", () => {
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
});

function pageCall(page) {
  let urlSplit = lastUrl.split("?");
  let queryParam = urlSplit[1].split("&");
  let key = queryParam[queryParam.length - 1].split("=");

  if (key[0] !== "page") {
    let url = lastUrl + "&page=" + page;
    getMovie(url);
  } else {
    key[1] = page.toString();
    let a = key.join("=");
    queryParam[queryParam.length - 1] = a;
    let b = queryParam.join("&");
    let url = urlSplit[0] + "?" + b;
    getMovie(url);
  }
}
