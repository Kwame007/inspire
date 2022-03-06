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
  // protected variable {avialable on all instances}
  _totalResults;

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

    // select input
    let searchTerm = document.querySelector("#search");

    // set string value equals input value
    string = searchTerm.value;

    // clear input field
    searchTerm.value = "";

    // make request using search query
    this.get(`https://api.adviceslip.com/advice/search/${string}`)
      .then((data) => {
        // get total results
        const { total_results } = data;

        // assign total_results value to _totalResults
        this._totalResults = total_results;

        // check if data.message is true
        if (data?.message) {
          throw new Error(data.message.text);
        } else {
          // get advice based on random index
          this.slips(data.slips);
        }
      })
      .catch((error) => {
        // show error
        this.showError(`${error}`, "error");
        console.log(error);
      });
  }

  //slips method
  slips(...data) {
    // generate random number (btn 0 & and totalResults)
    let randomIndex = Math.floor(Math.random() * (+this._totalResults - 0) + 0);

    // loop through results
    data.forEach((res) => {
      // show in html

      // update advice id
      document.querySelector(".advice-title span").textContent =
        res[randomIndex].id;

      // update advice text
      document.querySelector(
        ".advice-text"
      ).textContent = ` " ${res[randomIndex].advice} "`;
    });
  }

  // show error
  showError(message, className) {
    setTimeout(() => {
      document.querySelector(".error").remove();
    }, 3000);
    return document
      .querySelector("main")
      .insertAdjacentHTML(
        "afterbegin",
        `<small class='${className}'>${message}</small>`
      );
  }
};

// instance of UI class
const getAdvice = new UI();
