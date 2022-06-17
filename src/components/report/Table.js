import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import { Button, PageButton } from "./shared/Button";
import { classNames } from "./shared/Utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "./shared/Icons";
import { NavLink } from "react-router-dom";
import { Trans } from "react-i18next";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">
        <Trans i18nKey="report.Search">Search</Trans> :{" "}
      </span>
      <input
        type="text"
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder=""
      />
    </label>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">
        <Trans i18nKey="report.ShowSpamStatus">Show Spam Status</Trans> : :{" "}
      </span>
      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        data-cy="select-spam"
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option color="brown" key={i} value={option}>
            {option ? "Spam" : "Non Spam"}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ReportStatusColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        data-cy="select-status"
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option === "UNRESOLVED"
              ? "UnResolved"
              : option === "RESOLVED"
              ? "Resolved"
              : "Rejected"}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ReportUser({ value }) {
  return (
    <span
      className={classNames(
        "px-3 py-1 camelcase leading-wide font-bold text-xs rounded-full shadow-sm",
        value.startsWith("RESOLVED") ? "bg-green-100 text-green-800" : null,
        value.startsWith("UNRESOLVED") ? "bg-yellow-100 text-yellow-800" : null,
        value.startsWith("REJECTED") ? "bg-red-100 text-red-800" : null
      )}
    >
      <NavLink to={`/report_show/:id${value}`} exact>
        {" "}
        {value}
      </NavLink>
    </span>
  );
}

export function StatusPill({ value }) {
  return (
    <span
      className={classNames(
        "px-3 py-1 camelcase leading-wide font-bold text-xs rounded-full shadow-sm",
        value.startsWith("RESOLVED") ? "bg-green-100 text-green-800" : null,
        value.startsWith("UNRESOLVED") ? "bg-black-100 text-black-800" : null,
        value.startsWith("REJECTED") ? "bg-red-100 text-red-800" : null
      )}
    >
      {/* <NavLink to={`/report_show/${value}`} exact> */}
      {/* {" "} */}
      {value}
      {/* </NavLink> */}
    </span>
  );
}

export function SpamStatus({ value }) {
  console.log("Value", value);
  const status = value ? "Spam" : "Non Spam";
  return (
    <span
      className={classNames(
        "px-3 py-1 camelcase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("Spam") ? "bg-red-100 text-red-800" : null,
        status.startsWith("Non Spam") ? "bg-green-100 text-green-800" : null
      )}
    >
      {status}
      {/* <NavLink to={`/report_show/${value}`} exact> {status}</NavLink> */}
    </span>
  );
}

export function StatePill({ value }) {
  const status = value ? "Seen" : "unSeen";
  return (
    <span
      className={classNames(
        "px-3 py-1 camelcase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("unSeen") ? "bg-green-100 text-green-800" : null,
        status.startsWith("Seen") ? "bg-yellow-100 text-yellow-800" : null
      )}
    >
      {status}
      {/* <NavLink to={`/report_show/${value}`} exact> {status}</NavLink> */}
    </span>
  );
}

function toDate(date) {
  return new Date(date).toDateString();
}

export function phoneNumberCell({ value, column, row }) {
  return (
    <div className="flex items-center">
      <div className="ml-4">
        {!row.original[column.idAccessor] ? (
          <div className="text-sm font-normal text-black-900">{value}</div>
        ) : (
          <div className="text-sm  font-normal text-gray-700">{value}</div>
        )}
      </div>
    </div>
  );
}
export function sectorCell({ value, column, row }) {
  return (
    <div className="flex items-center">
      <div className="ml-4">
        {!row.original[column.idAccessor[0]] ? (
          <div className="text-sm font-normal text-black-900">{value}</div>
        ) : (
          <div className="text-sm bold font-normal text-gray-700">{value}</div>
        )}

        <div className="text-sm text-gray-700">
          {row.original[column.idAccessor[1]]}
        </div>
      </div>
    </div>
  );
}
export function PostedAtCell({ value, row, column }) {
  return (
    <span
      className={classNames(
        !row.original[column.idAccessor]
          ? "px-3 py-1 uppercase leading-wide text-black-900 font-normal text-xs"
          : "text-sm  font-normal text-gray-700"
      )}
    >
      {toDate(value)}
    </span>
  );
}

