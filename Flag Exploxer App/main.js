// main.js - Flag Explorer App

const API_URL = "https://restcountries.com/v3.1/all";
let countriesData = []; // Store fetched countries

// Fetch country data
async function fetchCountries() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");
        countriesData = await response.json();
        displayCountries(countriesData);
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

// Display countries on the page
function displayCountries(countries) {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Clear existing content

    countries.forEach(country => {
        const countryCard = document.createElement("div");
        countryCard.classList.add("country-card");

        const capital = country.capital ? country.capital[0] : "No Capital"; // Handle missing capitals

        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" data-capital="${capital}">
            <h3>${country.name.common}</h3>
            <p>Region: ${country.region}</p>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p class="capital">Capital: ${capital}</p>
        `;

        // Add click event to show/hide capital
        const flagImg = countryCard.querySelector("img");
        const capitalText = countryCard.querySelector(".capital");

        flagImg.addEventListener("click", () => {
            capitalText.style.display = capitalText.style.display === "none" ? "block" : "none";
        });

        app.appendChild(countryCard);
    });
}

// Search function
function searchCountries() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const filtered = countriesData.filter(country =>
        country.name.common.toLowerCase().includes(searchInput)
    );
    displayCountries(filtered);
}

// Sort function
function sortCountries() {
    const sortOrder = document.getElementById("sort").value;
    
    const sortedCountries = [...countriesData].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.name.common.localeCompare(b.name.common);
        } else {
            return b.name.common.localeCompare(a.name.common);
        }
    });

    displayCountries(sortedCountries);
}

// Event listeners
document.getElementById("search").addEventListener("input", searchCountries);
document.getElementById("sort").addEventListener("change", sortCountries);

// Load countries when page loads
fetchCountries();


