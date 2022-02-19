const url =
  "https://api.themoviedb.org/3/movie/popular?api_key=7333586501fa9230bb794b93255b6d1b&language=en-US&page=1";

const img_Path = "https://image.tmdb.org/t/p/w500";
const search_Url =
  "https://api.themoviedb.org/3/search/movie?api_key=7333586501fa9230bb794b93255b6d1b&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//Get inital movies
const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  const film = data.results;
  console.log(film);
  showMovies(film);
};

getMovies(url);

//Function to show movies on front end
const showMovies = (movies) => {
  main.innerHTML = " ";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
              <img src="${img_Path + poster_path}" alt="${title}" srcset="">
              <div class="movie-info">
                  <h3>${title}</h3>
                  <span class="${getClassByRate(
                    vote_average
                  )}">${vote_average}</span>
              </div>
              <div class="overview">
                  <h3>Overview</h3>
                  ${overview}
              </div>
  `;
    main.appendChild(movieEl);
  });
};

//rating function
const getClassByRate = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
};

//Search Functionality
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(`${search_Url} ${searchTerm}`);
    search.value = "";
  } else {
    window.location.reload();
  }
});
