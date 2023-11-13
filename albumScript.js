const params = new URLSearchParams(window.location.search);
const albumID = params.get("albumID");
console.log("ALBUM ID: ", albumID);
window.onload = () => {
  const container = document.getElementById("albumInfo");
  const containerTrack = document.getElementById("trackList");

  fetch("https://deezerdevs-deezer.p.rapidapi.com/album/" + albumID, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f04c55fb80msh6fa1ef56e5bfc0bp1b81eejsn1dd6cba9b4bd",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(resp => resp.json())
    .then(albumObj => {
      container.innerHTML = `<div class="col-3">
      <img src="${albumObj.cover_medium}" style="scale: 1.1" alt="">
      </div>
      <div class="col-8 offset-1 text-white"><h5 class="mt-5">Album</h5>
      <h1 class="albumName" style="font-size: 4rem;">${albumObj.title}</h1>
      <div>
      <img class="artistImg rounded-circle" src="${albumObj.artist.picture_small}" style="scale: 0.7" alt="">
      <span class="artistName">${albumObj.artist.name} &#8226</span>
      <span class="releaseYear">${albumObj.release_date} &#8226</span>
      <span class="songCount">${albumObj.nb_tracks} brani,</span>
      <span class="duration">${albumObj.duration} sec.</span>
      </div>`;
      containerTrack.innerHTML = `<div class="col-1">
      <h6>${albumObj.tracks.data[1].id}</h6>
      </div>
      <div class="col-6">
      <h6 class="text-white">${albumObj.tracks.data[1].title}</h6>
      <h6>${albumObj.artist.name}</h6>
      </div>
      <div class="col-4">
      <h6>${albumObj.tracks.data[1].rank}</h6>
      </div>
      <div class="col-1">
      <h6>${albumObj.tracks.data[1].duration}</h6>
      </div>`;
    });
};
