form.onsubmit = function (e) {
  e.preventDefault();
  let searchBar = document.getElementById("searchInput");
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
      for (let i = 0; i < len; i++) {
        htmlString += `<div class="col">
        <div class="searchCard rounded ps-4">
          <p class="h5 fw-bold mt-3">Podcast</p>
          <div class="d-flex">
            <img src="${albumObj.data[i].album.cover}" alt="" width="100px">
          </div>
        </div>
      </div>`;
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
