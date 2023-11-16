fetchPlaylist();

const params = new URLSearchParams(window.location.search);
const albumID = params.get("albumID");
console.log("ALBUM ID: ", albumID);

const container = document.getElementById("albumInfo");
const containerTrack = document.getElementById("trackList");
const containerPlaylist = document.getElementById("playlistElenco");

// function timeChange(min, sec) {
//   document.getElementsByClassName("total-time").innerHTML = `min sec`;
// }

fetch("https://deezerdevs-deezer.p.rapidapi.com/album/" + albumID, {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f04c55fb80msh6fa1ef56e5bfc0bp1b81eejsn1dd6cba9b4bd",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
})
  .then(resp => resp.json())
  .then(albumObj => {
    const albumMinutes = Math.floor(albumObj.duration / 60);
    const albumSeconds = Math.round(albumObj.duration - albumMinutes * 60);

    container.innerHTML = `<div class="col-3">
      <img id="myImg" src="${albumObj.cover_medium}" style="scale: 1; width: -webkit-fill-available;" alt="" crossorigin="anonymous">
      </div>
      <div class="col-8 offset-1 text-white"><h6 class="mt-5">Album</h6>
      <h1 class="albumName" style="font-size: 4rem;">${albumObj.title}</h1>
      <div>
      <img class="artistImg rounded-circle" src="${albumObj.artist.picture_small}" style="scale: 0.7" alt="">
      <a style="text-decoration: none;
        color: white;" href="./artistPage.html?artistID=${albumObj.artist.id}"><span class="artistName">${albumObj.artist.name} &#8226</span></a>
      <span class="releaseYear">${albumObj.release_date} &#8226</span>
      <span class="songCount">${albumObj.nb_tracks} brani,</span>
      <span class="duration">${albumMinutes} min ${albumSeconds} sec.</span>
      </div>`;

    const len = albumObj.tracks.data.length;
    let htmlString = "";
    for (let i = 0; i < len; i++) {
      let title = albumObj.tracks.data[i].title;
      let artistName = albumObj.tracks.data[i].artist.name;
      let duration = albumObj.tracks.data[i].duration;
      let artistId = albumObj.tracks.data[i].artist.id;
      const trackMinutes = Math.floor(duration / 60);
      let trackSeconds = Math.round(duration - trackMinutes * 60);
      if (trackSeconds < 10) {
        trackSeconds = trackSeconds.toString();
        trackSeconds = `0` + trackSeconds;
      }
      let rank = albumObj.tracks.data[i].rank;

      htmlString += `<div class="row" style="align-items: center;">
        <div class="col-1">
        <h6>${i + 1}</h6>
        </div>
        <div class="col-6">
        <h6 class="text-white mt-2" style="text-overflow: ellipsis;white-space: nowrap;
        overflow: hidden;">${title}</h6>
        <a style="text-decoration: none;
        color: darkgray;" href="./artistPage.html?artistID=${artistId}"><h6 class="d-inline-block mb-3">${artistName}</h6></a>
        </div>
        <div class="col-4 ps-5">
        <h6>${rank}</h6>
        </div>
        <div class="col-1">
        <h6>${trackMinutes}:${trackSeconds}</h6>
        </div>
        </div>`;
    }
    containerTrack.innerHTML = htmlString;
  })
  .then(() => {
    const rgbToHex = (r, g, b) =>
      "#" +
      [r, g, b]
        .map(x => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("");

    rgbToHex(102, 51, 153); // #663399

    const colorThief = new ColorThief();
    const img = document.getElementById("myImg");
    const background = document.getElementById("dominant-bg");
    console.log(img);

    if (img.complete) {
      colorThief.getColor(img);
      console.log(colorThief.getColor(img));
      console.log("FIRST");
    } else {
      img.addEventListener("load", function () {
        const colorProfile = colorThief.getColor(img);
        const [r, g, b] = [...colorProfile];

        background.style.cssText = background.style.cssText.replace(
          "rgb(0, 0, 0)",
          rgbToHex(r, g, b)
        );
      });
    }
  });

const closeButton = document.querySelector(".fas.fa-times").parentElement;
const centralColumn = document.querySelector(".container-fluid .row .col-7");
const rightColumn = document.querySelector(".container-fluid .row .col-2");
const sideBarButton = document.getElementById("sidebarButton");
sideBarButton.onclick = () => {
  rightColumn.classList.remove("d-none");
  centralColumn.classList.remove("col-9");
  sideBarButton.classList.add("d-none");
};

closeButton.onclick = () => {
  rightColumn.classList.add("d-none");
  centralColumn.classList.add("col-9");
  sideBarButton.classList.remove("d-none");
};

async function fetchPlaylist() {
  try {
    const response = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/playlist/235`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "f04c55fb80msh6fa1ef56e5bfc0bp1b81eejsn1dd6cba9b4bd",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      }
    );
    const albumObj = await response.json();

    let playlistString = "";
    let playlistTitle = albumObj.title;
    playlistString += `<a href="./searchPage.html?artistID=rock"><li>${playlistTitle}</li></a>
    <a href="./searchPage.html?artistID=Eminem"><li>Eminem</li></a>
    <a href="./searchPage.html?artistID=Imagine+Dragons"><li>Imagine Dragons</li></a>
    <a href="./searchPage.html?artistID=Cold+Play"><li>Cold Play</li></a>
    <a href="./searchPage.html?artistID=Ed+Sheran"><li>Ed Sheran</li></a>
    <a href="./searchPage.html?artistID=Drake"><li>Drake</li></a>
    <a href="./searchPage.html?artistID=Ariana+Grande"><li>Ariana Grande</li></a>`;
    containerPlaylist.innerHTML = playlistString;
  } catch (error) {
    console.error("Error:", error);
  }
}

const colorThief = new ColorThief();
const img = document.querySelector("img");

// Make sure image is finished loading
if (img.complete) {
  colorThief.getColor(img);
} else {
  image.addEventListener("load", function () {
    colorThief.getColor(img);
  });
}
console.log(colorThief.getColor(img));

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

rgbToHex(102, 51, 153); // #663399