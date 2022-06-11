// Titles: https://omdbapi.com/?s=thor&page=1&apikey=843cea5d
// details: http://www.omdbapi.com/?i=tt3896198&apikey=843cea5d

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=843cea5d`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if (movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else
            moviePoster = "../static/image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(
                `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=843cea5d`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "../static/image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <button type="button" class="btn btn-outline-warning" id="addtolist" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-plus"></i> Add to list</button>
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Add to your List</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form action="/watchlists" method="post">
                            The selected MovieID: 
                            <input class="form-control" type="text" value="${details.imdbID}" name="movieid" aria-label="readonly input example" readonly>
                            <div class="mb-3">
                            <hr>
                            <label for="playlistname" class="form-label">Name of the playlist:</label>
                            <input type="text" class="form-control" name="newname" id="playlistname" placeholder="Enter the name...">
                            </div>
                            <hr>
                            Or it would be added to My Playlist
                            <input class="form-control" type="text" value="My Playlist" aria-label="readonly input example" readonly>
                            <hr>
                            <button id="addplaylistbutton" type="submit" class="btn btn-primary form-control">ADD</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
    // addtoplaylist(details.imdbID);
}

// function addtoplaylist(idofmovie){
//     const addtoplaylistbutton = document.getElementById('addplaylistbutton');
//     addtoplaylistbutton.addEventListener('click', (idofmovie) => {
//         const selectedentry = document.getElementById('selectedelement');
//         const valueofselection = selectedentry.value;
//         console.log(valueofselection);
//         console.log(idofmovie)
// var userid = user._id;
// console.log(userid);
// if(valueofselection==0){
//     db.users.update(1 ,{ $push: { defaultplaylist: idofmovie } })
// }
// else if(valueofselection==0){
//     db.users.update(1 ,{ $push: { playlist1: idofmovie } })
// }
// else if(valueofselection==2){
//     db.users.update(1 ,{ $push: { playlist2: idofmovie } })
// }
//     });
// }

// function selectplaylist(){
//     const addtextbox = document.getElementById('newlist');
//     const selectedentry = document.getElementById('selectedelement')
//     let textboxentry = (addtextbox.value).trim();
//     if (textboxentry.length > 0) {
//         arraymovies[i][0] = textboxentry.slice();
//         return i++;
//     }
//     else if(selectedelement.value != 0){
//         for(let j=0; j<i; j++){
//             if(arraymovies[j][0] == selectedelement.value){
//                 return j;
//                 break;
//             }
//         }
//     }
// }

// function addmovie(idofmovie, selectedplaylist){
//     for(let k=1; k<10; k++){
//         if(arraymovies[selectedplaylist][k] == undefined){
//             console.log(idofmovie);
//             arraymovies[selectedplaylist][k] = idofmovie.slice();
//             break;
//         }
//     }
// }

// console.log(arraymovies);

// function displayplaylistsname(useremail){
//     const listgroup = document.getElementsByClassName('displaylist');
//     console.log(useremail);
//     const user = await User.find({email: "shradha@gmail.com"})
// }

window.addEventListener('click', (event) => {
    if (event.target.className != "form-control") {
        searchList.classList.add('hide-search-list');
    }
});