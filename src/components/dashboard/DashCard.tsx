import React from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { API_URL } from "@/config";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd"; // Import your Card component
import { getActiveFarm } from "@/services/farmService";
import { getJwt } from "@/services/userService";
import http from "@/services/HttpService";

function DashCard() {
  const [livestockCount, setLivestockCount] = useState(0);
  const [mortalityCount, setMortalityCount] = useState(0);
  const [birthCount, setBirthCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const userActiveFarmId = getActiveFarm().id;
    http
      .get(`${API_URL}farms/${userActiveFarmId}/dashboard/tasks`, http.getDefaultOptions())
      .then((response) => {
        const { data } = response.data;
        const totalLivestock = data.livestock.total_count || 0;
        const totalMortality = data.mortality.total_count || 0;
        const totalBirths = data.births.total_count || 0;
        const revenue = data.revenue.total || 0;
        setLivestockCount(totalLivestock);
        setMortalityCount(totalMortality);
        setBirthCount(totalBirths);
        setTotalRevenue(revenue);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Livestock Card */}
      <Card className="border-0 bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ... Your SVG code ... */}
          </svg>
          <CardTitle className="text-sm font-medium text-gray-400">
            Total Livestocks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{livestockCount}</div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ... Your SVG code ... */}
          </svg>
          <CardTitle className="text-sm font-medium text-gray-400">
            Mortality
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{mortalityCount}</div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ... Your SVG code ... */}
          </svg>
          <CardTitle className="text-sm font-medium text-gray-400">
            Births
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{birthCount}</div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ... Your SVG code ... */}
          </svg>
          <CardTitle className="text-sm font-medium text-gray-400">
            Total Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">${totalRevenue}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashCard;
