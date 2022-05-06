import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
} from "@material-ui/core";

export default function useTable(records, headCells) {
  const pages = [5, 10, 15];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pages[page]);

  const TblContainer = (props) => <Table>{props.children}</Table>;

  const TblHead = (props) => {
    return (
      <TableHead
        align="center"
        style={{
          background: "linear-gradient(45deg, #C73304 10%, #7a2e19 90%)",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              style={{
                color: "white",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
              }}
              key={headCell.id}
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  // handle change Page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handlChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 10);
    setPage(0);
  };
  const recordsAfterPagingSorting = (listRecords) => {
    return listRecords.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handlChangeRowsPerPage}
    />
  );
  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingSorting,
  };
}
