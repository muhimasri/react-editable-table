import { useState, useEffect, ChangeEvent } from "react";
import "./table.css";

type Option = {
  label: string;
  value: string;
};

export const TableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    validate(e);
    tableMeta?.updateData(
      row.index,
      column.id,
      value,
      !e.target.validity.valid
    );
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    validate(e);
    tableMeta?.updateData(
      row.index,
      column.id,
      e.target.value,
      !e.target.validity.valid
    );
  };

  const validate = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.validity.valid) {
      setError("");
    } else {
      setError(e.target.validationMessage);
    }
  };

  if (tableMeta?.editedRows[row.id]) {
    return (
      <div>
        {columnMeta?.type === "select" ? (
          <select
            onChange={onSelectChange}
            value={initialValue}
            required={columnMeta?.required}
          >
            {columnMeta?.options?.map((option: Option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            type={columnMeta?.type || "text"}
            required={columnMeta?.required}
          />
        )}
        <div>{error}</div>
      </div>
    );
  }
  return <span>{value}</span>;
};
