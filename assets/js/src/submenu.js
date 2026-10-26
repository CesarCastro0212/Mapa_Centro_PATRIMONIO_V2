var button;
var activoGral = false;
var submenuBarrioHistoricoUniversitario = false;
var submenuCorredorCarolino = false;
var submenuCorredorJesuita = false;
var submenuCorredorSanJose = false;
var submenuCorredorAnalco = false;

/**
 * Centra el botón de área presionado dentro del panel de menú con un scroll suave.
 * Se llama tras abrir un submenú para que el usuario siempre vea las opciones.
 * @param {HTMLElement} btn - El botón que se presionó.
 */
function scrollToButton(btn) {
    if (!btn) return;
    setTimeout(function () {
        btn.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
}

function submenu(areaName){
    
    console.log(areaName);
    switch(areaName){
        case "Barrio Histórico Universitario":
            if(submenuBarrioHistoricoUniversitario == false){
                for(const facult of barrioHistoricoUniversitarioGeoJSON){
                    button = document.createElement("button");
                    button.setAttribute("class","subMenuYellow");
                    button.classList.add("subMenu"); // Este atributo se pierde, para añadir clases usa button.classList.add("classname")
                    let propiedades = facult["properties"];
                    button.innerText = propiedades["name"];
                    button.addEventListener("click",function(e){
                        map.eachLayer((layer) => {
                            if (layer._popup) {
                                popup_content = layer._popup._content;

                                // Si el contenido de los popup cambia, esto puede dejar de funcionar.
                                let name = popup_content.split("\n")[0];
                                name = name.substring(3, name.length - 5);

                                if(propiedades["name"] === name) {
                                    console.log(layer);
                                    // Cerrar menú y centrar mapa en el pin
                                    closeMenuAndFlyTo(layer._latlng);
                                    layer._popup.setLatLng(layer._latlng).openOn(map);
                                }                            
                            }
                        })
                    })
                    document.getElementById("submenuBarrioHistoricoUniversitario").appendChild(button);
                }
                submenuBarrioHistoricoUniversitario = true;
                document.getElementById("submenuCorredorCarolino").innerHTML = "";
                document.getElementById("submenuCorredorJesuita").innerHTML = "";
                document.getElementById("submenuCorredorSanJose").innerHTML = "";
                document.getElementById("submenuCorredorAnalco").innerHTML = "";
                // scrollToButton(document.querySelector(".control-layers-button-green"));
            }
            else{
                document.getElementById("submenuBarrioHistoricoUniversitario").innerHTML = "";
                
                submenuBarrioHistoricoUniversitario = false;
            }
        break;
        case "Corredor Carolino":
            if(submenuCorredorCarolino == false){
                for(const facult of corredorCarolinoGeoJSON){
                    button = document.createElement("button");
                    button.setAttribute("class","subMenuBlue");
                    button.classList.add("subMenu");
                    let propiedades = facult["properties"];
                    button.innerText = propiedades["name"];
                    button.addEventListener("click",function(e){
                        map.eachLayer((layer) => {
                            if (layer._popup) {
                                popup_content = layer._popup._content;

                                // Si el contenido de los popup cambia, esto puede dejar de funcionar.
                                let name = popup_content.split("\n")[0];
                                name = name.substring(3, name.length - 5);

                                if(propiedades["name"] === name) {
                                    console.log(layer);
                                    // Cerrar menú y centrar mapa en el pin
                                    closeMenuAndFlyTo(layer._latlng);
                                    layer._popup.setLatLng(layer._latlng).openOn(map);
                                }                            
                            }
                        })
                    })
                    document.getElementById("submenuCorredorCarolino").appendChild(button);
                }
                submenuCorredorCarolino = true;
                document.getElementById("submenuBarrioHistoricoUniversitario").innerHTML = "";
                document.getElementById("submenuCorredorJesuita").innerHTML = "";
                document.getElementById("submenuCorredorSanJose").innerHTML = "";
                document.getElementById("submenuCorredorAnalco").innerHTML = "";
                // scrollToButton(document.querySelector(".control-layers-button-pink"));
            }
            else{
                document.getElementById("submenuCorredorCarolino").innerHTML = "";
                submenuCorredorCarolino = false;
            }
        break;
        case "Corredor Jesuita":
            if(submenuCorredorJesuita == false){
                for(const facult of corredorJesuitaGeoJSON){
                    button = document.createElement("button");
                    button.setAttribute("class","subMenuRed");
                    button.classList.add("subMenu");
                    let propiedades = facult["properties"];
                    button.innerText = propiedades["name"];
                    button.addEventListener("click",function(e){
                        map.eachLayer((layer) => {
                            if (layer._popup) {
                                popup_content = layer._popup._content;

                                // Si el contenido de los popup cambia, esto puede dejar de funcionar.
                                let name = popup_content.split("\n")[0];
                                name = name.substring(3, name.length - 5);

                                if(propiedades["name"] === name) {
                                    console.log(layer);
                                    // Cerrar menú y centrar mapa en el pin
                                    closeMenuAndFlyTo(layer._latlng);
                                    layer._popup.setLatLng(layer._latlng).openOn(map);
                                }                            
                            }
                        })
                    })
                    document.getElementById("submenuCorredorJesuita").appendChild(button);
                }
                submenuCorredorJesuita = true;
                document.getElementById("submenuBarrioHistoricoUniversitario").innerHTML = "";
                document.getElementById("submenuCorredorCarolino").innerHTML = "";
                document.getElementById("submenuCorredorSanJose").innerHTML = "";
                document.getElementById("submenuCorredorAnalco").innerHTML = "";
                
                // scrollToButton(document.querySelector(".control-layers-button-yellow"));
            }
            else{
                document.getElementById("submenuCorredorJesuita").innerHTML = "";
                submenuCorredorJesuita = false;
            }
        break;
        case "Corredor San José":
            if(submenuCorredorSanJose == false){
                for(const facult of corredorSanJoseGeoJSON){
                    button = document.createElement("button");
                    button.setAttribute("class","subMenuGreen");
                    button.classList.add("subMenu");
                    let propiedades = facult["properties"];
                    button.innerText = propiedades["name"];
                    button.addEventListener("click",function(e){
                        map.eachLayer((layer) => {
                            if (layer._popup) {
                                popup_content = layer._popup._content;

                                // Si el contenido de los popup cambia, esto puede dejar de funcionar.
                                let name = popup_content.split("\n")[0];
                                name = name.substring(3, name.length - 5);

                                if(propiedades["name"] === name) {
                                    console.log(layer);
                                    // Cerrar menú y centrar mapa en el pin
                                    closeMenuAndFlyTo(layer._latlng);
                                    layer._popup.setLatLng(layer._latlng).openOn(map);
                                }                            
                            }
                        })
                    })
                    document.getElementById("submenuCorredorSanJose").appendChild(button);
                }
                submenuCorredorSanJose = true;
                document.getElementById("submenuBarrioHistoricoUniversitario").innerHTML = "";
                document.getElementById("submenuCorredorCarolino").innerHTML = "";
                document.getElementById("submenuCorredorJesuita").innerHTML = "";
                document.getElementById("submenuCorredorAnalco").innerHTML = "";
                // scrollToButton(document.querySelector(".control-layers-button-orange"));
            }
            else{
                document.getElementById("submenuCorredorSanJose").innerHTML = "";
                submenuCorredorSanJose = false;
            }
        break;
        case "Corredor Analco":
            if(submenuCorredorAnalco == false){
                for(const facult of corredorAnalcoGeoJSON){
                    button = document.createElement("button");
                    button.setAttribute("class","subMenuPink");
                    button.classList.add("subMenu");
                    let propiedades = facult["properties"];
                    button.innerText = propiedades["name"];
                    button.addEventListener("click",function(e){
                        map.eachLayer((layer) => {
                            if (layer._popup) {
                                popup_content = layer._popup._content;

                                // Si el contenido de los popup cambia, esto puede dejar de funcionar.
                                let name = popup_content.split("\n")[0];
                                name = name.substring(3, name.length - 5);

                                if(propiedades["name"] === name) {
                                    console.log(layer);
                                    // Cerrar menú y centrar mapa en el pin
                                    closeMenuAndFlyTo(layer._latlng);
                                    layer._popup.setLatLng(layer._latlng).openOn(map);
                                }                            
                            }
                        })
                    })
                    document.getElementById("submenuCorredorAnalco").appendChild(button);
                }
                submenuCorredorAnalco = true;
                document.getElementById("submenuBarrioHistoricoUniversitario").innerHTML = "";
                document.getElementById("submenuCorredorCarolino").innerHTML = "";
                document.getElementById("submenuCorredorJesuita").innerHTML = "";
                document.getElementById("submenuCorredorSanJose").innerHTML = "";
                // scrollToButton(document.querySelector(".control-layers-button-orange"));
            }
            else{
                document.getElementById("submenuCorredorAnalco").innerHTML = "";
                submenuCorredorAnalco = false;
            }
        break;
    }
    
}

/**
 * Cierra el menú lateral y anima el mapa hacia la ubicación del pin seleccionado.
 * @param {L.LatLng} latlng - Coordenadas del marcador destino.
 */
function closeMenuAndFlyTo(latlng) {
    // Cerrar el menú
    document.getElementById("control-overlay").className = "menu-hidden";
    menuAct = false;

    // Limpiar todos los submenús
    document.getElementById("submenuBarrioHistoricoUniversitario").innerHTML = "";
    document.getElementById("submenuCorredorCarolino").innerHTML = "";
    document.getElementById("submenuCorredorJesuita").innerHTML = "";
    document.getElementById("submenuCorredorSanJose").innerHTML = "";
    document.getElementById("submenuCorredorAnalco").innerHTML = "";    

    // Resetear flags de submenús
    submenuCSN = false;
    submenuCHS = false;
    submenuEA = false;
    submenuICE = false;
    submenuDEPENDENCIAS = false;
    submenuMULTIAULAS = false;
    submenuINSTITUTOS = false;
    submenuACCESOS = false;

    // Volar suavemente al pin en el mapa
    map.flyTo(latlng, map.getZoom(), {
        animate: true,
        duration: 0.8
    });
}

function prueba(nombre){
    console.log(nombre);
}