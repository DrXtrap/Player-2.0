// Obtenha referências para os elementos HTML
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');
const likeButton = document.getElementById('like');

// Defina os detalhes das músicas
const Babaluu = {
    songName: 'Babaluu',
    artist: 'J Feat.DGzin',
    file: 'Babaluu',
};
const Cervical = {
    songName: 'Cervical',
    artist: 'J Feat.7Mil',
    file: 'Cervical',
};
const Licor = {
    songName: 'Licor',
    artist: 'J',
    file: 'Licor',
};
const Rico = {
    songName: 'Rico',
    artist: 'J Feat. NegoB',
    file: 'Rico',
};

// Variáveis de controle
let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = [Babaluu, Cervical, Licor, Rico];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

// Função para reproduzir a música
function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

// Função para pausar a música
function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

// Função para inicializar a música atual
function initializeSong() {
    cover.src = `imagens/${sortedPlaylist[index].file}.png`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    song.addEventListener('loadedmetadata', updateTotalTime);
}

// Função para alternar entre reproduzir e pausar a música
function playPauseDecider() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Função para reproduzir a música anterior
function previousSongs() {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    } else {
        index -= 1;
    }
    initializeSong();
    playSong();
}

// Função para reproduzir a próxima música
function nextSongs() {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    } else {
        index += 1;
    }
    initializeSong();
    playSong();
}

// Função para atualizar a barra de progresso da música e o tempo atual
function updateProgressBar() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    updateCurrentTime();
}

// Função para pular para uma posição específica na música ao clicar na barra de progresso
function jumpTo(event) {
    const Width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / Width) * song.duration;
    song.currentTime = jumpToTime;
}

// Função para embaralhar a lista de reprodução
function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

// Função para lidar com o clique no botão de embaralhar
function shuffleButtonClicked() {
    if (isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    } else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
}

// Função para lidar com o clique no botão de repetição
function repeatButtonClicked() {
    if (repeatOn === false) {
        repeatOn = true;
        repeatButton.classList.add('button-active');
    } else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

// Função para reproduzir a próxima música ou repetir a música atual, dependendo da configuração de repetição
function nextOrRepeat() {
    if (repeatOn === false) {
        nextSongs();
    } else {
        playSong();
    }
}

// Função para converter segundos em formato HH:MM:SS
function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);
    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Função para atualizar o tempo atual da música
function updateCurrentTime() {
    songTime.innerText = toHHMMSS(song.currentTime);
}

// Função para atualizar o tempo total da música
function updateTotalTime() {
    totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked() {
    // Toggle da classe 'button-active' quando o botão é clicado
    likeButton.classList.toggle('button-active');
}

// Inicialize a música atual ao carregar a página
initializeSong();

// Adicione event listeners para os botões e elementos de áudio
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSongs);
next.addEventListener('click', nextSongs);
song.addEventListener('timeupdate', updateProgressBar);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);

