const express = require('express');
var cors = require('cors')
const {getCountriesDataByCountriesCodes} = require('./api/countries_api');
const {getCountriesNameAndCode} = require('./api/countries_api');
const PORT = require('./utils/constants').PORT;


const app = express();

app.use(express.json());
app.use(cors());

// start server
app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

// set up routes
app.get('/countriesData', getCountriesDataByCountriesCodes);

app.get('/countriesNameAndCode', getCountriesNameAndCode);