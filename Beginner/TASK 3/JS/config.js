export const WHEATHER_DAILY_API_URL = function (lat, lng, timezone) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum&timezone=${timezone}`;
};
export const WHEATHER_HOURLY_API_URL = function (lat, lng) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,pressure_msl,weathercode,cloudcover,windspeed_10m,winddirection_10m,windgusts_10m,soil_temperature_6cm,soil_moisture_3_9cm`;
};
export const GEOCODE_API_URL = function (city) {
  return `http://api.positionstack.com/v1/forward?access_key=1ecc74fc50e4b04c284b0b718ca84c6d&query=${city}`;
};
export const GEOCODE_API_BY_IP_URL =
  "https:api.bigdatacloud.net/data/ip-geolocation-with-confidence?ip=81.214.126.173&localityLanguage=en&key=6f9a7317cdff4289b58fbd5071997b4e";

export const REVERSE_GEOCODING_API_TIMEZONE = function (lat, lng) {
  return `https://api.bigdatacloud.net/data/reverse-geocode-with-timezone?latitude=${lat}&longitude=${lng}&localityLanguage=en&key=6f9a7317cdff4289b58fbd5071997b4e`;
};

export const weatherCodes = {
  0: "Clear",
  1: "Sunny",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  56: "Cold drizzle",
  57: "Cold drizzle",
  61: "Light Rainy",
  63: "Rainy",
  65: "Heavy rain",
  66: "Cold rain",
  67: "Cold rain",
  71: "Snow",
  73: "Snow",
  75: "Snow fall",
  77: "Snow grains",
  80: "Rainy",
  81: "Rainy",
  82: "Heavy rain",
  85: "Snow",
  86: "Snow fall",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};
