// import { PlusCircledIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar as CalendarIcon } from "lucide-react";
import Sidebar from "../common/Sidebar";
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
import { useState } from "react";
import { format } from "date-fns";

export default function Dashboard() {
  const [date, setDate] = useState<Date>();
  return (
    <>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l ptt-20">
                <div className="h-full px-4 py-6 lg:px-8">
                  <div defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <div className="flex w-full">
                        <div className="flex w-full max-w-lg items-center space-x-2">
                          <Input type="text" placeholder="Search" />
                        </div>
                      </div>
                      <div className="flex ml-auto mr-4">
                        <Select>
                          <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Abdulsalam's Idris farms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {/* <SelectLabel>Fruits</SelectLabel> */}
                              <SelectItem value="apple">
                                Abdulsalam's Idris farms
                              </SelectItem>
                              {/* <SelectItem value="apple">Nexus farm</SelectItem> */}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <div className="flex flex-row gap-5 justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
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
                    <div className="border-none p-0 outline-none">
                      <div className="flex items-center justify-between">
                        <div className="space-y-10">
                          <div className="">
                            <p className="font-light text-gray-500 text-lg ">
                              Welcome to
                            </p>
                            <p className="font-bold text-gray-700 text-lg tracking-tight">
                              Old Macdonald farms
                            </p>
                            <p className="font-light text-gray-500 text-sm">
                              No 18, Farmers road, Abuja Nigeria
                            </p>
                          </div>

                          <div className="">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date ? (
                                    format(date, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
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
                          </div>

                          <div className="space-y-10">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                              <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                  <CardTitle className="text-sm font-medium">
                                    Total Livestocks
                                  </CardTitle>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                  >
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                  </svg>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">100</div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                  <CardTitle className="text-sm font-medium">
                                    Mortality
                                  </CardTitle>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                  >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                  </svg>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">2</div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                  <CardTitle className="text-sm font-medium">
                                    Births
                                  </CardTitle>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                  >
                                    <rect
                                      width="20"
                                      height="14"
                                      x="2"
                                      y="5"
                                      rx="2"
                                    />
                                    <path d="M2 10h20" />
                                  </svg>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">3</div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                  <CardTitle className="text-sm font-medium">
                                    Total Revenue
                                  </CardTitle>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                  >
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                  </svg>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">
                                    200000
                                  </div>
                                  {/* <p className="text-xs text-muted-foreground">
                                    200000
                                  </p> */}
                                </CardContent>
                              </Card>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                              <Card className="col-span-4">
                                <p className="text-gray-400 pl-7">Livestock</p>
                                <CardHeader>
                                  <CardTitle>Average Weight (KG)</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                  {/* <Overview /> */}
                                </CardContent>
                              </Card>
                              <Card className="col-span-3">
                                <p className="text-gray-400 pl-7">Livestock</p>
                                <CardHeader>
                                  <CardTitle>Feed Inventory</CardTitle>
                                  <CardDescription>
                                    info goes here{" "}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent>
                                  {/* <RecentSales /> */}
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
