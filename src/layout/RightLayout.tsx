
import { useEffect, useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { RiWindyLine } from 'react-icons/ri';
import { BiCloudRain } from 'react-icons/bi';
import { IoBarbellOutline } from 'react-icons/io5';
import { WiHumidity } from 'react-icons/wi';
import Tasks from "./Tasks";


interface WeatherData {
  temperature: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
  rain: number;
  iconUrl: string; 
}

const LeftLayout = () => {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);


  useEffect(() => {
    // Retrieve weather data from localStorage
    const storedWeatherData = localStorage.getItem('weatherData');
    if (storedWeatherData) {
      const parsedWeatherData = JSON.parse(storedWeatherData);
      setWeatherData(parsedWeatherData);
    }
  }, []);

  // const getIconUrl = (iconCode: string) => {
  //   return `https://openweathermap.org/img/w/${iconCode}.png`;
  // };





  return (
    <div className="fixed end-0">
      <div className=" ">
        <div className="bg-[#CCE6DA] rounded-lg shadow-sm p-6   h-full">
          <h3 className="text-lg font-bold leading-tight text-green-900 ">
            Whether
          </h3>
          <CardContent className="p-2">
            {/* Date and time */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {/* Display day, date, and year */}
                Mon, 24 Oct, 2023
              </span>

              <span className="text-xs text-gray-500">
                {/* Display time */}
                09:00 AM
              </span>
            </div>

            {/* Weather details */}
            {weatherData && (
              <div className="flex justify-center items-center mt-2">
                {/* Display weather icon and temperature */}
                <span role="img" aria-label="weather-icon" className="mr-2">
                {/* <img src={getIconUrl(weatherData.iconCode)} alt="weather-icon" /> */}
                </span>
                <span className="text-lg text-gray-500">
                  {weatherData.temperature}°C
                </span>
              </div>
            )}
          </CardContent>

          {/* Additional small cards */}

          <div className="grid grid-cols-2 gap-2 mt-4 justify-center">
  {/* Card 1 - Wind */}
  <Card className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-md shadow-md">
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <RiWindyLine className="mr-2" />
          <p className="text-xs text-gray-500">Wind</p>
        </div>
       
      </div>
      {weatherData && (
                <p className="text-sm font-medium">{weatherData.windSpeed} km/h</p>
              )}
    </CardContent>
  </Card>

  {/* Card 2 - Humidity */}
  <Card className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-md shadow-md">
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <WiHumidity className="mr-2" />
          <p className="text-xs text-gray-500">Humidity</p>
        </div>
        
      </div>
      {weatherData && (
                <p className="text-sm font-medium">{weatherData.humidity} km/h</p>
              )}
    </CardContent>
  </Card>

  {/* Card 3 - Sunrise */}
  <Card className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-md shadow-md">
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <IoBarbellOutline className="mr-2" />
          <p className="text-xs text-gray-500">Pressure</p>
        </div>
       
      </div>
      {weatherData && (
                <p className="text-sm font-medium">{weatherData.pressure} km/h</p>
              )}
    </CardContent>
  </Card>

  {/* Card 4 - Sunset */}
  <Card className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-md shadow-md">
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BiCloudRain className="mr-2" />
          <p className="text-xs text-gray-500">Rain</p>
        </div>
        
      </div>
      {weatherData && (
                <p className="text-sm font-medium">{weatherData.rain} km/h</p>
              )}
    </CardContent>
  </Card>
</div>
        </div>
      </div>
      <div className=" h-full">
        <Tasks />
      </div>
    </div>
  );
};

export default LeftLayout;
















