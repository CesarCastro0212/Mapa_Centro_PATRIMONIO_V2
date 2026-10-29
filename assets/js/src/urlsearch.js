// ─────────────────────────────────────────────────────────────────────────────
// URL PARAMS — Activación automática de marcadores por código corto
// ─────────────────────────────────────────────────────────────────────────────
// Uso: index.html?location=CHS
//      index.html?location=DER1
//
// El valor de "location" debe coincidir exactamente con la propiedad "code"
// definida en markers.js (mayúsculas, sin espacios ni caracteres especiales).
// Ejemplos de códigos válidos: CHS, CMS, CN, DER1, ARRON, FIL1 … PSI2
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  // Leer el parámetro ?location=CODIGO de la URL
  var urlParams = new URLSearchParams(window.location.search);
  var locationCode = urlParams.get("location");

  // Si no hay parámetro, no hacemos nada
  if (!locationCode || locationCode.trim() === "") return;

  // Normalizar: recortamos espacios y pasamos a MAYÚSCULAS para ser tolerantes
  locationCode = locationCode.trim().toUpperCase();

  /**
   * Busca en el índice de búsqueda la entrada cuyo "code" coincida
   * exactamente con el código proporcionado y la activa en el mapa.
   */
  function activateByCode(code) {
    // searchIndex es construido por search.js — esperamos a que esté listo
    if (!Array.isArray(searchIndex) || searchIndex.length === 0) {
      console.warn("[urlsearch] El índice de búsqueda aún no está listo. Reintentando...");
      setTimeout(function () { activateByCode(code); }, 200);
      return;
    }

    // Buscar por code (exacto, case-insensitive ya que normalizamos arriba)
    var entry = null;
    for (var i = 0; i < searchIndex.length; i++) {
      if (searchIndex[i].code && searchIndex[i].code.toUpperCase() === code) {
        entry = searchIndex[i];
        break;
      }
    }

    if (!entry) {
      console.warn("[urlsearch] No se encontró ningún marcador con el código: " + code);
      return;
    }

    console.log("[urlsearch] Activando marcador:", entry.name, "(" + entry.code + ")");

    // Reutilizar la función activateMarker de search.js
    // Esperar un tick para asegurar que el mapa esté completamente renderizado
    setTimeout(function () {
      activateMarker(entry);
    }, 300);
  }

  // Ejecutar cuando el DOM y los scripts estén listos
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      activateByCode(locationCode);
    });
  } else {
    activateByCode(locationCode);
  }
})();
