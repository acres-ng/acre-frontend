import React, { lazy } from "react";
import isEmpty from "lodash/isEmpty";
import Table, { type TableProps } from "./table";
import { Title } from "rizzui";
import Spinner from "@/components/ui/spinner";
import type { TableFilterProps } from "./table-filter";
import type { TablePaginationProps } from "./table-pagination";
import { cn } from "@/lib/utils";
const TableFilter = lazy(() => import("./table-filter"));
const TablePagination = lazy(() => import("./table-pagination"));

type ControlledTableProps = {
  isLoading?: boolean;
  showLoadingText?: boolean;
  filterElement?: React.ReactElement;
  filterOptions?: TableFilterProps;
  paginatorOptions?: TablePaginationProps;
  tableFooter?: React.ReactNode;
  className?: string;
  paginatorClassName?: string;
} & TableProps;

export default function ControlledTable({
  // isLoading,
  filterElement,
  filterOptions,
  paginatorOptions,
  tableFooter,
  showLoadingText,
  paginatorClassName,
  className,
  ...tableProps
}: ControlledTableProps) {
  // if (isLoading) {
  //   return (
  //     <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
  //       <Spinner size="xl" />
  //       {showLoadingText ? (
  //         <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
  //           Loading...
  //         </Title>
  //       ) : null}
  //     </div>
  //   );
  // }

  return (
    <>
      {!isEmpty(filterOptions) && (
        <TableFilter {...filterOptions}>{filterElement}</TableFilter>
      )}

      <div className="relative">
        <Table
          scroll={{ x: 1300 }}
          rowKey={(record) => record.id}
          className={cn(className)}
          {...tableProps}
        />

        {tableFooter ? tableFooter : null}
      </div>

      {!isEmpty(paginatorOptions) && (
        <TablePagination
          paginatorClassName={paginatorClassName}
          {...paginatorOptions}
        />
      )}
    </>
  );
}
