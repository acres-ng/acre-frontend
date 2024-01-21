// import { PlusCircledIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Bar from "../charts/Bar";
import Finance from "../charts/FinanceChart";
import Pie from "../charts/Pie";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BarChart, Calendar as CalendarIcon } from "lucide-react";
import Sidebar from "@/layout/sidebar/Sidebar";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getActiveFarm, getFarmById } from "@/services/farmService";
import { getCurrentUser } from "@/services/authService";
import BarCharts from "../charts/BarCharts";
import PieCharts from "../charts/PieCharts";
import SearchWidget from "../search/search";
import RightBar from "@/layout/RighBar";
// import Header from "../common/sidebar/header";
import DashCard from "./DashCard";
import { AcreLoader } from "../ui/acreLoader";
import { Farm } from "@/constants/types";
import { useWindowScroll } from "../hooks/use-window-scroll";
import { useIsMounted } from "../hooks/use-is-mounted";
import HamburgerButton from "@/layout/sidebar/hamburger-button";
import NotificationDialog from "./NotificationDialog";

const Dashboard = () => {
 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [date, setDate] = useState<Date>();
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
    <>
      {isLoading ? <AcreLoader /> : Dashboard}
      {/* <Header/> */}
      <div className=" pt-20  ">
      
       
          {/* main content */}
          <div className="border-none  outline-none lg:w-full mx-auto ">
  <div className="flex items-center justify-between">
    <div className="space-y-10">
      <div className="">
        <p className="font-light text-gray-500 text-lg">Welcome to</p>
        <p className="font-bold text-gray-700 text-lg tracking-tight">{farms?.farm_name}</p>
        <p className="font-light text-gray-500 text-sm">{`${farms?.line_address1}, ${farms?.state}`}</p>
      </div>
      <NotificationDialog className=" " />

      <div className="">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"default"}
              className={cn("w-auto justify-start text-left font-normal", !date && "text-white")}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-white" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>

        <DashCard />
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 3xl:gap-8">
          <Bar />
          <Pie />
        </div>
        <Finance />
      </div>
    </div>
  </div>
</div>



        

        <div className="lg:col-span-3 w-[50%]  ">
          <RightBar />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
