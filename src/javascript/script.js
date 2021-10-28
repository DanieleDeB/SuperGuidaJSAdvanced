import "../css/style.css";

const api = {
  key: process.env.API_KEY,
  url: "https://api.waqi.info/",
};

/**LAST UPDATE OF THE PREVIOUS VALUE */
let o3T = document.querySelector(".last-update .o3-time");
let coT = document.querySelector(".last-update .co-time");
let so2T = document.querySelector(".last-update .s02-time");
let no2T = document.querySelector(".last-update .n02-time");
let pm10T = document.querySelector(".last-update .pm10-time");
let pm25T = document.querySelector(".last-update .pm25-time");

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  try {
    fetch(`${api.url}feed/${query}${api.key}`)
      .then((weather) => {
        return weather.json();
      })
      .then(displayResults);
  } catch {
    alert("City Not Found");
  }
}

function displayResults(weather) {
  try {
    fetch(
      `${api.url}feed/${weather.data.city.geo[0]};${weather.data.city.geo[1]}{api.key}`
    ).then((ap) => {
      return ap.json();
    });
  } catch {
    alert("Enter More Precise Location");
  }

  console.log("console.log(weather)");
  console.log(weather);

  let lat = document.getElementById("lat-value");
  lat.innerText = `${weather.data.city.geo[0]}`;
  let lon = document.getElementById("lon-value");
  lon.innerText = `${weather.data.city.geo[1]}`;

  let o3 = document.querySelector(".parameters-options .o3-value");
  o3.innerText = `${weather.data.iaqi.o3.v} µg/m³`;
  let co = document.querySelector(".parameters-options .co-value");
  co.innerText = `${weather.data.iaqi.co.v} µg/m³`;
  let so2 = document.querySelector(".parameters-options .so2-value");
  so2.innerText = `${weather.data.iaqi.so2.v} µg/m³`;
  let no2 = document.querySelector(".parameters-options .no2-value");
  no2.innerText = `${weather.data.iaqi.no2.v} µg/m³`;
  let pm10 = document.querySelector(".parameters-options .pm10-value");
  pm10.innerText = `${weather.data.iaqi.pm10.v} µg/m³`;
  let pm25 = document.querySelector(".parameters-options .pm25-value");
  pm25.innerText = `${weather.data.iaqi.pm25.v} µg/m³`;

  /**LAST UPDATE OF THE PREVIOUS VALUE */
  o3T.innerText = `${weather.data.debug.sync}`;
  coT.innerText = `${weather.data.debug.sync}`;
  so2T.innerText = `${weather.data.debug.sync}`;
  no2T.innerText = `${weather.data.debug.sync}`;
  pm10T.innerText = `${weather.data.debug.sync}`;
  pm25T.innerText = `${weather.data.debug.sync}`;

  /*DISPLAY THE CURRENT DATA OF THE LOCATION (not important at all)*/
  let date = new Date();
  let datenow = document.querySelector(".location .date");
  datenow.innerText = `${weather.data.time.s}`;
}
