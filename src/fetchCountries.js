//import './sass/main.scss';
import { readFileSync } from 'fs';
import countryCardTpl from './templates/country-card.hbs';

const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchForm: document.querySelector('.js-search-form')
}

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const searchQuery = form.elements.query.value;

    fetchCountry(searchQuery)
        .then(renderCountryCard)
        .catch(error => {
            console.log(error);
        });
}


function fetchCountry(countryName) {
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(response => {
            return response.json();
        });

}


function createCards(country) {
    return country.map(countryCardTpl).join('');
}

function renderCountryCard(country) {
    const markup = createCards(country);
    refs.cardContainer.innerHTML = markup;
}



