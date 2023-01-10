"use strict";

const searchbutton = document.querySelector(".search");
const SearchInput = document.querySelector(".search-input");
const container = document.querySelector(".cards-container");
const NContainer = document.querySelector(".neighbouring-countainer");

searchbutton.addEventListener("click", function () {
  const Inputvalue = SearchInput.value;
  SearchInput.value = "";
  getcountrydata(Inputvalue);
});

const renderHtml = function (data) {
  const html = `
  <div class="country-card">
    <div class="flag-image">
      <img class="flag-image"
        src="${data.flags.png}"
      />
    </div>
    <div class="Country-name-capital">
      <p id="name">${data.name.common}</p>
      <p class="Country-capital">${data.capital}</p>
    </div>
    <p class="population">👪 ${data.population.toFixed(1)} People</p>
    <p class="Language">🗺️ ${data.area.toFixed(1)} Sq Km</p>
    <p id="Currency">⏳ ${data.timezones[0]}</p>
  </div>
  `;
  container.insertAdjacentHTML("afterbegin", html);
};

const renderHtml2 = function (data) {
  const html = `
  <div class="neighbouring-countries">
  <p class="para">Neighbouring Country</p> 
  <div class="country-card">
    <div class="flag-image">
      <img class="flag-image"
        src="${data.flags.png}"
      />
    </div>
    <div class="Country-name-capital">
      <p id="name">${data.name.common}</p>
      <p class="Country-capital">${data.capital}</p>
    </div>
    <p class="population">👪 ${data.population.toFixed(1)} People</p>
    <p class="Language">🗺️ ${data.area.toFixed(1)} Sq Km</p>
    <p id="Currency">⏳ ${data.timezones[0]}</p>
  </div>
  </div>
  `;
  container.insertAdjacentHTML("afterbegin", html);
};

const getcountrydata = function (Inputvalue) {
  if (Inputvalue === "") {
    alert("Give the name of country first");
  }

  const getneighbourcountry = function (Neighbourvalue) {
    const request2 = new XMLHttpRequest();
    request2.open(
      "GET",
      `https://restcountries.com/v3.1/alpha/${Neighbourvalue}`
    );
    request2.send();
    request2.addEventListener("load", function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      renderHtml2(data);
    });
  };

  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${Inputvalue}`);
  request.send();
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderHtml(data);
    getneighbourcountry(`${data.borders[0]}`);
  });
};
