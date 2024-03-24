import React from "react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
// import { Popover } from "rizzui";
import { Popover, Title, Text, Button } from "rizzui";
import { ActionIcon } from "rizzui";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiExpense } from "react-icons/gi";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../../common/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { TbGrave2 } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { BiBowlRice } from "react-icons/bi";
import { BiSolidBowlRice } from "react-icons/bi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { MdOutlineVaccines } from "react-icons/md";
import { GoPulse } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import SalesOrderForm from "./SalesOrderForm";

// types
type ImgAndIconProps = {
  src: string | React.ReactNode;
  alt: string;
  className?: string;
};

type IconsSectionProps = {
  icons: ImgAndIconProps[];
};

type HousingInfoProps = {
  name: string;
  totalCount: number | undefined;
  housingType: string;
  description: string;
  icons: { src: string; alt: string }[];
};

type HousingCardProps = {
  imageSrc: string;
  imageAlt: string;
  info: HousingInfoProps;
};

// components
const ImageWithAlt: React.FC<ImgAndIconProps> = ({ src, alt, className }) => (
  <>
    {typeof src === "string" ? (
      <img loading="lazy" src={src} alt={alt} className={className} />
    ) : (
      <span className={className}>{src === null ? null : src}</span>
    )}
  </>
);

const Icon: React.FC<ImgAndIconProps> = ({ src, alt }) => (
  <ImageWithAlt src={src} alt={alt} className="w-6 aspect-square" />
);

const IconsSection: React.FC<IconsSectionProps> = ({ icons }) => (
  <div className="flex gap-1 justify-between self-stretch">
    {icons.map((icon, index) => (
      <Icon key={index} src={icon.src} alt={icon.alt} />
    ))}
  </div>
);

const HousingInfo: React.FC<HousingInfoProps> = ({
  name,
  totalCount,
  housingType,
  description,
  icons,
}) => (
  <section className="flex flex-col py-2 pr-10 pl-5 max-md:mt-6 max-md:max-w-full">
    <header className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
      <h2 className="flex-auto text-xl font-semibold text-zinc-800">{name}</h2>
      <IconsSection
        icons={[
          {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/13e669575810de69aa674ad5e2551835a3db3b1c7b683b7d3a001191774b027d?apiKey=33b7de9dd450419096342a2b77215ab6&",
            alt: "Icon 1",
          },
          {
            src: (
              <>
                <Popover
                  placement="left"
                  className="z-50 min-w-[140px] px-2 dark:bg-gray-100 bg-white [&>svg]:dark:fill-gray-100"
                  content={() => (
                    <div className="text-gray-900">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="text"
                            className="flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                          >
                            <AiOutlineTransaction className="mr-2 h-5 w-5 text-gray-500" />
                            Create Sales Order
                          </Button>
                        </DialogTrigger>

                        <DialogContent className=" rounded-2xl">
                          <CardHeader>
                            <CardTitle className="flex">
                              <span className="mr-2 bg-[#CCE6DA]  border-b rounded-full p-2">
                                <AiOutlineTransaction className="text-green-500" />
                              </span>
                              <span className="mt-2"> Create Sales Order</span>
                            </CardTitle>
                          </CardHeader>

                          <CardContent>
                            <SalesOrderForm />
                          </CardContent>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="text"
                            className="flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                          >
                            <TbGrave2 className="mr-2 h-5 w-5 text-gray-500" />
                            Add mortality Record
                          </Button>
                        </DialogTrigger>

                        <DialogContent className=" rounded-2xl">
                          <CardHeader>
                            <CardTitle className="flex">
                              <span className="mr-2 bg-[#CCE6DA]  border-b rounded-full p-2">
                                <TbGrave2 className="text-green-500" />
                              </span>
                              <span className="mt-2">Add mortality Record</span>
                            </CardTitle>
                          </CardHeader>

                          <CardContent>{/* <SetFeedRation /> */}</CardContent>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="text"
                            className="flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                          >
                            <MdOutlineVaccines className="mr-2 h-5 w-5 text-gray-500" />
                            Add Vaccination Record
                          </Button>
                        </DialogTrigger>

                        <DialogContent className=" rounded-2xl">
                          <CardHeader>
                            <CardTitle className="flex">
                              <span className="mr-2 bg-[#CCE6DA]  border-b rounded-full p-2">
                                <GoPulse className="text-green-500" />
                              </span>
                              <span className="mt-2">
                                Add Vaccination Record
                              </span>
                            </CardTitle>
                          </CardHeader>

                          <CardContent>
                            {/* <SetFeedRation
                        row={row}
                        onRationCreated={handleRationCreated}
                      /> */}
                          </CardContent>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="text"
                            className="flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                          >
                            <GiExpense className="mr-2 h-5 w-5 text-gray-500" />
                            Add general expense record
                          </Button>
                        </DialogTrigger>

                        <DialogContent className=" rounded-2xl">
                          <CardHeader>
                            <CardTitle className="flex">
                              <span className="mr-2 bg-[#CCE6DA]  border-b rounded-full p-2">
                                <BiSolidBowlRice className="text-green-500" />
                              </span>
                              <span className="mt-2"> Add expense record</span>
                            </CardTitle>
                          </CardHeader>

                          <CardContent>
                            {/* <SetFeedRation
                        row={row}
                        onRationCreated={handleRationCreated}
                      /> */}
                          </CardContent>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                >
                  <ActionIcon variant="text">
                    <PiDotsThreeOutlineVerticalFill className="h-[18px] w-[18px] text-gray-500" />
                  </ActionIcon>
                </Popover>
              </>
            ),
            alt: "Icon 2",
          },
        ]}
      />
    </header>
    <p className="justify-center self-start px-2 py-0.5 mt-2 text-xs leading-5 text-green-600 whitespace-nowrap bg-emerald-50 rounded-lg aspect-[2.29]">
      {housingType}
    </p>
    <div className="flex gap-2 items-center self-start mt-2">
      <p className="grow self-stretch my-auto text-xs font-medium leading-5 whitespace-nowrap text-zinc-500">
        {totalCount} Livestock
      </p>
      <div className="self-stretch my-auto w-px h-5 bg-zinc-200" />
      <IconsSection icons={icons} />
    </div>
    <p className="mt-4 text-sm leading-5 text-zinc-500 max-md:max-w-full">
      {description}
    </p>
  </section>
);

const HousingCard: React.FC<HousingCardProps> = ({
  imageSrc,
  imageAlt,
  info,
}) => (
  <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md: mb-5">
    <aside className="flex flex-col w-[27%] max-md:ml-0 max-md:w-full">
      <ImageWithAlt
        src={imageSrc}
        alt={imageAlt}
        className="grow ml-4 w-full aspect-[1.75] max-w-[328px] max-md:mt-6"
      />
    </aside>
    <div className="flex flex-col ml-5 w-[73%] max-md:ml-0 max-md:w-full">
      <HousingInfo {...info} />
    </div>
  </div>
);

export default HousingCard;
