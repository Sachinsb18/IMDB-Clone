const apiKey = '832bc9d0';

// function to get movie details
async function getMovieDetailsById(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
}

// Rendering the fetched movie deatils on screen
function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movieDetails');
    movieDetailsContainer.innerHTML = `
        <div class="poster-container">
            <div class="movie-image">
                <img src="${movie.Poster}"  alt="${movie.Title}">
            </div>
            
            <div class="card-body">
                <h4 class="card-title">${movie.Title}</h4>
                <p>${movie.Plot}</p>
                <p><strong>Year:</strong> ${movie.Year}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Runtime:</strong> ${movie.Runtime}</p>
                <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
                <!-- Add other movie details here -->
            </div>
        </div>
    `;
}

// function to load the page
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('id');

    if (imdbID) {
        getMovieDetailsById(imdbID)
            .then(movie => {
                if (movie) {
                    displayMovieDetails(movie);
                } else {
                    const movieDetailsContainer = document.getElementById('movieDetails');
                    movieDetailsContainer.innerHTML = '<p>Movie details not found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                const movieDetailsContainer = document.getElementById('movieDetails');
                movieDetailsContainer.innerHTML = '<p>Error fetching movie details.</p>';
            });
    }
});