// src/Table.js
import React from "react";
// import { useTable } from "react-table";
import { useTable, useGlobalFilter, useAsyncDebounce, useFilters } from 'react-table'  // new



function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span>
        Search:{' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
        />
      </span>
    )
  }

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({
//       columns,
//       data,
//     });

    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows, 
        setGlobalFilter, 
      } = useTable({
        columns,
        data,
      },
        useFilters,
        useGlobalFilter 
      )
    
    
    
  // Render the UI for your table
  return (
      <>
      
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      
      {headerGroups.map((headerGroup) =>
        headerGroup.headers.map((column) =>
          column.Filter ? (
            <div key={column.id}>
              <label for={column.id}>{column.render("Header")}: </label>
              {column.render("Filter")}
            </div>
          ) : null
        )
      )}

      <table {...getTableProps()} border="1">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>

    <div>
        <pre>
          <code>{JSON.stringify(state, null, 2)}</code>
        </pre>
      </div>

      </>
    
  );
}

export default Table;