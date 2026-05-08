// front.ts
var BASE_URL = "http://www.omdbapi.com/";
var API_KEY = "946acaf5";
async function getMovieByImdbId(imdbId) {
  const url = `${BASE_URL}?i=${imdbId}&apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
  const movie = await response.json();
  if (movie.Response === "False") {
    throw new Error(movie.Error || "No se encontró la película");
  }
  return movie;
}
function renderMovie(doc, movie) {
  const app = doc.getElementById("app");
  if (!app)
    return;
  app.innerHTML = `
        <div class="movie">
            <h2>${movie.Title} (${movie.Year})</h2>
            <p><strong>Rating:</strong> ${movie.imdbRating}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <img src="${movie.Poster}" alt="${movie.Title}" style="max-width: 300px;" />
            <pre>${JSON.stringify(movie, null, 2)}</pre>
        </div>
    `;
}
getMovieByImdbId("tt3896198").then((movie) => {
  renderMovie(document, movie);
}).catch((error) => {
  const app = document.getElementById("app");
  if (app) {
    app.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
});
