//import './sass/main.scss';

import countryCardTpl from '../templates/country-card.hbs';
import API from '../js/api-service.js';

const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchForm: document.querySelector('.js-search-form')
}

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const searchQuery = form.elements.query.value;

    API.fetchCountries(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError)
        .finally(() =>
            form.reset()
        );
}

function createCards(country) {
    return country.map(countryCardTpl).join('');
}

function renderCountryCard(country) {
    const markup = createCards(country);
    refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
    alert('Что-то пошло не так!');
}



