const InputSearch = document.querySelector('.input-type');
const SearchBtn = document.querySelector('.seach-btn');
const contentSectionContent = document.querySelectorAll('.overall-container');
const homeHero = document.querySelector('.banner'); 
const movieSection = document.querySelector('.overall-container'); 
const singleMovieInFull = document.querySelector('.single-movie-full');
const movieFile =JSON.parse(this.localStorage.getItem("movie"))
console.log(movieFile);

const apiKey = "11763de4";

createMovies(movieFile);
SearchBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  contentSectionContent.forEach((section) => (section.innerHTML = ""));
  if (movieFile) {
      
    createMovies(movieFile);
  }
  const value = await fetchUrl();
  createMovies(value);
});

window.addEventListener("keydown", async function (e) {
  if (e.key == "Enter") {
  
    contentSectionContent.forEach((section) => (section.innerHTML = ""));

    if (movieFile) {
      
      createMovies(movieFile);
    }
    const value = await fetchUrl();
    
    createMovies(value);
  }
});

async function fetchUrl() {
  const query = InputSearch.value;
  const myUrl = `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${query}`;
  const res = await fetch(myUrl);

  const data = await res.json();
  console.log(data);
  // const local = localStorage.setItem("movie", JSON.stringify(data));
  
  InputSearch.value = "";
  return data;
}

function createMovies(value) {
  console.log(value.Search);

  value.Search.forEach((movie) => {
    const singleMovie = document.createElement("div");

    singleMovie.innerHTML = `<div class="single-movie">
                <div class="image">
                  <img style="width:230px; height: 250px" class="img" id="${
                    movie.imdbID
                  }" src=${movie.Poster} alt="${movie.Title}" />
                </div>
                <div class="title-rating">
                  <div>
                    <p class="title">${movie.Title.slice(0, 10)}</p>
                    <div class="line"></div>
                    <p class="year-text">${movie.Year}</p>
                  </div>
           
                  </div>
                </div>
              </div>`;
    homeHero.style.backgroundImage = `url(${value.Search[2].Poster})`;
    Array.from(contentSectionContent).forEach((section) => {
      section.appendChild(singleMovie.cloneNode(true));
    });
  });
}