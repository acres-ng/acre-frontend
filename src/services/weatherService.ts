import axios from "axios";
import { getActiveFarm } from "./farmService";
import { Country } from "country-state-city";
import { weatherLocalKey } from "./userService";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  rain?: {
    "1h": number;
  };
  date: string;
  time: string;
  icon: string;
  description: string;
}

export async function fetchWeatherDataByGeocode(geocode: string) {
  const today = new Date().toLocaleDateString();
  const weatherDataExists = localStorage.getItem(weatherLocalKey);
  if (
    !weatherDataExists ||
    (weatherDataExists && JSON.parse(weatherDataExists).date < today)
  ) {
    const geocodeSplit = geocode.split(", ");
    const geocodeFormatted = `lat=${geocodeSplit[0]}&lon=${geocodeSplit[1]}`;
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?${geocodeFormatted}&appid=${apiKey}&units=metric`;
    try {
      const response = await axios.get(apiUrl);
      const weatherData: WeatherData = response.data;

      const extractedData = extractWeatherData(weatherData);
      storeWeatherDataInLocalStorage(extractedData);
      return extractedData; // Return extracted data after processing
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error; // Re-throw the error to handle it where the function is called
    }
  }else{
    return JSON.parse(weatherDataExists);
  }
}

const extractWeatherData = (weatherData: any) => {
  const temperature = Math.floor(weatherData.main.temp);
  const windSpeed = weatherData.wind.speed;
  const humidity = weatherData.main.humidity;
  const rain = weatherData.rain ? weatherData.rain["1h"] : 0; // Rain in the last hour (if available)
  const pressure = weatherData.main.pressure;
  const farmCountry = Country.getCountryByCode(getActiveFarm().country);
  const farmTimezone =
    farmCountry && farmCountry.timezones
      ? farmCountry.timezones[0].zoneName
      : null;

  const date = new Date().toLocaleDateString();
  const time = farmTimezone
    ? new Date(
        new Date().toLocaleString("en-US", { timeZone: farmTimezone })
      ).toLocaleTimeString()
    : new Date().toLocaleTimeString();

  const icon = weatherData.weather[0].icon;
  const description = weatherData.weather[0].description;

  return {
    temperature,
    windSpeed,
    humidity,
    rain,
    pressure,
    icon,
    description,
    date,
    time,
  };
};

export const storeWeatherDataInLocalStorage = (weatherData: any) => {
  localStorage.setItem("weatherData", JSON.stringify(weatherData));
};
