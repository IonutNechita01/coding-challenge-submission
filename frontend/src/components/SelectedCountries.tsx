interface SelectedCountriesProps {
  selectedCountriesCode: String[];
  countries: any[];
}

const SelectedCountries = ({
  selectedCountriesCode,
  countries,
}: SelectedCountriesProps) => {
  return (
    <>
      <div className="selected-countries">
        <h2>Selected Countries:</h2>
        <ul>
          {countries.map(
            (country, index) =>
              selectedCountriesCode.some((c) => c === country.code) && (
                <li key={index}>{country.name}</li>
              )
          )}
        </ul>
      </div>
    </>
  );
};

export default SelectedCountries;
