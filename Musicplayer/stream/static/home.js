const player = document.querySelector('audio')
const play = document.getElementById('play')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const audio_tracks = document.querySelectorAll('.play-button')
const song_title = document.querySelector('.song-title')
const artist = document.querySelector('.artist')
const music_img = document.querySelector('.music_img')
const main_div = document.querySelector(".main_div");
const progress = document.querySelector(".progress");
const curr_time = document.querySelector("#current_time");
const dur_time = document.querySelector("#duration");
const progress_div = document.querySelector('.progress_div');


// initilize music indexing
let musicIndex = 0

//get music document from backend 
const musics = JSON.parse(document.getElementById('musics').textContent)

// loading a set detail of music in UI
const setSRC = () => {

    player.src = `/media/${musics[musicIndex].audio_file}`
    song_title.textContent = musics[musicIndex].title
    artist.textContent = musics[musicIndex].artist
    music_img.setAttribute('src', `media/${musics[musicIndex].cover_image}`)

}

//determine player should play or not 
const playOrPause = () => {
    if (player.paused) {
        player.play()
        changingTheIcons(musicIndex, play, 'play');
    }
    else {
        player.pause()
        changingTheIcons(musicIndex, play, 'pause');
    }
}

const changingTheIcons = (Index, play, playOrpause, next = 0) => {
    const element = document.getElementById(Index);
    const title = document.getElementById(`title${Index}`);
    const artist = document.getElementById(`artist${Index}`);
    if (playOrpause == 'play') {
        play.classList.replace('fa-play', 'fa-pause');
        element.classList.replace('fa-play', 'fa-pause');
        element.style.color = '#fd3123'
        title.style.color = '#fd3123'
        artist.style.color = '#f44336'
    }
    else {
        play.classList.replace('fa-pause', 'fa-play');
        element.classList.replace('fa-pause', 'fa-play');
    }
    if (next == 1) {
        element.style.color = '#fff';
        title.style.color = '#fff'
        artist.style.color = '#fff'
    }
};

// when an audio is chosen from the song tracks
const getsong = (btn) => {
    // console.log(btn.id);
    const newIndex = parseInt(btn.id);

    changingTheIcons(musicIndex, play, 'pause', 1);
    changingTheIcons(newIndex, play, 'play');

    if (newIndex == musicIndex) {
        if (player.paused) {
            player.play()
            changingTheIcons(musicIndex, play, 'play');
        } else {
            player.pause()
            changingTheIcons(musicIndex, play, 'pause');
        }
    } else {
        musicIndex = newIndex
        setSRC()
        player.play()
        play.classList.replace('fa-play', 'fa-pause');
    }
};

// eventlisteners
// when play btn is clicked
play.addEventListener("click", e => {
    playOrPause()
})


// when the prev btn is clicked
prev.addEventListener('click', () => {
    changingTheIcons(musicIndex, play, 'pause', 1);
    musicIndex = musicIndex - 1
    if (musicIndex < 0) {
        musicIndex = musics.length - 1
    }
    changingTheIcons(musicIndex, play, 'play');
    setSRC()
    playOrPause()
})

// when the next btn is clicked
next.addEventListener('click', () => {
    changingTheIcons(musicIndex, play, 'pause', 1);
    musicIndex = musicIndex + 1
    if (musicIndex > musics.length - 1) {
        musicIndex = 0
    }
    changingTheIcons(musicIndex, play, 'play');
    setSRC()
    playOrPause()

})

// when the music has ended
player.addEventListener("ended", () => {
    next.click()
});


// load first music
setSRC();
play.click();
play.click();
changingTheIcons(0, play, 'pause');


// Progress Bar for a particular song
player.addEventListener('timeupdate', (event) => {
    // console.log(event);
    let { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    let r1 = Math.floor(duration / 60);
    let r2 = Math.floor(duration % 60);

    let l1 = Math.floor(currentTime / 60);
    let l2 = Math.floor(currentTime % 60);

    if (duration) {
        if (l2 < 10)
            l2 = '0' + l2;
        if (r2 < 10)
            r2 = '0' + r2;
        curr_time.innerText = l1 + ":" + l2;
        dur_time.innerText = r1 + ":" + r2;
    }

});

progress_div.addEventListener('click', (event) => {

    let move_progress = ((event.offsetX) / (progress_div.clientWidth)) * player.duration;
    player.currentTime = move_progress;
});


// Keyboard Shortcuts
document.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 32) {
        playOrPause();
    }
    if (event.keyCode === 176) {
        next.click();
    }
    if (event.keyCode === 177) {
        prev.click();
    }
});