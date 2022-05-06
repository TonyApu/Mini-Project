/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import {COLORS, FONTS, SIZES, icons} from '../constants';
import Rating from '../components/Chat/Rating';


const ProcessingTransference = ({navigation}) => {
  const transferenceData = [
    {
      id: 1,
      name: 'Linh Tâm',
      book1: 'Mười Người Da Đen Nhỏ',
      book2: 'Bố già',
    },
    {
      id: 2,
      name: 'Thành Nhân',
      book1: 'Mười Người Da Đen Nhỏ',
      book2: 'Bố già',
    },
    {
      id: 3,
      name: 'Hạnh Lan',
      book1: 'Mười Người Da Đen Nhỏ',
      book2: 'Bố già',
    },
  ];
  const showAlert = () =>
    Alert.alert(
      'Xác Nhận Hủy Hẹn',
      'Bạn có chắc muốn hủy hẹn! Bấm xác nhận để hủy.',
      [
        {
          text: 'Xác nhận',
          onPress: () => {
            setRemider(false);
            setProcess(true);
          },
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

  const [transferences, setTransferences] = React.useState([]);

  useEffect(() => {
    setTransferences(transferenceData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderTransference() {
    const renderItem = ({item}) => {
      return (
        <View
          style={{
            marginVertical: SIZES.base,
            paddingBottom: SIZES.radius,
            // backgroundColor: COLORS.lightGray2,
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
            }}
            onPress={() => console.log('appoinmentDetail')}>
            <View
              style={{
                flex: 1,
                // marginLeft: SIZES.radius,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View style={{marginLeft: SIZES.radius}}>
                <Text
                  style={{
                    paddingRight: SIZES.padding,
                    ...FONTS.h2,
                    color: COLORS.lightGray4,
                  }}>
                  Trao đổi với{' '}
                  <Text style={{color: COLORS.black}}>{item.name}</Text>
                </Text>
                <Text
                  style={{
                    ...FONTS.h2,
                    color: COLORS.brown,
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}>
                  {item.book1}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <Image
                    source={icons.tranfer_vertical_icon}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: COLORS.lightGray4,
                    }}
                  />
                </View>
                <Text
                  style={{
                    ...FONTS.h2,
                    color: COLORS.brown,
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}>
                  {item.book2}
                </Text>
              </View>

              {/* Button */}
              <View style={{flexDirection: 'column', marginTop: SIZES.radius}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: COLORS.lightBrown,
                      marginLeft: 20,
                      marginRight: 10,
                      paddingVertical: SIZES.base,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => navigation.navigate('AnimatedMarker')}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>
                      Hoàn Thành
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: COLORS.lightBrown,
                      marginLeft: 10,
                      marginRight: 10,
                      paddingVertical: SIZES.base,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => showAlert()}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.lightGray4,
                      height: 40,
                      width: 40,
                      borderRadius: 7,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      console.log('Chat');
                      navigation.navigate('ChatRoom');
                    }}>
                    <Image
                      source={icons.chat_icon}
                      resizeMode="contain"
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.lightGray2,
                      }}
                    />
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
          data={transferences}
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
        headerName="Đang Trao Đổi"
        goBack={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>{renderTransference()}</View>
    </SafeAreaView>
  );
};

export default ProcessingTransference;
