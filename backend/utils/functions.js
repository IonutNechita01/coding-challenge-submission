exports.sortCountriesData = (countriesData) => {
    return countriesData.sort((a, b) => {
        return a.commonName.localeCompare(b.commonName);
    });
};