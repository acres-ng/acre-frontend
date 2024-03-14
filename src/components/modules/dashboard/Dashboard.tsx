// import { PlusCircledIcon } from "@radix-ui/react-icons"
import { cn } from "@/helpers/utils";
import { Button } from "../../common/ui/button";
import Bar from "../../common/charts/Bar";
import Finance from "../../common/charts/FinanceChart";
import Pie from "../../common/charts/Pie";
import { ScrollArea, ScrollBar } from "../../common/ui/scroll-area";
import { Separator } from "../../common/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../common/ui/tabs";
import { BarChart, Calendar as CalendarIcon } from "lucide-react";
import { getAnimals } from "@/services/livestockService";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { Input } from "../../common/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../common/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../common/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../common/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../../common/ui/popover";
import { Calendar } from "../../common/ui/calendar";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getActiveFarm, getFarmById } from "@/services/farmService";
import { getFarmFeed } from "@/services/livestockService";
import { getCurrentUser } from "@/services/authService";
import BarCharts from "../../common/charts/BarCharts";
import PieCharts from "../../common/charts/PieCharts";
import SearchWidget from "../../common/search/search";
import RightBar from "@/components/layout/RightBar";

// import Header from "../common/sidebar/header";
import DashCard from "./DashCard";
import { AcreLoader } from "../../common/ui/acreLoader";
import { Farm } from "@/helpers/types";
import { useWindowScroll } from "../../hooks/use-window-scroll";
import { useIsMounted } from "../../hooks/use-is-mounted";
import HamburgerButton from "@/components/layout/sidebar/HamburgerButton";
import NotificationDialog from "./NotificationDialog";
import Header from "./Header";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [date, setDate] = useState<Date>();
  const [farms, setFarms] = useState<Farm>();
  const [feedData, setFeedData] = useState<any[]>([]);
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
      getAnimals(undefined, "maturity,breeds");
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? <AcreLoader /> : Dashboard}
      <div className="pt-5">
        {/* main content */}
        <div className="flex flex-col items-center justify-between w-full space-y-10 mx-auto">
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

        <div className="lg:hidden flex w-full">
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

