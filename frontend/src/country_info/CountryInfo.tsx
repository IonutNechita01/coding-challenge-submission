import { ChangeEvent, useEffect, useState } from "react";

import CountryTable from "../components/CountryTable";
import SelectedCountries from "../components/SelectedCountries";
import CountryList from "../components/CountryList";

import { BACKEND_URL } from "../utils/constants";

// the styling is not the best, but I am not used with React, so I did my best, I try to do it responsive.
import "./country_info_style.css";

// This is the main page of the application, where the user can select up to 10 countries and see their information.
// I am not used with React, so I am not sure if this is the best way to do it, but I created a component for each part of the page.
// and I also don't know react best practices, so I combined the ones I know from Flutter and Java.
// The components are:
// - CountryList: A list of all countries, clickable to select them.
// - SelectedCountries: A list of the selected countries.
// - CountryTable: A table with the information of the selected countries.
const CountryInfo = () => {
  // selectedCountriesCode is an array of the selected countries code.
  // selectedCountriesData is an array of the selected countries data.
  // countries is an array of all countries.
  const [selectedCountriesCode, setSelectedCountries] = useState<String[]>([]);
  const [selectedCountriesData, setSelectedCountriesData] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);

  // this function is called when the user clicks on a country in the CountryList component.
  const onCountrySelect = (countryCode: String) => {
    if (countryCode === "") {
      return;
    }
    const isSelected = selectedCountriesCode.some((c) => c === countryCode);
    if (isSelected) {
      setSelectedCountries(
        selectedCountriesCode.filter((c) => c !== countryCode)
      );
      return;
    }
    if (selectedCountriesCode.length < 10) {
      setSelectedCountries([...selectedCountriesCode, countryCode]);
      return;
    }
    alert("You can select a maximum of 10 countries.");
  };

  // this function is called when the user types in the input field.
  const onCountryFilter = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setFilteredCountries([]);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    var filtered = countries.filter((country) =>
      country.commonName
        .toUpperCase()
        .includes(event.target.value.toUpperCase())
    );
    // I did this because I wanted to show the countries that start with the searching text first.
    filtered.sort((a, _) =>
      a.commonName.toUpperCase().startsWith(event.target.value.toUpperCase())
        ? -1
        : 1
    );
    if (filtered.length === 0) {
      setFilteredCountries([{ commonName: "No countries found", code: "" }]);
      return;
    }
    setFilteredCountries(filtered);
  };

  // this function gets all countries name and code from the backend.
  const getCountriesNameAndCode = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/countriesNameAndCode`);
      const data = await response.json();
      const countries = [];
      for (const country of data) {
        countries.push({
          commonName: country["commonName"],
          code: country["code"],
        });
      }
      setCountries(countries);
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      getCountriesNameAndCode();
    }
  };

  // this function gets the information of the selected countries from the backend.
  const getCountriesData = async () => {
    if (selectedCountriesCode.length === 0) {
      setSelectedCountriesData([]);
      return;
    }

    const codes = selectedCountriesCode.join(",");
    try {
      const response = await fetch(
        `${BACKEND_URL}/countriesData?countriesCode=${codes}`
      );
      const data = await response.json();
      console.log(data);
      setSelectedCountriesData(data);
    } catch (error) {
      handleError(error);
    }
  };

  const deselectAllCountries = () => {
    setSelectedCountriesData([]);
    setSelectedCountries([]);
  };

  // this function handles the errors in a generic way. In a real application, I would handle the errors in a more specific way.
  const handleError = (error: any) => {
    console.log(error);
    alert("Something went wrong");
  };

  // this function is called when the component is mounted.
  useEffect(() => {
    getCountriesNameAndCode();
  }, []);

  return (
    <div className="country-info">
      <h1>Country Information</h1>
      {
        <CountryList
          countries={
            filteredCountries.length === 0 ? countries : filteredCountries
          }
          selectedCountriesCode={selectedCountriesCode}
          onCountrySelect={onCountrySelect}
          onCountryFilter={onCountryFilter}
        ></CountryList>
      }
      <SelectedCountries
        selectedCountriesCode={selectedCountriesCode}
        countries={countries}
      />
      <button className="button" onClick={getCountriesData}>
        See Country Information
      </button>
      <button className="button" onClick={deselectAllCountries}>
        deselect all
      </button>
      <CountryTable selectedCountriesData={selectedCountriesData} />
    </div>
  );
};

export default CountryInfo;
