import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button, withStyles, createMuiTheme
} from "@material-ui/core";

import {Rating} from "@material-ui/lab"
import { ImUsers } from "react-icons/im";
import { IoBan } from "react-icons/io5";
import {IoIosInformationCircle } from "react-icons/io";
import { PageHeader } from "../../components";
import useTable from "../../components/useTable";
import Modal from "./AccountModal";
import "./Accounts.css";


const headCells = [
  { id: "no", label: "#NO" },
  { id: "email", label: "Email" },
  { id: "name", label: "Full Name" },
  { id: "mobile", label: "Mobile Number" },
  { id: "rating", label: "Rating" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];
const records = [
  {
    username: "user1",
    email: "lanlnhse140961@fpt.edu.vn",
    fullName: "Nguyễn Văn A",
    favorite: "science, fiction",
    birthday: 20005/12/2,
    rating: 4,
    mobile: 1234567890,
    status: true,
    address: "Quận 9",
  },
  {
    username: "user2",
    email: "teo@fpt.edu.vn",
    fullName: "Phạm Thị B",
    favorite: "science, fiction",
    birthday: 1983/1/5,
    rating: 3,
    mobile: 1234567890,
    status: true,
    address: "Quận 9",
  },
  {
    username: "user3",
    email: "no@fpt.edu.vn",
    fullName: "Lê Văn C",
    birthday: 1979/1/29,
    favorite: "science, fiction",
    rating: 3,
    mobile: 1234567890,
    status: true,
    address: "Quận 9",
  },
  {
    username: "user4",
    email: "ti@fpt.edu.vn",
    rating: 2,
    birthday: 1993/1/31,
    fullName: "Trần Thị D",
    favorite: "science, fiction",
    mobile: 1234567890,
    status: true,
    address: "Quận 9",
  },
  {
    username: "user5",
    email: "asan@fpt.edu.vn",
    rating: 1,
    birthday: 1975/7/16,
    fullName: "Nguyễn Văn A",
    favorite: "science, fiction",
    mobile: 1234567890,
    status: true,
    address: "Quận 9",
  },

  {
    username: "user6",
    email: "aa@fpt.edu.vn",
    rating: 4,
    birthday: 1972/11/11,
    fullName: "Nguyễn Văn A",
    favorite: "science, fiction",
    mobile: 1234567890,
    status: true,
    address: "Quận 9",
  },

  {
    username: "user7",
    email: "fn@fpt.edu.vn",
    rating: 5,
    birthday: 1986/9/22,
    fullName: "Nguyễn Văn A",
    favorite: "science, fiction",
    mobile: 1234567890,
    status: true,
    address: "Quận 9",
  },
];




const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);



const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
    button: {
      margin: theme.spacing(1),
    },
   
  },
  buttonRemoved:{
    background: "red",
    color: "white"
  },
  buttonInfo: {
    backgroundColor:"#00e5ff",
    color:"white"
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7a2e19",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
})



function Accounts() {
  const classes = useStyles();
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingSorting } =
    useTable(records, headCells);
  const [users, setUsers] = useState(records);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  //   const [status, setStatus] = useState(true);

  const handleClickOpen = (user) => {
    setOpen(true);
    setUser(user);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (user) => {
    let editedUser = users.find((found) => found.username === user.username);
    const position = users.indexOf(editedUser);

    editedUser = { ...editedUser, status: !user?.status };
    users[position] = { ...editedUser };
    setUsers([...users]);
  };

  const rowData = recordsAfterPagingSorting(users);

  return (
    <div className="wrapper" style={{ marginTop: "4rem" }}>
      <PageHeader
        title="Accounts"
        subTitle="Manage all accounts in the system"
        icon={<ImUsers style={{ fontSize: "1.8rem" }} />}
      />
      <Paper className={classes.pageContent}>
        <TblContainer>
          <TblHead />
          <TableBody>
            {rowData.map((item, index) => (
              <StyledTableRow key={item?.username}>
                <StyledTableCell>{++index}</StyledTableCell>  
                <StyledTableCell>{item?.email}</StyledTableCell>
                <StyledTableCell>{item?.fullName}</StyledTableCell>
                <StyledTableCell>{item?.mobile}</StyledTableCell>
                <StyledTableCell>
                  
                    <Rating size="medium" name="size-medium" value={item?.rating} readOnly />
               
                </StyledTableCell>
                <StyledTableCell>
                  <Chip
                    className={classes.root}
                    style={
                      item?.status
                        ? { background: "#4caf50", color: "white" }
                        : { background: "#f44336", color: "white" }
                    }
                    label={item?.status ? "Activated" : "Banned"}
                  />
                </StyledTableCell>
                <StyledTableCell>
               
                  <Button
                  style={{marginRight: "10px"}}
                    variant="contained"
                    size="small"
                    className={classes.buttonRemoved}
                    startIcon={<IoBan />}
                    onClick={() => handleStatusChange(item)}
                  >Banned</Button>

                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleClickOpen(item)}
                    className={classes.buttonInfo}
                    users={item}
                    startIcon={<IoIosInformationCircle  />}
                  >Info</Button>
                  
             
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>

      <Modal user={user} handleClose={handleClose} open={open} />
    </div>
  );
}

export default Accounts;
