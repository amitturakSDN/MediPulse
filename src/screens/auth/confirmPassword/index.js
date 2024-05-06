import React, { useState, useEffect, useCallback } from 'react';
import { Button, TextField } from '../../../components';
import { login, logo, mail, lock, eye, showEye, backIcon } from '../../../assets/images/index';
import { Image, ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import { globalColors } from '@/theme';
import GLOBALS from '../../../constants';
import stringsOfLanguage from '../../../constants/ScreenStrings';

import { alertWithOneBtn } from '../../../helpers/common';
const { FONTS, COLOR, Strings } = GLOBALS;
import { validateEmail, validatePassword } from '../../../utils/ValidationUtils';
import * as AppActions from '@actions';
import { RFValue } from 'react-native-responsive-fontsize';

export const ConfirmPassword = (props) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const otp_user_id = useSelector(state => state.authReducer?.otpIdData?.data?.user_id);
  console.log(otp_user_id, 'otpdata>>>>');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordErrorMessage, setShowPasswordErrorMessage] = useState(false);
  const [showConformPasswordErrorMessage, setShowConformPasswordErrorMessage] = useState(false);
  let { navigation } = props;

  /**Show alert on validation error */
  const showAlert = message => {
    alertWithOneBtn(
      Strings.customAlert.title,
      message,
      Strings.customAlert.button,
    );
  };

  const onSubmit = () => {
    if (isFormValid()) {
      // Validation successful, proceed with dispatch
      console.log("else");
      let { navigation } = props;
      let params = { newPassword: password };
      dispatch(AppActions.resetPassword(params, otp_user_id, navigation));
     }
  }
 //   password
 const passwordLength = () => {
  if (password.trim() === "") {
    setShowPasswordErrorMessage(true);
    setShowPasswordErrorMessage("Please enter a password");
  } else if (!validatePassword(password)) {
    setShowPasswordErrorMessage(true);
    setShowPasswordErrorMessage(stringsOfLanguage.validation.invalid_pass);
  } else {
    setShowPasswordErrorMessage(false);
  }
}

// conform password
const checkConfirmPassword = (value) => {
  if (value.trim() === "") {
    setShowConformPasswordErrorMessage(true);
    setShowConformPasswordErrorMessage("Please confirm your password");
  } else if (password !== value) {
    setShowConformPasswordErrorMessage(true);
    setShowConformPasswordErrorMessage(stringsOfLanguage.notMatch);
  } else {
    setShowConformPasswordErrorMessage(false);
  }
}
const isFormValid = () => {
  return (
  
    password.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    
    !showPasswordErrorMessage &&
    !showConformPasswordErrorMessage
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
          <Text style={styles.signInText}>{stringsOfLanguage.ConfirmPassword.EnterPassword}</Text>
          <View style={{ marginBottom: 10 }}>
            {/* <Text style={styles.forgetText}>{stringsOfLanguage.ConfirmPassword.PleaseEnterPass}</Text> */}
            {/* <Text style={styles.forgetText}>{stringsOfLanguage.ConfirmPassword.password}</Text> */}
          </View>


          <TextField
            placeholder={'Password'}
            label={stringsOfLanguage.singup.Password}
            value={password}
            // onChangeText={(value) => setPassword(value)}
            onChangeText={(value) => {
              passwordLength(value);
              setPassword(value);
            }}
            onBlur={() => passwordLength()}
            icon={true}
            rightIconHide={showEye}
            rightIconShow={eye}
            rightIcon={true}
            image={lock}
            secure={true}
          />
            {showPasswordErrorMessage && (
                <Text style={styles.errorText}>{showPasswordErrorMessage}</Text>
              )}
          <TextField
            placeholder={'Confirm Password'}
            label={stringsOfLanguage.singup.ConfirmPassword}
            value={confirmPassword}
            // onChangeText={(value) => setConfirmPassword(value)}
            onChangeText={(value) => {
              setConfirmPassword(value);
              checkConfirmPassword(value);
            }}
            rightIcon={true}
            rightIconHide={showEye}
            rightIconShow={eye}
            onBlur={() => checkConfirmPassword(confirmPassword)}
            icon={true}
            image={lock}
            secure={true}
            theme={{
              colors: {
                primary:showConformPasswordErrorMessage ? 'red' : globalColors.primaryTheme,
                text: globalColors.blacktext,
                placeholder: globalColors.black,
                disabled: globalColors.black,
              },
            }}
          />
           {/* {showConformPasswordErrorMessage && (
                <Text style={styles.errorText}>{showConformPasswordErrorMessage}</Text>
              )} */}
          <Button
            onPress={() => onSubmit()}
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
                onPress={() => navigation.navigate('Register')}
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

export default ConfirmPassword;
