const {RESPONSE_STATUS} = require('../utils/constants');
const axios = require('axios');

// this function is used to get data for countries by country code, I did this way for a better performance,
// taking just the data that I need from the API in one request instead of making a request for each country
exports.getCountriesDataByCountriesCodes = async (req, res) => {
    try {
        // try to get the countries code from the request in a saparate try catch block 
        // because I want to send a bad request status if the countries code is not provided
        const countriesCode = req.query.countriesCode;
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${countriesCode}`);
            const countriesData = [];
            //fetch just the data that I need from the API
            for (const country of response.data) {
                countriesData.push({
                    code: country.cca3,
                    commonName: country.name.common,
                    officialName: country.name.official,
                    currencies: country.currencies.symbol,
                    population: country.population,
                    capital: country.capital[0],
                    region: country.region,
                    flag: country.flags.svg,
                    flagDescription : country.flag.alt,
                    continents: country.continents,
                });
            }
            res.status(200).send(countriesData);
        } catch (err) {
            console.log(err);
            res.status(500).send(RESPONSE_STATUS.serverError);
        }
    } catch (err) {
        res.status(400).send(RESPONSE_STATUS.badRequest);
    }
}


// this function is used to get data for all countries
// I did this way for a better performance, taking just the data that I need, name and country code, not the whole data.
exports.getCountriesNameAndCode = async (_, res) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/all?fields=cca2,name`);
        const countriesData = [];
        for (const country of response.data) {
            countriesData.push({
                code: country.cca2,
                name: country.name.common,
            });
        }
        res.status(200).send(countriesData);
    } catch (err) {
        console.log(err);
        res.status(500).send(RESPONSE_STATUS.serverError);
    }
}