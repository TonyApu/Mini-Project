/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-picker/picker';
import React, {useContext} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import {ApiContext} from '../contexts/BookDataContext';
import {UserApiContext} from '../contexts/AuthContext';
import OnBoarding from '../components/OnBoarding';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import * as requestServices from '../services/request-services';

const LineDivider = () => {
  return (
    <View style={{width: 1, paddingVertical: 5}}>
      <View
        style={{
          flex: 1,
          borderColor: COLORS.white,
          borderLeftWidth: 1,
        }}
      />
    </View>
  );
};

const BookDetail = ({route, navigation}) => {
  const [books] = useContext(ApiContext);
  const [currentUser] = useContext(UserApiContext);
  const [book, setBook] = React.useState(null);
  const [displayPicker, setDisplayPicker] = React.useState(null);
  const [myBook, setMyBook] = React.useState(null);
  const [currentBookImageIndex, setCurrentBookImageIndex] = React.useState(1);

  React.useEffect(() => {
    // eslint-disable-next-line no-shadow
    let {book} = route.params;
    setBook(book);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  const changeImage = index => {
    setCurrentBookImageIndex(index);
  };

  const handleCreateTransferRequest = async () => {
    if (myBook) {
      const data = {
        fromBookId: myBook,
        toBookId: book.bookId,
      };
      const result = await requestServices.createTransferRequest(data);
      if (result) {
        ToastAndroid.show('Yêu cầu thành công!', ToastAndroid.LONG);
        navigation.navigate('Home');
      }
    }
  };

  function renderBookInfoSection() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: COLORS.lightGray2,
            opacity: displayPicker ? 0.3 : 1,
            flex: 1,
          }}>
          <OnBoarding
            book={book}
            changeImage={changeImage}
            screen="BookDetail"
          />
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              bottom: SIZES.base,
              opacity: 0.7,
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.base,
              backgroundColor: COLORS.lightGray4,
            }}>
            <Text style={{color: COLORS.white}}>
              {currentBookImageIndex + 1} / 3
            </Text>
          </View>
          <View
            style={{
              margin: 5,
              position: 'absolute',
              bottom: SIZES.padding,
              right: SIZES.padding,
              width: 25,
              height: 25,
              color: 'tomato',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FullScreenImage', {book: book})
              }>
              <Image
                source={icons.zoom_icon}
                resizeMode="contain"
                style={{width: 40, height: 40, tintColor: COLORS.lightGray4}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function renderBookInformation() {
    return (
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}>
        {/* Location */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Image
              source={icons.location_icon}
              resizeMode="contain"
              style={{width: 20, height: 20, tintColor: COLORS.black}}
            />
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.brown,
                marginLeft: SIZES.radius,
              }}>
              {book.member.address}
            </Text>
          </View>
        </View>

        {/* Title and Author */}
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <Text style={{...FONTS.h2, color: COLORS.brown}}>{book.name}</Text>
          <Text style={{...FONTS.body4, color: COLORS.black}}>
            {book.author}
          </Text>
        </View>

        {/* Book Info */}
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            marginTop: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightBrown,
          }}>
          {/* Rating */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>90%</Text>
            <Text style={{...FONTS.body4, color: COLORS.white}}>Độ mới</Text>
          </View>

          <LineDivider />

          {/* Pages */}
          <View
            style={{
              flex: 1,
              paddingHorizontal: SIZES.radius,
              alignItems: 'center',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {book.pageNum}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.white}}>Trang</Text>
          </View>

          <LineDivider />

          {/* Language */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {book.language}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.white}}>Ngôn ngữ</Text>
          </View>
        </View>

        {/* More Information */}
        <View style={{paddingTop: SIZES.radius}}>
          {/* Book Owner */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: SIZES.h4}}>Chủ sách:</Text>
            <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
              {book.member.name}
            </Text>
          </View>
          {/* Owner's Rating */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: SIZES.h4}}>Đánh giá chủ sách:</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
                4.7/5 (3 Đánh Giá)
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BookOwnerFeedback', {
                    bookOwnerId: book.member.memberId,
                  })
                }>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.lightBrown,
                    marginLeft: SIZES.base,
                  }}>
                  Xem
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: SIZES.h4}}>Thể loại trao đổi:</Text>
            <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
              Tiểu thuyết, Manga
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: SIZES.h4}}>Giá bìa:</Text>
            <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
              {book.price} VND
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: SIZES.h4}}>Mô tả:</Text>
            <Text style={{fontSize: SIZES.h4, marginLeft: 10, marginRight: 35}}>
              Đây là một cuốn sách mà tôi rất yêu thích, nó đem lại cho tôi cảm
              giác thích thú mỗi khi đọc, làm cho tinh thần sảng khoái sau mỗi
              ngày căng thẳng. Tôi nghĩ nó cũng sẽ phù hợp và có ích cho bạn.
            </Text>
          </View>
        </View>
        {renderMyBookSection('Cùng chủ sách')}
        {renderMyBookSection('Có thể bạn cũng thích')}
      </View>
    );
  }

  function renderMyBookSection(title) {
    const allBooks = books;
    const renderItem = ({item, index}) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginRight: SIZES.radius,
          }}
          onPress={() =>
            navigation.push('BookDetail', {
              book: item,
            })
          }>
          {/* Book Cover */}
          <Image
            source={{uri: item.frontSideImage}}
            resizeMode="cover"
            style={{
              width: 90,
              height: 125,
              borderRadius: 10,
            }}
          />

          {/* Book Info */}
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: 90,
                ...FONTS.body3,
                color: COLORS.black,
              }}
              numberOfLines={1}>
              {item.bookName}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{flex: 1, marginTop: SIZES.padding}}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{...FONTS.h3, color: COLORS.black}}>{title}</Text>

          <TouchableOpacity onPress={() => console.log('See More')}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.lightGray,
                alignSelf: 'flex-start',
                textDecorationLine: 'none',
              }}>
              xem thêm
            </Text>
          </TouchableOpacity>
        </View>

        {/* Books */}
        <View style={{flex: 1, marginTop: SIZES.radius}}>
          <FlatList
            data={
              title === 'Cùng chủ sách'
                ? allBooks.filter(
                    b =>
                      b.member.memberId === book.member.memberId &&
                      b.bookId !== book.bookId,
                  )
                : allBooks.filter(
                    b =>
                      b.bookId !== book.bookId &&
                      b.member.memberId !== currentUser.memberId &&
                      b.category.categoryId === book.category.categoryId,
                  )
            }
            renderItem={renderItem}
            keyExtractor={item => item.bookId.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  function renderBottomButton() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
        }}>
        {/* Create Transfer Request */}
        <TouchableOpacity
          style={{
            flex: 5,
            backgroundColor: COLORS.lightBrown,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setDisplayPicker(true);
          }}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>
            Tạo Yêu Cầu Trao Đổi
          </Text>
        </TouchableOpacity>

        {/* Chat */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.lightGray4,
            marginVertical: SIZES.base,
            marginLeft: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            console.log('Chat');
            navigation.navigate('ChatRoom', {
              uid: book.member.memberId,
              username: book.member.name,
            });
          }}>
          <Image
            source={icons.chat_icon}
            resizeMode="contain"
            style={{width: 25, height: 25, tintColor: COLORS.lightGray2}}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function renderPicker() {
    return (
      <View style={{height: 200}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            paddingHorizontal: SIZES.padding,
            marginTop: 10,
            backgroundColor: COLORS.lightBrown,
          }}>
          <Text
            style={{
              ...FONTS.body2,
              color: COLORS.white,
              flex: 1,
              textAlign: 'center',
            }}>
            Chọn sách của bạn để trao đổi
          </Text>
        </View>
        {/* Book Picker */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
            backgroundColor: COLORS.lightGray2,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            marginTop: 10,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.lightGray,
              flex: 1,
              textAlign: 'left',
            }}>
            Chọn sách:
          </Text>
          <Picker
            selectedValue={myBook}
            style={{height: 60, flex: 2}}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue !== 0) {
                setMyBook(itemValue);
              }
            }}>
            <Picker.Item
              key={0}
              label="-- Sách muốn đổi --"
              value={null}
              color={COLORS.lightGray}
            />
            {books
              .filter(
                b =>
                  b.member.memberId === currentUser.memberId &&
                  !b.transferStatus,
              )
              .map((b, index) => (
                <Picker.Item key={index + 1} label={b.name} value={b.bookId} />
              ))}
          </Picker>
        </View>
        {/* Buttons */}
        <View
          style={{
            flexDirection: 'column',
            marginTop: SIZES.radius,
            height: 50,
            marginHorizontal: 10,
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: COLORS.lightBrown,
                marginRight: 5,
                marginVertical: 5,
                paddingVertical: 5,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleCreateTransferRequest}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>Xác Nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: COLORS.lightBrown,
                marginLeft: 5,
                marginVertical: 5,
                paddingVertical: 5,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setDisplayPicker(null)}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  if (book) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        {/* Navigation Header */}
        <HeaderNavigation
          headerName="Thông Tin Sách"
          goBack={() => navigation.goBack()}
        />
        {/* Book Image Section */}
        <View style={{flex: 8}}>
          <ScrollView style={{flex: 1}}>
            <View style={{height: 250, backgroundColor: COLORS.black}}>
              {renderBookInfoSection()}
            </View>
            {/* Information Section */}
            <View
              style={{
                flex: 1,
                opacity: displayPicker ? 0.3 : 1,
              }}>
              {renderBookInformation()}
            </View>
          </ScrollView>
        </View>

        {/* Book Picker */}
        <View>{displayPicker ? renderPicker() : null}</View>
        {/* Buttons */}
        {displayPicker ? (
          true
        ) : (
          <View style={{flex: 1}}>{renderBottomButton()}</View>
        )}
      </SafeAreaView>
    );
  } else {
    return <></>;
  }
};

export default BookDetail;
