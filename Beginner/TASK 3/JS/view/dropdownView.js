class DropdownView {
  _parentElement = document.querySelector(".dropdown-menu");
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this.clear();
    this._parentElement.classList.add("active-dropdown");
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    if (this._parentElement.classList.contains("active-dropdown"))
      this._parentElement.classList.remove("active-dropdown");
    this._parentElement.innerHTML = "";
  }

  _generateMarkup() {
    let markup = "";
    for (let i = 0; i < this._data.length; i++) {
      markup += this._markupMakerHourly(i);
    }
    return markup;
  }
  _markupMakerHourly = function (num) {
    return `
        <li><a class="dropdown-item" lat = "${this._data[num].lat}" lng = "${this._data[num].lng}">${this._data[num].label}</a></li>
    `;
  };
}
export default new DropdownView();
