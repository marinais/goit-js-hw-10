import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box")
const countryListEl = document.querySelector(".country-list")
const countryInfoEl = document.querySelector(".country-info")


const createCountryDescription = ({name, capital, flags, population, languages,}) => 
`<h2 class="title-contry-name">
<img src=${flags.svg} alt="flag" width="40" height="30" class="country-flag">
<p>${name.official}</p>
</h2>
<p class"country-ingo"><b>Capital: </b>${capital}</p>
<p class"country-ingo"><b>Population: </b>${population}</p>
<p class"country-ingo"><b>Languages: </b>${Object.values(languages).join(", ")}</p>`


const generateCountryDiscription = (array) => array?.reduce((acc, item) => acc + createCountryDescription(item), "")

const insertCountryDiscription = (array) => {
    const result = generateCountryDiscription(array)
     countryInfoEl.insertAdjacentHTML("beforeend", result)
     

}




const createListOfCountries = ({name, flags,}) => 
    `<li class="item">
    <img src=${flags.svg} alt="flag" width="40" height="30" class="country-flag">
    <h2 class="country-name">${name.official}</h2>
    </li>`  


const generateListOfCountries = (array) => array?.reduce((acc, item) => acc + createListOfCountries(item), "")


const insertCountryList = (array) => {
    const result = generateListOfCountries(array)
    countryListEl.insertAdjacentHTML("beforeend", result)

}


inputEl.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY))

function searchCountry() {
    // e.preventDefault()

    const selectedCountry = inputEl.value.trim()

    if (selectedCountry === "") {
        countryListEl.innerHTML = ""
        countryInfoEl.innerHTML = ""
        return  
    }
    fetchCountries(selectedCountry)
        .then(country => currentDataInput(country))
        .catch(error => { Notify.failure("Oops, there is no country with that name") })

}

function currentDataInput(country) {
    countryListEl.innerHTML = ""
    countryInfoEl.innerHTML = ""
    if (country.length > 10) {
        return Notify.info("Too many matches found. Please enter a more specific name.")
    }
    else if (country.length >= 2 && country.length <= 10) {
        return insertCountryList(country)
    }
    else {
        return insertCountryDiscription(country)
    } 
        
    // else {Notiflix.Notify.failure("Oops, there is no country with that name")}
}


countryListEl.style.listStyle = "none"

//  const listItemEl = document.querySelector(".item")
   
//     listItemEl.forEach(el => {
//     el.style.display = "flex"
// })


// const bodyEl = document.querySelector("body")
// bodyEl.style.backgroundColor = "grey"


