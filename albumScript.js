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
      const albumMinutes = Math.floor(albumObj.duration / 60);
      const albumSeconds = Math.round(albumObj.duration - albumMinutes * 60);

      const len = albumObj.tracks.data.length;
      for (let i = 0; i < len; i++) {
        let title = albumObj.tracks.data[i].title;
        let artistName = albumObj.tracks.data[0].artist.name;
        let duration = albumObj.tracks.data[0].duration;
        const trackMinutes = Math.floor(duration / 60);
        const trackSeconds = Math.round(duration - trackMinutes * 60);
        let rank = albumObj.tracks.data[i].rank;

        container.innerHTML = `<div class="col-3">
        <img src="${albumObj.cover_medium}" style="scale: 1.1" alt="">
        </div>
        <div class="col-8 offset-1 text-white"><h6 class="mt-5">Album</h6>
        <h1 class="albumName" style="font-size: 4rem;">${albumObj.title}</h1>
        <div>
        <img class="artistImg rounded-circle" src="${albumObj.artist.picture_small}" style="scale: 0.7" alt="">
        <span class="artistName">${albumObj.artist.name} &#8226</span>
        <span class="releaseYear">${albumObj.release_date} &#8226</span>
        <span class="songCount">${albumObj.nb_tracks} brani,</span>
        <span class="duration">${albumMinutes} min ${albumSeconds} sec.</span>
        </div>`;
        containerTrack.innerHTML = `<div class="col-1">
        <h6>${i + 1}</h6>
        </div>
        <div class="col-6">
        <h6 class="text-white">${title}</h6>
        <h6>${artistName}</h6>
        </div>
        <div class="col-4 ps-5">
        <h6>${rank}</h6>
        </div>
        <div class="col-1">
        <h6>${trackMinutes}:${trackSeconds}</h6>
        </div>`;
      }
    });
};
