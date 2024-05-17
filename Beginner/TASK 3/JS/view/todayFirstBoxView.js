import { weatherCodes } from "../config.js";

class TodayFirstBoxView {
  _parentElement = document.querySelector(".first-box");
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
    <h2 class="main-adress">${
      this._data.label ? this._data.label : this._data.country
    }</h2>
    <div class="content-main-box">
      <div class="main-degree-box">
        <span class="main-degree">${this._data.temperature}&#176;</span>
      </div>
      <div class="main-icon-box">
        <img class="main-icon" src="./icons/${
          this._data.weatherCode
        }.svg" alt="icons">
      </div>
      <div class="main-wheather-detail-box"> 
        <p class="main-wheather-detail">${
          weatherCodes[this._data.weatherCode]
        }</p>
      </div>
      <div class="main-daynight-box">
        <span class="main-daynight" >Day ${this._data.dayTemp}&#176; - Night ${
      this._data.nightTemp
    }&#176;</span>
      </div>
    </div>
    `;
  }
}
export default new TodayFirstBoxView();
