// import { PlusCircledIcon } from "@radix-ui/react-icons"
import { cn } from "@/helpers/utils";
import { Button } from "../../common/ui/button";
import Bar from "../../common/charts/Bar";
import Finance from "../../common/charts/FinanceChart";
import Pie from "../../common/charts/Pie";
import { Calendar as CalendarIcon } from "lucide-react";
import { getAnimals } from "@/services/livestockService";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../common/ui/popover";
import { Calendar } from "../../common/ui/calendar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  getActiveFarm,
  getFarmById,
  getFarmLocalTime,
} from "@/services/farmService";
import { getCurrentUser } from "@/services/authService";
import RightBar from "@/components/layout/RightBar";

// import Header from "../common/sidebar/header";
import DashCard from "./DashCard";
import { AcreLoader } from "../../common/ui/acreLoader";
import { Farm } from "@/helpers/types";
import { fetchWeatherDataByGeocode } from "@/services/weatherService";
import { weatherLocalKey } from "@/services/userService";
import Tasks from "@/components/layout/Tasks";
import WeatherWidget from "@/components/layout/WeatherWidget";

export interface WeatherData {
  temperature: number | string;
  windSpeed: number | string;
  humidity: number | string;
  pressure: number | string;
  rain: number | string;
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

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [date, setDate] = useState<Date>();
  const [farms, setFarms] = useState<Farm>();
  const user = getCurrentUser();

  const [weatherData, setWeatherData] = useState<WeatherData | null>(weatherEmptyState);
  const [todayDate, setToday] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    let parsedWeatherData = null;

    // get weather from api
    fetchWeatherDataByGeocode(getActiveFarm().geocode)
      .then((data) => {
        parsedWeatherData = data ?? weatherEmptyState;
        const date = parsedWeatherData
          ? parsedWeatherData.date
          : new Date().toLocaleDateString();
        const time = parsedWeatherData
          ? parsedWeatherData.time
          : getFarmLocalTime();

        setWeatherData(parsedWeatherData);
        setToday({
          date,
          time,
        });
        localStorage.setItem(weatherLocalKey, JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  useEffect(() => {
    const fetchFarms = async () => {
      const response = await getFarmById(user?.farms[0]?.id);
      const farm: Farm = {
        id: response.data.id,
        farm_name: response.data.farm_name,
        line_address1: response.data.line_address1,
        line_address2: response.data.line_address2,
        country: response.data.country,
        state: response.data.state,
        geocode: response.data.geocode,
      };

      setFarms(farm);
    };

    fetchFarms().then(() => {
      getAnimals(undefined, "maturity,breeds");
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? <AcreLoader /> : Dashboard}
      <div className="pt-5">
        {/* main content */}
        <div className="lg:hidden w-full p-10">
          <WeatherWidget todayDate={todayDate} weatherData={weatherData} />
        </div>

        <div className="flex flex-col items-center justify-between w-full space-y-10 mx-auto p-4">
          <div className="w-full">
            <p className="font-bold text-gray-700 text-lg tracking-tight">
              {farms?.farm_name}
            </p>
            <p className="font-light text-gray-500 text-sm">{`${farms?.line_address1}, ${farms?.state}`}</p>
          </div>
          {/* <NotificationDialog className=" " /> */}

          <div className="w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"default"}
                  className={cn(
                    "w-auto justify-start text-left font-normal",
                    !date && "text-white"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <DashCard />
          </div>

          <div className="space-y-6 w-full">
            <div className="w-full grid grid-cols-1 gap-6 lg:grid-cols-2 3xl:gap-8">
              <Bar />
              <Pie />
            </div>
            <Finance />
          </div>
        </div>

        <div className="lg:hidden flex w-full p-4">
          <div className="w-full h-full mt-8">
            <Tasks />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
