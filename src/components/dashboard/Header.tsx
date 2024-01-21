import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useIsMounted} from '../hooks/use-is-mounted';
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "../ui/select";
import { useWindowScroll } from '../hooks/use-window-scroll';
import HamburgerButton from '@/layout/sidebar/hamburger-button';
import SearchWidget from '../search/search';
import Sidebar from '@/layout/sidebar/Sidebar';
import { Farm } from "@/constants/types";
import { getActiveFarm, getFarmById } from "@/services/farmService";
import { getCurrentUser } from "@/services/authService";
import { useEffect, useState } from "react";

const Header = () => {
    const isMounted = useIsMounted();
    const windowScroll = useWindowScroll();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [farms, setFarms] = useState<Farm>();
    const user = getCurrentUser();
    
    useEffect(() => {
      const fetchFarms = async () => {
        const response = await getFarmById(user?.farms[0]?.id);
        const farm:Farm = {
          id: response.data.id,
          farm_name: response.data.farm_name,
          line_address1: response.data.line_address1,
          line_address2: response.data.line_address2,
          country: response.data.country,
          state:response.data.state,
          geocode: response.data.geocode,
        }
  
        setFarms(farm);
      };
  
      fetchFarms().then(()=>{
        setIsLoading(false)
      })
    }, []);
  
  return (
    <div className=' w-full '> 
        <header  className={cn(
        'fixed top-0 z-50 flex items-center  px-4 py-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-0 2xl:py-5 3xl:px-8 4xl:px-10',
        ((isMounted && windowScroll.y) as number) > 2 ? 'card-shadow' : ''
      )}>
<div className="space-between flex items-center">
          <div className="flex w-full max-w-2xl items-center">
            <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full" />}
        />
              <SearchWidget />

            </div>

            <div className="flex    ml-[10rem]">
              <Select>
                <SelectTrigger className="w-[220px] bg-[#CCE6DA] text-white">
                  <p className="font-bold text-gray-700 text-lg tracking-tight">
                    {farms?.farm_name}
                  </p>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* {farms?.map((farm: any, idx: number) => (
                        <SelectItem key={idx} value={farm.id}>
                          {farm.farm_name}
                        </SelectItem>
                      ))}  */}
                  </SelectGroup>
                </SelectContent>
              </Select>

             

              <div className="flex ">

              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 px-2 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </div>
              
            </div>
          </div>
          </header></div>
  )
}

export default Header