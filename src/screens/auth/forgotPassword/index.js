import React, { useState, useEffect, useCallback } from 'react';
import { Button, TextField } from '../../../components';
import { login,logo,mail,lock,eye,showEye,backIcon } from '../../../assets/images/index';
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
import { RFValue } from 'react-native-responsive-fontsize';
export const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  let { navigation } = props;
 
    /**Show alert on validation error */
    const showAlert = message => {
      alertWithOneBtn(
        Strings.customAlert.title,
        message,
        Strings.customAlert.button,
      );
    };

    const submitEmail = () =>{
      if (isFormValid()) {
        // Validation successful, proceed with dispatch
        let {navigation} = props;
      let params = {email: email};
      console.log(params, 'params...');
      dispatch(AppActions.sendOtp(params, navigation))
       }
      
     
      
    }
    //   custome validation for email
    const handleEmail = () => {
      if (email.trim() === "") {
        setShowErrorMessage(true);
        setShowErrorMessage("Please enter your email");
      } else if (!validateEmail(email)) {
        setShowErrorMessage(true);
        setShowErrorMessage(stringsOfLanguage.validation.invalid_email);
      } else {
        setShowErrorMessage(false);
      }
    };
    const isFormValid = () => {
      return email.trim() !== '' && !showErrorMessage ;
    };
  return (
    <KeyboardAwareScrollView
      style={{  backgroundColor: globalColors.white }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
    >
      <ImageBackground style={styles.imageBack} source={login}>
        <View style={styles.imageBackText}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
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
          <Text style={styles.signInText}>{stringsOfLanguage.forgotpassword.ForgotPassword}</Text>
          <View style={{marginBottom:30}}>
          <Text style={styles.forgetText}>{stringsOfLanguage.forgotpassword.Pleaseregistered}</Text>
          <Text style={styles.forgetText}>{stringsOfLanguage.forgotpassword.emailaddress}</Text>
          </View>
          

          <TextField
            label={stringsOfLanguage.login.Email}
            placeholder="Email"
            value={email}
            // onChangeText={(value) => setEmail(value)}
            onChangeText={(value) => {
              setEmail(value);
              handleEmail(value);
            }}
            onBlur={() => handleEmail(email)}
            icon={true}
            image={mail}
            autoCapitalize={'none'}
            keyboardType="email-address"
          />
          {showErrorMessage && (
                <Text style={styles.errorText}>{showErrorMessage}</Text>
              )}
          
          <Button
          onPress={() => submitEmail()}
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
export default ForgotPassword;
