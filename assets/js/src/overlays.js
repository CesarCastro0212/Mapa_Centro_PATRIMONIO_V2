function generatePopupContent(featureProperties) {  
  return `<b>${featureProperties.name}</b> 
          <div>
            <button 
              type="button" 
              onclick='markerOnClick(${JSON.stringify(featureProperties.link)})' 
              class="btn-marker"
            >
              INFORMACIÓN
            </button> 
          </div>`;
}
function generatePopupContentAcces(featureProperties) {  
  return `<b>${featureProperties.name}</b> 
          <div>
            <button 
              type="button" 
              onclick='markerOnClick(${JSON.stringify(featureProperties.link)})' 
              class="btn-marker"
            >
               INFORMACIÓN
            </button> 
          </div>`;
}

// Grupos de marcadores, ahora con GeoJSON

// Hay que copiar esta parte para todas las áreas y cambiar los datos pertinentes,
// como los íconos.

var barrioHistoricoUniversitario = L.geoJSON(barrioHistoricoUniversitarioGeoJSON, {
  pointToLayer: function(feature, latlng) { 
    return L.marker(latlng, {icon: iconYELLOW})
            .bindPopup(
              generatePopupContent(feature.properties)
            );
  }
});
var corredorCarolino = L.geoJSON(corredorCarolinoGeoJSON, {
  pointToLayer: function(feature, latlng) { 
    return L.marker(latlng, {icon: iconBLUE})
            .bindPopup(
              generatePopupContent(feature.properties)
            );
  }
});
var corredorJesuita = L.geoJSON(corredorJesuitaGeoJSON, {
  pointToLayer: function(feature, latlng) { 
    return L.marker(latlng, {icon: iconRED})
            .bindPopup(
              generatePopupContent(feature.properties)
            );
  }
});
var corredorSanJose = L.geoJSON(corredorSanJoseGeoJSON, {
  pointToLayer: function(feature, latlng) { 
    return L.marker(latlng, {icon: iconGREEN})
            .bindPopup(
              generatePopupContent(feature.properties)
            );
  }
});
var corredorAnalco = L.geoJSON(corredorAnalcoGeoJSON, {
  pointToLayer: function(feature, latlng) { 
    return L.marker(latlng, {icon: iconPINK})
            .bindPopup(
              generatePopupContent(feature.properties)
            );
  }
});

//Marker ovelays
var overlays = {
  "Barrio Histórico Universitario": barrioHistoricoUniversitario,
  "Corredor Carolino": corredorCarolino,
  "Corredor Jesuita": corredorJesuita,
  "Corredor San José": corredorSanJose,
  "Corredor Analco": corredorAnalco,
}

var controlLayers = L.control.layers(null, overlays)
controlLayers.addTo(map);

