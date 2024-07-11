// Get references to HTML elements
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const songAlbum = document.getElementById('song-album');
const playlist = document.getElementById('playlist');
const songSrcInput = document.getElementById('song-src');
const songTitleInput = document.getElementById('song-title-input');
const songArtistInput = document.getElementById('song-artist-input');
const songAlbumInput = document.getElementById('song-album-input');
const addSongBtn = document.getElementById('add-song-btn');

let isPlaying = false; // Boolean to track if a song is playing
let currentIndex = 0; // Index of the currently playing song

// Array to hold song data
let songs = [
    { src: './songs/Song1.mp3', title: 'Tum hi ho', artist: 'Arijit Singh', album: 'Aashiqui 2' },
    { src: './songs/Song2.mp3', title: 'Channa Mereya', artist: 'Arijit Singh', album: 'Ae Dil Hai Mushkil' },
    { src: './songs/Song3.mp3', title: 'Bulleya', artist: 'Arijit Singh', album: 'Ae Dil Hai Mushkil' }
];

// Function to render the playlist
function renderPlaylist() {
    playlist.innerHTML = ''; // Clear the existing playlist
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.setAttribute('data-index', index);
        // Add event listener to each playlist item
        li.addEventListener('click', () => {
            currentIndex = index;
            loadSong(currentIndex);
            playPauseBtn.textContent = 'Pause';
            audio.play();
            isPlaying = true;
        });
        playlist.appendChild(li); // Append each item to the playlist
    });
}

// Function to load a song
function loadSong(songIndex) {
    const song = songs[songIndex];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songAlbum.textContent = song.album;
    if (isPlaying) {
        audio.play();
    }
}

// Function to play or pause the song
function playPauseSong() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying; // Toggle isPlaying state
}

// Function to update the progress bar
function updateProgress() {
    progress.value = (audio.currentTime / audio.duration) * 100;
}

// Function to set the audio current time based on progress bar
function setProgress() {
    audio.currentTime = (progress.value / 100) * audio.duration;
}

// Function to change the volume
function changeVolume() {
    audio.volume = volume.value;
}

// Function to go to the previous song
function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    playPauseBtn.textContent = 'Pause';
    audio.play();
    isPlaying = true;
}

// Function to go to the next song
function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    playPauseBtn.textContent = 'Pause';
    audio.play();
    isPlaying = true;
}

// Function to add a new song to the playlist
function addSong() {
    const src = songSrcInput.value;
    const title = songTitleInput.value;
    const artist = songArtistInput.value;
    const album = songAlbumInput.value;
    if (src && title && artist && album) {
        songs.push({ src, title, artist, album });
        renderPlaylist(); // Re-render the playlist to include the new song
        // Clear input fields
        songSrcInput.value = '';
        songTitleInput.value = '';
        songArtistInput.value = '';
        songAlbumInput.value = '';
    }
}

// Add event listeners to control buttons and other elements
playPauseBtn.addEventListener('click', playPauseSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('change', setProgress);
volume.addEventListener('input', changeVolume);
addSongBtn.addEventListener('click', addSong);

// Initialize the playlist
renderPlaylist();
loadSong(currentIndex); // Load the first song initially