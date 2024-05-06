import React, { useState, useEffect, useCallback } from 'react';
import { Button, TextField } from '../../../components';
import { login,logo,mail,lock,eye,showEye } from '../../../assets/images/index';
import { Image, ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './Login.styles';
import { globalColors } from '@/theme';
import GLOBALS from '../../../constants';
import stringsOfLanguage from '../../../constants/ScreenStrings'    
import messaging from '@react-native-firebase/messaging';
import { alertWithOneBtn } from '../../../helpers/common';
const { FONTS, COLOR, Strings } = GLOBALS;
import { validateEmail } from '../../../utils/ValidationUtils';
import * as AppActions from '@actions';
export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('')
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showPasswordErrorMessage, setShowPasswordErrorMessage] = useState(false);
  let { navigation } = props;
 
    /**Show alert on validation error */
    const showAlert = message => {
      alertWithOneBtn(
        Strings.customAlert.title,
        message,
        Strings.customAlert.button,
      );
    };
    // useEffect(() => {
    //   getToken()
    //   // Get the device token
    //   messaging()
    //     .getToken()
    //     .then(token => {
    //       setToken(token)
    //       console.log("TPKEN000", token);
    //     });
  
    //   // If using other push notification providers (ie Amazon SNS, etc)
    //   // you may need to get the APNs token instead for iOS:
    //   // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }
  
    //   // Listen to whether the token changes
    //   return messaging().onTokenRefresh(token => {
      
    //   });
    // }, []);


    // messaging()
    // .registerDeviceForRemoteMessages()
    // .then(() => messaging().getToken())
    // .then(token => {
    //   setToken(token);
    //   console.log("TOKEN:", token);
    // })
    // .catch(error => {
    //   console.error('Error registering device:', error);
    // });
    // const getToken= async ()=>{
    //   // alert(1)
    //   await messaging().registerDeviceForRemoteMessages();
    //   // const token = await messaging.getToken();
    // }

    const onSignIn = () => {
      if (isFormValid()) {
       // Validation successful, proceed with dispatch
      let { navigation } = props;
      let params = { email: email, password: password };
      console.log(params, 'params...');
      dispatch(AppActions.login(params, navigation));
      }
    };
    
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
      //   password
  const passwordLength = () => {
    if (password.trim() === "") {
      setShowPasswordErrorMessage(true);
      setShowPasswordErrorMessage("Please enter a password");
    } else {
      setShowPasswordErrorMessage(false);
    }
  }
  const isFormValid = () => {
    return email.trim() !== '' && password.trim() !== '' && !showErrorMessage && !showPasswordErrorMessage;
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
        <Text style={styles.MediPulseTxt}>{stringsOfLanguage.MediPulse}</Text>
        <Text style={styles.simplestTxt}>{stringsOfLanguage.heading}</Text>
        <Text style={styles.simplestTxt}>{stringsOfLanguage.your} <Text style={styles.healthTxt}>{stringsOfLanguage.HealthRecord}</Text></Text>
        </View>
        </ImageBackground>
      {/* Bottom view */}
      <View style={styles.bottomView}>
        <View style={styles.textInputView}>
          <Text style={styles.signInText}>{stringsOfLanguage.login.Login}</Text>
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
          
          <TextField
            placeholder={'Password'}
            label={stringsOfLanguage.login.Password}
            value={password}
            // onChangeText={(value) => setPassword(value)}
            
            onChangeText={(value) => {
              passwordLength(value);
              setPassword(value);
            }}
            disableCopyPaste={true}
            onBlur={() => passwordLength(password)}
            icon={true}
            rightIcon={true}
            image={lock}
            rightIconHide={showEye}  // Add the prop for the hide icon
            rightIconShow={eye}  // Add the prop for the show icon
            secure={true}
            
          />
           {showPasswordErrorMessage && (
                <Text style={styles.errorText}>{showPasswordErrorMessage}</Text>
              )}
          <View style={styles.stayView}>
            <TouchableOpacity style={{flex:1}} onPress={() => props.navigation.navigate('drawer')}>
              {/* <Text style={styles.staySigntxt}>Stay Signed In</Text> */}
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1}} onPress={() => props.navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotpass}>{stringsOfLanguage.login.ForgetPassword}</Text>
            </TouchableOpacity>
          </View>
          <Button
            onPress={() => {
              onSignIn();
            }}
            style={[styles.button, { opacity: !isFormValid() ? 0.5 : 1 }]}
            textStyle={styles.buttonText}
            title={stringsOfLanguage.login.Login}
            disabled={!isFormValid()}
          />
          <View style={styles.signUpView}>
            <Text style={styles.accountText}>{stringsOfLanguage.login.DontAccount} </Text>
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
export default Login;
