// ─────────────────────────────────────────────────────────────────────────────
// DATOS GEOJSON DE ZONAS
// Prefijo _geo para evitar conflictos con las capas Leaflet de overlays.js
// ─────────────────────────────────────────────────────────────────────────────

const _geoInst = [{
  "type": "Feature",
  "properties": { "name": "Barrio Histórico Universitario" },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [-157.675781, 24.84695], [-8.525391, 23.527179],
      [-6.416016, 72.472217], [56.381836, 72.329666],
      [59.458008, 72.997075], [90.395508, 72.997075],
      [104.150391, 58.083184], [90, 43.074776],
      [99.931641, -0.425922], [157.763672, -1.567695],
      [157.851563, -41.896804], [55.634766, -43.002234],
      [54.84375, -63.223798], [34.277344, -63.342276],
      [34.101563, -68.029954], [22.5, -68.095589],
      [22.148438, -72.009119], [11.25, -72.009119],
      [11.425781, -68.2263], [-11.689453, -68.029954],
      [-11.162109, -57.223211], [-158.994141, -56.942352]
    ]]
  }
}];

const _geoCorredorCarolino = [
  {
    "type": "Feature",
    "properties": { "name": "Corredor Carolino" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
        [1.757813, 17.558947], [95.625, 17.475859],
        [95.800781, -0.532742], [89.472656, -16.813873],
        [76.464844, -38.002916], [1.757813, -38.134593],
        [1.757813, 17.558947]
      ]]
    }
  },
];

const _geoICE = [
  {
    "type": "Feature",
    "properties": { "name": "Corredor Jesuita" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
        [-147.392578, 19.069018], [1.054688, 18.145347],
        [1.054688, -5.535317], [-111.796875, -5.966374],
        [-111.928711, -53.698341], [-148.447266, -53.697637],
        [-147.392578, 19.069018]
      ]]
    }
  },
];

const _geoEA = [
  {
    "type": "Feature",
    "properties": { "name": "Corredor San José" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
        [25.224609, 70.407983], [92.373047, 70.377714],
        [102.480469, 57.933903], [88.066406, 43.122658],
        [94.394531, 18.138519], [24.257813, 18.225402],
        [25.224609, 70.407983]
      ]]
    }
  },
];

const _geoCSH = [
  {
    "type": "Feature",
    "properties": { "name": "Corredor Analco" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
        [97.910156, -6.493518], [157.060547, -6.492325],
        [157.060547, -28.466466], [84.814453, -28.382324],
        [97.910156, -6.493518]
      ]]
    }
  },
];

coords = [];

const equivalencias = {
  "cs": "ciencias",
  "cs.": "ciencias",
  "inst": "instituto",
  "inst.": "instituto",
  "i.": "instituto",
  "ing": "ingenieria",
  "ing.": "ingenieria",
  "caale": "len",
  "caale.": "len",
  "icuap1-2": "icuap1-4",
  "electronia": "fce8",
};


