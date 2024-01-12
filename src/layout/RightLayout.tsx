
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
  icon: string; 
  description:string;
}

const LeftLayout = () => {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [todayDate, setToday] = useState({
    date: '',
    time: ''
  });

 

  useEffect(() => {
    // Retrieve weather data from localStorage
    setToday({
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    })
    const storedWeatherData = localStorage.getItem('weatherData');
    if (storedWeatherData) {
      const parsedWeatherData = JSON.parse(storedWeatherData);
      setWeatherData(parsedWeatherData);
    }
  }, []);

  const getIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };


  return (
    <div className="fixed end-0">
      <div className=" ">
        <div className="bg-[#CCE6DA] rounded-lg shadow-sm p-6   h-full">
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
                <img src={getIconUrl(weatherData.icon)} alt="weather-icon" />
                </span>
                <span className="text-lg text-gray-500">
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
  <Card className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-md shadow-md">
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <RiWindyLine className="mr-2" />
          <p className="text-xs text-gray-500">Wind</p>
        </div>
       
      </div>
      {weatherData && (
                <p className="text-sm font-medium">{weatherData.windSpeed} m/s</p>
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
                <p className="text-sm font-medium">{weatherData.humidity} %</p>
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
                <p className="text-sm font-medium">{weatherData.pressure} hPa</p>
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
                <p className="text-sm font-medium">{weatherData.rain} %</p>
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
















