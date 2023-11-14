const params = new URLSearchParams(window.location.search);
const artistID = params.get("artistID");
console.log("ARTIST ID: ", artistID);
window.onload = () => {
  const container = document.getElementById("albumInfo");
  const containerTrack = document.getElementById("trackList");

  fetch("https://deezerdevs-deezer.p.rapidapi.com/album/" + artistID, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f04c55fb80msh6fa1ef56e5bfc0bp1b81eejsn1dd6cba9b4bd",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
    }
  })
    .then(resp => resp.json())
    .then(albumObj => {
      let imgArtist = albumObj.contributors[0].picture_xl;
      let contributorName = albumObj.contributors[0].name;
      let fanNumber = albumObj.fans;
      container.innerHTML = `<div class="container-fluid" style="background-image: url(${imgArtist}); background-repeat: no-repeat; background-size: cover;">
            <div id="albumInfo" class="row align-content-end text-white" style="padding-inline: 30px;height: 400px;">
            <div class="col-5">
            <img style="width:20px; display: inline-block;" class="mb-1" src="./assets/imgs/verified-logo.png" alt="" />
              <h6 class="mb-3 d-inline-block">Artista verificato</h6>
              <h1 style="font-size: 4.5rem;line-height: 55px;">${contributorName}</h1>
              <h6 class="mt-5 mb-3">${fanNumber} fans</h6>
            </div>
          </div>
        </div>`;

      const len = albumObj.tracks.data.length;
      let htmlString = "";
      for (let i = 0; i < len; i++) {
        let title = albumObj.tracks.data[i].title;
        let artistName = albumObj.tracks.data[i].artist.name;
        let duration = albumObj.tracks.data[i].duration;
        let artistImg = albumObj.tracks.data[i].album.cover;
        let artistId = albumObj.tracks.data[i].artist.id;
        const trackMinutes = Math.floor(duration / 60);
        let trackSeconds = Math.round(duration - trackMinutes * 60);
        if (trackSeconds < 10) {
          trackSeconds = trackSeconds.toString();
          trackSeconds = `0` + trackSeconds;
        }
        let rank = albumObj.tracks.data[i].rank;

        htmlString += `<div class="col-1">
        <h6>${i + 1}</h6>
        </div>
        <div class="col-1">
        <img class="artistImg" style="width: -webkit-fill-available;" src="${artistImg}" style="scale: 0.7" alt="">
        </div>
        <div class="col-5">
        <h6 class="text-white mb-1" style="text-overflow: ellipsis;white-space: nowrap;
        overflow: hidden;">${title}</h6>
        <a style="text-decoration: none;
        color: darkgray;" href="./artistPage.html?artistID=${artistId}"><h6>${artistName}</h6></a>
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

const closeButton = document.querySelector(".fas.fa-times").parentElement;
const centralColumn = document.querySelector(".container-fluid .row .col-7");
const rightColumn = document.querySelector(".container-fluid .row .col-2");
const sideBarButton = document.getElementById("sidebarButton");
sideBarButton.onclick = () => {
  rightColumn.classList.remove("d-none");
  rightColumn.style.position = "fixed"
  centralColumn.classList.remove("col-9");

};

closeButton.onclick = () => {
  rightColumn.classList.add("d-none");
  rightColumn.style.position = "unset"
  centralColumn.classList.add("col-9");
  sideBarButton.classList.remove("d-none");
  
};
