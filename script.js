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
