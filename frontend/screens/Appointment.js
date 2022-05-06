/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import {COLORS, FONTS, SIZES} from '../constants';

const Appointment = ({navigation}) => {
  const appointmentData = [
    {
      id: 1,
      name: 'Linh Tâm',
      time: '17:30 ngày 30/06/2021',
      location: 'Vincom, quận 9, Tp HCM',
    },
    {
      id: 2,
      name: 'Thành Nhân',
      time: '8:30 ngày 01/07/2021',
      location: 'Landmark 81, phường 22, quận Bình Thạnh, Tp HCM',
    },
    {
      id: 3,
      name: 'Hạnh Lan',
      time: '17:30 ngày 02/07/2021',
      location: 'ĐH FPT,phường Long Thạnh Mỹ, quận 9, Tp HCM',
    },
  ];
  const showAlert = () =>
    Alert.alert(
      'Xác Nhận Hủy Hẹn',
      'Bạn có chắc muốn hủy hẹn! Bấm xác nhận để hủy.',
      [
        {
          text: 'Xác nhận',
          onPress: () => {},
        },
        {
          text: 'Thoát',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  // eslint-disable-next-line no-unused-vars
  const [appointment, setAppointment] = React.useState(appointmentData);
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
            navigation.navigate('CreateAppointment', {chatRoom: false});
          }}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>
            Tạo Lịch Hẹn Mới
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderAppointment() {
    const renderItem = ({item}) => {
      return (
        <View style={{marginVertical: SIZES.base}}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
            }}
            onPress={() => console.log('appoinmentDetail')}>
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.radius,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    paddingRight: SIZES.padding,
                    ...FONTS.h2,
                    color: COLORS.lightGray4,
                  }}>
                  Bạn có hẹn với{' '}
                  <Text style={{color: COLORS.black}}>{item.name}</Text>
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.lightGray4,
                  }}>
                  Lúc: <Text>{item.time}</Text>
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.lightGray4,
                  }}>
                  Tại: <Text>{item.location}</Text>
                </Text>
              </View>

              {/* Button */}
              <View style={{flexDirection: 'column', marginTop: SIZES.radius}}>
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
                    onPress={() => navigation.navigate('AnimatedMarker')}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>
                      Xem Đường Đi
                    </Text>
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
                    onPress={() => showAlert()}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>
                      Hủy Hẹn
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View
        style={{
          flex: 1,
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.radius,
        }}>
        <FlatList
          data={appointment}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Navigation Header */}
      <HeaderNavigation
        headerName="Lịch Hẹn"
        goBack={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>{renderAppointment()}</View>
      <View style={{height: 75}}>{renderBottomButton()}</View>
    </SafeAreaView>
  );
};

export default Appointment;
