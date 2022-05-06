/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import {addNewFeedback} from '../../services/feedback-services';
import {UserApiContext} from '../../contexts/AuthContext';

const TransferStatus = props => {
  const [currentUser] = useContext(UserApiContext);
  const [star, setStar] = useState();
  const [comment, setComment] = useState('');
  const number = [1, 2, 3, 4, 5];
  // function handleFeedback() {
  //   props.unsetRatingFunction();
  // }

  /*
    NewFeedbackDTO(Long fromUserId, Long toUserId, Long transferenceId, Integer star, String comment)
  */
  const handleSubmitFeedback = async () => {
    const newFeedbackDTO = {
      fromUserId: currentUser.memberId,
      toUserId: 2,
      transferenceId: 2,
      star,
      comment,
    };
    const result = await addNewFeedback(newFeedbackDTO);
    if (result) {
      props.unsetRatingFunction();
    }
  };

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
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: SIZES.radius,
          paddingBottom: SIZES.base,
          // marginHorizontal: SIZES.padding,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.lightGray3,
        }}>
        {/* <Image
          source={images.thorAvatar}
          style={{width: 40, height: 40, borderRadius: 20}}
          resizeMode="cover"
        /> */}
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.lightGray,
            // marginLeft: SIZES.padding,
          }}>
          Đánh giá
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
        {number.map(num => (
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            key={num}
            onPress={() => setStar(num)}>
            <Image
              source={
                num <= star ? icons.star_filled_icon : icons.star_outline_icon
              }
              style={{height: 20, width: 20}}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
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
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: COLORS.lightGray2,
            borderRadius: 5,
          }}>
          <TextInput
            style={{
              ...FONTS.body3,
              color: COLORS.black,
              flex: 1,
            }}
            value={comment}
            onChangeText={setComment}
            placeholder="Nhập đánh giá của bạn!"
            placeholderTextColor={COLORS.lightGray4}
            multiline={true}
          />
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
          onPress={handleSubmitFeedback}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.white,
              margin: SIZES.radius,
            }}>
            Đánh giá
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransferStatus;
