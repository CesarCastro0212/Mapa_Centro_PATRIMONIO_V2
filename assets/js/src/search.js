// ─────────────────────────────────────────────────────────────────────────────
// BUSCADOR DE ESPACIOS PATRIMONIALES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Normaliza un texto: elimina acentos, convierte a minúsculas y quita
 * caracteres especiales, para permitir búsquedas tolerantes a errores
 * de escritura, mayúsculas y acentuación.
 * @param {string} str
 * @returns {string}
 */
function normalizeText(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Construye el índice de búsqueda unificado a partir de todos los GeoJSON.
 */
function buildSearchIndex() {
  var areaMap = [
    { geoJSON: barrioHistoricoUniversitarioGeoJSON, layer: barrioHistoricoUniversitario },
    { geoJSON: corredorCarolinoGeoJSON, layer: corredorCarolino },
    { geoJSON: corredorJesuitaGeoJSON, layer: corredorJesuita },
    { geoJSON: corredorSanJoseGeoJSON, layer: corredorSanJose },
    { geoJSON: corredorAnalcoGeoJSON, layer: corredorAnalco },
  ];

  var index = [];

  areaMap.forEach(function (item) {
    item.geoJSON.forEach(function (feature) {
      var name = feature.properties.name;
      var code = feature.properties.code || "";
      var coords = feature.geometry.coordinates;
      var latlng = L.latLng(coords[1], coords[0]);
      index.push({
        name: name,
        code: code,
        normalizedName: normalizeText(name),
        latlng: latlng,
        leafletLayer: item.layer,
      });
    });
  });
  console.log("index", index);
  return index;
}

var searchIndex = [];

/**
 * Encuentra hasta maxResults entradas que coincidan con la consulta.
 */
function querySearch(query, maxResults) {
  maxResults = maxResults || 3;
  if (!query || query.trim() === "") return [];
  var q = normalizeText(query);
  var results = [];
  for (var i = 0; i < searchIndex.length && results.length < maxResults; i++) {
    if (searchIndex[i].normalizedName.includes(q)) {
      results.push(searchIndex[i]);
    }
  }
  return results;
}

// ─────────────────────────────────────────────────────────────────────────────
// DOM del buscador
// ─────────────────────────────────────────────────────────────────────────────
var searchInput = document.getElementById("map-search-input");
var searchBtn = document.getElementById("map-search-btn");
var searchClearBtn = document.getElementById("map-search-clear");
var searchSuggestions = document.getElementById("map-search-suggestions");
var selectedSuggestionIndex = -1;

/**
 * Activa el marcador: asegura que su capa esté visible, vuela al pin y abre el popup.
 */
function activateMarker(entry) {
  // 1. Asegurarse de que la capa esté visible
  if (!map.hasLayer(entry.leafletLayer)) {
    entry.leafletLayer.addTo(map);
  }

  // 2. Volar suavemente al marcador
  var targetZoom = map.getZoom() < 4 ? 4 : map.getZoom();
  map.flyTo(entry.latlng, targetZoom, { animate: true, duration: 0.9 });

  // 3. Abrir el popup del marcador correspondiente
  entry.leafletLayer.eachLayer(function (layer) {
    if (layer._latlng &&
      Math.abs(layer._latlng.lat - entry.latlng.lat) < 0.0001 &&
      Math.abs(layer._latlng.lng - entry.latlng.lng) < 0.0001) {
      setTimeout(function () {
        layer._popup.setLatLng(layer._latlng).openOn(map);
      }, 950);
    }
  });

  // 4. Ocultar sugerencias y actualizar input
  hideSuggestions();
  searchInput.value = entry.name;
  showClearButton(true);

  // 5. Flash de éxito
  searchInput.classList.add("search-found");
  setTimeout(function () { searchInput.classList.remove("search-found"); }, 1500);
}

function renderSuggestions(results) {
  searchSuggestions.innerHTML = "";
  selectedSuggestionIndex = -1;

  if (results.length === 0) {
    hideSuggestions();
    return;
  }

  results.forEach(function (entry, idx) {
    var li = document.createElement("li");
    li.className = "search-suggestion-item";
    li.setAttribute("role", "option");

    var iconSpan = document.createElement("span");
    iconSpan.className = "suggestion-icon";
    iconSpan.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';

    var textSpan = document.createElement("span");
    textSpan.className = "suggestion-text";
    textSpan.textContent = entry.name;

    li.appendChild(iconSpan);
    li.appendChild(textSpan);

    (function (e) {
      li.addEventListener("mousedown", function (evt) {
        evt.preventDefault();
        activateMarker(e);
      });
    })(entry);

    searchSuggestions.appendChild(li);
  });

  searchSuggestions.style.display = "block";
}

function hideSuggestions() {
  searchSuggestions.style.display = "none";
  searchSuggestions.innerHTML = "";
  selectedSuggestionIndex = -1;
}

function showClearButton(visible) {
  searchClearBtn.style.display = visible ? "flex" : "none";
}

function updateKeyboardSelection(newIndex) {
  var items = searchSuggestions.querySelectorAll(".search-suggestion-item");
  if (items.length === 0) return;
  items.forEach(function (el) { el.classList.remove("search-suggestion-active"); });
  selectedSuggestionIndex = newIndex;
  if (newIndex >= 0 && newIndex < items.length) {
    items[newIndex].classList.add("search-suggestion-active");
    items[newIndex].scrollIntoView({ block: "nearest" });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// EVENTOS
// ─────────────────────────────────────────────────────────────────────────────

searchInput.addEventListener("input", function () {
  var val = searchInput.value;
  showClearButton(val.length > 0);
  if (val.trim().length === 0) { hideSuggestions(); return; }
  renderSuggestions(querySearch(val, 3));
});

searchInput.addEventListener("keydown", function (e) {
  var items = searchSuggestions.querySelectorAll(".search-suggestion-item");

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (items.length > 0) updateKeyboardSelection(selectedSuggestionIndex < items.length - 1 ? selectedSuggestionIndex + 1 : 0);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (items.length > 0) updateKeyboardSelection(selectedSuggestionIndex > 0 ? selectedSuggestionIndex - 1 : items.length - 1);
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (selectedSuggestionIndex >= 0 && items[selectedSuggestionIndex]) {
      items[selectedSuggestionIndex].dispatchEvent(new Event("mousedown"));
    } else {
      var results = querySearch(searchInput.value, 1);
      if (results.length > 0) {
        activateMarker(results[0]);
      } else {
        searchInput.classList.add("search-notfound");
        document.getElementById("map-search-box").classList.add("search-shake");
        setTimeout(function () {
          searchInput.classList.remove("search-notfound");
          document.getElementById("map-search-box").classList.remove("search-shake");
        }, 600);
      }
    }
  } else if (e.key === "Escape") {
    hideSuggestions();
    searchInput.blur();
  }
});

searchInput.addEventListener("blur", function () {
  setTimeout(hideSuggestions, 150);
});

searchBtn.addEventListener("click", function () {
  var results = querySearch(searchInput.value, 1);
  if (results.length > 0) {
    activateMarker(results[0]);
  } else {
    searchInput.classList.add("search-notfound");
    document.getElementById("map-search-box").classList.add("search-shake");
    setTimeout(function () {
      searchInput.classList.remove("search-notfound");
      document.getElementById("map-search-box").classList.remove("search-shake");
    }, 600);
    searchInput.focus();
  }
});

searchClearBtn.addEventListener("click", function () {
  searchInput.value = "";
  hideSuggestions();
  showClearButton(false);
  searchInput.focus();
});

// Impedir que eventos del buscador lleguen al mapa
(function () {
  var searchBox = document.getElementById("map-search-box");
  if (!searchBox) return;
  ["click", "dblclick", "mousedown", "wheel", "touchstart", "touchmove", "touchend"].forEach(function (evtName) {
    searchBox.addEventListener(evtName, function (e) { e.stopPropagation(); }, { passive: true });
  });
})();

// ─────────────────────────────────────────────────────────────────────────────
// INICIALIZACIÓN
// ─────────────────────────────────────────────────────────────────────────────
if (document.readyState !== "loading") {
  searchIndex = buildSearchIndex();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    searchIndex = buildSearchIndex();
  });
}
