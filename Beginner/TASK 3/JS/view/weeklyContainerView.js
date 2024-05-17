import { weatherCodes } from "../config.js";

class WeeklyContainerView {
  _parentElement = document.querySelector(".weekly-container");
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
    let markup = "";
    for (let i = 0; i < 7; i++) {
      markup += this._markupMakerWeekly(i);
    }
    return markup;
  }
  _markupMakerWeekly = function (num) {
    return `
    <div class="content-box weekly-main-box">
      <h2 class="weekly-adress">${this._data.country}, ${this._data.city} ${this._data.date[num]}</h2>
      <div class="weekly-box">
      <div class="weekly-temp-box">
      <p class="day-night-weekly">DAY <br></p>
      <span class="day-night-temp-weekly">${this._data.dayTemp[num]}&#176; <br></span>
        <span class="feels-temp-weekly">${this._data.dayTempFeel[num]}&#176;</span>
        <span class="feels-weekly">feel</span>
        </div>
        <div class="weekly-temp-box">
        <p class="day-night-weekly">Night <br></p>
        <span class="day-night-temp-weekly">${this._data.nightTemp[num]}&#176; <br></span>
        <span class="feels-temp-weekly">${this._data.nightTempFeel[num]}&#176;</span>
        <span class="feels-weekly">feel</span>
        </div>
      <div class="weekly-icon-box">
      <img src="./icons/${this._data.weatherCode[num]}.svg" alt="" srcset="">
      </div>
      </div>
      <div class="weekly-box">
      <ul class="list-group-weekly">
      <li class="list-weekly ">Cloud cover: ${this._data.cloudCover[num]}%</li>
      <li class="list-weekly ">Rainy hours: ${this._data.rainyHours[num]}h</li>
        <li class="list-weekly ">Solar radiation: ${this._data.solarRadiation[num]}MJ/m² </li>
      </ul>
      <ul class="list-group-weekly">
      <li class="list-weekly ">Windgust: ${this._data.windGust[num]}km/h</li>
      <li class="list-weekly ">Windspeed: ${this._data.windSpeed[num]}km/h</li>
      <li class="list-weekly ">Wind direction: <img style="transform:rotate(-${this._data.windDirection[num]}deg)" src="./icons/arrow-wind-direction.svg" alt="" class="">
      </li>
      </ul>
      </div>
      </div> `;
  };
}
export default new WeeklyContainerView();
