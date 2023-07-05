import "./App.css";
import { useState, useEffect } from "react";
import countryServices from "./services/countries";
import Countries from "./components/Countries";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    countryServices.getAll().then((countries) => {
      setAllCountries(countries);
      console.log(allCountries);
    });
  }, []);

  const searchHandler = (event) => {
    setSearchInput(event.target.value);
    console.log(searchInput);
  };

  const serachedByName = () => {
    return allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  return (
    <div className="App">
      <div>
        find countries
        <input onChange={searchHandler} type="text"></input>
      </div>
      <div>
        <Countries
          allCountries={allCountries}
          searchedCountry={serachedByName()}
          searchInput={searchInput}
        />
      </div>
    </div>
  );
}

export default App;
