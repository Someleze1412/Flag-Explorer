require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const BASE_URL = 'https://restcountries.com/v3.1';

// Get all countries
app.get('/countries', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/all`);
        const countries = response.data.map(country => ({
            name: country.name.common,
            flag: country.flags.svg
        }));
        res.json(countries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch countries' });
    }
});

// Get country details by name
app.get('/countries/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const response = await axios.get(`${BASE_URL}/name/${name}`);
        const country = response.data[0];

        const countryDetails = {
            name: country.name.common,
            population: country.population,
            capital: country.capital ? country.capital[0] : 'Unknown',
            flag: country.flags.svg
        };

        res.json(countryDetails);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch country details' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
