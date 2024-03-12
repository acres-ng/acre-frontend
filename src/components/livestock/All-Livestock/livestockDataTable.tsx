import { useCallback, useMemo, useState } from "react";
import React, { lazy } from "react";
import { useTable } from "../../hooks/use-table";
import { useColumn } from "../../hooks/use-column";
import { Button } from "rizzui";
import ControlledTable from "../ControlledTable";
import { getColumns } from "./livestockColumns";
import HttpService from "@/services/HttpService";
import { API_URL } from "@/config";
import { toast } from "sonner";
import { getActiveFarm } from "@/services/farmService";

const TableFooter = lazy(() => import("../table-footer"));

const filterState = {
  role: "",
  status: "",
};

interface IProp {
  data: any[];
  handleRationCreated: () => void;
}

export default function LivestockDataTable({ data = [], handleRationCreated }: IProp) {
  const [pageSize, setPageSize] = useState(10);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });
  
  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(data, pageSize, filterState);


  const onDeleteItem = useCallback(async (uuid: string | string[]) => {
    console.log("Deleting livestock", uuid);
    try {
        const userActiveFarmId = getActiveFarm().id;
        const response = await HttpService.delete(
            `${API_URL}farms/${userActiveFarmId}/livestock`,
            {
                ...HttpService.getDefaultOptions(),
                data: uuid,
            }
        );

        if (response.data) {
            handleDelete(uuid, "uuid");
            setSelectedRowKeys([]);
            toast.success("Livestock deleted successfully!"); 
        } else {
        }
    } catch (error) {
    }
}, []);


  const columns = useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
        handleRationCreated,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
      handleRationCreated,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <div className="mt-14">
      <TableFooter checkedItems={selectedRowKeys} onDeleteItem={onDeleteItem} />
      <ControlledTable
        variant="modern"
        data={tableData}
        isLoading={isLoading}
        showLoadingText={true}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        // tableFooter={

        // }
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
