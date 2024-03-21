//  import Header from './header';
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/modules/dashboard/Header";
import Sidebar from "./Sidebar";
import RightBar, { weatherEmptyState } from "../RightBar";
import { weatherLocalKey } from "@/services/userService";
import Tasks from "../Tasks";
import { getFarmLocalTime } from "@/services/farmService";
import WeatherWidget from "../WeatherWidget";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [todayDate, setToday] = useState({
    date: "",
    time: "",
  });

  const weatherData = JSON.parse(localStorage.getItem(weatherLocalKey) as string) ?? weatherEmptyState;

  useEffect(() => {
    const date = weatherData?.date ? weatherData.date : new Date().toLocaleDateString();
    const time = weatherData?.time ? weatherData.time : getFarmLocalTime();

    setToday({
      date: date,
      time,
    });
  }, []);

  console.log("Layout>>", weatherData, todayDate)

  return (
    <main className="flex flex-row w-full gap-6">
      <Sidebar className="top-0 sticky hidden dark:bg-gray-50 xl:block 2xl:w-[25rem]" />
      {/* <div className="flex w-full flex-row flex-grow xl:ms-[230px]  2xl:ms-[480px]"> */}
      <div className="flex w-full flex-row gap-4 2xl:gap-8 max-w-full overflow-x-hidden">
        <div className={`w-full max-w-full overflow-x-hidden sticky overflow-y-scroll no_scrollbar ${pathname === "/" && "lg:w-[70%]"}`}>
          <Header />
          {children}
        </div>
        {pathname === "/" && (
          <div className="hidden lg:flex w-[25%] fixed right-0 overflow-y-scroll no_scrollbar p-4 flex-col">
            <WeatherWidget todayDate={todayDate} weatherData={weatherData} />
            <div className="w-full h-full mt-8">
              <Tasks />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Layout;
