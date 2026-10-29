//MARCADORES
// var marker = L.marker([28.700759, -38.847656], {
//   draggable: true,
// }).addTo(map);
// marker.bindPopup('LatLng Marker').openPopup();
// marker.on('dragend', function (e) {
//   marker.getPopup().setContent(marker.getLatLng().toString()).openOn(map);
// });

// Se debe repetir esta parte para cada área.
// La propiedad "code" es el identificador corto único que se usa en el
// parámetro URL ?location=CODIGO  (ej: ?location=CHS)
// Reglas: solo letras A-Z, dígitos y sin espacios ni caracteres especiales.

//BARRIO HISTÓRICO UNIVERSITARIO
var barrioHistoricoUniversitarioGeoJSON = [
  {
    "type": "Feature",
    "properties": {
      "code": "CMS",
      "name": 'Casa de Estudiantes Mujeres "Carmen Serdán" - CMS',
      "link": "https://plantafisica.buap.mx/content/casa-de-estudiantes-%C2%A0mujeres-carmen-serd%C3%A1n",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-14.765625, -20.607198]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "CHS",
      "name": 'Casa de Estudiantes Hombres "Serrano" - CHS',
      "link": "https://plantafisica.buap.mx/content/casa-de-estudiantes-%C2%A0hombres-serrano%C2%A0",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-19.511719, -25.403585]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "CN",
      "name": "Casa de Los Naranjos - CN",
      "link": "https://plantafisica.buap.mx/content/casa-de-los-naranjos",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-40.03418, -44.119142]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "DER1",
      "name": "Archivo de la Facultad de Derecho - DER1",
      "link": "https://plantafisica.buap.mx/content/archivo-de-la-facultad-de-derecho",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [25.092773, -67.348325]
    }
  },
];

