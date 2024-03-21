import { useEffect, useState } from "react";
import Tasks from "./Tasks";
import { weatherLocalKey } from "@/services/userService";
import { fetchWeatherDataByGeocode } from "@/services/weatherService";
import { getActiveFarm, getFarmLocalTime } from "@/services/farmService";

interface WeatherData {
  temperature: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
  rain: number;
  icon: string;
  description: string;
  date: string;
  time: string;
}

export const weatherEmptyState = {
  temperature: "0",
  windSpeed: "-",
  humidity: "-",
  pressure: "-",
  rain: "-",
  icon: "02d",
  description: "No weather data",
  date: "-",
  time: "-",
};

const RightBar = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [todayDate, setToday] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    let date = "";
    let time = "";
    let parsedWeatherData = null;
   
    // get weather from api
    fetchWeatherDataByGeocode(getActiveFarm().geocode)
      .then((data) => {
        parsedWeatherData = data ?? weatherEmptyState;
        date = data ? parsedWeatherData.date : new Date().toLocaleDateString();
        time = data ? parsedWeatherData.time : new Date().toLocaleTimeString();

        setWeatherData(parsedWeatherData);
        setToday({
          date: date,
          time: getFarmLocalTime(),
        });
        localStorage.setItem(weatherLocalKey, JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  
  return (
    <div className="w-full p-4">
      
      
    </div>
  );
};

export default RightBar;
