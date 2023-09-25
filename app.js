const apiKey = '832bc9d0';

// Function to search for movies
async function searchMovies(query) {
    let allResults=[];
    for(let page=0;page<=3;page++){          //fetching first 3 page result
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
        const data = await response.json();
        
        allResults= allResults.concat(data.Search);
    }
    // const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    // const data = await response.json();
    // return data.Search || [];
    return allResults;
}

// Function to add a movie to favourites
async function addToFavourites(event) {
    const imdbID = event.target.id;
    // console.log(imdbID);        
    const movie = await getMovieDetails(imdbID);
    if (movie) {
        const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];
        if (!favouritesList.some(m => m.imdbID === movie.imdbID)) {
            favouritesList.push(movie);
            localStorage.setItem('favourites', JSON.stringify(favouritesList));
            alert(`${movie.Title} has been added to your favourites!`);
        } else {
            alert(`${movie.Title} is already in your favourites!`);
        }
    }
}

// Function to display search results on the index.html page
function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('movies');
    searchResultsContainer.innerHTML = '';

    results.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-element');
        movieCard.innerHTML = `
        <img src="${movie.Poster}" alt="image-h">
        <div class="movie-info">
          <h4>${movie.Title}</h4>
          <div class="d-grid gap-2 col-6 mx-auto buttons-box">
          <button class="btn btn-primary btn-lg favourite-button" id="${movie.imdbID}">Add to Favourites</button>
          <button  class="btn btn-secondary btn-lg more-button"><a href="movie.html?id=${movie.imdbID}">More</a>
          </div>
          </div>         
        `;
        // console.log(`Button ID for ${movie.Title}: ${movie.imdbID}`);

        searchResultsContainer.appendChild(movieCard);
    });
    const favouriteButtons = document.querySelectorAll('.favourite-button');
    favouriteButtons.forEach(button => {
        
        button.addEventListener('click', addToFavourites);
    });
}

// Event listener for the Search Button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function () {
    const query = document.getElementById('searchInput').value.trim();
    if (query.length > 0) {
        searchMovies(query)
            .then(results => {
                displaySearchResults(results);
                // Store the search results in LocalStorage
                localStorage.setItem('movies', JSON.stringify(results));
            })
            .catch(error => console.error('Error searching movies:', error));
    }
});



// Function to get movie details by IMDb ID
async function getMovieDetails(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
}

// // Automatically display search results if available from previous search
// const previousSearchResults = JSON.parse(localStorage.getItem('searchResults'));
// if (previousSearchResults && previousSearchResults.length > 0) {
//     displaySearchResults(previousSearchResults);
// }

// const quoteText = document.getElementById('quoteText');
// const quoteSpeed = 200; // Time (in milliseconds) for each word to appear
// const movieQuotations = [
//     "The greatest trick the devil ever pulled was convincing the world he didn't exist. - The Usual Suspects",
//     "May the Force be with you. - Star Wars",
//     "Here's looking at you, kid. - Casablanca",
//     "I'll be back. - The Terminator",
//     "Why so serious? - The Dark Knight",
//     "You can't handle the truth! - A Few Good Men",
//     "There's no place like home. - The Wizard of Oz",
// ];
// let currentQuoteIndex = 0;

// // Function to display the quotation word by word
// async function displayQuoteWordByWord() {
//     const quote = movieQuotations[currentQuoteIndex];
//     const words = quote.split(' ');

//     for (let i = 0; i < words.length; i++) {
//         await new Promise(resolve => setTimeout(resolve, quoteSpeed));
//         quoteText.textContent = words.slice(0, i + 1).join(' ');
//     }

//     // After displaying all words, wait for 15 seconds and then show the next quote
//     await new Promise(resolve => setTimeout(resolve, 800));
//     showNextQuote();
// }

// // Function to show the next quotation
// function showNextQuote() {
//     currentQuoteIndex = (currentQuoteIndex + 1) % movieQuotations.length;
//     displayQuoteWordByWord();
// }

// // Display the first quotation on page load
// displayQuoteWordByWord();