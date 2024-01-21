
import { STATUSES, type User } from './users-data';
// import { routes } from '@/config/routes';
import { Text } from 'rizzui';
import { Badge } from 'rizzui';
import { Tooltip } from 'rizzui';
import { HeaderCell } from './table';
import { Checkbox } from 'rizzui';
import { ActionIcon } from 'rizzui';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from './delete-popover';
 import { CiSquareMinus } from "react-icons/ci";
 import { CiSquarePlus } from "react-icons/ci";

function getStatusBadge(status: User['status']) {
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

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: (
      <div className="flex items-center gap-3 whitespace-nowrap ps-2">
        <Checkbox
          title={'Select All'}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
       Feed Name/ID
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: User) => (
      <div className="inline-flex ps-2">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
          label={`${row.id}`}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Livestock Type" />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 150,
    hidden: 'fullName',
    render: (_: string, user: User) => (
      <AvatarCard
      className='ps-'
        src={user.avatar}
        name={user.fullName}
        
      />
    ),
  },
  {
    title: (
      <HeaderCell
        title="Unit Weight"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'role'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('role'),
    dataIndex: 'role',
    key: 'role',
    width: 150,
    render: (role: string) => role,
  },
  {
    title: (
      <HeaderCell
        title="Price per Unit"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 150,
    // render: (value: Date) => <DateCell date={value} />,
    // render: (value: string) => price(value),
    render: (price: User['price']) => price,  
  },
  {
    title: <HeaderCell title="Feed Stock" />,
    dataIndex: 'permissions',
    key: 'permissions',
    width: 150,
    render: () => (
      <div className="w-max flex justify-center">
        <span><CiSquareMinus /></span>
        <span>5</span>
        <span><CiSquarePlus /></span>
      </div>
    ),
    
    
  },
  {
    title: <HeaderCell title="Total Weight" />,
    dataIndex: 'status',
    key: 'status',
    width: 120,
    // render: (status: User['status']) => getStatusBadge(status),
    render: () => (
      <div className="w-max flex justify-center">
        <h2>200kg</h2>
      </div>
    ),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 140,
    render: (_: string, user: User) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip
          size="sm"
          content={() => 'Edit User'}
          placement="top"
          color="invert"
        >
          {/* <Link href={routes.invoice.edit(user.id)}> */}
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:!border-gray-900 hover:text-gray-700"
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
          {/* </Link> */}
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View User'}
          placement="top"
          color="invert"
        >
          {/* <Link href={routes.invoice.details(user.id)}> */}
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:!border-gray-900 hover:text-gray-700"
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
          {/* </Link> */}
        </Tooltip>
        <DeletePopover
          title={`Delete this user`}
          description={`Are you sure you want to delete this #${user.id} user?`}
          onDelete={() => onDeleteItem(user.id)}
        />
      </div>
    ),
  },
];
