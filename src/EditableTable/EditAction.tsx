export const EditAction = ({ row, table }) => {
  const meta = table.options.meta;

  const setSelectedRow = (e) => {
    meta?.setSelectedRow((old) => ({
      ...old,
      [row.id]: !old[row.id],
    }));

    meta?.revertData(row.index, e.target.name === "cancel");
  };

  return meta?.selectedRow[row.id] ? (
    <>
      <button onClick={setSelectedRow} name="cancel">
        X
      </button>{" "}
      <button onClick={setSelectedRow} name="done">
        ✔
      </button>
    </>
  ) : (
    <button onClick={setSelectedRow}>✐</button>
  );
};
