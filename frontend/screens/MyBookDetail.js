/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import OnBoarding from '../components/OnBoarding';
import {COLORS, FONTS, icons, SIZES} from '../constants';

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
  const [book, setBook] = React.useState(null);

  React.useEffect(() => {
    // eslint-disable-next-line no-shadow
    let {book} = route.params;
    setBook(book);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  function renderBookInfoSection() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: COLORS.lightGray2,
            flex: 1,
          }}>
          <OnBoarding book={book} />
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
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: SIZES.padding,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
                style={{width: 25, height: 25, tintColor: COLORS.black}}
              />
              <Text style={{...FONTS.h4, color: COLORS.brown}}>
                Thành phố Thủ Đức
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
              marginTop: SIZES.padding,
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
              <Text style={{...FONTS.body4, color: COLORS.white}}>
                Ngôn ngữ
              </Text>
            </View>
          </View>

          {/* More Information */}
          <View style={{paddingTop: SIZES.padding}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: SIZES.h4}}>Mô tả:</Text>
              <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
                Đây là mô tả sách
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: SIZES.h4}}>Ngày tạo:</Text>
              <Text style={{fontSize: SIZES.h4, marginLeft: 10}}>
                28/10/2020
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
                100.000VND
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  function renderBottomButton() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {/* Create Transfer Request */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.lightBrown,
            marginHorizontal: SIZES.base,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('Create Transfer Request')}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>Xóa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.lightBrown,
            marginHorizontal: SIZES.base,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('Create Transfer Request')}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>Đăng đổi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (book) {
    return (
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        {/* Navigation Header */}
        <HeaderNavigation
          headerName="Thông Tin Sách"
          goBack={() => navigation.goBack()}
        />
        {/* Book Image Section */}
        <View style={{flex: 4}}>{renderBookInfoSection()}</View>
        {/* Information Section */}
        <View
          style={{
            flex: 4,
            backgroundColor: COLORS.white,
          }}>
          {renderBookInformation()}
        </View>
        {/* Buttons */}
        <View style={{flex: 1}}>{renderBottomButton()}</View>
      </View>
    );
  } else {
    return <></>;
  }
};

export default BookDetail;
