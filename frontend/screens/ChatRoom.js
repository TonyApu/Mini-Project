/* eslint-disable react-native/no-inline-styles */
import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  LogBox,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import Rating from '../components/Chat/Rating';
import TransferStatus from '../components/Chat/TransferenceStatus';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import {UserApiContext} from '../contexts/AuthContext';
import {db} from '../firebase';
import {getReminder} from '../services/reminder-services';

const ChatRoom = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const SEVEN_HOURS = 7 * 60 * 60 * 1000;
  const [currentUser] = useContext(UserApiContext);
  const [messages, setMessages] = useState([]);
  const {username} = route.params;
  const {uid} = route.params;
  /* reminder(reminderId, firstMember, secondMember, transference, location, timestamp, status) */
  const [reminderResponse, setReminder] = useState(null);
  const [rating, setRating] = useState(false);
  const [process, setProcess] = useState(false);
  LogBox.ignoreLogs(['Setting a timer']);

  // Get all messages from Firebase
  const getAllMessages = async () => {
    const docId =
      uid > currentUser.memberId
        ? currentUser.memberId + '-' + uid
        : uid + '-' + currentUser.memberId;
    const querySanp = await db
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();
    const allmsg = querySanp.docs.map(docSanp => {
      return {
        ...docSanp.data(),
        createdAt: docSanp.data().createdAt.toDate(),
      };
    });
    setMessages(allmsg);
  };

  const checkTimeout = useCallback(
    dateString => {
      const reminderTime = new Date(dateString - SEVEN_HOURS);
      const now = new Date();
      return reminderTime > now;
    },
    [SEVEN_HOURS],
  );

  const fetchReminder = useCallback(async () => {
    if (currentUser && uid) {
      const getReminderDto = {
        firstMemberId: currentUser.memberId,
        secondMemberId: uid,
      };
      const result = await getReminder(getReminderDto);
      if (result.reminder.active) {
        if (checkTimeout(result.reminder.timestamp)) {
          setReminder(result);
        } else {
          setReminder(result);
          setProcess(true);
        }
      }
    }
  }, [checkTimeout, currentUser, uid]);

  useEffect(() => {
    fetchReminder();
  }, [fetchReminder, uid, isFocused]);

  // Message Example
  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hi bạn, mình muốn đổi sách!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: images.thorAvatar,
        },
      },
    ]);
  }, []);
  const showAlert = () => {
    Alert.alert(
      'Xác Nhận Hủy Hẹn',
      'Bạn có chắc muốn hủy hẹn! Bấm xác nhận để hủy.',
      [
        {
          text: 'Xác nhận',
          onPress: () => {
            setReminder(false);
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
    getAllMessages();
  };

  const getDayFunc = dateString => {
    const date = new Date(dateString - SEVEN_HOURS);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return (
      <Text style={{...FONTS.h4, color: COLORS.lightBrown}}>
        {day} Tháng {month}
      </Text>
    );
  };

  const getTimeFunc = dateString => {
    const date = new Date(dateString - SEVEN_HOURS);
    let hour = '' + date.getHours();
    let minute = '' + date.getMinutes();
    if (hour.length < 2) {
      hour = '0' + hour;
    }
    if (minute.length < 2) {
      minute = '0' + minute;
    }
    const hourMinute = hour + ':' + minute;
    return <Text style={{...FONTS.h4, color: COLORS.gray}}>{hourMinute}</Text>;
  };

  function renderHeader() {
    return (
      <View
        style={{
          marginVertical: SIZES.base,
          flexDirection: 'row',
          padding: SIZES.base,
          borderBottomWidth: 1,
          marginHorizontal: 10,
          borderBottomColor: COLORS.brown,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.back_arrow_icon}
              style={{width: 20, height: 20, borderRadius: 25, marginTop: 10}}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Image
            // source={avatar}
            source={images.thorAvatar}
            style={{width: 40, height: 40, borderRadius: 25, marginLeft: 10}}
            resizeMode="cover"
          />
          <View style={{marginLeft: SIZES.radius}}>
            {/* <Text style={{...FONTS.h3}}>{username}</Text> */}
            <Text style={{...FONTS.h3}}>{username}</Text>
            <Text style={{...FONTS.h4, color: COLORS.lightGray}}>
              Đang hoạt động
            </Text>
          </View>
        </View>
        {/* Create Reminder */}
        {!reminderResponse ||
        (reminderResponse && !reminderResponse.reminder.active) ? (
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateAppointment', {
                  chatRoom: true,
                  otherUserId: uid,
                })
              }>
              <Image
                source={icons.reminder_icon}
                style={{width: 25, height: 25, tintColor: COLORS.lightGray}}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }

  // reminder
  function renderReminder() {
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          marginHorizontal: SIZES.padding,
          borderRadius: SIZES.radius,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: SIZES.radius,
            paddingBottom: SIZES.base,
            marginHorizontal: SIZES.padding,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.lightGray3,
          }}>
          <Image
            source={images.thorAvatar}
            style={{width: 40, height: 40, borderRadius: 20}}
            resizeMode="cover"
          />
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.lightGray,
              marginLeft: SIZES.padding,
            }}>
            Bạn có nhắc hẹn
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginHorizontal: SIZES.padding,
            paddingVertical: SIZES.base,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.lightGray3,
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>{getDayFunc(reminderResponse.reminder.timestamp)}</View>
            <View>{getTimeFunc(reminderResponse.reminder.timestamp)}</View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.lightBrown,
                marginLeft: SIZES.padding,
              }}>
              Địa chỉ trao đổi
            </Text>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.lightGray,
                marginLeft: SIZES.padding,
                marginRight: SIZES.padding2,
              }}>
              {reminderResponse.reminder.location}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginHorizontal: SIZES.radius,
            marginTop: SIZES.base,
            marginBottom: SIZES.radius,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.lightBrown,
              borderRadius: 10,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: SIZES.base,
            }}
            onPress={() => navigation.navigate('AnimatedMarker')}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.white,
                margin: SIZES.radius,
              }}>
              Mở bản đồ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.lightBrown,
              borderRadius: 10,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: SIZES.base,
            }}
            onPress={() =>
              navigation.navigate('CreateAppointment', {
                chatRoom: true,
                reminderResponse: reminderResponse,
              })
            }>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.white,
                margin: SIZES.radius,
              }}>
              Thay đổi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.lightBrown,
              borderRadius: 10,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: SIZES.base,
            }}
            onPress={() => showAlert()}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.white,
                margin: SIZES.radius,
              }}>
              Hủy hẹn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: COLORS.white,
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: SIZES.base,
          }}>
          <Image
            source={icons.send_icon}
            style={{width: 30, height: 30}}
            resizeMode="cover"
          />
        </View>
      </Send>
    );
  };

  const onSend = (msgArray = []) => {
    const msg = msgArray[0];
    const myMsg = {
      ...msg,
      sentBy: currentUser.memberId,
      sentTo: uid,
      createdAt: new Date(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    const docId =
      uid > currentUser.memberId
        ? currentUser.memberId + '-' + uid
        : uid + '-' + currentUser.memberId;
    db.collection('chatrooms').doc(docId).collection('messages').add(myMsg);
  };

  function renderTransferStatusList() {
    const renderItem = ({item}) => {
      return (
        <View>
          <TransferStatus
            setRatingFunction={() => {
              setRating(true);
            }}
            unsetProcessFunction={() => {
              setProcess(false);
            }}
            unsetProcess={() => {
              setProcess(false);
            }}
            transferenceId={item}
          />
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
          data={reminderResponse.transferenceIdList}
          renderItem={renderItem}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>{renderHeader()}</View>
      <View>
        {reminderResponse &&
        reminderResponse.reminder.active &&
        checkTimeout(reminderResponse.reminder.timestamp)
          ? renderReminder()
          : null}
      </View>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          {process && reminderResponse ? renderTransferStatusList() : null}
        </View>
        <View>
          {rating ? (
            <Rating
              unsetRatingFunction={() => {
                setRating(false);
                ToastAndroid.show(
                  'Gửi đánh giá thành công!',
                  ToastAndroid.LONG,
                );
              }}
            />
          ) : null}
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={msg => onSend(msg)}
        user={{
          _id: currentUser.memberId,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
      />
    </SafeAreaView>
  );
};

export default ChatRoom;
