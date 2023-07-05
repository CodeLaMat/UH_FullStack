import React, { useEffect, useState } from "react";
import countryServices from "../services/countries";

const SingleCountry = ({ country, goBack, selectedCountry }) => {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    countryServices.getWeather(country.capital).then((weather) => {
      setWeather(weather);
      console.log(weather);
    });
  }, [country.capital]);

  return (
    <div>
      {selectedCountry ? <button onClick={goBack}>Back</button> : null}

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
      <div>
        {" "}
        <h2>Weather in {country.capital}</h2>
        {weather && (
          <p>
            Temperature <strong>{parseInt(weather.main.temp - 273.15)} </strong>
            °C in {country.capital}{" "}
          </p>
        )}
        {weather && (
          <p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            ></img>{" "}
          </p>
        )}
        {weather && <p>Wind speed: {weather.wind.speed} m/s</p>}
      </div>
    </div>
  );
};

export default SingleCountry;