// 2) Normaliza pero deja espacios para tokenizar
function normalizarParaTokens(txt) {
  if (!txt) return "";
  return txt
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


// 3) Convierte en tokens y expande abreviaturas token-por-token
function tokensExpandidos(txt) {
  const normal = normalizarParaTokens(txt);
  if (!normal) return [];
  const tokens = normal.split(" ");
  return tokens.map(tok => equivalencias[tok] || tok);
}

// --- Nueva función para encontrar la mejor coincidencia ---
function encontrarMejorCoincidencia(nombreFeature) {
  const tokensFeature = tokensExpandidos(nombreFeature);
  console.log(tokensFeature);
  const sFeature = tokensFeature.join(" ");
  if (!sFeature) return null;

  let mejor = null;
  let mejorScore = 0;

  cnsGeoJSON.forEach(candidate => {
    const tokensCand = tokensExpandidos(candidate.properties?.name || "");
    const sCand = tokensCand.join(" ");
    if (!sCand) return;

    // 1) coincidencia exacta rápida
    if (sFeature === sCand) {
      mejor = candidate;
      mejorScore = 10; // score muy alto para elegir inmediatamente
      return;
    }

    // 2) cálculo de intersección / unión (Jaccard-like)
    const setF = new Set(tokensFeature);
    const setC = new Set(tokensCand);
    let comunes = 0;
    setF.forEach(t => { if (setC.has(t)) comunes++; });
    const unionSize = new Set([...tokensFeature, ...tokensCand]).size || 1;
    const jaccard = comunes / unionSize;

    // 3) check si candidato contiene todos los tokens del feature (superset)
    const candEsSuperset = tokensFeature.every(t => setC.has(t));
    // 4) check si feature contiene todos los tokens del candidato
    const featureEsSuperset = tokensCand.every(t => setF.has(t));

    // 5) score base y ajustes
    // preferimos jaccard, pero damos bonus si el candidato es superset (es más específico)
    let score = jaccard;
    if (candEsSuperset && tokensCand.length >= tokensFeature.length) score += 0.25; // candidato tiene tokens adicionales (es más específico)
    if (featureEsSuperset && tokensFeature.length > tokensCand.length) score -= 0.15; // candidato es muy genérico -> penalizar
    // romper empates favoreciendo candidatos con más tokens (más específicos)
    score += Math.min(0.15, tokensCand.length * 0.01);

    // guardamos mejor
    if (score > mejorScore) {
      mejorScore = score;
      mejor = candidate;
    }
  });

  // Umbral: requiere mínimo razonable de similitud para aceptar.
  // Ajusta este valor si detectas falsos positivos o demasiados "Sin información".
  const UMBRAL = 0.28;

  if (mejor && mejorScore >= UMBRAL) {
    // opcional: debug
    // console.log("Match:", nombreFeature, "->", mejor.properties.name, "score:", mejorScore);
    return mejor;
  }

  // si no alcanzó umbral, devolvemos null
  // console.log("No match (best):", nombreFeature, mejor?.properties?.name, mejorScore);
  return null;
}


// 4) Función de coincidencia inteligente basada en tokens
function coincideNombre(nombre1, nombre2) {
  const t1 = tokensExpandidos(nombre1);
  const t2 = tokensExpandidos(nombre2);

  if (t1.length === 0 || t2.length === 0) return false;

  // Si una cadena normalizada contiene a la otra, aceptamos rápido
  const s1 = t1.join(" ");
  const s2 = t2.join(" ");
  if (s1.includes(s2) || s2.includes(s1)) return true;

  // calcular intersección de tokens
  const set1 = new Set(t1);
  const set2 = new Set(t2);
  let common = 0;
  set1.forEach(w => { if (set2.has(w)) common++; });

  // Umbral: acepta si comparten al menos la mitad de los tokens del más pequeño
  const minLen = Math.min(t1.length, t2.length);
  const ratio = common / Math.max(1, minLen);

  // Ajusta este umbral si quieres ser más estricto (0.5 = 50%)
  return ratio >= 0.5;
}



// Expande abreviaturas o siglas dentro de un texto normalizado
function expandirAbreviaturas(txt) {
  let texto = normalizarTexto(txt);
  for (const [abreviatura, completo] of Object.entries(equivalencias)) {
    const regex = new RegExp(abreviatura, "gi");
    texto = texto.replace(regex, completo);
  }
  return texto;
}

var cns = L.geoJSON(_geoInst, {
  color: 'rgb(255, 255, 255)',
  fillColor: 'rgb(118, 183, 42)',
  fillOpacity: 0.35,
  weight: 1,
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng);
  },
  onEachFeature: function (feature, layer) {
    coords.push(feature.geometry.coordinates);
    layer.bindTooltip(feature.properties.name, {
      permanent: false,
      direction: "center",
      className: "nombre-facultad",
      permanent: true
    });
    if (feature.geometry.type !== "Point") {
      layer.bindPopup(generatePopupContent(feature.properties));
    }
    layer.on('click', function () {
      const match = cnsGeoJSON.find(f =>
        coincideNombre(f.properties.name, feature.properties.name)
      );

      if (match) {
        const popupHtml = generatePopupContent(match.properties);
        layer.bindPopup(popupHtml).openPopup();
      } else {
        layer.bindPopup(`<b>${feature.properties.name}</b><br>Sin información`).openPopup();
        console.warn("No match for:", feature.properties.name);
      }
    });


  }
});

