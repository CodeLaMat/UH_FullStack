import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";

const apiKey = process.env.REACT_APP_API_KEY;

const getWeather = (capital) => {
  console.log("API Key:", apiKey);
  const request = axios.get(`${weatherURL}${capital}&appid=${apiKey}`);
  return request.then((response) => {
    console.log(response);
    return response.data;
  });
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll, getWeather };
