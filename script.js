"use strict";

// request class
const Request = class {
  constructor() {}
  // get method
  get(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.slip);
        const { id, advice } = data.slip;

        // show in html
        document.querySelector(".advice-title span").textContent = id;
        document.querySelector(".advice-text").textContent = ` " ${advice} "`;
      })
      .catch((error) => console.log(error.message));
  }
};

// UI class
const UI = class extends Request {
  constructor() {
    super();

    // fetch random advice on page load
    this._renderUI();

    // fetch random advice on page load
    document
      .querySelector(".advice-btn")
      .addEventListener("click", this._getAdvice.bind(this));
  }

  // fetch random advice
  //  {protected methods}
  _renderUI() {
    this.get("https://api.adviceslip.com/advice");
  }

  // fetch random advice on button click
  _getAdvice() {
    this._renderUI();
    console.log(this);
  }
};

const getAdvice = new UI();
