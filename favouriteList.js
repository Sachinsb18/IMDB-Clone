// Function to display favourites list on the favourites.html page

//  rendering the movies added to the favourite list
function displayFavourites() {
    const favouritesListContainer = document.getElementById('favourite');
    favouritesListContainer.innerHTML = '';

    const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];

    if (favouritesList.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your Favourites-list is Empty';
        favouritesListContainer.appendChild(emptyMessage);
    } else {
        favouritesList.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-element');
            movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="image-h">
            <div class="movie-info">
              <h4>${movie.Title}</h4>
              <div class="d-grid gap-2 col-6 mx-auto buttons-box">
              <button class="btn btn-primary btn-lg remove-button" id="${movie.imdbID}">Remove Favourite</button>
              <button  class="btn btn-secondary btn-lg more-button"><a href="movie.html?id=${movie.imdbID}">More</a>
              </div>
              </div>
            `;
            favouritesListContainer.appendChild(movieCard);
        });
    }

    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromFavourites);
    });
}


// Function to remove a movie from the favorites list
function removeFromFavourites(event) {
    const imdbID = event.target.id;
    const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];

    const movieToRemove = favouritesList.find(movie => movie.imdbID === imdbID);
    if (movieToRemove) {
        const updatedFavouritesList = favouritesList.filter(movie => movie.imdbID !== imdbID);
        localStorage.setItem('favourites', JSON.stringify(updatedFavouritesList));
        alert(`${movieToRemove.Title} has been removed from your favorites!`);
        displayFavourites(); // Refresh the favorites list
    } else {
        alert('Movie not found in favorites!');
    }
}

// Automatically display favorites when the favourites.html page is loaded
document.addEventListener('DOMContentLoaded',()=> {
    displayFavourites();
});

