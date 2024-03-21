import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../common/ui/avatar";
import { useIsMounted } from "../../hooks/use-is-mounted";
import { cn } from "@/helpers/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../common/ui/select";
import { useWindowScroll } from "../../hooks/use-window-scroll";
import HamburgerButton from "@/components/layout/sidebar/HamburgerButton";
import SearchWidget from "../../common/search/search";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { Farm } from "@/helpers/types";
import { getActiveFarm, getFarmById } from "@/services/farmService";
import { getCurrentUser } from "@/services/authService";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MessagesDropdown from "./Notifications";
import { ActionIcon, Badge } from 'rizzui';
import { IoMdNotificationsOutline } from "react-icons/io";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [farms, setFarms] = useState<Farm>();
  const user = getCurrentUser();

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
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-full">
      <header
        className={cn(
          "w-full top-0 z-50 flex items-center py-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5  xl:px-0   2xl:py-5 ",
          ((isMounted && windowScroll.y) as number) > 2 ? "card-shadow" : ""
        )}
      >
        <div className="w-full flex items-end justify-between">
          <div className="flex w-full max-w-2xl items-center xl:hidden">
            <HamburgerButton
              view={<Sidebar className="static w-full 2xl:w-full" />}
            />
          </div>

          <div className="">{pathname === "/" && <SearchWidget />}</div>

          <div className="flex">
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

            <div className="flex">
              <MessagesDropdown>
                <ActionIcon
                  aria-label="Messages"
                  variant="text"
                  className={cn(
                    " relative h-[34px] w-[34px] overflow-hidden rounded-full md:h-9 md:w-9 3xl:h-10 3xl:w-10 "
                  )}
                >
                  <IoMdNotificationsOutline className="h-6 w-auto" />
                  
                  <Badge
                    renderAsDot
                    color="success"
                    enableOutlineRing
                    className="absolute right-1 top-2.5 -translate-x-1 -translate-y-1/4"
                  />
                </ActionIcon>
              </MessagesDropdown>
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
      </header>
    </div>
  );
};

export default Header;
