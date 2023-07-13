import { MouseEvent } from "react";

export const EditCell = ({ row, table }) => {
  const meta = table.options.meta;

  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };

  return meta?.editedRows[row.id] ? (
    <>
      <button onClick={setEditedRows} name="cancel">
        X
      </button>{" "}
      <button onClick={setEditedRows} name="done">
        ✔
      </button>
    </>
  ) : (
    <button onClick={setEditedRows} name="edit">
      ✐
    </button>
  );
};
