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
    <div className="fixed hidden end-0 top-0 col-span-4 z-50 xl:block xl:w-[20rem]   2xl:w-[30rem]    ">
      <div className="">
      <div className=" flex flex-col px-6 py-2 overflow-hidden bg-[#CCE6DA] rounded-xl shadow-lg duration-300 hover:shadow-2xl ">
          <h3 className="text-lg font-bold leading-tight text-green-900 ">
            Weather
          </h3>
          <CardContent className="p-2">
            {/* Date and time */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {/* Display day, date, and year */}
                {todayDate.date}
              </span>

              <span className="text-xs text-gray-500">
                {/* Display time */}
                {todayDate.time}
              </span>
            </div>

            {/* Weather details */}
            {weatherData && (
              <div>
                <div className="flex justify-center items-center mt-2">
                  {/* Display weather icon and temperature */}
                  <span role="img" aria-label="weather-icon" className="mr-2">
                    <img
                      src={getIconUrl(weatherData.icon)}
                      alt="weather-icon"
                    />
                  </span>
                  <span className="text-xl text-[#006D38]">
                    {weatherData.temperature}°C
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  <span className="text-md text-gray-500">
                    {weatherData.description}
                  </span>
                </div>
              </div>
            )}
          </CardContent>

          {/* Additional small cards */}

          <div className="grid grid-cols-2 gap-2 mt-4 justify-center">
            {/* Card 1 - Wind */}
            <Card className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-xl shadow-md  overflow-hidden hover:bg-gradient-to-br hover:from-[#CCE6DA] hover:via-white hover:to-[#CCE6DA]  duration-300 hover:shadow-2xl ">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <RiWindyLine className="mr-2" />
                    <p className="text-xs text-gray-500">Wind</p>
                  </div>
                </div>
                {weatherData && (
                  <p className="text-sm font-medium">
                    {weatherData.windSpeed} m/s
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Card 2 - Humidity */}
            <Card className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-xl shadow-md  overflow-hidden hover:bg-gradient-to-br hover:from-[#CCE6DA] hover:via-white hover:to-[#CCE6DA]  duration-300 hover:shadow-2xl ">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <WiHumidity className="mr-2" />
                    <p className="text-xs text-gray-500">Humidity</p>
                  </div>
                </div>
                {weatherData && (
                  <p className="text-sm font-medium">
                    {weatherData.humidity} %
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Card 3 - Sunrise */}
            <Card className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-xl shadow-md  overflow-hidden hover:bg-gradient-to-br hover:from-[#CCE6DA] hover:via-white hover:to-[#CCE6DA]  duration-300 hover:shadow-2xl ">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <IoBarbellOutline className="mr-2" />
                    <p className="text-xs text-gray-500">Pressure</p>
                  </div>
                </div>
                {weatherData && (
                  <p className="text-sm font-medium">
                    {weatherData.pressure} hPa
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Card 4 - Sunset */}
            <Card className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-xl shadow-md  overflow-hidden hover:bg-gradient-to-br hover:from-[#CCE6DA] hover:via-white hover:to-[#CCE6DA]  duration-300 hover:shadow-2xl ">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BiCloudRain className="mr-2" />
                    <p className="text-xs text-gray-500">Rain</p>
                  </div>
                </div>
                {weatherData && (
                  <p className="text-sm font-medium">{weatherData.rain} %</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className=" h-full mt-8">
        <Tasks />
      </div>
    </div>
  );
};

export default RightBar;
