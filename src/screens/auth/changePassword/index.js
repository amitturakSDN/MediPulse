// screens/Visits.js
import React, { useEffect, useState } from 'react';
import {  View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderR5 from '../../../components/HeaderR5';
import { notification } from '../../../assets/images'
import { globalColors } from '@/theme';
import ViewCrv from '../../../components/ViewCrv';
import { validateAddress, validateEmail, validateMobile, validateName, validatePassword } from "../../../utils/ValidationUtils";
import {
  
  lock,
  
  eye,
  showEye
} from "../../../assets/images/index";
import { scan } from '../../../assets/images';
import { QRCodeScanner } from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { store } from '../../../store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { EmptyComponent } from '../../../components/EmptyComponent';
import * as AppActions from '@actions';
import moment from 'moment';
import Strings from '../../../constants/string';
import stringsOfLanguage from '../../../constants/ScreenStrings'    
import { TextField,Button } from '../../../components';
import { alertWithoutPromise } from '../../../helpers/common';

function ChangePassword(props) {
  const params = props.route.params || {};
  const { personDetailsId, personId } = params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordErrorMessage, setShowPasswordErrorMessage] = useState(false);
  const [showConformPasswordErrorMessage, setShowConformPasswordErrorMessage] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
const [showOldPasswordErrorMessage, setShowOldPasswordErrorMessage] = useState(false);

  const { navigation } = props;
 
  const dispatch = useDispatch();

  // useFocusEffect(
  //   React.useCallback(() => {
  //     dispatch(
  //       AppActions.getDashboardData(navigation,(res) => {
  //         console.log(res?.data?.appointments, 'getDashboardData>>????')
  //         if (res?.code == 200) {
  //           setDashboardDataFlatList(res?.data?.appointments)
  //           setDashboardData(res?.data)
  //           setRecentVisits(res?.data?.recentVisits)
  //         }
  //       }),
  //     );
  //   }, []),
  // );
  
  const handlePasswordChange = () => {
    if (isFormValid()) {
      // Validation successful, proceed with dispatch
      let {navigation} = props;
    let params = {
      newPassword : password,
    oldPassword : oldPassword
    };
    console.log(params, 'params...');
    dispatch(AppActions.changePassword(params, navigation,(res) => {
      if (res?.code == 200) {
        alertWithoutPromise('', 'Password Reset Successfully');
        
      }
    }))
     }
   
  };
  const __headerComponent = () => {
    return (
      <>
        <HeaderR5
          title={stringsOfLanguage.drawer.ChangePassword}
          backFromChangePassword
          // rightIcon={notification}
          titlestyle={styles.title}
          // leftIconStyle={{
          //   backgroundColor: globalColors.transparent,
          //   tintColor: globalColors.white
          // }}
        />
      </>
    );
  }
  // old password
  const oldPasswordLength = () => {
    if (oldPassword.trim() === "") {
      setShowOldPasswordErrorMessage(true);
      setShowOldPasswordErrorMessage("Old password is missing");
    } else {
      setShowOldPasswordErrorMessage(false);
    }

  };
  
//   password
const passwordLength = () => {
  if (password.trim() === "") {
    setShowPasswordErrorMessage(true);
    setShowPasswordErrorMessage("New Password is missing");
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
    setShowConformPasswordErrorMessage("Confirm password is missing");
  } else if (password !== value) {
    setShowConformPasswordErrorMessage(true);
    setShowConformPasswordErrorMessage(stringsOfLanguage.notMatch);
  } else {
    setShowConformPasswordErrorMessage(false);
  }
}
const isFormValid = () => {
  return (
    oldPassword.trim() !== '' &&
    password.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    !showOldPasswordErrorMessage &&
    !showPasswordErrorMessage &&
    !showConformPasswordErrorMessage
  );
};

  return (
    <View style={[styles.container]}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContainer}
          style={{
            margin: 0,
          }}>
          {/* top header */}
          {__headerComponent()}
          <ViewCrv>
         <View style={{marginHorizontal:17,marginVertical:10}}>
         <TextField
            placeholder="Old Password"
            label={'Old Password *'}
            value={oldPassword}
            onChangeText={(value) => {
              oldPasswordLength(value);
              setOldPassword(value);
            }}
            icon={true}
            rightIcon={true}
            onBlur={() => oldPasswordLength()}
            image={lock}
            rightIconHide={showEye}
            rightIconShow={eye}
            secure={true}
          />
          {showOldPasswordErrorMessage && (
            <Text style={styles.errorText}>{showOldPasswordErrorMessage}</Text>
          )}

         <TextField
                placeholder="New Password"
                label={'New Password *'}
                value={password}
                onChangeText={(value) => {
                  passwordLength(value);
                  setPassword(value);
                }}
                icon={true}
                rightIcon={true}
                onBlur={() => passwordLength()}
                image={lock}
                rightIconHide={showEye}
                rightIconShow={eye}
                secure={true}
              />
              {showPasswordErrorMessage && (
                <Text style={styles.errorText}>{showPasswordErrorMessage}</Text>
              )}

              <TextField
                placeholder=" Confirm New Password"
                label={'Confirm New Password *'}
                value={confirmPassword}
                onChangeText={(value) => {
                  setConfirmPassword(value);
                  checkConfirmPassword(value);
                }}
                icon={true}
                rightIcon={true}
                onBlur={() => checkConfirmPassword(confirmPassword)}
                image={lock}
                rightIconHide={showEye}
                rightIconShow={eye}
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


             
          
         </View>
         <Button
                onPress={()=> handlePasswordChange()} // Call the handleNextPress function when the button is pressed
                style={[styles.button, { opacity: !isFormValid() ? 0.5 : 1 }]}
                textStyle={styles.buttonText}
                title={stringsOfLanguage.drawer.ChangePassword}
                disabled={!isFormValid()}
              />
          </ViewCrv>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
export default ChangePassword;
