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



function displayVideos(videos) {
    const videosContainer = document.getElementById('videosSectionsWrapper');
    videosContainer.innerHTML = '';

    const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];

    videos.forEach(video => {
        const isFavorite = favorites.some(fav => fav.id === video.id);
        const starClass = isFavorite ? 'yellow' : 'white';

        const videoElement = document.createElement('div');
        videoElement.classList.add('videoCard');
        videoElement.innerHTML = `
            <iframe class="imgVideo" src="https://www.youtube.com/embed/${video.id}?controls=0&modestbranding=1&rel=0" frameborder="0" allowfullscreen></iframe>
            <div class="starContent" id="starContentGet">
                <span class="star ${starClass} starIcon" id='${video.id}' onclick="toggleFavorite('${video.id}', '${video.title}', '${video.thumbnail}')">★</span>
            </div>
        `;
        videosContainer.appendChild(videoElement);
    });
}

const CounterFavoretes = ()=>{
    let favoriteRenderDiv = document.getElementById("ValueFavoriteCounter")
    let favoritesNum = JSON.parse(sessionStorage.getItem('favorites')) || [];
    let numFavorites = favoritesNum.length
    favoriteRenderDiv.textContent = numFavorites
    displayVideos(favoritesNum)
}
CounterFavoretes()