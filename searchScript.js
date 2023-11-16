fetchPlaylist();

form.onsubmit = function (e) {
  e.preventDefault();
  // let searchBar = document.getElementById("searchInput");
  let searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchInput.value}`;
  loadItems(searchUrl);
};

const container = document.getElementById("rowSearch");
const containerAlbum = document.getElementById("albumRow");
const containerPlaylist = document.getElementById("playlistElenco");
function loadItems(url) {
  fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f04c55fb80msh6fa1ef56e5bfc0bp1b81eejsn1dd6cba9b4bd",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
    }
  })
    .then((resp) => resp.json())
    .then((albumObj) => {
      const len = albumObj.data.length - 1;
      let htmlString = "";
      let albumhtml = "";
      for (let i = 0; i < 5; i++) {
        let title = albumObj.data[i].title;
        let artistName = albumObj.data[i].artist.name;
        let duration = albumObj.data[i].duration;
        let artistId = albumObj.data[i].artist.id;
        let artistImg = albumObj.data[i].artist.picture;
        let albumImg = albumObj.data[i].album.cover;
        const trackMinutes = Math.floor(duration / 60);
        let trackSeconds = Math.round(duration - trackMinutes * 60);
        if (trackSeconds < 10) {
          trackSeconds = trackSeconds.toString();
          trackSeconds = `0` + trackSeconds;
        }
        document.getElementById("textBrani").innerText = "Brani";
        document
          .getElementById("rowSearch")
          .classList.remove(
            "row-cols-2",
            "row-cols-sm-2",
            "row-cols-md-3",
            "row-cols-lg-4",
            "row-cols-xl-5",
            "row-cols-xxl-6"
          );

        htmlString += `<div class="row" style="align-items: center;">
        <div class="col-1">
        <img class="artistImg" style="width: -webkit-fill-available;" src="${albumImg}" style="scale: 0.7" alt="">
        </div>
        <div class="col">
        <h6 class="text-white" style="text-overflow: ellipsis;white-space: nowrap;
        overflow: hidden;">${title}</h6>
        <a style="text-decoration: none;
        color: darkgray;" href="./artistPage.html?artistID=${artistId}"><h6 class="d-inline-block">${artistName}</h6></a>
        </div>
        <div class="col-1">
        <h6>${trackMinutes}:${trackSeconds}</h6>
        </div>
        <div class="col-1">
        </div>
        </div>`;
        container.innerHTML = htmlString;

        albumhtml += `<div class="col cardArtist">
        <div class="card" style="background-color:#181818; height: 100%;">
          <img
            src="${artistImg}"
            class="card-img-top rounded-circle p-3"
            alt="Foto Artista"
          />
          <div class="card-body">
            <h5 class="artist-name text-white">${artistName}</h5>
            <p class="artist" style="color:#868686">Artista</p>
          </div>
        </div>
      </div>`;

        containerAlbum.innerHTML = albumhtml;
        document.getElementById("textAlbum").classList.remove("d-none");
        removeDuplicates();
      }
    });
}

function removeDuplicates() {
  let artistNamesDupe = document.getElementsByClassName("cardArtist");

  for (let i = 0; i < artistNamesDupe.length; i++) {
    for (let j = i + 1; j < artistNamesDupe.length; j++) {
      if (artistNamesDupe[i].textContent === artistNamesDupe[j].textContent) {
        artistNamesDupe[j].style.display = "none";
      }
    }
  }
}

async function fetchPlaylist() {
  try {
    const response = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/playlist/235`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "f04c55fb80msh6fa1ef56e5bfc0bp1b81eejsn1dd6cba9b4bd",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
        }
      }
    );
    const albumObj = await response.json();

    let playlistString = "";
    let playlistTitle = albumObj.title;
    playlistString += `<li>${playlistTitle}</li>`;
    containerPlaylist.innerHTML = playlistString;
  } catch (error) {
    console.error("Error:", error);
  }
}
