interface CountryTableProps {
  selectedCountriesData: any[];
}

const CountryTable = ({ selectedCountriesData }: CountryTableProps) => {
  return (
    <>
      <table className="country-table">
        <thead>
          <tr>
            <th>Common Name</th>
            <th>Official Name</th>
            <th>Population</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Flag</th>
            <th>Continents</th>
          </tr>
        </thead>
        <tbody>
          {selectedCountriesData.map((country, index) => (
            <tr key={index}>
              <td>{country.commonName}</td>
              <td>{country.officialName}</td>
              <td>{country.population}</td>
              <td>{country.capital}</td>
              <td>{country.region}</td>
              <td>
                <img src={country.flag} alt={country.commonName} />
              </td>
              <td>{country.continents.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CountryTable;
