'use strict';

async function getData() {
    const countryName = document.getElementById("countryForm");
    let data = new FormData(countryName);
    let country = data.get("name");

    if (country.length < 2) {
        alert('name must be more than 2 symbols');
        countryName.reset();
    }

    const resp = await fetch('https://restcountries.eu/rest/v2/name/' + country);

    if (resp.ok) {
        var countryJSON = await resp.json();
        var countryData = new Country(
            countryJSON[0].name,
            countryJSON[0].capital,
            countryJSON[0].flag,
            countryJSON[0].currencies[0].name,
            countryJSON[0].region
        );
        let elem = createCountry(countryData);
        addCountry(elem);
    } else {
        alert("Error! Wrong country. Try again");
    }
    document.getElementById('countryForm').reset();
    document.getElementById('name').focus();
}

class Country{
    constructor(name, capital, flag, currencies, region) {
        this.name = name;
        this.capital = capital;
        this.flag = flag;
        this.currencies = currencies;
        this.region = region;
    }
}

function createCountry(countryData) {
    let elem = document.createElement('div');
    elem.innerHTML = `
    <br>
    <h1 align="center">Country: ${countryData.name}</h1>
    <br>
    <h2>Capital: ${countryData.capital}</h2>
    <br>
    <img src="${countryData.flag}" alt="flag">
    <br>
    <h2>Region: ${countryData.region}</h2>
    <br>
    <h2>Money: ${countryData.currencies}</h2>
    <br>
    <p><a href="https://www.google.com/search?q=${countryData.name}"  target="_blank">Google</a></p>
    <p><a href="https://ru.m.wikipedia.org/wiki/${countryData.name}" target="_blank">Wiki</a></p>
    <br>`;
    return elem;
}

function addCountry(elem) {
    document.getElementById("data").appendChild(elem);
}