//CORREDOR CAROLINO
var corredorCarolinoGeoJSON = [
  {
    "type": "Feature",
    "properties": {
      "code": "ARRON",
      "name": "Casa de Mangino / Edificio Arronte / Casa de los Cañones - ARRON",
      "link": "https://plantafisica.buap.mx/content/casa-de-mangino-edificio-arronte-casa-de-los-ca%C3%B1ones",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [43.330078, -2.723583]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "FIL1",
      "name": "Casa del Pueblo - FIL1",
      "link": "https://plantafisica.buap.mx/content/casa-del%C2%A0%C2%A0pueblo",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [68.994141, 2.811371]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "FIL2",
      "name": "Casa Flores Magón - FIL2",
      "link": "https://plantafisica.buap.mx/content/casa-flores-mag%C3%B3n",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [49.790039, -3.601142]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "FIL3",
      "name": "Casa Alfonso Reyes  - FIL3",
      "link": "https://plantafisica.buap.mx/content/casa-alfonso-reyes",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [46.757813, -3.074695]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "FIL4",
      "name": "Casa Sor Juana Inés de la Cruz. Edificio Helena Garro - FIL4",
      "link": "https://plantafisica.buap.mx/content/casa-sor-juana-in%C3%A9s-de-la-cruz",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [47.768555, -8.711359]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "FIL5",
      "name": "Casa Gabino Barreda - FIL5",
      "link": "https://plantafisica.buap.mx/content/casa-gabino-barreda",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [44.780273, -8.885072]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "FIL6",
      "name": "Casa de Don Juan Bosco - FIL6",
      "link": "https://plantafisica.buap.mx/content/casa-de-don-juan-bosco",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [50.185547, 3.162456]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "FIL7",
      "name": "Edificio Rosario Castellanos - FIL7",
      "link": "https://plantafisica.buap.mx/content/edificio-rosario-castellanos%C2%A0",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [46.560059, -8.819939]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "CM",
      "name": "Casa de los Muñecos - CM",
      "link": "https://plantafisica.buap.mx/content/casa-de-los-mu%C3%B1ecos-0",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [37.792969, 4.82826]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "ICS1",
      "name": "Casa Marcelino Presno - ICS1",
      "link": "https://plantafisica.buap.mx/content/casa-marcelino-presno",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [44.384766, 3.425692]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "ICS3",
      "name": "Antigua Real Aduana de Azogues - ICS3",
      "link": "https://plantafisica.buap.mx/content/antigua-real-aduana-de-azogues",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [69.65332, 8.102739]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "ICS4",
      "name": "Casa Amarilla - ICS4",
      "link": "https://plantafisica.buap.mx/content/casa-amarilla",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [66.665039, 13.624633]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "DIL",
      "name": "Antiguo Hotel de Diligencias / Casa de Vasconcelos - DIL",
      "link": "https://plantafisica.buap.mx/content/antiguo-hotel-de-diligencias-%C2%A0casa-de-vasconcelos%C2%A0",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [59.72168, 8.971897]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "CB",
      "name": "Casa de las Bóvedas - CB",
      "link": "https://plantafisica.buap.mx/content/casa-de-las-b%C3%B3vedas-1",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [63.808594, 4.127285]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "TRA",
      "name": "Casa del Traductor - TRA",
      "link": "https://plantafisica.buap.mx/content/casa-del-traductor",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [66.445313, 2.811371]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "TOL",
      "name": "Casa de los Toledo - TOL",
      "link": "https://plantafisica.buap.mx/content/casa-de-los-toledo",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [74.882813, 7.362467]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "CAR",
      "name": 'Edificio Carolino - CAR',
      "link": "https://plantafisica.buap.mx/content/edificio-carolino-1",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [66.005859, -7.972198]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "CAR-TEA",
      "name": 'Teatro Universitario "Ignacio Ibarra Mazarí" - CAR',
      "link": "https://plantafisica.buap.mx/content/teatro-universitario-ignacio-ibarra-mazar%C3%AD",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [68.466797, -2.462097]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "CAR-LAF",
      "name": 'Sala de Lectura de la Biblioteca Histórica  "José María Lafragua" - CAR',
      "link": "https://plantafisica.buap.mx/content/sala-de-lectura-de-la-biblioteca-hist%C3%B3rica-%C2%A0jos%C3%A9-mar%C3%ADa-lafragua",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [71.103516, -2.460181]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "CAR-GIM",
      "name": 'Gimnasio Edificio Carolino - CAR',
      "link": "",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [73.564453, -2.372346]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "PAL",
      "name": "Casa de la Palma / Casa del Gobernador Calderón - PAL",
      "link": "https://plantafisica.buap.mx/content/casa-de-la-palma-casa-del-gobernador-calder%C3%B3n",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [53.525391, -17.978733]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "MF",
      "name": "Casa María Fernanda - MF",
      "link": "https://plantafisica.buap.mx/content/casa-mar%C3%ADa-fernanda",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [39.375, -19.808054]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "MDC",
      "name": "Casa de Don Melchor de Covarrubias - MDC",
      "link": "",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [59.0625, -13.667338]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "PSI3",
      "name": "Anexo al Antiguo Colegio de San Jerónimo - PSI3",
      "link": "https://plantafisica.buap.mx/content/anexo-al-antiguo-colegio-de-san-jer%C3%B3nimo",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [63.28125, -14.604606]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "PSI4",
      "name": "Antiguo Colegio de San Jerónimo - PSI4",
      "link": "https://plantafisica.buap.mx/content/antiguo-colegio-de-san-jer%C3%B3nimo",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [66.928711, -13.750744]
    }
  },
];