var csh = L.geoJSON(_geoCSH, {
  color: 'rgb(255, 255, 255)',
  fillColor: 'rgb(230, 25, 131)',
  fillOpacity: 0.35,
  weight: 1,
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng);
  },
  onEachFeature: function (feature, layer) {
    coords.push(feature.geometry.coordinates);
    layer.bindTooltip(feature.properties.name, {
      permanent: false,
      direction: "center",
      className: "nombre-facultad",
      permanent: true
    });
    if (feature.geometry.type !== "Point") {
      layer.bindPopup(generatePopupContent(feature.properties));
    }
    layer.on('click', function () {
      const match = cshGeoJSON.find(f =>
        coincideNombre(f.properties.name, feature.properties.name)
      );

      if (match) {
        const popupHtml = generatePopupContent(match.properties);
        layer.bindPopup(popupHtml).openPopup();
      } else {
        layer.bindPopup(`<b>${feature.properties.name}</b><br>Sin información`).openPopup();
        console.warn("No match for:", feature.properties.name);
      }
    });
  }
});
var ea = L.geoJSON(_geoEA, {
  color: 'rgb(255, 255, 255)',
  fillColor: 'rgb(254, 205, 27)',
  fillOpacity: 0.35,
  weight: 1,
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng);
  },
  onEachFeature: function (feature, layer) {
    coords.push(feature.geometry.coordinates);
    layer.bindTooltip(feature.properties.name, {
      permanent: false,
      direction: "center",
      className: "nombre-facultad",
      permanent: true
    });
    if (feature.geometry.type !== "Point") {
      layer.bindPopup(generatePopupContent(feature.properties));
    }

    layer.on('click', function () {
      const match = eaGeoJSON.find(f =>
        coincideNombre(f.properties.name, feature.properties.name)
      );

      if (match) {
        const popupHtml = generatePopupContent(match.properties);
        layer.bindPopup(popupHtml).openPopup();
      } else {
        layer.bindPopup(`<b>${feature.properties.name}</b><br>Sin información`).openPopup();
        console.warn("No match for:", feature.properties.name);
      }
    });
  }
})
var ice = L.geoJSON(_geoICE, {
  color: 'rgb(255, 255, 255)',
  fillColor: 'rgb(237, 113, 2)',
  fillOpacity: 0.35,
  weight: 1,
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng);
  },
  onEachFeature: function (feature, layer) {
    coords.push(feature.geometry.coordinates);
    layer.bindTooltip(feature.properties.name, {
      permanent: false,
      direction: "center",
      className: "nombre-facultad",
      permanent: true
    });
    if (feature.geometry.type !== "Point") {
      layer.bindPopup(generatePopupContent(feature.properties));
    }

    layer.on('click', function () {
      const match = iceGeoJSON.find(f =>
        coincideNombre(f.properties.name, feature.properties.name)
      );

      if (match) {
        const popupHtml = generatePopupContent(match.properties);
        layer.bindPopup(popupHtml).openPopup();
      } else {
        layer.bindPopup(`<b>${feature.properties.name}</b><br>Sin información`).openPopup();
        console.warn("No match for:", feature.properties.name);
      }
    });
  }
});
var dep = L.geoJSON(_geoInst, {
  color: 'rgb(255, 255, 255)',
  fillColor: 'rgb(188, 188, 188)',
  fillOpacity: 0.35,
  weight: 1,
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng);
  },
  onEachFeature: function (feature, layer) {
    coords.push(feature.geometry.coordinates);
    layer.bindTooltip(feature.properties.name, {
      permanent: false,
      direction: "center",
      className: "nombre-facultad",
      permanent: true
    });
    if (feature.geometry.type !== "Point") {
      layer.bindPopup(generatePopupContent(feature.properties));
    }

    layer.on('click', function () {
      const match = institutosGeoJSON.find(f =>
        coincideNombre(f.properties.name, feature.properties.name)
      );

      if (match) {
        const popupHtml = generatePopupContent(match.properties);
        layer.bindPopup(popupHtml).openPopup();
      } else {
        layer.bindPopup(`<b>${feature.properties.name}</b><br>Sin información`).openPopup();
        console.warn("No match for:", feature.properties.name);
      }
    });
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// CAPAS LEAFLET DE ZONAS (polígonos semitransparentes)
// Nombres únicos para no colisionar con las capas de marcadores de overlays.js
// ─────────────────────────────────────────────────────────────────────────────

var zonaBarrio = L.geoJSON(_geoInst, {
  color: '#ffffff',
  weight: 2,
  fillColor: '#f5e12bff',
  fillOpacity: 0.35,
});

var zonaCarolino = L.geoJSON(_geoCorredorCarolino, {
  color: '#ffffff',
  weight: 2,
  fillColor: '#1eb0f3ff',
  fillOpacity: 0.35,
});

var zonaJesuita = L.geoJSON(_geoICE, {
  color: '#ffffff',
  weight: 2,
  fillColor: '#fa0f0fff',
  fillOpacity: 0.35,
});

var zonaSanJose = L.geoJSON(_geoEA, {
  color: '#ffffff',
  weight: 2,
  fillColor: '#35fe1bff',
  fillOpacity: 0.35,
});

var zonaAnalco = L.geoJSON(_geoCSH, {
  color: '#ffffff',
  weight: 2,
  fillColor: '#e61983',
  fillOpacity: 0.35,
});

// ─────────────────────────────────────────────────────────────────────────────
// API PÚBLICA: mapa de nombre → capa de zona y función de centrado
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Mapa de nombre de área (igual que en los botones del menú) → capa de zona Leaflet.
 */
var geometryPolygonMap = {
  "Barrio Histórico Universitario": zonaBarrio,
  "Corredor Carolino": zonaCarolino,
  "Corredor Jesuita": zonaJesuita,
  "Corredor San José": zonaSanJose,
  "Corredor Analco": zonaAnalco,
};

/**
 * Centra el mapa sobre los bounds de la capa de zona dada.
 * @param {L.GeoJSON} geoLayer
 */
function flyToGeometryLayer(geoLayer) {
  try {
    var bounds = geoLayer.getBounds();
    if (bounds && bounds.isValid()) {
      map.flyToBounds(bounds, { padding: [40, 40], animate: true, duration: 0.9 });
    }
  } catch (e) {
    console.warn("flyToGeometryLayer: bounds inválidos", e);
  }
}