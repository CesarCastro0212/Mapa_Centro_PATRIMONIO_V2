const grupoFacultades = L.layerGroup([dep, cns, ice, ea, csh]);

function collectLayerBounds(layer, bounds) {
  if (!layer) return;

  if (typeof layer.getBounds === "function") {
    try {
      const layerBounds = layer.getBounds();
      if (layerBounds && layerBounds.isValid()) {
        bounds.push(layerBounds);
      }
    } catch (error) {
      console.warn("No se pudieron obtener los límites del layer:", layer);
    }
    return;
  }

  if (typeof layer.getLatLng === "function") {
    const latlng = layer.getLatLng();
    if (latlng) {
      bounds.push(L.latLngBounds(latlng, latlng));
    }
    return;
  }

  if (typeof layer.getLayers === "function") {
    layer.getLayers().forEach((childLayer) => collectLayerBounds(childLayer, bounds));
  }
}

function zoomToVisibleLayers() {
  const bounds = [];

  map.eachLayer((layer) => {
    if (!map.hasLayer(layer) || layer._url) {
      return;
    }

    collectLayerBounds(layer, bounds);
  });

  if (bounds.length > 0) {
    const combinedBounds = bounds.reduce((accumulator, currentBounds) => accumulator.extend(currentBounds), L.latLngBounds(bounds[0]));
    map.fitBounds(combinedBounds.pad(0.18), {
      animate: true,
      duration: 0.8
    });
  }
}

// Botón para mostrar/ocultar todas las facultades
const boton = document.getElementById("toggle-facultades");

if (boton) {
  boton.addEventListener("click", () => {
    // console.log("HOLA", grupoFacultades)
    if (map.hasLayer(grupoFacultades)) {
      // Si ya están encendidas, simplemente apagarlas
      console.log("FACULTADES ADIOS")
      map.removeLayer(grupoFacultades);
    } else {
      // Antes de encender las facultades, apagar todos los pines activos directamente
      var todasLasCapas = [cns, csh, ea, ice, dependencias, emas, institutos, accesos];
      todasLasCapas.forEach(function (capa) {
        console.log("CAPA", capa);
        if (map.hasLayer(capa)) {
          // console.log("CAPA");
          map.removeLayer(capa);
        }
      });

      // Limpiar los submenús abiertos
      clearSubmenus();

      // Encender las geometrías de facultades
      map.addLayer(grupoFacultades);
    }

    closeMenuPanel();
    zoomToVisibleLayers();
  });
}
