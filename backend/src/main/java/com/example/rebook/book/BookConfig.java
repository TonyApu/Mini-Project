package com.example.rebook.book;

import com.example.rebook.category.Category;
import com.example.rebook.category.CategoryRepository;
import com.example.rebook.member.Member;
import com.example.rebook.notification.notificationType.NotificationType;
import com.example.rebook.notification.notificationType.NotificationTypeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class BookConfig {
    @Bean
    CommandLineRunner commandLineRunner(BookRepository repository,
                                        CategoryRepository categoryRepository,
                                        NotificationTypeRepository notificationTypeRepo) {
        return args -> {
            Member quangdoan = new Member(
                    "quangdoan",
                    "123456",
                    "Nhật Quang",
                    "Long Phước, Long Hồ District, Vinh Long, Vietnam",
                    1,
                    1,
                    1,
                    "Vĩnh Long",
                    "abc@gmail",
                    "09644"
            );

            Member lucas = new Member(
                    "lucas",
                    "123456",
                    "Lucas",
                    "Khu Tân Cảng, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, Thành phố Hồ Chí Minh, Vietnam",
                    2,
                    2,
                    2,
                    "Hồng Kông",
                    "abc@gmail",
                    "09644"
            );

            Member percy = new Member(
                    "percy",
                    "123456",
                    "Percy",
                    "106 Đường Hai Bà Trưng, Tân An, Ninh Kiều, Cần Thơ, Vietnam",
                    3,
                    3,
                    3,
                    "New York",
                    "abc@gmail",
                    "09644"
            );

            Category category1 = new Category("Sách Thiếu Nhi");
            Category category2 = new Category("Sách Văn Học");
            Category category3 = new Category("Sách Kỹ Năng Sống");
            Category category4 = new Category("Sách Kinh Tế");
            Category category5 = new Category("Sách Học Ngoại Ngữ");
            Category category6 = new Category("Sách Tham Khảo");
            Category category7 = new Category("Truyện Tranh, Manga, Comic");
            Category category8 = new Category("Sách Kiến Thức Tổng Hợp");
            Category category9 = new Category("Sách Bà Mẹ - Em Bé");
            Category category10 = new Category("Sách Chính Trị - Pháp Lý");
            Category category11 = new Category("Sách Y Học");
            Category category12 = new Category("Sách Tôn Giáo - Tâm Linh");
            Category category13 = new Category("Sách Lịch sử");
            Category category14 = new Category("Sách Thường Thức - Gia Đình");
            Category category15 = new Category("Sách Khoa Học - Kỹ Thuật");
            Category category16 = new Category("Sách Văn Hóa - Địa Lý - Du Lịch");
            Category category17 = new Category("Sách Giáo Khoa - Giáo Trình");
            Category category18 = new Category("Từ Điển");
            Category category19 = new Category("Điện Ảnh - Nhạc - Họa");
            Category category20 = new Category("Sách Tâm lý - Giới tính");
            Category category21 = new Category("Thể Dục - Thể Thao");
            Category category22 = new Category("Tạp Chí - Catalogue");
            Category category23 = new Category("Sách Công Nghệ Thông Tin");
            Category category24 = new Category("Sách Nông - Lâm - Ngư Nghiệp");

            List<Category> categoryList = new ArrayList<>();
            categoryList.add(category1);
//            categoryList.add(category2);
//            categoryList.add(category3);
            categoryList.add(category4);
            categoryList.add(category5);
            categoryList.add(category6);
            categoryList.add(category7);
            categoryList.add(category8);
            categoryList.add(category9);
            categoryList.add(category10);
            categoryList.add(category11);
            categoryList.add(category12);
            categoryList.add(category13);
            categoryList.add(category14);
            categoryList.add(category15);
            categoryList.add(category16);
            categoryList.add(category17);
            categoryList.add(category18);
            categoryList.add(category19);
            categoryList.add(category20);
            categoryList.add(category21);
            categoryList.add(category22);
            categoryList.add(category23);
            categoryList.add(category24);
            categoryRepository.saveAll(categoryList);


            Book book1 = new Book(
                    "Bố Già",
                    "Mario Puzo",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/bo-gia-front-side.jpg?alt=media&token=3024cf7e-9b03-4452-9853-c85af0a67d1d",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/bo-gia-back-side.jpg?alt=media&token=d6b43ea3-4033-4e78-87d9-bc75d3692a1c",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/bo-gia-total-side.jpg?alt=media&token=f0000976-c135-41c8-b1c7-c5a1010b7836",
                    "Nhà Xuất Bản Đông A",
                    "Tiếng Việt",
                    301,
                    11000,
                    80,
                    false,
                    lucas,
                    category3
            );

            Book book2 = new Book(
                    "Tôi Là Bêtô",
                    "Nguyễn Nhật Ánh",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/toi-la-beto-front-side.jpg?alt=media&token=801a0c9b-b399-48d4-ae48-0c28888cecb1",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/toi-la-beto-back-side.jpg?alt=media&token=44f40ed6-f3da-4564-9251-364d28e4a0a9",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/toi-la-beto-total-side.jpg?alt=media&token=d01871f1-bcb8-43e1-a3d9-cc6c82c02c3b",
                    "Nhà xuất bản trẻ",
                    "Việt Nam",
                    229,
                    60000,
                    85,
                    false,
                    percy,
                    category2
            );

            Book book3 = new Book(
                    "Mười Người Da Đen Nhỏ",
                    "Agatha Christine",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/muoi-nguoi-da-den-nho-front-side.jpg?alt=media&token=1fdbc934-846b-4d9c-979f-ca39594ada25",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/muoi-nguoi-da-den-nho-back-side.jpg?alt=media&token=e5911397-c3c5-41c0-961f-985ddea9d4a4",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/muoi-nguoi-da-den-nho-total-side.jpg?alt=media&token=9ef276c8-4e8c-4fa1-93ef-7c6a5d159495",
                    "Nhà xuất bản trẻ",
                    "Việt Nam",
                    269,
                    85000,
                    90,
                    false,
                    quangdoan,
                    category2
            );

            Book book4 = new Book(
                    "Cánh Đồng Bất Tận",
                    "Nguyễn Ngọc Tư",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/canh-dong-bat-tan-front-end.jpg?alt=media&token=93fcdc74-ed8a-4ca8-9e98-437b26278a29",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/canh-dong-bat-tan-back-end.jpg?alt=media&token=3c539957-c56a-4d2c-86d2-1ca2d7499bfd",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/canh-dong-bat-tan-total-end.jpg?alt=media&token=9b809d76-ee26-451b-83b3-e2daf3434255",
                    "Nhà xuất bản trẻ",
                    "Việt Nam",
                    269,
                    85000,
                    90,
                    false,
                    quangdoan,
                    category2
            );

            Book book5 = new Book(
                    "Con Trai Người Thợ Gốm",
                    "Tony Mitton",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/con-trai-nguoi-tho-gom-front-side.jpg?alt=media&token=e9d08488-83ae-4ca3-bacf-535eb26a1681",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/con-trai-nguoi-tho-gom-back-side.jpg?alt=media&token=ad2b87b9-2c3f-487c-9cae-3ff71e649ec1",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/con-trai-nguoi-tho-gom-total-side.jpg?alt=media&token=e68344eb-3a92-4867-ae1d-2578d8d06bb0",
                    "Nhà Xuất Bản Văn Học",
                    "Việt Nam",
                    269,
                    108000,
                    90,
                    false,
                    lucas,
                    category2
            );

            Book book6 = new Book(
                    "Factfulness - Sự Thật Về Thế Giới",
                    "Hans Rosling",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/factfullness-front-side.jpg?alt=media&token=aada5bd9-f334-458a-a08c-cc6f6385c7f3",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/factfullness-back-side.jpg?alt=media&token=f899c995-a3cf-427b-9f44-5408565ca076",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/factfullness-total-side.jpg?alt=media&token=9347db5e-8afc-4115-8591-346d2f37834e",
                    "Nhà xuất bản trẻ",
                    "Việt Nam",
                    269,
                    160000,
                    90,
                    false,
                    percy,
                    category3
            );

            List<Book> bookList = new ArrayList<>();
            bookList.add(book1);
            bookList.add(book2);
            bookList.add(book3);
            bookList.add(book4);
            bookList.add(book5);
            bookList.add(book6);
            repository.saveAll(bookList);

            NotificationType type1 = new NotificationType("Request Notification");
            NotificationType type2 = new NotificationType("Request Status Notification");
            NotificationType type3 = new NotificationType("Reminder Notification");
            NotificationType type4 = new NotificationType("Cancel Reminder Notification");
            NotificationType type5 = new NotificationType("Cancel Request Notification");
            NotificationType type6 = new NotificationType("Book Notification");
            NotificationType type7 = new NotificationType("Member Banned Notification");
            notificationTypeRepo.save(type1);
            notificationTypeRepo.save(type2);
            notificationTypeRepo.save(type3);
            notificationTypeRepo.save(type4);
            notificationTypeRepo.save(type5);
            notificationTypeRepo.save(type6);
            notificationTypeRepo.save(type7);
        };
    }
}
