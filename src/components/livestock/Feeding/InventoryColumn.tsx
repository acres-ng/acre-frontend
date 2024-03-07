import { STATUSES, type User } from "../users-data";
// import { routes } from '@/config/routes';
import { Text } from "rizzui";
import { Badge } from "rizzui";
import { Tooltip } from "rizzui";
import { HeaderCell } from "../table";
import { Checkbox } from "rizzui";
import { ActionIcon } from "rizzui";
import { Popover } from 'rizzui';
import { Button } from 'rizzui';
import {
  PiCopySimple,
  PiDotsThreeOutlineVerticalFill,
  PiShareFat,
  PiTrashSimple,
} from 'react-icons/pi';
import EyeIcon from "@/components/icons/eye";
import PencilIcon from "@/components/icons/pencil";
import AvatarCard from "@/components/ui/avatar-card";
import DateCell from "@/components/ui/date-cell";
import DeletePopover from "../delete-popover";
import { CiSquareMinus } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";

function getStatusBadge(status: User["status"]) {
  switch (status) {
    case STATUSES.Deactivated:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          {/* <Text className="ms-2 font-medium text-orange-dark">{status}</Text> */}
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    case STATUSES.Active:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case STATUSES.Pending:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

type InventoryColumns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getInventoryColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: InventoryColumns) => [
 
  {
    title: (
      <HeaderCell
        title="Feed Name/ID"
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
        title="Livestock Type"
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
    width: 150,
    render: (animal_type: string) => animal_type,
  },
  {
    title: (
      <HeaderCell
        title="Weight in Stock"
        sortable
        className="text-[#000000] font-medium"
        ascending={
          sortConfig?.direction === "asc" && sortConfig?.key === "stocking_date"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick("stocking_date"),
    dataIndex: "stocking_date",
    key: "stocking_date",
    width: 150,
    render: (stocking_date: string) => stocking_date,
  },

  {
    title: (
      <HeaderCell
        title="Current Price (per kg)"
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
        title="Price Trend"
        sortable
        className="text-[#000000] font-medium"
        ascending={
          sortConfig?.direction === "asc" && sortConfig?.key === "stocking_date"
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
    render: (_: string, user: User) => (
      // <div className="flex items-center justify-end gap-3 pe-3">
      //   <Tooltip
      //     size="sm"
      //     content={() => "Edit User"}
      //     placement="top"
      //     color="invert"
      //   >
      //     {/* <Link href={routes.invoice.edit(user.id)}> */}
      //     <ActionIcon
      //       tag="span"
      //       size="sm"
      //       variant="outline"
      //       className="hover:!border-gray-900 hover:text-gray-700"
      //     >
      //       <PencilIcon className="h-4 w-4" />
      //     </ActionIcon>
      //     {/* </Link> */}
      //   </Tooltip>
      //   <Tooltip
      //     size="sm"
      //     content={() => "View User"}
      //     placement="top"
      //     color="invert"
      //   >
      //     {/* <Link href={routes.invoice.details(user.id)}> */}
      //     <ActionIcon
      //       tag="span"
      //       size="sm"
      //       variant="outline"
      //       className="hover:!border-gray-900 hover:text-gray-700"
      //     >
      //       <EyeIcon className="h-4 w-4" />
      //     </ActionIcon>
      //     {/* </Link> */}
      //   </Tooltip>
      //   <DeletePopover
      //     title={`Delete this user`}
      //     description={`Are you sure you want to delete this #${user.id} user?`}
      //     onDelete={() => onDeleteItem(user.id)}
      //   />
      // </div>

      <div className="flex items-center justify-end gap-3">
      <Popover
        placement="left"
        className="z-50 min-w-[140px] px-2 dark:bg-gray-100 bg-white [&>svg]:dark:fill-gray-100"
        content={() => (
          <div className="text-gray-900">
            <Button
              variant="text"
              className="flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
            >
              <PiCopySimple className="mr-2 h-5 w-5 text-gray-500" />
              Copy
            </Button>
            <Button
              variant="text"
              className="flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
            >
              <PiShareFat className="mr-2 h-5 w-5 text-gray-500" />
              Share
            </Button>
            <Button
              variant="text"
              className="flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
              onClick={() => onDeleteItem(user.id)}
            >
              <PiTrashSimple className="mr-2 h-5 w-5 text-gray-500" />
              Delete
            </Button>
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
