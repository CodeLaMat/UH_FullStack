import React, { useState } from "react";
import SingleCountry from "./SingleCountry";

const Countries = ({ allCountries, searchedCountry, searchInput }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleShowClick = (country) => {
    setSelectedCountry(country);
  };

  const handleGoBack = () => {
    setSelectedCountry(null);
  };

  if (selectedCountry) {
    return (
      <SingleCountry
        country={selectedCountry}
        goBack={handleGoBack}
        selectedCountry
      />
    );
  }

  return (
    <div>
      <ul>
        {searchInput.length > 0 && searchedCountry.length > 10 ? (
          <div>Too many matches to display, specify another filter</div>
        ) : searchInput.length > 0 &&
          searchedCountry.length > 1 &&
          searchedCountry.length < 10 ? (
          searchedCountry.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => handleShowClick(country)}>show</button>
            </li>
          ))
        ) : searchInput.length > 0 && searchedCountry.length === 1 ? (
          searchedCountry.map((country) => <SingleCountry country={country} />)
        ) : (
          allCountries.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Countries;
