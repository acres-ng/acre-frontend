import React from "react";
import {
  CardContent,
  CardHeader,
  CardTitle,
  Card,
  CardDescription,
} from "../ui/card";
import { API_URL } from "@/config";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getActiveFarm } from '@/services/farmService';
import { getJwt } from '@/services/userService';
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
    <div className="grid gap-4 grid-cols-2  md:grid-cols-2 lg:grid-cols-4">
    {/* Total Livestock Card */}
    <Card className="border-0 bg-white    overflow-hidden hover:bg-gradient-to-br hover:from-[#CCE6DA] hover:via-white hover:to-[#CCE6DA] rounded-xl shadow-lg duration-300 hover:shadow-2xl ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_2975_1463"
           
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="32"
            height="32"
          >
            <path d="M0 0H32V32H0V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_2975_1463)">
            <path
              d="M17.8046 27.9705C17.8046 28.4491 17.6144 28.9081 17.276 29.2466C16.9376 29.585 16.4786 29.7751 15.9999 29.7751C15.5213 29.7751 15.0623 29.585 14.7239 29.2466C14.3854 28.9081 14.1953 28.4491 14.1953 27.9705C14.1953 27.4919 14.3854 27.0329 14.7239 26.6944C15.0623 26.356 15.5213 26.1659 15.9999 26.1659C16.4786 26.1659 16.9376 26.356 17.276 26.6944C17.6144 27.0329 17.8046 27.4919 17.8046 27.9705Z"
              fill="#E1E8ED"
            />
            <path
              d="M24.1213 14.0151C24.1213 9.53009 20.485 5.89473 16.0008 5.89473C11.5166 5.89473 7.88041 9.53009 7.88041 14.0151C7.88041 18.5263 6.97852 27.9705 6.97852 27.9705C6.97852 28.4491 7.16865 28.9081 7.50708 29.2466C7.84551 29.585 8.30453 29.7751 8.78315 29.7751C9.26176 29.7751 9.72078 29.585 10.0592 29.2466C10.3976 28.9081 10.5878 28.4491 10.5878 27.9705C10.598 28.4423 10.7925 28.8913 11.1298 29.2213C11.467 29.5513 11.9201 29.7362 12.392 29.7362C12.8639 29.7362 13.317 29.5513 13.6542 29.2213C13.9914 28.8913 14.186 28.4423 14.1962 27.9705H17.8055C17.8198 28.4396 18.0162 28.8847 18.3531 29.2114C18.6899 29.5381 19.1408 29.7209 19.6101 29.7209C20.0794 29.7209 20.5302 29.5381 20.8671 29.2114C21.204 28.8847 21.4004 28.4396 21.4147 27.9705C21.4249 28.4423 21.6195 28.8913 21.9567 29.2213C22.294 29.5513 22.7471 29.7362 23.2189 29.7362C23.6908 29.7362 24.1439 29.5513 24.4811 29.2213C24.8184 28.8913 25.013 28.4423 25.0231 27.9705C25.0231 27.9705 24.1213 18.5263 24.1213 14.0151Z"
              fill="#E1E8ED"
            />
            <path
              d="M17.6856 3.36848C17.6856 5.22869 16.467 8.42112 16.0013 8.42112C15.5365 8.42112 14.3171 5.22869 14.3171 3.36848C14.3171 1.50827 15.5365 0.842169 16.0013 0.842169C16.467 0.842169 17.6856 1.50827 17.6856 3.36848ZM14.0098 28.6316C14.0098 26.4321 15.4506 21.8948 16.0013 21.8948C16.5521 21.8948 17.9929 26.4321 17.9929 28.6316C17.9929 30.8312 16.5512 31.158 16.0013 31.158C15.4506 31.158 14.0098 30.8312 14.0098 28.6316Z"
              fill="#DD2E44"
            />
            <path
              d="M21.8949 19.7896C21.8949 21.0528 17.8604 23.5791 16.0002 23.5791C14.14 23.5791 10.1055 21.0528 10.1055 19.7896C10.1055 18.5265 14.14 16.0002 16.0002 16.0002C17.8604 16.0002 21.8949 18.5265 21.8949 19.7896Z"
              fill="#F4900C"
            />
            <path
              d="M21.8949 19.7894C21.8949 21.0526 10.1055 21.0526 10.1055 19.7894C10.1055 18.5263 14.14 16 16.0002 16C17.8604 16 21.8949 18.5263 21.8949 19.7894Z"
              fill="#FFAC33"
            />
            <path
              d="M11.79 16.4212C11.79 16.587 11.7573 16.7513 11.6938 16.9046C11.6304 17.0578 11.5373 17.1971 11.42 17.3144C11.3027 17.4317 11.1635 17.5247 11.0102 17.5882C10.857 17.6517 10.6927 17.6843 10.5268 17.6843C10.3609 17.6843 10.1967 17.6517 10.0434 17.5882C9.89019 17.5247 9.75094 17.4317 9.63364 17.3144C9.51635 17.1971 9.4233 17.0578 9.35982 16.9046C9.29634 16.7513 9.26367 16.587 9.26367 16.4212C9.26367 16.0862 9.39675 15.7649 9.63364 15.528C9.87053 15.2911 10.1918 15.158 10.5268 15.158C10.8618 15.158 11.1831 15.2911 11.42 15.528C11.6569 15.7649 11.79 16.0862 11.79 16.4212ZM22.7374 16.4212C22.7373 16.5871 22.7046 16.7514 22.641 16.9047C22.5775 17.058 22.4843 17.1972 22.367 17.3145C22.2496 17.4318 22.1103 17.5249 21.9569 17.5883C21.8036 17.6518 21.6393 17.6844 21.4734 17.6843C21.3074 17.6843 21.1431 17.6515 20.9898 17.588C20.8366 17.5244 20.6973 17.4313 20.58 17.3139C20.4627 17.1966 20.3697 17.0572 20.3062 16.9039C20.2428 16.7506 20.2101 16.5863 20.2102 16.4203C20.2103 16.0852 20.3435 15.7639 20.5806 15.527C20.8176 15.2901 21.1391 15.1571 21.4742 15.1572C21.8093 15.1573 22.1307 15.2905 22.3676 15.5276C22.6044 15.7646 22.7375 16.086 22.7374 16.4212Z"
              fill="#292F33"
            />
          </g>
        </svg>
        <CardTitle className="text-sm font-medium text-gray-400">
          Total Livestocks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold">{livestockCount}</div>
      </CardContent>
    </Card>

    <Card className="border-0 bg-white  overflow-hidden hover:bg-gradient-to-br hover:from-[#CCE6DA] hover:via-white hover:to-[#CCE6DA] rounded-xl shadow-lg duration-300 hover:shadow-2xl ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.9388 7.1494C25.4255 5.5414 23.3775 4.63873 21.1735 4.6054C19.2482 4.56807 17.4615 5.20007 16.0002 6.37607C14.5388 5.2014 12.7188 4.5614 10.8268 4.6054C8.62282 4.63873 6.57615 5.5414 5.06149 7.1494C2.09882 10.2961 2.27082 15.4387 5.44549 18.6134L14.0082 27.1761C14.5575 27.7254 15.2788 28.0001 15.9988 28.0001C16.7188 28.0001 17.4415 27.7254 17.9895 27.1761L26.5522 18.6134C29.7268 15.4387 29.9002 10.2961 26.9362 7.1494H26.9388Z" fill="#FD6C77"/>
