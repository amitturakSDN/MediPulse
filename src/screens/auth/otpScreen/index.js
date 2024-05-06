import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, TextField } from '../../../components';
import { login, logo, mail, lock, eye, showEye, backIcon } from '../../../assets/images/index';
import { Image, ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import { globalColors } from '@/theme';
import GLOBALS from '../../../constants';
import stringsOfLanguage from '../../../constants/ScreenStrings'

import { alertWithOneBtn } from '../../../helpers/common';
const { FONTS, COLOR, Strings } = GLOBALS;
import { validateEmail } from '../../../utils/ValidationUtils';
import * as AppActions from '@actions';
import CustomOtpInput from '../../../components/CustomOtpInput';
import { RFValue } from 'react-native-responsive-fontsize';
export const OtpScreen = (props) => {
  const [email, setEmail] = useState('');
  const emailVal = props.route.params.email || {};
  // console.log(emailVal.email,'>>>params')
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  let { navigation } = props;

  /**Initialize state variables */
  const [digit_1, setDigit1] = useState('');
  const [digit_2, setDigit2] = useState('');
  const [digit_3, setDigit3] = useState('');
  const [digit_4, setDigit4] = useState('');
  const [digit_5, setDigit5] = useState('');
  const [digit_6, setDigit6] = useState('');

  // const dispatch = useDispatch();
  // const email = useSelector(state => state.authReducer?.otpData?.data);
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();
  const inputRef6 = useRef();

  /**Show alert on validation error */
  const showAlert = (message) => {
    alertWithOneBtn(
      Strings.customAlert.title,
      message,
      Strings.customAlert.button,
    );

  }
  const onSignIn = () => {
    console.log(digit_1 + digit_2 + digit_3 + digit_4 + digit_5 + digit_6, 'digit_6');
    if (digit_1 && digit_2 && digit_3 && digit_4 && digit_5 && digit_6) {
      const otp = digit_1 + digit_2 + digit_3 + digit_4 + digit_5 + digit_6

      let { navigation } = props;
        let params = {
          email: emailVal,
        };
      console.log(params,otp, 'params...');
      dispatch(AppActions.validateOtp(params,otp, navigation))
    }
    else {
      showAlert(Strings.validation.invalid_otp);
    }
  }


  const setPhoneNumber = (txt, index) => {
    console.log('setPhoneNumber', txt, txt.length == 0);
    // setIsInputBoxFocused(true);
    if (index == 0) {
      setDigit1(txt);
      inputRef2.current.focus();
      if (txt.length == 0) {
        console.log('INDEX 1');
        inputRef1.current.focus();
      }
      return;
    } else if (index == 1) {
      setDigit2(txt);
      inputRef3.current.focus();
      if (txt.length == 0) {
        console.log('INDEX 2');
        inputRef1.current.focus();
      }
      return;
    } else if (index == 2) {
      setDigit3(txt);
      inputRef4.current.focus();
      if (txt.length == 0) {
        console.log('INDEX 3');
        inputRef2.current.focus();
      }
      return;
    } else if (index == 3) {
      setDigit4(txt);
      inputRef5.current.focus();
      if (txt.length == 0) {
        console.log('INDEX 4');
        inputRef3.current.focus();
      }
      return;
    } else if (index == 4) {
      setDigit5(txt);
      inputRef6.current.focus();
      if (txt.length == 0) {
        console.log('INDEX 5', digit_6);
        inputRef4.current.focus();
      }
      return;
    } else if (index == 5) {
      setDigit6(txt);
      inputRef6.current.focus();
      if (txt.length == 0) {
        setDigit6(txt);
        console.log('INDEX 6', digit_6);
        inputRef5.current.focus();
      }

      return;
    }
  };
  const onKeyPress = ({ nativeEvent }) => {
    console.log('onKeyPress', nativeEvent);
    if (nativeEvent.key === 'Backspace' && digit_2.length == 0) {
      console.log('onKeyPress digit_2', digit_2, digit_2.length);
      inputRef1.current.focus();
      return;
    } else if (nativeEvent.key === 'Backspace' && digit_3.length == 0) {
      console.log('onKeyPress digit_3', digit_3, digit_3.length);
      inputRef2.current.focus();
      return;
    } else if (nativeEvent.key === 'Backspace' && digit_4.length == 0) {
      console.log('onKeyPress digit_4', digit_4, digit_4.length);
      inputRef3.current.focus();
      return;
    } else if (nativeEvent.key === 'Backspace' && digit_5.length == 0) {
      console.log('onKeyPress digit_5', digit_5, digit_5.length);
      inputRef4.current.focus();
      return;
    } else if (nativeEvent.key === 'Backspace' && digit_6.length == 0) {
      console.log('onKeyPress digit_6', digit_6, digit_6.length);
      inputRef5.current.focus();
      return;
    } else if (nativeEvent.key != 'Backspace' && digit_1.length == 0) {
      console.log('focus on next');
      setDigit1(nativeEvent.key);
      inputRef1.current.focus();
      return;
    } else if (
      nativeEvent.key != 'Backspace' &&
      digit_2.length == 0 &&
      digit_1.length != 0
    ) {
      console.log('focus on next');
      setDigit2(nativeEvent.key);
      inputRef2.current.focus();
      return;
    } else if (nativeEvent.key != 'Backspace' && digit_3.length == 0) {
      console.log('focus on next');
      setDigit3(nativeEvent.key);
      inputRef3.current.focus();
      return;
    } else if (nativeEvent.key != 'Backspace' && digit_4.length == 0) {
      console.log('focus on next');
      setDigit4(nativeEvent.key);
      inputRef4.current.focus();
      return;
    } else if (nativeEvent.key != 'Backspace' && digit_5.length == 0) {
      console.log('focus on next');
      setDigit5(nativeEvent.key);
      inputRef5.current.focus();
      return;
    } else if (nativeEvent.key != 'Backspace' && digit_6.length == 0) {
      console.log('focus on next');
      setDigit6(nativeEvent.key);
      inputRef6.current.focus();
      return;
    }
  };
  const isFormValid = () => {
    return (
      digit_1.length === 1 &&
      digit_2.length === 1 &&
      digit_3.length === 1 &&
      digit_4.length === 1 &&
      digit_5.length === 1 &&
      digit_6.length === 1
    );
  };
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: globalColors.white }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
    >


      <ImageBackground style={styles.imageBack} source={login}>

        <View style={styles.imageBackText}>
          <TouchableOpacity onPress={() => { 
            navigation.reset({
              routes: [
                {
                  name: "ForgotPassword"
                }
              ],
            })
           }}>
            <Image style={{ marginTop: RFValue(50) }} source={backIcon} />
          </TouchableOpacity>
          <Text style={styles.MediPulseTxt}>{stringsOfLanguage.MediPulse}</Text>
          <Text style={styles.simplestTxt}>{stringsOfLanguage.heading}</Text>
          <Text style={styles.simplestTxt}>{stringsOfLanguage.your}<Text style={styles.healthTxt}>{stringsOfLanguage.HealthRecord}</Text></Text>
        </View>
      </ImageBackground>
      {/* Bottom view */}
      <View style={styles.bottomView}>
        <View style={styles.textInputView}>
          <Text style={styles.signInText}>{stringsOfLanguage.enterOtp.EnterOtp}</Text>
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.forgetText}>{stringsOfLanguage.enterOtp.PleaseEnterOtp}</Text>
            {/* <Text style={styles.forgetText}>{stringsOfLanguage.enterOtp.otp}</Text> */}
          </View>


          {/* <TextField
            label={stringsOfLanguage.login.Email}
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            icon={true}
            image={mail}
            autoCapitalize={'none'}
            keyboardType="email-address"
          /> */}
          <View
            style={styles.viewStyle}>
            <CustomOtpInput
              ref={inputRef1}
              maxLength={1}
              containerStyle={styles.inputContainer}
              keyboardType="numeric"
              value={digit_1}
              onChangeText={txt => setPhoneNumber(txt, 0)}
              blurOnSubmit={false}
              onKeyPress={onKeyPress}
              inputStyle={styles.inputStyle}></CustomOtpInput>

            <CustomOtpInput
              maxLength={1}
              ref={inputRef2}
              containerStyle={styles.inputContainer}
              keyboardType="numeric"
              value={digit_2}
              inputStyle={styles.inputStyle}
              blurOnSubmit={false}
              onKeyPress={onKeyPress}
              onChangeText={txt => setPhoneNumber(txt, 1)}></CustomOtpInput>

            <CustomOtpInput
              maxLength={1}
              ref={inputRef3}
              containerStyle={styles.inputContainer}
              keyboardType="numeric"
              value={digit_3}
              inputStyle={styles.inputStyle}
              blurOnSubmit={false}
              onKeyPress={onKeyPress}
              onChangeText={txt => setPhoneNumber(txt, 2)}></CustomOtpInput>

            <CustomOtpInput
              maxLength={1}
              ref={inputRef4}
              containerStyle={styles.inputContainer}
              keyboardType="numeric"
              value={digit_4}
              inputStyle={styles.inputStyle}
              blurOnSubmit={false}
              onKeyPress={onKeyPress}
              onChangeText={txt => setPhoneNumber(txt, 3)}></CustomOtpInput>

            <CustomOtpInput
              maxLength={1}
              ref={inputRef5}
              containerStyle={styles.inputContainer}
              keyboardType="numeric"
              value={digit_5}
              inputStyle={styles.inputStyle}
              blurOnSubmit={false}
              onKeyPress={onKeyPress}
              onChangeText={txt => setPhoneNumber(txt, 4)}></CustomOtpInput>

            <CustomOtpInput
              maxLength={1}
              ref={inputRef6}
              containerStyle={styles.inputContainer}
              keyboardType="numeric"
              value={digit_6}
              inputStyle={styles.inputStyle}
              blurOnSubmit={false}
              onKeyPress={onKeyPress}
              onChangeText={txt => setPhoneNumber(txt, 5)}></CustomOtpInput>
          </View>
          <Button
            onPress={() => onSignIn()}
            style={[styles.button, { opacity: !isFormValid() ? 0.5 : 1 }]}
            textStyle={styles.buttonText}
            title={stringsOfLanguage.forgotpassword.Submit}
            disabled={!isFormValid()}
          />
          <View style={styles.signUpView}>
            <Text style={styles.accountText}>{stringsOfLanguage.login.DontAccount}</Text>
            <TouchableOpacity>
              <Text
                style={styles.signUpText}
                onPress={() => navigation.navigate('Registers')}
              >
                {stringsOfLanguage.login.Signup}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default OtpScreen;
