/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import {COLORS, icons, SIZES} from '../constants';
import {getAllFeedbackToUser} from '../services/feedback-services';

const BookOwnerFeedback = ({navigation, route}) => {
  /* feedbackData(Long feedbackId, Member member, Transference transference, Integer star, String comment) */
  const [feedbackData, setFeedbackData] = useState();

  useEffect(() => {
    let {bookOwnerId} = route.params;
    const fetchFeedback = async () => {
      const result = await getAllFeedbackToUser(bookOwnerId);
      if (result) {
        setFeedbackData(result);
      }
    };
    fetchFeedback();
  }, [route]);

  // const feedbackData = [
  //   {
  //     id: 1,
  //     from: 'Thành Nhân',
  //     date: '19/06/2021',
  //     star: 4,
  //     comment:
  //       'Sách cũ nhưng được bảo quản rất tốt.  Mình rất là hài lòng luôn.',
  //   },
  //   {
  //     id: 2,
  //     from: 'Linh Tâm',
  //     star: 5,
  //     date: '21/05/2021',
  //     comment: 'Sách giao đúng như hình',
  //   },
  //   {
  //     id: 3,
  //     from: 'Hạnh Lan',
  //     star: 5,
  //     date: '05/06/2021',
  //     comment: 'Sách hay lắm',
  //   },
  // ];

  const parseDate = dateString => {
    console.log(dateString);
    const date = new Date(dateString);
    console.log(date);
    const day = date.getDate();
    console.log(day);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = day + '/' + month + '/' + year;
    return <Text style={{color: COLORS.gray}}>{fullDate}</Text>;
  };

  function renderFeedbacks() {
    const renderItem = ({item}) => {
      const number = [1, 2, 3, 4, 5];
      return (
        <View
          style={{
            paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.gray,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: 'https://pyxis.nymag.com/v1/imgs/558/dd7/06bba7443b053f8c8be244cde795571a19-percy-jackson.rsquare.w1200.jpg',
                }}
                style={{height: 40, width: 40, borderRadius: 25}}
              />
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginLeft: SIZES.radius,
                  }}>
                  <Text>{item.fromMember.name}</Text>
                  <View
                    style={{
                      width: 100,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      paddingVertical: SIZES.base,
                    }}>
                    {number.map(num => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        key={num}>
                        <Image
                          source={
                            num <= item.star
                              ? icons.star_filled_icon
                              : icons.star_outline_icon
                          }
                          style={{height: 15, width: 15}}
                          resizeMode="cover"
                        />
                      </View>
                    ))}
                  </View>
                </View>
                {/* Feedback Date */}
                <View>{parseDate(item.timestamp)}</View>
              </View>
            </View>
            {/* Comment */}
            <View style={{marginLeft: 50}}>
              <Text>{item.comment}</Text>
            </View>
          </View>
        </View>
      );
    };

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={feedbackData}
          renderItem={renderItem}
          keyExtractor={item => `${item.feedbackId}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Navigation Header */}
      <HeaderNavigation
        headerName="Đánh Giá"
        goBack={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>{renderFeedbacks()}</View>
    </SafeAreaView>
  );
};

export default BookOwnerFeedback;