<path d="M28 15.0001H20.7133C19.9307 15.0001 19.2053 15.3894 18.772 16.0388L17.6347 17.7441L15.6147 11.6841C15.4933 11.3228 15.1773 11.0601 14.7987 11.0094C14.4213 10.9508 14.0467 11.1281 13.8333 11.4454L11.5627 14.8521C11.5 14.9454 11.3973 15.0001 11.2853 15.0001H4C3.448 15.0001 3 15.4481 3 16.0001C3 16.5521 3.448 17.0001 4 17.0001H11.2867C12.0693 17.0001 12.7947 16.6108 13.228 15.9614L14.3653 14.2561L16.3853 20.3161C16.5067 20.6774 16.8227 20.9401 17.2013 20.9908C17.2453 20.9974 17.2893 21.0001 17.3347 21.0001C17.6667 21.0001 17.9787 20.8348 18.1667 20.5548L20.4373 17.1481C20.5 17.0548 20.6027 17.0001 20.7147 17.0001H28.0013C28.5533 17.0001 29.0013 16.5521 29.0013 16.0001C29.0013 15.4481 28.552 15.0001 28 15.0001Z" fill="#FEB5BB"/>
</svg>

        <CardTitle className="text-sm font-medium text-gray-400">
          Mortality
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold">{mortalityCount}</div>
      </CardContent>
    </Card>

    <Card className="border-0 bg-white  overflow-hidden hover:bg-gradient-to-br hover:from-[#CCE6DA] hover:via-white hover:to-[#CCE6DA] rounded-xl shadow-lg duration-300 hover:shadow-2xl ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2975_1486)">
