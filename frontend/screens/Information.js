/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import {COLORS, FONTS, images, SIZES} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';

const Information = ({navigation}) => {
  const [currentUser] = useContext(UserApiContext);
  const information = [
    {
      id: 1,
      label: 'Tên đăng nhập: ',
      value: currentUser.name,
    },
    {
      id: 2,
      label: 'Họ và tên: ',
      value: currentUser.name,
    },
    {
      id: 3,
      label: 'Tên hiển thị: ',
      value: currentUser.name,
    },
    {
      id: 4,
      label: 'Số điện thoại: ',
      value: currentUser.phoneNumber,
    },
    {
      id: 5,
      label: 'Email: ',
      value: currentUser.email,
    },
    {
      id: 6,
      label: 'Địa chỉ: ',
      value: currentUser.address,
    },
  ];

  function renderInformation() {
    const renderItem = ({item}) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            backgroundColor: COLORS.lightGray2,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            marginHorizontal: 10,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.lightGray,
              flex: 3,
              textAlign: 'left',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {item.label}
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.lightGray,
              flex: 5,
              textAlign: 'left',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {item.value}
          </Text>
        </View>
      );
    };
    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{
              resizeMode: 'cover',
              width: 200,
              height: 200,
              margin: 5,
            }}
            source={images.thorAvatar}
          />
        </View>

        <FlatList
          data={information}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  const renderButton = () => {
    return (
      <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 10}}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.lightBrown,
            marginHorizontal: SIZES.radius,
            marginVertical: SIZES.base,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }} onPress = {() => navigation.navigate('UpdateInformation')}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>
            Cập nhật thông tin
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.lightBrown,
            marginHorizontal: SIZES.radius,
            marginVertical: SIZES.base,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Header Section */}
      <HeaderNavigation
        headerName="Thông Tin Cá Nhân"
        goBack={() => navigation.goBack()}
      />
      {/* Body Section */}
      <View style={{flex: 8}}>{renderInformation()}</View>
      <View style={{flex: 1}}>{renderButton()}</View>
    </SafeAreaView>
  );
};

export default Information;
