fetchPlaylist();

const params = new URLSearchParams(window.location.search);
const albumID = params.get("albumID");
console.log("ALBUM ID: ", albumID);

let albumStorageId;
let artistName;
let playPauseIntervalId;
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

    container.innerHTML = `<div class="col-8 col-sm-3">
      <img id="myImg" src="${albumObj.cover_medium}" style=width:100% alt="" crossorigin="anonymous">
      </div>
      <div class="col-8 offset-sm-1 text-white"><h6 class="mt-5 d-none d-sm-block">Album</h6>
      <p class="albumName fw-bold fs-1" >${albumObj.title}</p>
      <div>
      <img class="artistImg rounded-circle" src="${albumObj.artist.picture_small}" style="scale: 0.7" alt="">
      <a style="text-decoration: none;
        color: white;" href="./artistPage.html?artistID=${albumObj.artist.id}"><span class="artistName">${albumObj.artist.name} &#8226</span></a>
      <span class="releaseYear fs-6">${albumObj.release_date} &#8226</span>
      <span class="songCount fs-6">${albumObj.nb_tracks} brani,</span>
      <span class="duration fs-6">${albumMinutes} min ${albumSeconds} sec.</span>
      </div>`;

    albumStorageId = `${albumObj.title}.${albumObj.id}`;
    localStorage.setItem(albumStorageId, JSON.stringify(albumObj.tracks.data));

    const len = albumObj.tracks.data.length;
    artistName = albumObj.tracks.data[0].artist.name;
    let htmlString = "";
    for (let i = 0; i < len; i++) {
      const song = albumObj.tracks.data[i];
      const title = song.title;
      const artistName = song.artist.name;
      const duration = song.duration;
      const artistId = song.artist.id;
      const trackMinutes = Math.floor(duration / 60);
      let trackSeconds = Math.round(duration - trackMinutes * 60);
      if (trackSeconds < 10) {
        trackSeconds = trackSeconds.toString();
        trackSeconds = `0` + trackSeconds;
      }
      let rank = song.rank;

      htmlString += `<div class="row" style="align-items: center;">
        <div class="col-1">
        <h6>${i + 1}</h6>
        </div>
        <div class="col-5">
        <h6 class="text-white mt-2" style="text-overflow: ellipsis;white-space: nowrap;
        overflow: hidden;" onclick="play(event)">${title}</h6>
        <a style="text-decoration: none;
        color: darkgray;" href="./artistPage.html?artistID=${artistId}"><h6 class="d-inline-block mb-3">${artistName}</h6></a>
        </div>
        <div class="col-1" onclick="saveToLikedSongs(event)">
        <a href="#"><i id="${song.id}" class="fa-regular fa-heart mt-3 me-4 text-white"></i></a>
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

    getLikedSongs().map(song => song.id).forEach(id => {
      toggleLike(true, Array.from(containerTrack.children)
          .map(track => track.children[2].children[0].children[0])
          .find(item => id == item.id))
    })

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
    <a href="./searchPage.html?artistID=U2"><li>U2</li></a>
    <a href="./searchPage.html?artistID=Pokemon"><li>Pokemon</li></a>
    <a href="./searchPage.html?artistID=Michael+Jackson"><li>Michael Jackso</li></a>
    <a href="./searchPage.html?artistID=The+Weeknd"><li>The Weeknd</li></a>
    <a href="./searchPage.html?artistID=Billie+Eilish"><li>Billie Eilish</li></a>
    <a href="./searchPage.html?artistID=Rihanna"><li>Rihanna</li></a>
    <a href="./searchPage.html?artistID=Ariana+Grande"><li>Ariana Grande</li></a>`;
    containerPlaylist.innerHTML = playlistString;
  } catch (error) {
    console.error("Error:", error);
  }
}

const getLikedSongs = () => {
  return JSON.parse(localStorage.getItem("likedSongs"));
}

const getCurrentAlbum = () => {
  return JSON.parse(localStorage.getItem(albumStorageId));
}

const toggleLike = (active, icon) => {
  if (!active) {
    icon.classList.replace("fa-solid", "fa-regular")
    icon.classList.add("text-white");
    icon.style.cssText = "";
  } else {
    icon.classList.remove("text-white");
    icon.classList.replace("fa-regular", "fa-solid")
    icon.style.color = "green";
  }
}

const saveSong = (song) => {
  const savedSongs = getLikedSongs() ?? [];
  const songToAdd = {
    id: song.id,
    title: song.title,
    artistName: song.artist.name
  }

  if (savedSongs.find(song => song.id === songToAdd.id)) {
    savedSongs.splice(savedSongs.indexOf(songToAdd), 1);
    localStorage.setItem("likedSongs", JSON.stringify([...savedSongs]));
    return false;
  }

  localStorage.setItem("likedSongs", JSON.stringify([...savedSongs, songToAdd]));
  return true;
}

const saveToLikedSongs = (ev, ...songs) => {
  if (ev) {
    const songId = parseInt(ev.target?.id ?? ev.target.children[0].id);
    const song = getCurrentAlbum()?.find(song => song.id === songId);
    if (!song) {
      console.error("song not found. unable to save")
    }
    const saved = saveSong(song);
    toggleLike(saved, ev.target)
  }

  if (songs.length === 0) {
    return;
  }

  songs.forEach(saveSong)
}

const currentTime = document.querySelector(".current-time");
const totalTime = document.querySelector(".total-time");
const timeSlider = document.querySelector(".timeline-slider");

const parseTimeFromString = (timeString) => {
  return timeString.split(":").reduce((acc, time) => 60 * acc + +time);
};

const parseTimeToString = (time) => {
  return new Date(time * 1000).toISOString().substring(14, 19);
};

const updateTimeStamp = (prevValue) => {
  return setInterval(() => {
    const newValue = ++prevValue;
    currentTime.innerText = parseTimeToString(newValue);
    timeSlider.value = newValue;
  }, 1000);
};


const play = (event) => {
  const song = getCurrentAlbum().find(
      (song) => song.title === event.currentTarget.innerText
  );
  timeSlider.max = song.duration;
  totalTime.innerText = parseTimeToString(song.duration);
  playPauseIntervalId = updateTimeStamp(
      parseTimeFromString(currentTime.innerText)
  );
  const miniPlayer = document.getElementById("mini-player");
  const row = miniPlayer.children[0];
  row.children[0].children[0].src = song.album.cover;
  row.children[1].children[0].innerText = song.title;
  row.children[1].children[1].innerText = song.artist.name;
};
