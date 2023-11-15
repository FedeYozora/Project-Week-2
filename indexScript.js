window.onload = () => {
  const container = document.getElementById("albumMain");
  const containerAlbum = document.getElementById("albumRow");

  fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=imagine-dragons`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f04c55fb80msh6fa1ef56e5bfc0bp1b81eejsn1dd6cba9b4bd",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(resp => resp.json())
    .then(albumObj => {
      // const albumMinutes = Math.floor(albumObj.duration / 60);
      // const albumSeconds = Math.round(albumObj.duration - albumMinutes * 60);

      container.innerHTML = `<img style="width: 300px;" src="${albumObj.data[0].album.cover_medium}" alt="" class="py-4">
      <div class="row py-2">
        <div class="col gx-5">
          <p class="d-inline-block">Album</p>

          <h1>${albumObj.data[0].album.title}</h1>
          <p>${albumObj.data[0].artist.name}</p>
          <p>Ascolta il nuovo album dei Imagine Dragons!</p>
          <button class="rounded-pill btn playBtn fw-bold">Play</button>
          <button class="rounded-pill btn saveBtn fw-bold">Salva</button>
          <button class="btn">
            <i class="fa-solid fa-ellipsis" style="color: #ffffff"></i>
          </button>
        </div>
      </div>`;
    });

  fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=giorgio-vanni`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f04c55fb80msh6fa1ef56e5bfc0bp1b81eejsn1dd6cba9b4bd",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(resp => resp.json())
    .then(albumObj => {
      // const albumMinutes = Math.floor(albumObj.duration / 60);
      // const albumSeconds = Math.round(albumObj.duration - albumMinutes * 60);

      // const len = albumObj.data.length;
      let htmlString = "";
      for (let i = 0; i < 6; i++) {
        // let title = albumObj.data[i].title;
        // let artistName = albumObj.data[i].artist.name;
        // let albumImg = albumObj.data[i].album.cover;
        let duration = albumObj.data[i].duration;
        let albumID = albumObj.data[i].album.id;
        // let artistId = albumObj.data[i].artist.id;
        const trackMinutes = Math.floor(duration / 60);
        let trackSeconds = Math.round(duration - trackMinutes * 60);
        if (trackSeconds < 10) {
          trackSeconds = trackSeconds.toString();
          trackSeconds = `0` + trackSeconds;
        }
        // let rank = albumObj.data[i].rank;

        htmlString += `<div class="col">
        <a href="./albumPage.html?albumID=${albumID}">
          <div class="playlistsHome rounded d-flex gap-3">
            <img src="${albumObj.data[i].album.cover}" alt="" width="25%" class="rounded-start-2">
        
            <p class="playlistName">${albumObj.data[i].title}</p>
          </div>
        </a>
        </div>`;
      }
      containerAlbum.innerHTML = htmlString;
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
