import dropdownView from "./view/dropdownView.js";
import {
  WHEATHER_DAILY_API_URL,
  WHEATHER_HOURLY_API_URL,
  GEOCODE_API_URL,
  GEOCODE_API_BY_IP_URL,
  REVERSE_GEOCODING_API_TIMEZONE,
} from "./config.js";

const search = document.querySelector(".search-input");

export const currentDate = function () {
  const now = new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const year = `${now.getFullYear()}`;
  const hour = `${now.getHours()}`.padStart(2, 0);
  const minute = `${now.getMinutes()}`.padStart(2, 0);
  return ` ${day}/${month}/${year}, ${hour}:${minute}`;
};
export let isLocal = true;
export const stateDaily = {
  lng: "",
  lat: "",
  label: "",
  continent: "",
  country: "",
  city: "",
  localTime: "",
  timezone: "",
  temperature: "",
  weatherCode: "",
  dayTemp: "",
  nightTemp: "",
  feels: "",
  sunrise: "",
  sunset: "",
  pressure: "",
  humidity: "",
  cloudCover: "",
  windGust: "",
  windSpeed: "",
  windDirection: "",
};

export const stateWeekly = {
  country: "",
  city: "",
  date: "",
  weatherCode: "",
  dayTemp: "",
  nightTemp: "",
  dayTempFeel: "",
  nightTempFeel: "",
  rainyHours: "",
  solarRadiation: "",
  cloudCover: "",
  windGust: "",
  windSpeed: "",
  windDirection: "",
};

export const stateHourly = {
  localTime: "",
  date: "",
  hour: "",
  temperature: "",
  weatherCode: "",
  feelsTemp: "",
  humadity: "",
  cloudCover: "",
};
// Search functionality

//search data object
export let stateSearch = [];

