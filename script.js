"use strict";

// request class
const Request = class {
  constructor() {}
  // get method
  get(url) {
    return fetch(url).then((response) => response.json());
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

    // fetch advice on submit
    document
      .querySelector(".form")
      .addEventListener("submit", this._getAdviceOnSubmit.bind(this));
  }

  // fetch random advice
  //  {protected methods}
  _renderUI() {
    this.get("https://api.adviceslip.com/advice")
      .then((data) => {
        console.log(data.slip);
        const { id, advice } = data.slip;

        // show in html
        document.querySelector(".advice-title span").textContent = id;
        document.querySelector(".advice-text").textContent = ` " ${advice} "`;
      })
      .catch((error) => console.log(error.message));
  }

  // fetch random advice on button click
  _getAdvice() {
    this._renderUI();
  }

  // fetch advice onsubmit
  _getAdviceOnSubmit(event, string) {
    // prevent default form submit
    event.preventDefault();

    let searchTerm = document.querySelector("#search");

    // set string value equals input value
    string = searchTerm.value;

    // clear input field
    searchTerm.value = "";

    this.get(`https://api.adviceslip.com/advice/search/${string}`)
      .then((data) => {
        console.log(data);

        const { total_results: totalResults } = data;
        let randomIndex = Math.floor(Math.random() * (+totalResults - 0) + 0);

        const slips = function (...data) {
          data.forEach((res) => {
            // show in html
            document.querySelector(".advice-title span").textContent =
              res[randomIndex].id;
            document.querySelector(
              ".advice-text"
            ).textContent = ` " ${res[randomIndex].advice} "`;
          });
        };
        slips(data.slips);
      })
      .catch((error) => console.log(error.message));
  }
};

// instance of UI class
const getAdvice = new UI();
