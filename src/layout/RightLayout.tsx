import { Card, CardContent } from "../components/ui/card";
import { RiWindyLine } from 'react-icons/ri';
import { BiCloudRain } from 'react-icons/bi';
import { IoBarbellOutline } from 'react-icons/io5';
import { WiHumidity } from 'react-icons/wi';
import Tasks from "./Tasks";

const LeftLayout = () => {
  return (
    <div className="fixed  ">
      <div className=" ">
        <div className="bg-[#CCE6DA] rounded-lg shadow-sm p-6  m-4 h-full">
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
            <div className="flex justify-center items-center mt-2">
              <span className="text-lg text-gray-500">
                {/* Display weather icon and temperature */}
                🌙 25°C
              </span>
            </div>
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
      <p className="text-sm font-medium">10 km/h</p>
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
      <p className="text-sm font-medium">65%</p>
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
      <p className="text-sm font-medium">06:30 AM</p>
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
      <p className="text-sm font-medium">06:45 PM</p>
    </CardContent>
  </Card>
</div>
        </div>
      </div>
      <div className="w-full h-full">
        <Tasks />
      </div>
    </div>
  );
};

export default LeftLayout;