<path d="M3.15888 17.1224L5.05328 14.3158L7.57959 16.8421L10.948 15.1579L13.4743 17.6842L16.8427 12.6316L20.2112 15.1579L22.7375 14.3158L24.4217 16.8421L26.948 14.3158L28.6322 17.6842L26.948 23.579L17.6849 27.7895L8.4217 26.1053L3.36907 21.0526L3.1582 17.1224H3.15888Z" fill="#99AAB5"/>
<mask id="mask0_2975_1486"  maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
<path d="M0 0H32V32H0V0Z" fill="white"/>
</mask>
<g mask="url(#mask0_2975_1486)">
<path d="M26.0677 13.2313C26.0854 12.9888 26.1048 12.7479 26.1048 12.5012C26.1048 7.49656 22.4635 3.35256 17.6871 2.54835C18.6883 2.33025 19.3974 2.11972 18.5258 1.68435C17.5869 1.21446 16.6471 1.79298 16.0003 2.39593H15.9987C15.3511 1.79298 14.413 1.21446 13.4732 1.68435C12.6016 2.11972 13.3107 2.33025 14.3119 2.54835C9.53634 3.35256 5.89424 7.49656 5.89424 12.5012C5.89424 12.7479 5.91361 12.9888 5.93129 13.2313C5.52455 18.79 0.623499 26.9475 15.9995 26.9475C31.3755 26.9475 26.4736 18.79 26.0677 13.2313Z" fill="#FFCC4D"/>
<path d="M18.5253 12.6317C18.5253 14.0271 17.3943 14.3159 15.999 14.3159C14.6036 14.3159 13.4727 14.0271 13.4727 12.6317C13.4727 11.9617 13.7388 11.3191 14.2126 10.8453C14.6864 10.3716 15.329 10.1054 15.999 10.1054C16.669 10.1054 17.3116 10.3716 17.7853 10.8453C18.2591 11.3191 18.5253 11.9617 18.5253 12.6317Z" fill="#F4900C"/>
<path d="M11.7876 10.5263C11.792 10.6949 11.7626 10.8626 11.7012 11.0197C11.6397 11.1767 11.5475 11.3198 11.4298 11.4406C11.3122 11.5614 11.1715 11.6575 11.0162 11.723C10.8608 11.7886 10.6939 11.8225 10.5253 11.8225C10.3567 11.8226 10.1897 11.7889 10.0344 11.7234C9.87896 11.6579 9.73825 11.562 9.62053 11.4412C9.5028 11.3205 9.41044 11.1774 9.34888 11.0204C9.28733 10.8635 9.25783 10.6957 9.26213 10.5272C9.27052 10.1979 9.40719 9.88495 9.64299 9.655C9.8788 9.42506 10.1951 9.2963 10.5245 9.29619C10.8538 9.29608 11.1702 9.42463 11.4062 9.65442C11.6421 9.88421 11.779 10.1971 11.7876 10.5263ZM22.735 10.5263C22.735 10.8613 22.6019 11.1826 22.365 11.4195C22.1281 11.6564 21.8068 11.7895 21.4718 11.7895C21.1368 11.7895 20.8155 11.6564 20.5786 11.4195C20.3417 11.1826 20.2087 10.8613 20.2087 10.5263C20.2087 10.1913 20.3417 9.87002 20.5786 9.63314C20.8155 9.39625 21.1368 9.26316 21.4718 9.26316C21.8068 9.26316 22.1281 9.39625 22.365 9.63314C22.6019 9.87002 22.735 10.1913 22.735 10.5263Z" fill="#662113"/>
<path d="M26.9464 21.8948L24.4201 21.0527L21.0517 26.1053L18.5254 21.8948L16.8412 23.579L13.4728 21.8948L10.9464 25.2632L8.42013 20.2106L5.89381 21.8948L3.11992 15.3559C2.72661 16.5125 2.52576 17.7258 2.52539 18.9474C2.52539 25.6919 8.55823 31.158 15.9991 31.158C23.4399 31.158 29.4728 25.6919 29.4728 18.9474C29.4728 17.8999 29.3119 16.8893 29.0374 15.9184L26.9464 21.8948Z" fill="#E1E8ED"/>
</g>
</g>
<defs>
<clipPath id="clip0_2975_1486">
<rect width="32" height="32" fill="white"/>
</clipPath>
</defs>
</svg>
        <CardTitle className="text-sm font-medium text-gray-400">
          Births
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold">{birthCount}</div>
      </CardContent>
    </Card>

    <Card className="border-0 bg-white  overflow-hidden hover:bg-gradient-to-br hover:from-[#CCE6DA] hover:via-white hover:to-[#CCE6DA] rounded-xl shadow-lg duration-300 hover:shadow-2xl ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.87644 20.2219C5.32463 20.2219 6.49994 21.3991 6.49994 22.8468C6.49994 22.9858 6.61225 23.097 6.75094 23.097H25.2527C25.3903 23.097 25.5009 22.9839 25.5009 22.8468C25.5009 21.3986 26.6794 20.2219 28.1273 20.2219C28.2651 20.2219 28.3754 20.109 28.3754 19.9718V12.0282C28.3754 11.8911 28.2649 11.7783 28.1273 11.7783C26.6797 11.7783 25.5009 10.6009 25.5009 9.15308C25.5009 9.01595 25.3903 8.9032 25.2527 8.9032H6.751C6.61231 8.9032 6.5 9.01408 6.5 9.15308C6.5 10.6005 5.32444 11.7783 3.8765 11.7783C3.73781 11.7783 3.6255 11.8892 3.6255 12.0282V19.9718C3.62544 20.1108 3.73756 20.2219 3.87644 20.2219ZM1.25 8.05508C1.25 7.21308 1.93619 6.52808 2.77787 6.52808H29.2229C30.0662 6.52808 30.7508 7.2117 30.7508 8.05508V23.9451C30.7508 24.7883 30.0661 25.4718 29.2229 25.4718H2.77787C1.93631 25.4718 1.25 24.787 1.25 23.9451V8.05508Z" fill="#8CCDAC"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.9374 17.7702C18.9374 18.9377 18.0068 19.922 16.7491 20.2071V20.6009C16.7491 21.015 16.4163 21.3508 16.0011 21.3508C15.5858 21.3508 15.25 21.015 15.25 20.6009V20.2089C14.3576 20.0101 13.6184 19.4608 13.2679 18.6989C13.0941 18.3225 13.2591 17.8778 13.636 17.7046C14.013 17.532 14.4577 17.697 14.6315 18.0733C14.8229 18.4957 15.3884 18.7902 16.001 18.7902C16.7785 18.7902 17.4383 18.3231 17.4383 17.7703C17.4383 17.2171 16.7785 16.75 16.001 16.75C14.3811 16.75 13.0617 15.6193 13.0617 14.2301C13.0617 13.0626 13.9924 12.0783 15.25 11.7932V11.3995C15.25 10.9856 15.5857 10.6496 16.0011 10.6496C16.4163 10.6496 16.7491 10.9856 16.7491 11.3995V11.7932C17.7476 12.0194 18.5575 12.685 18.8343 13.5651C18.9609 13.96 18.7401 14.3812 18.3454 14.5064C17.9507 14.6307 17.5296 14.4113 17.4059 14.0163C17.2792 13.6158 16.7549 13.2102 16.001 13.2102C15.2205 13.2102 14.5637 13.677 14.5637 14.2301C14.5637 14.7833 15.2206 15.2501 16.001 15.2501C17.6209 15.25 18.9374 16.3806 18.9374 17.7702ZM27.3754 19.2999V12.7C25.9765 12.4043 24.8749 11.3013 24.5775 9.9032H7.42163C7.12713 11.3013 6.02269 12.4043 4.62663 12.7V19.3C6.02269 19.5956 7.12713 20.699 7.42163 22.097H24.5775C24.8749 20.6989 25.9765 19.5956 27.3754 19.2999ZM28.1264 11.2783C26.9543 11.2783 26 10.3244 26 9.15308C26 8.7387 25.6642 8.4032 25.2519 8.4032H6.75012C6.33488 8.4032 5.99912 8.73864 5.99912 9.15308C5.99912 10.3244 5.04781 11.2783 3.87562 11.2783C3.46037 11.2783 3.12462 11.6138 3.12462 12.0282V19.9718C3.12462 20.3865 3.46037 20.7219 3.87562 20.7219C5.04781 20.7219 5.99912 21.675 5.99912 22.8469C5.99912 23.2613 6.33488 23.597 6.75012 23.597H25.2519C25.6642 23.597 26.0001 23.2613 26.0001 22.8469C26.0001 21.675 26.9543 20.7219 28.1265 20.7219C28.5388 20.7219 28.8746 20.3865 28.8746 19.9718V12.0282C28.8746 11.6138 28.5388 11.2783 28.1264 11.2783ZM30.2499 23.9451V8.05508C30.2499 7.4887 29.7905 7.02808 29.2221 7.02808H2.777C2.2115 7.02808 1.74913 7.4887 1.74913 8.05508V23.9451C1.74913 24.5111 2.2115 24.9718 2.777 24.9718H29.2221C29.7905 24.9718 30.2499 24.5112 30.2499 23.9451ZM29.2221 5.52808H2.777C1.38394 5.52808 0.25 6.66195 0.25 8.05508V23.9451C0.25 25.3381 1.38387 26.4718 2.777 26.4718H29.2221C30.6181 26.4718 31.7491 25.3381 31.7491 23.9451V8.05508C31.7491 6.66201 30.6181 5.52808 29.2221 5.52808Z" fill="#1B9C5C"/>
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
