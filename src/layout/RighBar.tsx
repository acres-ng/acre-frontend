import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { RiWindyLine } from "react-icons/ri";
import { BiCloudRain } from "react-icons/bi";
import { IoBarbellOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
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

const RightBar = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [todayDate, setToday] = useState({
    date: "",
    time: "",
  });

  const getIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  useEffect(() => {
    let date = "";
    let time = "";
    let parsedWeatherData = null;
    const weatherEmptyState = {
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
      <div className="w-full flex flex-col px-6 py-2 overflow-hidden bg-[#CCE6DA] rounded-xl shadow-lg duration-300 hover:shadow-2xl ">
        <h3 className="text-3xl pt-4 font-bold text-[#2E5946] ">Weather</h3>
        {/* Date and time */}

        <div className="flex  justify-between items-center mt-2">
          <span className=" font-medium text-base leading-6 text-[#7C7D7D]">
            {/* Display day, date, and year */}
            {todayDate.date}
          </span>

          <span className="font-medium text-base leading-6 text-[#7C7D7D]">
            {/* Display time */}
            {todayDate.time}
          </span>
        </div>

        {/* Weather details */}
        <div className="">
          {weatherData && (
            <div>
              <div className="flex  mt-2">
                {/* Display weather icon and temperature */}
                <span role="img" aria-label="weather-icon">
                  <img
                    src={getIconUrl(weatherData.icon)}
                    alt="weather-icon"
                    className="ml-4  w-[120px] h-18"
                  />
                </span>
                <span className="text-[40px] text-[#006D38] font-semibold">
                  {weatherData.temperature}°C
                </span>
              </div>
              <div className="flex justify-center mt-[-40px] items-center">
                <h2 className="text-[16px] text-[#006D38] ml-16 font-medium ">
                  {weatherData.description}
                </h2>
              </div>
            </div>

            //  <div className="flex flex-col items-center">
            //   <div className="flex space-x-4">
            //     <span role="img" aria-label="weather-icon " >
            //       <img src={getIconUrl(weatherData.icon)} alt="weather-icon"  />
            //     </span>
            //     <span className="text-3xl text-[#006D38] mt-5 font-semibold">{weatherData.temperature}°C</span>
            //   </div>
            //   <h2 className="text-[16px] text-[#006D38] font-medium mt-1">
            //     {weatherData.description}
            //   </h2>
            // </div>
          )}
        </div>

        {/* Additional small cards */}

        <div className="grid grid-cols-2 gap-4 my-4  justify-center">
          {/* Card 1 - Wind */}
          <Card className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-xl shadow overflow-hidden hover:bg-gradient-to-br hover:from-[#CCE6DA] hover:via-white hover:to-[#CCE6DA] duration-300 hover:shadow-2xl">
            <div className="flex h-[65px] flex-col items-center justify-center ">
              <div className="flex gap-2 items-center">
                <span>
                  <RiWindyLine className="" />
                </span>
                <p className="text-xs text-gray-500">Wind</p>
              </div>
              {weatherData && (
                <p className="text-sm font-medium pt-2">
                  {weatherData.windSpeed} m/s
                </p>
              )}
            </div>
          </Card>

          {/* Card 2 - Humidity */}
          <Card className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-xl shadow overflow-hidden hover:bg-gradient-to-br hover:from-[#CCE6DA] hover:via-white hover:to-[#CCE6DA] duration-300 hover:shadow-2xl">
            <div className="flex flex-col  h-[65px] items-center justify-center ">
              <div className="flex gap-2 items-center">
                <span>
                  <WiHumidity className="" />
                </span>
                <p className="text-xs text-gray-500">humidity</p>
              </div>
              {weatherData && (
                <p className="text-sm font-medium pt-2">
                  {weatherData.humidity} m/s
                </p>
              )}
            </div>
          </Card>

          {/* Card 3 - Sunrise */}
          <Card className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-xl shadow overflow-hidden hover:bg-gradient-to-br hover:from-[#CCE6DA] hover:via-white hover:to-[#CCE6DA] duration-300 hover:shadow-2xl">
            <div className="flex flex-col  h-[65px] items-center justify-center ">
              <div className="flex gap-2 items-center">
                <span>
                  <IoBarbellOutline className="" />
                </span>
                <p className="text-xs text-gray-500">pressure</p>
              </div>
              {weatherData && (
                <p className="text-sm font-medium pt-2">
                  {weatherData.pressure} m/s
                </p>
              )}
            </div>
          </Card>

          {/* Card 4 - Sunset */}
          <Card className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-xl shadow overflow-hidden hover:bg-gradient-to-br hover:from-[#CCE6DA] hover:via-white hover:to-[#CCE6DA] duration-300 hover:shadow-2xl">
            <div className="flex flex-col  h-[65px] items-center justify-center ">
              <div className="flex gap-2 items-center">
                <span>
                  <BiCloudRain className="" />
                </span>
                <p className="text-xs text-gray-500">rain</p>
              </div>
              {weatherData && (
                <p className="text-sm font-medium pt-2">
                  {weatherData.rain} m/s
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
      <div className="w-full h-full mt-8">
        <Tasks />
      </div>
    </div>
  );
};

export default RightBar;
