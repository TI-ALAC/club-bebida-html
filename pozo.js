var content3 = document.getElementById('contenido3');
var content4 = document.getElementById('contenido4');
var content5 = document.getElementById('contenido5');
var content7 = document.getElementById('contenido7');
var content6 = document.getElementById('contenido6');
var content8 = document.getElementById('contenido8');
var dat = document.getElementById('date');
var millon = document.getElementById('millones');
var title = document.getElementById('title1');
var Unidad = document.getElementById('pozoUnidad');

const idPanel = 1
const timedia = "ecuadordia"
const timenoche = "ecuadorNoche"

async function init() {
  const date = new Date();
  const hours = date.getHours(); // Obtener las horas sin conversión a string
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;
  
  console.log("time", time);

  const coord = await axios.get(`https://apialacooh.alacoohecuador.com/playlist/panel/${idPanel}`);
  var latitud = coord.data.data[0].point.coordinates[0];
  var longitud = coord.data.data[0].point.coordinates[1];
  const response = await axios.get(`https://weatherstation.alacoohperu.pe/api/clima/${latitud}/${longitud}`);
  const text_clima = response.data.data.weather[0].description;
  const datatemp = response.data.data.main.temp.toFixed(0);
  const result = datatemp.toString();
  const fecha = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateEs = fecha.toLocaleDateString('es-ES', options);
  const palabras = dateEs.split(",");
  const palabraDia = palabras[0][0].toUpperCase() + palabras[0].substr(1);
  const palabraFecha = palabras[1];
  const unir = palabraDia + "," + palabraFecha;
  document.getElementById('title1').innerHTML = result+'°';
  document.getElementById('date').innerHTML = time;
  document.getElementById('title2').innerHTML = result+'°';
  document.getElementById('date2').innerHTML = time;

  // Mostrar imágenes según el clima
  if (text_clima == 'niebla' || text_clima == 'muy nuboso' || text_clima == 'bruma' ) {
    content3.style.display = "block";
  } else if (text_clima == 'cielo claro' || text_clima == 'algo de nubes' || text_clima == 'nubes dispersas') {
    content4.style.display = "block";
  } else if (text_clima == 'lluvia ligera' || text_clima == 'tormenta con lluvia ligera' || text_clima == 'lluvia moderada') {
    content5.style.display = "block";
  } else if (text_clima == 'nubes') {
    content7.style.display = "block";
  }

  // Mostrar imágenes de día o de noche según la hora
  if (hours >= 12 && hours < 14) {
    content6.style.display = "block";
    document.getElementById("img-province-nublado").src = "img/" + timedia + "/nublado.jpg";
    document.getElementById("img-province-soleado").src = "img/" + timedia + "/Soleado.jpg";
    document.getElementById("img-province-lluvia").src = "img/" + timedia + "/lluvia.jpg";
    document.getElementById("img-province-parcialmentenublado").src = "img/" + timedia + "/parcialmentenublado.jpg";
  } else if (hours >= 17 && hours < 20) {
    content8.style.display = "block";
    document.getElementById("img-province-nublado").src = "img/" + timenoche + "/nublado.jpg";
    document.getElementById("img-province-soleado").src = "img/" + timenoche + "/Soleado.jpg";
    document.getElementById("img-province-lluvia").src = "img/" + timenoche + "/lluvia.jpg";
    document.getElementById("img-province-parcialmentenublado").src = "img/" + timenoche + "/parcialmentenublado.jpg";
  }
}

init();
