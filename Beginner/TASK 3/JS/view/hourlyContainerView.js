import { weatherCodes } from "../config.js";

class HourlyContainerView {
  _parentElement = document.querySelector(".accordion");
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
    for (let i = 0; i < 11; i++) {
      markup += this._markupMakerHourly(i);
    }
    return markup;
  }
  _markupMakerHourly = function (num) {
    return `
        <div class="accordion-item">
        <h2 class="accordion-header" id="flush-heading${num + 1}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${
          num + 1
        }" aria-expanded="false" aria-controls="flush-collapse${num + 1}">
            ${this._data.date[num]} ${
      this._data.hour[num]
    } <span class="hourly-temp"><img src="./icons/${
      this._data.weatherCode[num]
    }.svg" alt="" srcset="" class="hourly-icon">${
      this._data.temperature[num]
    }&#176;C</span> 
        </button>
        </h2>
        <div id="flush-collapse${
          num + 1
        }" class="accordion-collapse collapse" aria-labelledby="flush-heading${
      num + 1
    }" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">The weather is ${
          weatherCodes[this._data.weatherCode[num]]
        } and feels ${this._data.feelsTemp[num]}&#176;C, relative humadity is ${
      this._data.humadity[num]
    }% and the cloud covers ${this._data.cloudCover[num]}% of the sky.</div>
        </div>
        </div>`;
  };
}
export default new HourlyContainerView();
