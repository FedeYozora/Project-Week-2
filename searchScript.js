form.onsubmit = function (e) {
  e.preventDefault();
  // let searchBar = document.getElementById("searchInput");
  let searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchInput.value}`;
  loadItems(searchUrl);
};

const container = document.getElementById("rowSearch");
function loadItems(url) {
  fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f04c55fb80msh6fa1ef56e5bfc0bp1b81eejsn1dd6cba9b4bd",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(resp => resp.json())
    .then(albumObj => {
      const len = albumObj.data.length - 1;
      let htmlString = "";
      for (let i = 0; i < 6; i++) {
        let title = albumObj.data[i].title;
        let artistName = albumObj.data[i].artist.name;
        let duration = albumObj.data[i].duration;
        let artistId = albumObj.data[i].artist.id;
        let artistImg = albumObj.data[i].album.cover;
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
        <img class="artistImg" style="width: -webkit-fill-available;" src="${artistImg}" style="scale: 0.7" alt="">
        </div>
        <div class="col">
        <a onclick="timeChange(${(trackMinutes, trackSeconds)})"
         style="text-decoration: none;
        color: darkgray;" href="#"> 
        <h6 class="text-white" style="text-overflow: ellipsis;white-space: nowrap;
        overflow: hidden;">${title}</h6>
        <a style="text-decoration: none;
        color: darkgray;" href="./artistPage.html?artistID=${artistId}"><h6 class="d-inline-block">${artistName}</h6></a>
        </div>
        <div class="col-1">
        <h6>${trackMinutes}:${trackSeconds}</h6>
        </div>
        </div>
        </a>`;
      }
      container.innerHTML = htmlString;
    });
}
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
  // rightColumn.style.position = "unset";
  centralColumn.classList.add("col-9");
  sideBarButton.classList.remove("d-none");
};