const getCityCord = async function (city) {
  try {
    const res = await fetch(GEOCODE_API_URL(city));
    if (!res.ok) throw new Error("problem");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const clearStateSearch = function () {
  stateSearch = [];
};

const searchFunction = function (e) {
  const text = e.target.value.toLowerCase();
  isLocal = false;
  dropdownView.clear();
  if (text.length > 2) {
    const getCord = async function () {
      try {
        // empty stateSearch object
        const { data } = await getCityCord(text);
        clearStateSearch();
        data.map((el) => {
          stateSearch.push({
            label: el.label,
            lat: el.latitude,
            lng: el.longitude,
          });
        });
        dropdownView.render(stateSearch);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(getCord, 400);
  }
};
search.addEventListener("input", searchFunction);

// funtion for spliting array into smaller pieces
Object.defineProperty(Array.prototype, "chunk", {
  value: function (chunkSize) {
    let R = [];
    for (let i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  },
});

// Position of user
const getPosition = function () {
  isLocal = true;
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const pos = await getPosition();
const { latitude: lat, longitude: lng } = pos.coords;
stateDaily.lat = lat;
stateDaily.lng = lng;
// Reverse geocoding function that returns data object
const geocodingAPI = async function (lat, lng) {
  try {
    const res = await fetch(REVERSE_GEOCODING_API_TIMEZONE(lat, lng));
    if (!res.ok) throw new Error("problem");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
// Function that accepts API and returns data object as JSON
const getJSON = function (url, errorMsg = "Something went wrong!!!") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// Main function
export const wheatherForecast = async function () {
  try {
    const dataIP = await geocodingAPI(stateDaily.lat, stateDaily.lng);
    // daily data
    if (isLocal) {
      stateDaily.country = dataIP.countryName + ", " + dataIP.city;
    }
    stateDaily.city = dataIP.city;
    stateDaily.localTime =
      +dataIP.timeZone.localTime.slice(11, 13) === 0
        ? 24
        : +dataIP.timeZone.localTime.slice(11, 13);
    stateDaily.timezone = dataIP.timeZone.ianaTimeId;
    stateDaily.continent = dataIP.timeZone.ianaTimeId.split("/")[0];
    // weekly data
    stateWeekly.country = dataIP.countryName;
    stateWeekly.city = dataIP.city;
    //Hourly data
    stateHourly.localTime = +dataIP.timeZone.localTime.slice(11, 13);

    const wheatherDaily = await WHEATHER_DAILY_API_URL(
      stateDaily.lat,
      stateDaily.lng,
      stateDaily.timezone
    );
    const wheatherHourly = await WHEATHER_HOURLY_API_URL(
      stateDaily.lat,
      stateDaily.lng
    );
    const data = await Promise.all([
      getJSON(wheatherDaily),
      getJSON(wheatherHourly),
    ]);
    // daily data
    stateDaily.dayTemp = Math.round(data[0].daily.temperature_2m_max[0]);
    stateDaily.nightTemp = Math.trunc(data[0].daily.temperature_2m_min[0]);
    stateDaily.sunrise = data[0].daily.sunrise[0].slice(11);
    stateDaily.sunset = data[0].daily.sunset[0].slice(11);
    stateDaily.feels = Math.round(
      data[1].hourly.apparent_temperature[stateDaily.localTime - 1]
    );
    stateDaily.cloudCover = data[1].hourly.cloudcover[stateDaily.localTime - 1];
    stateDaily.pressure = data[1].hourly.pressure_msl[stateDaily.localTime - 1];
    stateDaily.humidity =
      data[1].hourly.relativehumidity_2m[stateDaily.localTime - 1];
    stateDaily.temperature = Math.round(
      data[1].hourly.temperature_2m[stateDaily.localTime - 1]
    );
    stateDaily.weatherCode =
      data[1].hourly.weathercode[stateDaily.localTime - 1];
    stateDaily.windDirection =
      data[1].hourly.winddirection_10m[stateDaily.localTime - 1];
    stateDaily.windGust =
      data[1].hourly.windgusts_10m[stateDaily.localTime - 1];
    stateDaily.windSpeed =
      data[1].hourly.windspeed_10m[stateDaily.localTime - 1];

    // weekly data
    stateWeekly.date = data[0].daily.time.map(
      (el) => `${el.slice(8, 10)}/${el.slice(5, 7)}/${el.slice(0, 4)}`
    );
    stateWeekly.weatherCode = data[0].daily.weathercode;
    stateWeekly.dayTemp = data[0].daily.temperature_2m_max.map((el) =>
      Math.round(el)
    );
    stateWeekly.nightTemp = data[0].daily.temperature_2m_min.map((el) =>
      Math.round(el)
    );
    stateWeekly.dayTempFeel = data[0].daily.apparent_temperature_max.map((el) =>
      Math.round(el)
    );
    stateWeekly.nightTempFeel = data[0].daily.apparent_temperature_min.map(
      (el) => Math.round(el)
    );
    stateWeekly.rainyHours = data[0].daily.precipitation_hours;
    stateWeekly.solarRadiation = data[0].daily.shortwave_radiation_sum.map(
      (el) => Math.round(el)
    );
    stateWeekly.cloudCover = data[1].hourly.cloudcover
      .chunk(24)
      .map((a) => a.reduce((ac, x) => ac + Math.trunc(x / 24), 0));
    stateWeekly.windGust = data[0].daily.windgusts_10m_max.map((el) =>
      Math.round(el)
    );
    stateWeekly.windSpeed = data[0].daily.windspeed_10m_max.map((el) =>
      Math.round(el)
    );
    stateWeekly.windDirection = data[0].daily.winddirection_10m_dominant;

    // Hourly data
    stateHourly.date = data[1].hourly.time
      .slice(stateHourly.localTime + 1, stateHourly.localTime + 13)
      .map((el) => `${el.slice(8, 10)}/${el.slice(5, 7)}/${el.slice(0, 4)}`);
    stateHourly.hour = data[1].hourly.time
      .slice(stateHourly.localTime + 1, stateHourly.localTime + 13)
      .map((el) => el.slice(11, 16));
    stateHourly.temperature = data[1].hourly.temperature_2m.slice(
      stateHourly.localTime + 1,
      stateHourly.localTime + 13
    );
    stateHourly.weatherCode = data[1].hourly.weathercode.slice(
      stateHourly.localTime + 1,
      stateHourly.localTime + 13
    );
    stateHourly.feelsTemp = data[1].hourly.apparent_temperature.slice(
      stateHourly.localTime + 1,
      stateHourly.localTime + 13
    );
    stateHourly.humadity = data[1].hourly.relativehumidity_2m.slice(
      stateHourly.localTime + 1,
      stateHourly.localTime + 13
    );
    stateHourly.cloudCover = data[1].hourly.cloudcover.slice(
      stateHourly.localTime + 1,
      stateHourly.localTime + 13
    );
  } catch (err) {
    console.log(err);
  }
};
