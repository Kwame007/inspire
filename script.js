"use strict";

// request class
const Request = class {
  // get method
  get(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => console.log(data.slip.advice))
      .catch((error) => console.log(error.message));
  }
};

// // UI class
// const UI = class extends Request {};
// const http = new Request();
// http.get("https://api.adviceslip.com/advice");
