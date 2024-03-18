import { Text } from "rizzui";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { BiBowlRice } from "react-icons/bi";
import { LuCircleDollarSign } from "react-icons/lu";

import { LiaBabySolid } from "react-icons/lia";
import { TbGrave2 } from "react-icons/tb";
import { Badge } from "rizzui";
import { HeaderCell } from "../../common/tables/table";
import { Checkbox } from "rizzui";
import { ActionIcon } from "rizzui";
import { Popover } from "rizzui";

import * as React from "react";
import { getFarmFeed } from "@/services/livestockService";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { BiSolidBowlRice } from "react-icons/bi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../common/ui/dialog";
import SetFeedRation from "./feeding/rations/SetRationForm";
import RecordSale from "./transactions/RecordSaleForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import CustomTooltip from "../../common/CustomTooltip";
import { Tooltip, Button } from "rizzui";

type LivestockColumns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string | string[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  handleRationCreated: () => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  handleRationCreated,
}: LivestockColumns) => {
  const navigate = useNavigate();

  return [
    {
      title: (
        <div className="flex items-center gap-3 whitespace-nowrap ps-2">
          <Checkbox
            title={"Select All"}
            onChange={handleSelectAll}
            checked={checkedItems.length === data.length}
            className="cursor-pointer"
          />
        </div>
      ),
      dataIndex: "checked",
      key: "checked",
      width: 30,
      render: (_: any, row: any) => (
        <div className="inline-flex ps-2">
          <Checkbox
            className="cursor-pointer"
            checked={checkedItems.includes(row.uuid)}
            {...(onChecked && { onChange: () => onChecked(row.uuid) })}
            // label={`${row.id}`}
          />
        </div>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Name/ID"
          sortable
          className="text-[#000000] font-medium"
          ascending={
            sortConfig?.direction === "asc" && sortConfig?.key === "name"
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick("name"),
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (name: string) => name,
    },
    {
      title: (
        <HeaderCell
          title="Animal Type"
          className="text-[#000000] font-medium"
          sortable
          ascending={
            sortConfig?.direction === "asc" && sortConfig?.key === "animal_type"
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick("animal_type"),
      dataIndex: "animal_type",
      key: "animal_type",
      width: 120,
      render: (animal_type: string) => animal_type,
    },
    {
      title: (
        <HeaderCell
          title="Total count"
          sortable
          className="text-[#000000] font-medium"
          ascending={
            sortConfig?.direction === "asc" && sortConfig?.key === "quantity"
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick("quantity"),
      dataIndex: "quantity",
      key: "quantity",
      width: 120,
      // render: (value: Date) => <DateCell date={value} />,
      // render: (value: string) => price(value),
      render: (quantity: number) => quantity,
    },
    {
      title: (
        <HeaderCell
          title="Breed"
          sortable
          className="text-[#000000] font-medium"
          ascending={
            sortConfig?.direction === "asc" && sortConfig?.key === "breed"
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick("breed"),
      dataIndex: "breed",
      key: "breed",
      width: 150,
      render: (breed: string) => breed,
    },
    {
      title: (
        <HeaderCell
          title="Maturity"
          sortable
          className="text-[#000000] font-medium"
          ascending={
            sortConfig?.direction === "asc" &&
            sortConfig?.key === "maturity_public_name"
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick("maturity_public_name"),
      dataIndex: "maturity_public_name",
      key: "maturity_public_name",
      width: 160,
      render: (name: string) => name,
    },
    {
      title: (
        <HeaderCell
          title="Added on"
          sortable
          className="text-[#000000] font-medium"
          ascending={
            sortConfig?.direction === "asc" &&
            sortConfig?.key === "stocking_date"
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick("stocking_date"),
      dataIndex: "stocking_date",
      key: "stocking_date",
      width: 120,
      render: (stocking_date: string) => stocking_date,
    },

    {
      title: (
        <HeaderCell
          title="Status"
          sortable
          className="text-[#000000] font-medium"
          ascending={
            sortConfig?.direction === "asc" &&
            sortConfig?.key === "stocking_date"
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick("Status"),
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: "okay" | "sick") =>
        status === "okay" ? (
          <div className="w-max flex justify-center px-2.5 py-1.5 rounded-xl bg-green-300 text-green-800">
            Healthy
          </div>
        ) : (
          <div className="w-max flex justify-center px-2.5 py-1.5 rounded-md bg-yellow-200 text-yellow-500">
            Sick
          </div>
        ),
    },
    {
      title: <></>,
      dataIndex: "action",
      key: "action",
      width: 60,
      render: (_: string, row: any) => (
        <div className="flex items-center justify-end gap-3">
          <Popover
            placement="left"
            className="z-50 min-w-[140px] px-2 dark:bg-gray-100 bg-white [&>svg]:dark:fill-gray-100"
            content={() => (
              <div className="text-gray-900">
                <Button
                  variant="text"
                  className="flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                  onClick={() => navigate(`/livestock/edit/${row.uuid}`)}
                >
                  <CiEdit className="mr-2 h-5 w-5 text-gray-500" />
                  Update Livestock
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="text"
                      className="flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                    >
                      <BiBowlRice className="mr-2 h-5 w-5 text-gray-500" />
                      Set Feeding Ration
                    </Button>
                  </DialogTrigger>

                  <DialogContent className=" rounded-2xl">
                    <CardHeader>
                      <CardTitle className="flex">
                        <span className="mr-2 bg-[#CCE6DA] border-b rounded-full p-2">
                          <BiSolidBowlRice className="text-green-500" />
                        </span>
                        <span className="mt-2 flex items-center">
                          Set Feed Ration
                        </span>
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <SetFeedRation
                        row={row}
                        onRationCreated={handleRationCreated}
                      />
                    </CardContent>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="text"
                      className="flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                    >
                      <BiBowlRice className="mr-2 h-5 w-5 text-gray-500" />
                      Record Sale
                    </Button>
                  </DialogTrigger>

                  <DialogContent className=" rounded-2xl">
                    <RecordSale row={row} />
                  </DialogContent>
                </Dialog>

                <Button
                  variant="text"
                  className="flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                >
                  <LiaBabySolid className="mr-2 h-5 w-5 text-gray-500" />
                  Record Birth
                </Button>
                <Button
                  variant="text"
                  className="flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                >
                  <TbGrave2 className="mr-2 h-5 w-5 text-gray-500" />
                  Record Death
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="text"
                      className="flex w-full items-center justify-start px-2 py-2 text-red-500 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                    >
                      <FaRegTrashAlt className="mr-2 h-5 w-5 text-red-500" />
                      Delete Livestock
                    </Button>
                  </DialogTrigger>

                  <DialogContent className=" rounded-2xl">
                    <CardHeader>
                      <CardTitle className="flex">
                        <span className="mr-2 bg-red-200  border-b rounded-full p-2">
                          <FaRegTrashAlt className="text-red-500 " />
                        </span>
                        <span className="mt-2"> Delete Livestock</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* <DialogTitle>Are you sure you want to permanently delete Livestock Name/ID from your farm?</DialogTitle> */}
                      <DialogDescription className="font-medium text-black">
                        Are you sure you want to permanently delete Livestock{" "}
                        {row.name}
                        {""} from your farm?
                      </DialogDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-4">
                      <DialogClose asChild>
                        <Button className="bg-white text-black shadow-md w-full">
                          Cancel
                        </Button>
                      </DialogClose>

                      <Button
                        className="bg-red-500 w-full text-white"
                        onClick={() => onDeleteItem([row.uuid])}
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          >
            <ActionIcon variant="text">
              <PiDotsThreeOutlineVerticalFill className="h-[18px] w-[18px] text-gray-500" />
            </ActionIcon>
          </Popover>
        </div>
      ),
    },
  ];
};