export function AvatarCell({ value, column, row }) {
  return (
    <div className="flex items-center">
      <div className="ml-4">
        <NavLink
          to={`/sector/reports/${row.original[column.idAccessor[1]]}`}
          exact
          data-cy="a-report-detail"
        >
          {!row.original[column.idAccessor[0]] ? (
            <div className="text-sm font-normal  text-black-900">{value}</div>
          ) : (
            <div className="text-sm bold font-normal text-gray-700">
              {value}
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
}

export function LelaCell({ value, column, row }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img className="h-10 w-10 rounded-full" src={value} alt="" />
      </div>
    </div>
  );
}

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["spamStatus"],
      },
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination // new
  );

  // Render the UI for your table
  return (
    <>
      {data && (
        <div>
          <div className="sm:flex sm:gap-x-2">
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column) =>
                column.Filter ? (
                  <div className="mt-2 sm:mt-0" key={column.id}>
                    {column.render("Filter")}
                  </div>
                ) : null
              )
            )}
          </div>

          <div className="mt-4 flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table
                    {...getTableProps()}
                    className="min-w-full divide-y divide-gray-200"
                  >
                    <thead className="bg-gray-50">
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th
                              scope="col"
                              className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                            >
                              <div className="flex items-center justify-between">
                                {column.render("Header")}
                                {/* Add a sort direction indicator */}
                                <span>
                                  {column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <SortDownIcon className="w-4 h-4 text-gray-400" />
                                    ) : (
                                      <SortUpIcon className="w-4 h-4 text-gray-400" />
                                    )
                                  ) : (
                                    <SortIcon className="w-4 h-4 text-gray-400 opacity-100 group-hover:opacity-100" />
                                  )}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody
                      {...getTableBodyProps()}
                      className="bg-gray  divide-y divide-gray-200"
                      data-cy="tbl-reports"
                      name="tbl-reports"
                    >
                      {page.map((row, i) => {
                        // new
                        prepareRow(row);
                        return (
                          <tr data-cy="tbl-reports" {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <td
                                  {...cell.getCellProps()}
                                  className="px-6 py-4  whitespace-nowrap"
                                  role="cell"
                                >
                                  {cell.column.Cell.name ===
                                  "defaultRenderer" ? (
                                    <div className="text-sm  text-black-500">
                                      {/* <NavLink to="/maps" exact> <Button >{cell.render('Cell')}</Button></NavLink> */}
                                      {cell.render("Cell")}
                                    </div>
                                  ) : (
                                    // : <NavLink to="/reports" exact> <Button >{cell.render('Cell')}</Button></NavLink>
                                    cell.render("Cell")
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* Pagination */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </Button>
              <Button onClick={() => nextPage()} disabled={!canNextPage}>
                Next
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div className="flex gap-x-2 items-baseline">
                <span className="text-sm text-gray-700">
                  <Trans i18nKey="page">Page</Trans>{" "}
                  <span className="font-medium">{state.pageIndex + 1}</span>{" "}
                  <Trans i18nKey="of">of</Trans>{" "}
                  <span className="font-medium">{pageOptions.length}</span>
                </span>
                <label>
                  <span className="sr-only">Items Per Page</span>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={state.pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {[5, 10, 20].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                      // <Trans i18nKey="show">Show</Trans>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <PageButton
                    className="rounded-l-md"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    <span className="sr-only">First</span>
                    <ChevronDoubleLeftIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </PageButton>
                  <PageButton
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </PageButton>
                  <PageButton
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </PageButton>
                  <PageButton
                    className="rounded-r-md"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    <span className="sr-only">Last</span>
                    <ChevronDoubleRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </PageButton>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Table;
