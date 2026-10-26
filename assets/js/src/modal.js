var modal = document.getElementById("myModal");
var modalLevel = document.getElementById("modal-level");
var modalAcces = document.getElementById("modal-acces");
var modalCloseBtn = document.getElementsByClassName("modal-close")[0];
var modalCloseBtnImg = document.getElementsByClassName("modal-close-img")[0];
var modalCloseBtnAcces = document.getElementsByClassName("modal-close-acces")[0];

// markerOnClick abre el enlace en la misma pestaña y guarda la posición del mapa.
function markerOnClick(link) {
  if (link) {
    var center = map.getCenter();
    var zoom = map.getZoom();
    localStorage.setItem('mapLat', center.lat);
    localStorage.setItem('mapLng', center.lng);
    localStorage.setItem('mapZoom', zoom);
    window.location.href = link;
  }
}

function acces(featureProperties){
  console.log("acces")
  var srcImgAcces = featureProperties.botones[0]["nivel"];
  var urlRuta = featureProperties.ruta;
  var modalTitle = document.getElementsByClassName("title-acces")[0];  
  var nivelImgSrc = document.getElementById("acces");
  modalTitle.innerText = featureProperties.name;
  console.log(modalTitle);
  modalAcces.style.display = "block";
  nivelImgSrc.src = srcImgAcces;
  console.log(nivelImgSrc);
}

/*Close modal image*/
modalCloseBtnImg.addEventListener("click", function(evt) {
  modalLevel.style.display = "none";  
});
modalCloseBtnAcces.addEventListener("click", function(evt) {
  modalAcces.style.display = "none";
});

/*Close modal*/
modalCloseBtn.addEventListener("click", function(evt) {
  modal.style.display = "none";
});

window.onclick = function(event){
  if (event.target == modal){
    modal.style.display = "none";
  }
}