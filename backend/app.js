const express = require('express');
var cors = require('cors')
const {getCountriesDataByCountriesCodes} = require('./api/countries_api');
const {getCountriesNameAndCode} = require('./api/countries_api');

const app = express();

app.use(express.json());
app.use(cors());

// set up routes
app.get('/countriesData', getCountriesDataByCountriesCodes);

app.get('/countriesNameAndCode', getCountriesNameAndCode);

module.exports = app;