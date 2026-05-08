const BASE_URL = "http://www.omdbapi.com/";
const API_KEY = "946acaf5";

interface MovieRating {
    Source: string;
    Value: string;
}

interface OMDBMovieResponse {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: MovieRating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
    Error?: string;
}

async function getMovieByImdbId(imdbId: string): Promise<OMDBMovieResponse> {
    const url = `${BASE_URL}?i=${imdbId}&apikey=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const movie = await response.json() as OMDBMovieResponse;

    if (movie.Response === "False") {
        throw new Error(movie.Error || "No se encontró la película");
    }

    return movie;
}

function renderMovie(doc: Document, movie: OMDBMovieResponse): void {
    const app = doc.getElementById("app");

    if (!app) return;

    app.innerHTML = `
    <div class="movie">
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Rating:</strong> ${movie.imdbRating}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>

        ${movie.Poster !== "N/A"
            ? `<img 
                        src="${movie.Poster}" 
                        alt="${movie.Title}" 
                        style="max-width: 300px;" 
                        referrerpolicy="no-referrer"
                   />`
            : `<p>No hay póster disponible</p>`
        }

        <pre>${JSON.stringify(movie, null, 2)}</pre>
    </div>
`;
}

getMovieByImdbId("tt3896198")
    .then(movie => {
        renderMovie(document, movie);
    })
    .catch(error => {
        const app = document.getElementById("app");

        if (app) {
            app.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        }
    });