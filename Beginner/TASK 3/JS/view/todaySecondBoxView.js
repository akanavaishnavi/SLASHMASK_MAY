import { weatherCodes } from "../config.js";

class TodaySecondBoxView {
  _parentElement = document.querySelector(".second-box");
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkup() {
    return `
        <div class="fells-sun-icons-container">
        <div class="feels-box">
            <p>Feels  <br> ${this._data.feels}&#176;</p>
        </div>
        <div class="sunrise-set-box">
            <div class="sunrise-box">
            <img src="./icons/sunrise-0.svg" alt="sunrise" class="sunrise-set sunrise-icons">
            <img src="./icons/sunset-0.svg" alt="sunset" class="sunrise-set sunrise-icons">
            </div>
            <div class="sunrise-box">
            <span class="sunrise-set sunrise-time"> ${this._data.sunrise}</span> 
            <span class="sunrise-set sunrise-time"> ${this._data.sunset}</span>
            </div>
        </div>
        </div>
        <ul class="list-group-daily daily-group1">
        <li class="list-daily">Pressure: ${this._data.pressure}hPa</li>
        <li class="list-daily">Humidity: ${this._data.humidity}%</li>
        <li class="list-daily">Cloud cover: ${this._data.cloudCover}% </li>
        </ul>
        <ul class="list-group-daily daily-group2">
        <li class="list-daily">Windgust: ${this._data.windGust}km/h</li>
        <li class="list-daily">Windspeed:  ${this._data.windSpeed}km/h</li>
        <li class="list-daily">Wind direction:   <img style="transform:rotate(-${this._data.windDirection}deg)" src="./icons/arrow-wind-direction.svg" alt="" class=""></li>
        </ul>`;
  }
}
export default new TodaySecondBoxView();
