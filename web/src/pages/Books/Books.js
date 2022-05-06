import React, { useState } from "react";
import { PageHeader } from "../../components";
import { ImBooks } from "react-icons/im";
import {
  makeStyles,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button, Typography, Avatar, withStyles 
} from "@material-ui/core";
import { IoBan } from "react-icons/io5";
import {IoIosInformationCircle } from "react-icons/io";
import useTable from "../../components/useTable";
import Modal from "./BookModal";
import "./Books.css";


const headCells = [
  { id: "no", label: "#NO" },
  { id: "img", label: "Book's image" },
  { id: "book", label: "Book" },
  { id: "content", label: "Content" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const records = [
  {
    bookID: "book1",
    name: "Đắc Nhân Tâm",
    img: "https://lh3.googleusercontent.com/proxy/FDaBh40hS95NWfB2TN66vK3tED-pVl5JeiCVehfyJSb7vr1vlObH85Bf-dsfsKQpIMsAKJjOTL0H4L-IAGl4X5I0kRt6VaGFtQL1LrXjKartuPgU9eZyqA7LZx1OjNr5_nJo61lFx9Y30mcPi1hyFME2rVDleA",
    category: "Social skill",
    status: true,
    price: 1234567890,
    author: "Dale Carnegie ",
    content: "Đắc nhân tâm, tên tiếng Anh là How to Win Friends and Influence People là một quyển sách nhằm tự giúp bản thân bán chạy nhất từ trước đến nay. Quyển sách này do Dale Carnegie viết và đã được xuất bản lần đầu vào năm 1936,",
    page: 123,
    new: "90%",
    frontImg: "https://images-na.ssl-images-amazon.com/images/I/51lbHL4PURL._SX347_BO1,204,203,200_.jpg",
    backImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXbdqdE0bVyZOSXU4-SQZffz7NkfcEuqx1Kg&usqp=CAU",
    uploader: "A",
  },
  {
    bookID: "book2",
    name: "Quảng gánh lo đi & vui sống",
    img: "https://cf.shopee.vn/file/cd67bda7d5a3a7824cf9886116d44398",
    category: "Social skill",
    status: true,
    price: 1234567890,
    author: "Dale Carnegie",
    content: "Bất kỳ ai đang sống đều sẽ có những lo lắng thường trực về học hành, công việc, những hoá đơn, chuyện nhà cửa,... Cuộc sống không dễ dàng giải thoát bạn khỏi căng thẳng, ngược lại, nếu quá lo lắng, bạn có thể mắc bệnh trầm cảm. Quẳng Gánh Lo Đi Và Vui Sống khuyên bạn hãy khóa chặt dĩ vãng và tương lai lại để sống trong cái phòng kín mít của ngày hôm nay",
    page: 123,
    new: "90%",
    frontImg: "https://www.tranhungbinh.com/wp-content/uploads/2018/12/Qu%E1%BA%B3ng-G%C3%A1nh-Lo-%C4%90i-V%C3%A0-Vui-S%E1%BB%91ng.jpg",
    backImg: "https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/q/u/quang_ganh_lo_di.jpg",
    uploader: "B-san",
  },
  {
    bookID: "book3",
    name: "Nhà Giả Kim",
    img: "https://sach.blog/wp-content/uploads/2020/12/ngk.jpg",
    category: "Social skill",
    status: true,
    price: 1234567890,
    author: "O Alquimista",
    content: "Một câu chuyện đơn giản về cậu bé chăn cừu vốn mộng mơ về những chuyến phiêu lưu định mệnh, vô tình gặp được một vị thầy bói có năng lực đặc biệt, và sau đó là hành trình từ giấc mơ trở thành đời thực của cậu chàng trong chuyến đi tìm kho báu truyền thuyết",
    page: 123,
    new: "90%",
    frontImg: "https://chomientay.vn/wp-content/uploads/2018/12/Nh%C3%A0-Gi%E1%BA%A3-Kim.jpg",
    backImg: "https://revisach.com/wp-content/uploads/2020/07/review-cuon-sach-nha-gia-kim-revisach.com_.jpg",
    uploader: "CCC",
  },
  {
    bookID: "book3",
    name: "Tuổi trẻ đáng giá bao nhiêu",
    img: "https://revisach.com/wp-content/uploads/2020/06/review-sach-tuoi-tre-dang-gia-bao-nhieu-rosie-nguyen-3.png",
    category: "Social skill",
    status: true,
    price: 1234567890,
    author: "Rosie Nguyễn",
    content: "Tác giả Rosie Nguyễn đã chia cuốn sách này thành 5 phần, mỗi phần là một câu chuyện định hướng bản thân thông qua những sự lựa chọn Học - Làm - Đi, từ đó giúp lan tỏa thông điệp tự khám phá bản thân dành cho người trẻ theo hướng tích cực nhất.",
    page: 123,
    new: "90%",
    frontImg: "https://salt.tikicdn.com/media/catalog/product/t/u/tuoi-tre-dang-gia-bao-nhieu-u547-d20161012-t113832-888179.u3059.d20170616.t095744.390222.jpg",
    backImg: "https://cf.shopee.vn/file/6d0c91656b475c5e0ca7311df9eb7032",
    uploader: "DDD",
  },
  {
    bookID: "book4",
    name: "Les Misérables",
    img: "https://bizweb.dktcdn.net/thumb/large/100/351/397/products/2727504les-miserables-victor-hugo-jpeg.jpg?v=1553858087473",
    category: "Novel",
    status: true,
    price: 1234567890,
    author: "Victor Hugo",
    content: "Les Misérables là tiểu thuyết của văn hào Pháp Victor Hugo, được xuất bản năm 1862. Tác phẩm được đánh giá là một trong những tiểu thuyết nổi tiếng nhất của nền văn học thế giới thế kỷ 19.",
    page: 123,
    new: "90%",
    frontImg: "https://salt.tikicdn.com/cache/w444/media/catalog/product/5/1/51p01h3dztl-_sx300_bo1-204-203-200_.u547.d20161031.t140437.77439.jpg",
    backImg: "https://upload.wikimedia.org/wikipedia/commons/9/99/Ebcosette.jpg",
    uploader: "FFFF",
  },

  {
    bookID: "book5",
    name: "Trên Đường Băng",
    img: "https://trenkesach.com/wp-content/uploads/2018/08/review-sach-tren-duong-bang-tony-buoi-sang.jpg",
    category: "Social skill",
    status: true,
    price: 1234567890,
    author: "Tony Buổi Sáng",
    content: "Trên đường băng là tập hợp những bài viết được ưa thích trên Facebook của Tony Buổi Sáng. Nhưng khác với một tập tản văn thông thường, nội dung các bài được chọn lọc có chủ đích, nhằm chuẩn bị về tinh thần, kiến thức…cho các bạn trẻ vào đời. ",
    page: 123,
    new: "90%",
    frontImg: "https://salt.tikicdn.com/cache/w1200/media/catalog/producttmp/b4/4b/a1/653f4d8ddf4f85f0ad7910d7456afead.jpg",
    backImg: "https://khangvietbook.com.vn/upload/product/254066_bia%20sau.gif",
    uploader: "GGGG",
  },

  {
    bookID: "book6",
    name: "Cà phê cùng Tony",
    img: "https://reviewsach.net/wp-content/uploads/2019/04/Review-sa%CC%81ch-Cafe-cu%CC%80ng-Tony-reviewsach.net_.jpg",
    category: "Social skill",
    status: true,
    price: 1234567890,
    author: "Tony Buổi Sáng",
    content: "Cà phê cùng Tony là sự tập hợp các bài viết trên trạng mạng xã hội của tác giả Tony Buổi Sáng (TnBS) về những bài học, câu chuyện anh đã trải nghiệm trong cuộc sống. Đó có thể là cách anh chia sẻ với các bạn trẻ về những chuyện to tát như khởi nghiệp,đạo đức kinh doanh, học tập đến những việc nhỏ nhặt như ăn mặc, giao tiếp, vệ sinh cơ thể… sao cho văn minh, lịch sự.",
    page: 123,
    new: "90%",
    frontImg: "https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/u/n/untitled-9_19.jpg",
    backImg: "adfsdf",
    uploader: "GGGG",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
    button: {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  buttonRemoved:{
    backgroundColor:"red",
    color:"white"
  },
  buttonInfo: {
    backgroundColor:"#00e5ff",
    color:"white"
  }
}));




function Books() {
  const classes = useStyles();
  const [books, setBooks] = useState(records);
  const [book, setBook] = useState(null);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingSorting } =
    useTable(records, headCells);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (book) => {
    setOpen(true);
    setBook(book);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (book) => {
    let editedBook = books.find((found) => found.bookID === book.bookID);
    const position = books.indexOf(editedBook);

    editedBook = { ...editedBook, status: !book?.status };
    books[position] = { ...editedBook };
    setBooks([...books]);
  };
  


  const rowData = recordsAfterPagingSorting(books);

  return (
    <div className="wrapper" style={{ marginTop: "3rem" }}>
      <PageHeader
        title="Books Lending"
        subTitle="Manage lending and returning in the system"
        icon={<ImBooks style={{ fontSize: "1.8rem" }} />}
      />
      <Paper className={classes.pageContent}>
        <TblContainer>
          <TblHead />
          <TableBody>
            {rowData.map((item, index) => (
              <TableRow  hover key={item?.bookID}>
                <TableCell>{++index}</TableCell>
                <TableCell>
             <Avatar  variant="square" src={item?.img} className={classes.avatar} />

                </TableCell>
                <TableCell>
                <Typography style={{ marginBottom: "1rem" }} variant="h5" color="initial">{item?.name}</Typography> 
                <Typography>
                <Typography  style={{display: 'inline-block', textAlign: 'left'}} variant="subtitle2" color="initial">Category: </Typography>        
                <span>{item?.category}</span>
              </Typography>
                <Typography>
                 <Typography style={{display: 'inline-block'}} variant="subtitle2" color="initial">Author: </Typography> 
                  <span>{item?.author}</span>
                </Typography>
              <Typography>

                   <Typography style={{display: 'inline-block'}} variant="subtitle2" color="initial">Price: </Typography> 
                 <span>{item?.price}</span>
              </Typography>

                   <Typography style={{display: 'inline-block'}} variant="subtitle2" color="initial">Uploader: </Typography> 
                  <span>{item?.uploader}</span>
                  
                    </TableCell>
                <TableCell style={{padding: 50}} > 
               
                <Typography variant="subtitle1" color="initial">{item?.content}</Typography> 
                  </TableCell>               
                <TableCell>
                  <Chip
                    className={classes.root}
                    style={
                      item?.status
                        ? { background: "#4caf50", color: "white" }
                        : { background: "#f44336", color: "white" }
                    }
                    label={item?.status ? "Accepted" : "Removed"}
                  />
                </TableCell>
                <TableCell>
                  <Button
                   style={{marginRight: "10px"}}
                  size="small"
                    variant="contained"
                   
                    className={(classes.root, classes.buttonRemoved)}
                    startIcon={<IoBan />}
                    onClick={() => handleStatusChange(item)}
                  > Removed</Button>

                  <Button
                  size="small"
                    variant="contained"
            
                    onClick={() => handleClickOpen(item)}
                    className={(classes.root, classes.buttonInfo)}
                    books={item}
                    startIcon={<IoIosInformationCircle/>}
                  > Info</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>

      <Modal book={book} handleClose={handleClose} open={open} />
    </div>
  );
}

export default Books;
