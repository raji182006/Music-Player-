// Song list (playlist)
const songs = [
    {
        title: "poo indru neeyaga",
        artist: "Dhanush",
        src: "Po Indru Neeyaga From Velai Illa Pattadhaari-128kbps.mp3"
    },
    {
        title: "neeyum nannum",
        artist: "Nayanthara",
        src: "Neeyum Naanum Anbe-64kbps.mp3"
    },
    {
        title: "neeloothi",
        artist: "priya",
        src: "Neelothi-Sirai.mp3"
    }
];

// Selecting elements
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");

let currentSongIndex = 0;

// Load song
function loadSong(index) {
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    audio.src = songs[index].src;
}

// Initial load
loadSong(currentSongIndex);

// Play / Pause
function playPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Next song
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    audio.play();
}

// Previous song
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    audio.play();
}

// Update progress bar and time
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
});

// Seek music
progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});

// Volume control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Autoplay next song
audio.addEventListener("ended", nextSong);

// Create playlist
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.addEventListener("click", () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        audio.play();
    });
    playlist.appendChild(li);
});

// Format time (mm:ss)
function formatTime(time) {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return '${minutes}:${seconds < 10 ? "0" + seconds : seconds}';
}
