import * as module from "./module.js";
import todayFirstBoxView from "./view/todayFirstBoxView.js";
import todaySecondBoxView from "./view/todaySecondBoxView.js";
import weeklyContainerView from "./view/weeklyContainerView.js";
import hourlyContainerView from "./view/hourlyContainerView.js";

const btnDegrees = document.querySelectorAll(".degree-symbol");
const btnCelcius = document.getElementById("celcius");
const btnFahrenheit = document.getElementById("fahrenheit");
const btnChangeBars = document.querySelectorAll(".bar");
const btnHourly = document.querySelector(".btn-hourly");
const btnToday = document.querySelector(".btn-today");
const btnweekly = document.querySelector(".btn-weekly");
const currentLocationContainer = document.querySelector(".current-location");
const currentDateContainer = document.querySelector(".current-date");
const todayContainer = document.querySelector(".today-container");
const weeklyContainer = document.querySelector(".weekly-container");
const hourlyContainer = document.querySelector(".hourly-container");
const allContentContainers = document.querySelectorAll(".content-container");
const search = document.querySelector(".search-input");
const btnSearch = document.querySelector(".btn-search");
const dropdownBox = document.querySelector(".dropdown-menu");

//Degree buttons change effect
btnDegrees.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (btn.classList.contains("switch-degree-btn")) return;
    btnDegrees.forEach((btn) => btn.classList.toggle("switch-degree-btn"));
  })
);
// Container buttons change effect
btnChangeBars.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (btn.classList.contains("bar-switch")) return;
    btnChangeBars.forEach((btn) => btn.classList.remove("bar-switch"));
    btn.classList.add("bar-switch");
  })
);

// Adding Containers hidden class
btnToday.addEventListener("click", function () {
  if (!todayContainer.classList.contains("hidden")) return;
  allContentContainers.forEach((el) => el.classList.add("hidden"));
  todayContainer.classList.remove("hidden");
});

btnweekly.addEventListener("click", function () {
  if (!weeklyContainer.classList.contains("hidden")) return;
  allContentContainers.forEach((el) => el.classList.add("hidden"));
  weeklyContainer.classList.remove("hidden");
});

btnHourly.addEventListener("click", function () {
  if (!hourlyContainer.classList.contains("hidden")) return;
  allContentContainers.forEach((el) => el.classList.add("hidden"));
  hourlyContainer.classList.remove("hidden");
});

//Date and Time rendered
const showUpdateTime = function () {
  const markup = `
  <span> ${module.currentDate()} </span>
  `;
  currentDateContainer.innerHTML = "";
  currentDateContainer.insertAdjacentHTML("afterbegin", markup);
};
showUpdateTime();
setInterval(showUpdateTime, 1000);

const showWeather = async function () {
  try {
    await module.wheatherForecast();
    const dailyData = module.stateDaily;
    const weeklyData = module.stateWeekly;
    const hourlyData = module.stateHourly;

    // current country container
    const renderNavLocal = function () {
      currentLocationContainer.innerHTML = "";
      const markup = `
      <span>${dailyData.country}</span>
      `;
      currentLocationContainer.insertAdjacentHTML("afterbegin", markup);
    };
    renderNavLocal();
    // Today firts container
    todayFirstBoxView.render(dailyData);

    // Today second container
    todaySecondBoxView.render(dailyData);

    // //Weekly Container
    weeklyContainerView.render(weeklyData);

    // Reveal weekly box
    const allWeeklyBoxes = document.querySelectorAll(".weekly-main-box");

    const revealBoxes = function (entries, observer) {
      const [entry] = entries;

      if (!entry.isIntersecting) return;

      entry.target.classList.remove("hidden-weekly-box");
      observer.unobserve(entry.target);
    };
    const weeklyBoxObserver = new IntersectionObserver(revealBoxes, {
      root: null,
      threshold: 0.15,
    });

    allWeeklyBoxes.forEach(function (box) {
      weeklyBoxObserver.observe(box);
      box.classList.add("hidden-weekly-box");
    });

    // Hourly Container
    hourlyContainerView.render(hourlyData);
  } catch (err) {
    alert(err);
  }
};
showWeather();

//After Search
dropdownBox.addEventListener("click", function (e) {
  const clicked = e.target;
  if (!clicked) return;

  module.stateDaily.lat = clicked.getAttribute("lat");
  module.stateDaily.lng = clicked.getAttribute("lng");
  module.stateDaily.label = clicked.innerHTML;
  dropdownBox.classList.remove("active-dropdown");
  search.value = "";
  showWeather();
});

//
