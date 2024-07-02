const API_KEY = "AIzaSyBGIXP8qvokr3l2XbwWwNjHVC-h-We9_lc"

function aleCod(max, min){
    return Math.floor(Math.random()*(max - min) + min)
}

async function generateRandomWord() {
    try {
        const response = await fetch('https://api.datamuse.com/words?ml=ringing&max=400');
        const data = await response.json();
        const randomIndex = aleCod(1, 400)
        randomWord = data[randomIndex].word;

        return randomWord;
    } catch (error) {
        alert("Error  Conect to Internet!")
    }
}

// Get all data random
async function searchRandomWord() {
    var keyWord = await generateRandomWord()
    if (!keyWord) {
        return [];
    }
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${keyWord}&part=snippet&type=video&maxResults=20`);
    const data = await response.json();
    displayVideos(data.items);
}

document.addEventListener("DOMContentLoaded", () => {
    displayVideos();
});

async function searchVideos() {
    const query = document.getElementById('inputSearchHeader').value;
    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${query}&part=snippet&type=video&maxResults=10`);
    const data = await response.json();
    displayVideos(data.items);
}

function displayVideos(videos) {
    const videosContainer = document.getElementById('videosSectionsWrapper');
    videosContainer.innerHTML = '';

    const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];

    if(videos){
        videos.forEach(video => {
        const isFavorite = favorites.some(fav => fav.id === video.id.videoId);
        const starClass = isFavorite ? 'yellow' : 'white';
    
        const videoElement = document.createElement('div');
        videoElement.classList.add('videoCard');
        videoElement.innerHTML = `
            <iframe class="imgVideo" src="https://www.youtube.com/embed/${video.id.videoId}?controls=0&modestbranding=1&rel=0" frameborder="0" allowfullscreen></iframe>
            <div class="starContent" id="starContentGet">
                <span class="star ${starClass} starIcon" id='${video.id.videoId}' onclick="toggleFavorite('${video.id.videoId}', '${video.snippet.title}', '${video.snippet.thumbnails.default.url}')">★</span>
            </div>
            `;
            videosContainer.appendChild(videoElement);
        });
    }
}

function toggleFavorite(videoId, title, thumbnail) {
    let favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
    const favoriteIndex = favorites.findIndex(video => video.id === videoId);
    if (favoriteIndex === -1) {
        favorites.push({ id: videoId, title: title, thumbnail: thumbnail });
        var changeStarColor = document.getElementById(videoId)
        changeStarColor.className = 'star yellow starIcon';
    } else {
        favorites.splice(favoriteIndex, 1);
        var changeStarToWrith = document.getElementById(videoId)
        changeStarToWrith.className = 'star white starIcon';
    }

    sessionStorage.setItem('favorites', JSON.stringify(favorites));
    CounterFavoretes()
}

function EnterSearch(evento) {
    if (evento.keyCode === 13) {
        searchVideos()
    }
}

const CounterFavoretes = ()=>{
    let favoriteRenderDiv = document.getElementById("ValueFavoriteCounter")
    let favoritesNum = JSON.parse(sessionStorage.getItem('favorites')) || [];
    let numFavorites = favoritesNum.length
    favoriteRenderDiv.textContent = numFavorites
}
CounterFavoretes()
searchRandomWord()