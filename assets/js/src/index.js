// Restaurar posición del mapa si se regresó desde una página de información
var _savedLat = localStorage.getItem('mapLat');
var _savedLng = localStorage.getItem('mapLng');
var _savedZoom = localStorage.getItem('mapZoom');
var _initCenter = (_savedLat && _savedLng) ? [parseFloat(_savedLat), parseFloat(_savedLng)] : [0, 0];
var _initZoom = _savedZoom ? parseInt(_savedZoom) : 0;
localStorage.removeItem('mapLat');
localStorage.removeItem('mapLng');
localStorage.removeItem('mapZoom');

var map = L.map('map').setView(_initCenter, _initZoom);

L.tileLayer('assets/images/imgs/map/{z}/{x}/{y}.png', {
  continuousWorld: false,
  noWrap: true,
  minZoom: 1,
  maxZoom: 6,
}).addTo(map);