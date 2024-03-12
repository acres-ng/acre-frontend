// import { STATUSES, type User } from "../users-data";
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
        title="Unit Weight"
        sortable
        className="text-[#000000] font-medium"
        ascending={
          sortConfig?.direction === "asc" && sortConfig?.key === "unit_weight"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick("unit_weight"),
    dataIndex: "unit_weight",
    key: "unit_weight",
    width: 150,
    // render: (value: Date) => <DateCell date={value} />,
    // render: (value: string) => price(value),
    render: (unit_weight: number) => unit_weight,
  },

  {
    title: (
      <HeaderCell
        title="Price Per Unit"
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
        title="Feed Stock"
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
    width: 150,
    render: (name: string) => name,
  },
  {
    title: (
      <HeaderCell
        title="Total Weight"
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
        title="Total Price"
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
