// ============================================================
// BLOQUEO DE ZOOM DE PÁGINA (solo permitir zoom en el mapa)
// ============================================================

/**
 * Bloquea el zoom con rueda del ratón (Ctrl+scroll) en elementos
 * que NO sean el mapa de Leaflet.
 */
function bloquearZoomFuera(e) {
    if (e.ctrlKey) {
        // Verificar si el evento ocurre dentro del contenedor del mapa
        var mapEl = document.getElementById('map');
        if (mapEl && mapEl.contains(e.target)) {
            return; // Está dentro del mapa: dejar que Leaflet lo maneje
        }
        e.preventDefault();
        e.stopPropagation();
    }
}

/**
 * Bloquea Ctrl++ / Ctrl+- / Ctrl+0 con teclado para que el navegador
 * no haga zoom de página fuera del mapa.
 */
function bloquearZoomTeclado(e) {
    if (e.ctrlKey || e.metaKey) {
        // Teclas: + (61 / 187), - (173 / 189), 0 (48), = (61)
        if ([61, 187, 173, 189, 48, 107, 109].indexOf(e.keyCode) > -1) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
}

/**
 * Bloquea el pinch-zoom táctil en elementos fuera del mapa.
 */
function bloquearZoomTactil(e) {
    if (e.touches && e.touches.length > 1) {
        var mapEl = document.getElementById('map');
        if (mapEl && mapEl.contains(e.target)) {
            return; // Dentro del mapa: permitir
        }
        e.preventDefault();
    }
}

// Activar bloqueos globales de zoom
document.addEventListener('wheel',       bloquearZoomFuera,   { passive: false, capture: true });
document.addEventListener('keydown',     bloquearZoomTeclado, { capture: true });
document.addEventListener('touchstart',  bloquearZoomTactil,  { passive: false, capture: true });
document.addEventListener('touchmove',   bloquearZoomTactil,  { passive: false, capture: true });

// ============================================================
// OCULTAMIENTO DEL GIF DE INTRODUCCIÓN
// ============================================================
setTimeout(() => {
    document.getElementById("zoomInGIF").style.display = "none";
}, 2500);