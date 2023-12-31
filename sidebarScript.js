const closeButton = document.getElementById("closeBtn");
const centralColumn = document.getElementById("centralCol");
const rightColumn = document.getElementById("rightCol");
const sideBarButton = document.getElementById("sidebarButton");
sideBarButton.onclick = () => {
  rightColumn.classList.remove("d-none");
  centralColumn.classList.remove("col-sm-9");
  centralColumn.classList.add("col-sm-7");
  sideBarButton.classList.add("d-md-none");
};

closeButton.onclick = () => {
  rightColumn.classList.add("d-none");
  centralColumn.classList.remove("col-sm-7");
  centralColumn.classList.add("col-sm-9");
  sideBarButton.classList.remove("d-md-none");
};
