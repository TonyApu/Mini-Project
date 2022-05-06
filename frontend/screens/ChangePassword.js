import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderNavigation from '../components/HeaderNavigation';
import {COLORS, FONTS, icons, SIZES} from '../constants';
const {password, setPassword} = React.useState('');
const {newPassword, setNewPassword} = React.useState('');
const {confirmPassword, setConfirmPassword} = React.useState('');

const ChangePassword = ({navigation}) => {
  function renderForm() {
    return (
      <ScrollView>
        <Text style={{margin: 10, fontSize: 15}}>
          (<Text style={{color: COLORS.lightRed}}>*</Text>) Yêu cầu bắt buộc
        </Text>
        
          {/* Password */}
          <View>
            <Text style={{...FONTS.body5}}>
              Mật Khẩu
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
            }}>
            <TextInput
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                flex: 1,
              }}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {/* New Password */}
          <View>
            <Text style={{...FONTS.body5}}>
              Mật Khẩu Mới
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
            }}>
            <TextInput
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                flex: 1,
              }}
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>
          {/* Confirm Password */}
          <View>
            <Text style={{...FONTS.body5}}>
              Xác Nhận Mật Khẩu Mới
              <Text style={{color: COLORS.lightRed, fontSize: 15}}> *</Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: COLORS.lightGray2,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
            }}>
            <TextInput
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                flex: 1,
              }}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          {/* Confirm Button */}
          <View
            style={{
              flexDirection: 'row',
              height: 60,
              backgroundColor: COLORS.brown,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginTop: SIZES.padding,
            }}>
            <TouchableOpacity style={{flex: 1}} onPress= {() => {navigation.goBack();
            ToastAndroid.show('Đổi mật khẩu thành công!', ToastAndroid.LONG)}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: COLORS.white, ...FONTS.body2}}>
                  Xác nhận
                </Text>
              </View>
            </TouchableOpacity>
          </View>
      </ScrollView>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f8f9fb'}}>
      {/* Navigation Header */}
      <HeaderNavigation
        headerName="Đổi Mật Khẩu"
        goBack={() => navigation.goBack()}
      />

      {/*information*/}
      <View style={{flex: 1}}>{renderForm()}</View>
    </SafeAreaView>
  );
};

export default ChangePassword;
