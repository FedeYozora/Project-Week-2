const params = new URLSearchParams(window.location.search);
const artistID = params.get("artistID");
let artistName;
let playPauseIntervalId;
console.log("ARTIST ID: ", artistID);
window.onload = () => {
  const container = document.getElementById("albumInfo");
  const containerTrack = document.getElementById("trackList");

  fetch("https://api.deezer.com/artist/" + artistID + "/top?limit=50", {
    method: "GET",
    headers: { Accept: "application/json" },
  })
    .then(resp => resp.json())
    .then(artistTracks => {
      let imgArtist = artistTracks.data[0].contributors[0].picture_big;
      let contributorName = artistTracks.data[0].contributors[0].name;
      let fanNumber = artistTracks.data[0].rank;
      container.innerHTML = `<div class="container-fluid" style="background-image: url(${imgArtist}); background-repeat: no-repeat; background-position: center; background-size: cover;">
            <div id="albumInfo" class="row align-content-end text-white" style="padding-inline: 30px;height: 400px;">
            <div class="col-5">
            <img style="width:20px; display: inline-block;" class="mb-1" src="./assets/imgs/verified-logo.png" alt="" />
              <h6 class="mb-3 d-inline-block">Artista verificato</h6>
              <h1 style="font-size: 4.5rem;line-height: 55px;">${contributorName}</h1>
              <h6 class="mt-5 mb-3">${fanNumber} fans</h6>
            </div>
          </div>
        </div>`;      
    
      artistName = artistTracks.data[0].artist.name;
      localStorage.setItem(artistName, JSON.stringify(artistTracks.data));

      const len = artistTracks.data.length;
      let htmlString = "";
      for (let i = 0; i < len; i++) {
        const song = artistTracks.data[i];
        let title = song.title;
        let artistName = song.artist.name;
        let duration = song.duration;
        let artistImg = song.album.cover;
        let artistId = song.artist.id;
        const trackMinutes = Math.floor(duration / 60);
        let trackSeconds = Math.round(duration - trackMinutes * 60);
        if (trackSeconds < 10) {
          trackSeconds = trackSeconds.toString();
          trackSeconds = `0` + trackSeconds;
        }
        let rank = song.rank;

        htmlString += `<div class="col-1">
        <h6>${i + 1}</h6>
        </div>
        <div class="col-1">
        <img class="artistImg" style="width: -webkit-fill-available;" src="${artistImg}" style="scale: 0.7" alt="">
        </div>
        <div class="col-5">
        <h6 class="text-white mb-1" style="text-overflow: ellipsis;white-space: nowrap;
        overflow: hidden;" onclick="play(event)">${title}</h6>
        <a style="text-decoration: none;
        color: darkgray;" href="./artistPage.html?artistID=${artistId}"><h6 class="d-inline-block">${artistName}</h6></a>
        </div>
        <div class="col-4 ps-5">
        <h6>${rank}</h6>
        </div>
        <div class="col-1">
        <h6>${trackMinutes}:${trackSeconds}</h6>
        </div>`;
      }
      containerTrack.innerHTML = htmlString;
    });
};

const closeButton = document.getElementById("closeBtn");
const centralColumn = document.getElementById("centralCol");
const rightColumn = document.getElementById("rightCol");
const sideBarButton = document.getElementById("sidebarButton");
sideBarButton.onclick = () => {
  rightColumn.classList.remove("d-none");
  centralColumn.classList.remove("col-9");
};

closeButton.onclick = () => {
  rightColumn.classList.add("d-none");
  centralColumn.classList.add("col-9");
  sideBarButton.classList.remove("d-none");
};

const playBtn = document.getElementById("play-btn");
const currentTime = document.querySelector(".current-time");
const totalTime = document.querySelector(".total-time");
const timeSlider = document.querySelector(".timeline-slider");

const parseTimeFromString = (timeString) => {
  return timeString.split(':').reduce((acc,time) => (60 * acc) + +time);
}

const parseTimeToString = (time) => {
  return new Date(time * 1000).toISOString().substring(14, 19)
}

const updateTimeStamp = (prevValue) => {
  let intervalId = setInterval(() => {
    const newValue = ++prevValue;
    currentTime.innerText = parseTimeToString(newValue);
    timeSlider.value = newValue;
  }, 1000);
  return intervalId;
}

const play = (event) => {
  const song = JSON.parse(localStorage.getItem(artistName)).find(song => song.title === event.currentTarget.innerText)
  timeSlider.max = song.duration;
  totalTime.innerText = parseTimeToString(song.duration);
  playPauseIntervalId = updateTimeStamp(parseTimeFromString(currentTime.innerText))
}

const pause = () => {
  clearInterval(playPauseIntervalId);
}