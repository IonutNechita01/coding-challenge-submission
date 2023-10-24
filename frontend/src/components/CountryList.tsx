import { ChangeEvent, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

interface CountryListProps {
  countries: any[];
  selectedCountriesCode: String[];
  onCountrySelect: (country: String) => void;
  onCountryFilter: (text: ChangeEvent<HTMLInputElement>) => void;
}

const CountryList = ({
  countries,
  selectedCountriesCode,
  onCountrySelect,
  onCountryFilter,
}: CountryListProps) => {
  const [showCountriesList, setShowCountriesList] = useState(true);
  const hideCountries = () => {
    setShowCountriesList(!showCountriesList);
  };

  return (
    <>
      <div className={`country-container ${showCountriesList ? "hidden" : ""}`}>
        <div className="country-list">
          {countries.length > 0 ? (
            countries.map((country, index) => (
              <div
                key={index}
                className={`country-card ${
                  selectedCountriesCode.some((c) => c === country.code)
                    ? "selected"
                    : ""
                }`}
                onClick={() => onCountrySelect(country.code)}
              >
                <p>{country.name}</p>
              </div>
            ))
          ) : (
            <ThreeDots />
          )}
        </div>
        <input type="text" onChange={onCountryFilter}></input>
      </div>
      <button className="button" onClick={hideCountries}>
        {!showCountriesList ? "Hide countries list" : "Show countries list"}
      </button>
    </>
  );
};

export default CountryList;
