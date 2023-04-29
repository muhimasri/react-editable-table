import React, { useEffect, useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return table.options.meta?.selectedRow[row.id] ? (
    column.columnDef.meta?.type === "select" ? (
      <select
        onChange={(e) => {
          setValue(e.target.value);
          table.options.meta?.updateData(row.index, column.id, e.target.value);
        }}
      >
        {column.columnDef.meta?.options?.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    ) : (
      <input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={column.columnDef.meta?.type || "text"}
      />
    )
  ) : (
    <span>{value}</span>
  );
};

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.display({
    id: "edit",
    cell: ({
      table: {
        options: { meta },
      },
      row,
    }) =>
      meta?.selectedRow[row.id] ? (
        <span
          onClick={() =>
            meta?.setSelectedRow((old) => ({
              ...old,
              [row.id]: false,
            }))
          }
        >
          Done
        </span>
      ) : (
        <span
          onClick={() =>
            meta?.setSelectedRow((old) => ({
              ...old,
              [row.id]: true,
            }))
          }
        >
          Edit
        </span>
      ),
  }),
  columnHelper.accessor("firstName", {
    cell: EditableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: EditableCell,
    meta: {
      type: "text",
    },
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: EditableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
    cell: EditableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: EditableCell,
    meta: {
      type: "select",
      options: [
        { value: "Single", label: "Single" },
        { value: "In Relationship", label: "In Relationship" },
        { value: "Complicated", label: "Complicated" },
      ],
    },
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
    cell: EditableCell,
    meta: {
      type: "number",
    },
  }),
];

export const EdtiableTableFull = () => {
  const [data, setData] = React.useState(() => [...defaultData]);
  const [selectedRow, setSelectedRow] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      selectedRow,
      setSelectedRow,
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugAll: true,
  });

  return (
    <>
      <table class="styled-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(data, null, "\t")}</pre>
    </>
  );
};
