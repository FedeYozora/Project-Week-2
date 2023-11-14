const closeButton = document.querySelector(".fas.fa-times").parentElement;
const centralColumn = document.querySelector(".container-fluid .row .col-7");
const rightColumn = document.querySelector(".container-fluid .row .col-2");
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
