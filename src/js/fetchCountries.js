//import './sass/main.scss';
import debounce from 'lodash.debounce';
import countryCardTpl from '../templates/country-card.hbs';
import API from '../js/api-service.js';

const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchInput: document.querySelector('.js-search-input')
}
refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();

    //const input = e.target;
    //console.log(input);
    const searchQuery = refs.searchInput.value;

    API.fetchCountries(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError);
    // .finally(() => {
    //     searchQuery = "";
    // });
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



