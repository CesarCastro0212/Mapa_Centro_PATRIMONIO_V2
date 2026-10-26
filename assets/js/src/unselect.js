window.onbeforeunload = function(event){
  /**
   * Muestra/Oculta los marcadores que se encuentran dentro del
   * 'areaName'.
   * 
   * Leaflet ofrece su propio elemento que permite mostrar u ocultar los
   * grupos de marcadores. Este elemento se mostraría (se modificó para que
   * siempre esté oculto y no visible) al hacer hover sobre
   * el elemento 'a' con la clase 'leaflet-control-layers-toggle'. Este
   * control personalizado únicamente modifica por medio del DOM dicho 
   * elemento, activando y desactivando unos checkboxes en el control 
   * original, dependiendo de si el checkbox correspondiente a un área está
   * activado o no es que se muestra en el mapa. 'areaName' debe ser el
   * mismo nombre que se asignó en overlays.js para que funcione 
   * correctamente.
   */
  
  const inputs = controlLayers._layerControlInputs;
  var input;
  
  for (let i = inputs.length - 1; i >= 0; i--) {
    input = inputs[i];
    input.checked = false;
  }
  
  controlLayers._onInputClick();
};
