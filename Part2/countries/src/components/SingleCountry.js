import React from "react";

const SingleCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>Capital : {country.capital}</p>
        <p>Area : {country.area}</p>
      </div>

      <div>
        <h4>Languages:</h4>{" "}
        <ul>
          {country.languages &&
            Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
        </ul>
        <img
          src={`https://flagcdn.com/${country.cca2.toLowerCase()}.svg`}
          alt="flag"
          width="400"
          height="200"
        />
      </div>
    </div>
  );
};

export default SingleCountry;
