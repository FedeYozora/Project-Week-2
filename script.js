const closeButton = document.querySelector(".fas.fa-times").parentElement;
const sideBarButton = document.createElement("button");
const centralColumn = document.querySelector(".container-fluid .row .col-7");
const rightColumn = document.querySelector(".container-fluid .row .col-2");
sideBarButton.style.display = "none"
sideBarButton.onclick = () => {
    rightColumn.classList.remove("d-none");
    centralColumn.classList.remove("col-9");
    sideBarButton.classList.add("d-none")
    
}

closeButton.onclick = () => {
   
    rightColumn.classList.add("d-none");
    centralColumn.classList.add("col-9");
    sideBarButton.style.display = "unset"
    centralColumn.appendChild(sideBarButton);
    
    
   
}