var corredorJesuitaGeoJSON = [
  {
    "type": "Feature",
    "properties": {
      "code": "DCG",
      "name": " Casa 1 de la Dirección de Contabilidad General - DCG",
      "link": "https://plantafisica.buap.mx/content/casa-1-de-la-direcci%C3%B3n-de-contabilidad-general",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-134.516602, -43.099176]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "DCG1",
      "name": " Casa 2 de la Dirección de Contabilidad General - DCG1",
      "link": "https://plantafisica.buap.mx/content/casa-2-de-la-direcci%C3%B3n-de-contabilidad-general",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-135.131836, -46.313198]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "CG",
      "name": "Casa de la Contraloría General / Bufete Jurídico Gratuito - CG",
      "link": "https://plantafisica.buap.mx/content/casa-de-la-contralor%C3%ADa-general-%C2%A0bufete-jur%C3%ADdico-gratuito",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-135.175781, -51.99841]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "REI",
      "name": "Casa de la Reina - REI",
      "link": "https://plantafisica.buap.mx/content/casa-de-la-reina-0",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-87.802734, -2.986927]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "AH",
      "name": "Dirección General de Archivos - AH",
      "link": "https://plantafisica.buap.mx/content/direcci%C3%B3n-general-de-archivos-1",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-48.515625, -2.108899]
    }
  },
];

//CORREDOR SAN JOSÉ
var corredorSanJoseGeoJSON = [
  {
    "type": "Feature",
    "properties": {
      "code": "E14",
      "name": "Espacio 14 o Casa de  San José - E14",
      "link": "https://plantafisica.buap.mx/content/espacio-catorce",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [39.814453, 65.440002]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "FB",
      "name": "Fundación BUAP - FB",
      "link": "",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [93.779297, 66.160511]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "ICS2",
      "name": "Casa de las Culturas Contemporáneas - ICS2",
      "link": "https://plantafisica.buap.mx/content/casa-de-las-culturas-contempor%C3%A1neas-casa-de-los-arcos",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [39.023438, 54.876607]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "ICS5",
      "name": "Antiguo Convento de Santa Clara de Asís -Ex convento de las Clarisas - Casa del Libro Gilberto Bosques Saldívar - ICS5",
      "link": "https://plantafisica.buap.mx/content/antiguo-convento-de-santa-clara-de-as%C3%ADs-ex-convento-de-las-clarisas-casa-del-libro-gilberto",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [44.648438, 29.382175]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "DIE",
      "name": "Dirección de Infraestructura Educativa - DIE",
      "link": "https://plantafisica.buap.mx/content/direcci%C3%B3n-de-infraestructura-educativa-2",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [50.976563, 45.274886]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "ART1",
      "name": "Casa del Alguacil Mayor - ART1",
      "link": "https://plantafisica.buap.mx/content/casa-del-alguacil-mayor",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [73.828125, 40.446947]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "ART2",
      "name": "Casa de Rafel de Aguilar / 1° de Mayo - ART2",
      "link": "https://plantafisica.buap.mx/content/casa-de-rafel-de-aguilar-%C2%A01%C2%B0-de-mayo",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [75.058594, 48.400032]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "ART3",
      "name": "Casa del Capitán Munuera - ART3",
      "link": "https://plantafisica.buap.mx/content/casa-del%C2%A0%C2%A0capit%C3%A1n-munuera",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [75.498047, 25.878994]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "ART4",
      "name": "Casa de Don Atanacio Placeres - ART4",
      "link": "https://plantafisica.buap.mx/content/casa-de-don-atanacio-placeres",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [72.333984, 25.720735]
    }
  },
];

//CORREDOR ANALCO
var corredorAnalcoGeoJSON = [
  {
    "type": "Feature",
    "properties": {
      "code": "MMU",
      "name": "Museo de la Memoria Histórica Universitaria - MMU",
      "link": "https://plantafisica.buap.mx/content/museo-de-la-memoria-hist%C3%B3rica-universitaria-1",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [109.6875, -8.754795]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "CA",
      "name": "Casa Analco - CA",
      "link": "https://plantafisica.buap.mx/content/casa-analco-0",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [131.044922, -21.125498]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "PSI1",
      "name": "Edificio de Analco - PSI1",
      "link": "https://plantafisica.buap.mx/content/edificio-de-analco",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [149.765625, -15.623037]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "code": "PSI2",
      "name": "Edificio Silos - PSI2",
      "link": "https://plantafisica.buap.mx/content/edificio-silos",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [155.214844, -16.972741]
    }
  },
];