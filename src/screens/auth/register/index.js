import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, TextField } from "../../../components";
import {
  login,
  logo,
  mail,
  lock,
  User,
  call,
  map,
  shield,
  selectCamera,
  camera,
  gallery,
  eye,
  showEye
} from "../../../assets/images/index";
import {
  Image,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./register.styles";
import { globalColors } from "@/theme";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ScrollViewR5 from "../../../components/ScrollViewR5";
import HeaderR5 from "../../../components/HeaderR5";
import BottomSheet from "react-native-raw-bottom-sheet";
import ImagePicker from "react-native-image-crop-picker";
import GLOBALS from "../../../constants";
import stringsOfLanguage from "../../../constants/ScreenStrings";

import * as AppActions from "../../../actions";
import { validateAddress, validateEmail, validateMobile, validateName, validatePassword } from "../../../utils/ValidationUtils";
const { API_URL, NETWORK_STATUS, ACTION_TYPE } = GLOBALS;
import axios from "axios";
import { store } from "../../../store/configureStore";
import ReactNativeSegmentedControlTab from "react-native-segmented-control-tab";
const { FONTS, COLOR, Strings } = GLOBALS;
import { alertWithOneBtn } from "../../../helpers/common";
import CustomOtpInput from "../../../components/CustomOtpInput";

export const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [insuranceNo, setInsuranceNo] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");

  const [user_id, setUserId] = useState();
  const [emailForOtp, setEmailForOtp] = useState();

  const dispatch = useDispatch();
  let { navigation } = props;
  let { getState } = store;
  const bottomSheetRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageURI, setSelectedImageURI] = useState(null);
  const [token, setToken] = useState("");
  const [imageSource, setImageSource] = useState(null);
  const [selected, setSelected] = useState(0);

  const [showNameErrorMessage, setShowNameErrorMessage] = useState(false);
  const [showLastNameErrorMessage, setShowLastNameErrorMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showPasswordErrorMessage, setShowPasswordErrorMessage] = useState(false);
  const [showConformPasswordErrorMessage, setShowConformPasswordErrorMessage] = useState(false);

  const [pageType, setPageType] = useState('Register');


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
  const onOtpSubmit = () => {
    console.log(digit_1 + digit_2 + digit_3 + digit_4 + digit_5 + digit_6, 'digit_6');
    if (digit_1 && digit_2 && digit_3 && digit_4 && digit_5 && digit_6) {
      const otp = digit_1 + digit_2 + digit_3 + digit_4 + digit_5 + digit_6

      let { navigation } = props;
      let params = {
        email: emailForOtp,
      };
      console.log(params, otp, 'params...');
      dispatch(AppActions.validateRegisterOtp(params,otp,user_id, navigation,(res)=>{
        if (res?.code == 200) {
          setSelected(1);
        }
      }))
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
  const isOtpValid = () => {
    return (
      digit_1.length === 1 &&
      digit_2.length === 1 &&
      digit_3.length === 1 &&
      digit_4.length === 1 &&
      digit_5.length === 1 &&
      digit_6.length === 1
    );
  };
  const handleTabPress = (index) => {
    if (index !== 5) {
      // Disable tab switching for all tabs except the first tab (General Info)
      return;
    }
    setSelected(index);
  };
  const handleBackPress = () => {
    // setSelected(selected - 1);
  };
  const handleNextPress = () => {

    submitGeneralUserData();
  };

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };
  const submitProfilePicture = async () => {
    if (!selectedImage || !selectedImage.path) {
      setSelected(selected + 1);
      return;
    }

    let formData = new FormData();
    formData.append("image", {
      uri: selectedImage.path,
      type: selectedImage.mime,
      name: "profile.jpg",
    });

    dispatch(AppActions.ProfilePicture(formData, setSelected(selected + 1)));
  };
  // const submitProfilePicture = async () => {
  //     if (!selectedImage?.path) {
  //         showAlert('Please upload profile picture');
  //       } else {
  //         let formData = new FormData();
  //         formData.append('image', {
  //             uri: selectedImage?.path,
  //             type: selectedImage?.mime,
  //             name: 'profile.jpg',
  //         });
  //         dispatch(AppActions.ProfilePicture(formData,  setSelected(selected + 1)));
  //         };
  // };
  //  const checkGeneralUserData=()=>{
  //     // handleBlur()
  //  }
  const isFormValid = () => {
    return (
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      !showNameErrorMessage &&
      !showLastNameErrorMessage &&
      !showErrorMessage &&
      !showPasswordErrorMessage &&
      !showConformPasswordErrorMessage
    );
  };
  const submitGeneralUserData = () => {
    if (isFormValid()) {
      let userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      setEmailForOtp(email)
      dispatch(AppActions.userRegister(userData, (res) => {
        if (res?.data?.user_id) {
          setUserId(res?.data?.user_id)
          setPageType('Verify')
        }
      }));
    }
  };

  const isOtheinfoFormValid = () => {
    return (
      mobileNo.trim() !== '' &&
      address.trim() !== '' &&
      city.trim() !== '' &&
      state.trim() !== '' &&
      !mobileError &&
      !addressError &&
      !cityError &&
      !stateError
    );
  };

  const submitOtherUserData = () => {
    if (isOtheinfoFormValid()) {
      let otherUserData = {
        phoneNumber: mobileNo,
        address: address,
        city: city,
        state: state,
        insuranceNo: insuranceNo,
        insuranceProvider: insuranceProvider,
      };

      dispatch(AppActions.otherUserRegister(otherUserData, navigation));
    }
  };


  // const handleOptionSelect = (option) => {
  //   if (option === "camera") {
  //     // Open camera and capture image
  //     ImagePicker.openCamera({
  //       width: 300,
  //       height: 400,
  //       cropping: true,
  //       includeBase64: true,
  //     }).then((image) => {
  //       setSelectedImage(image);
  //       setSelectedImageURI(image.path); // Set the selected image URI
  //       bottomSheetRef.current.close();
  //     });
  //   } else if (option === "upload") {
  //     // Open image picker from files
  //     ImagePicker.openPicker({
  //       width: 300,
  //       height: 400,
  //       cropping: true,
  //       includeBase64: true,
  //     }).then((image) => {
  //       setSelectedImage(image);
  //       setSelectedImageURI(image.path); // Set the selected image URI
  //       bottomSheetRef.current.close();
  //     });
  //   }
  // };




  const __headerComponent = () => {
    return (
      <>
        <HeaderR5
          title={stringsOfLanguage.singup.title}
          isBack
          titlestyle={{ color: globalColors.white }}
          leftIconStyle={{
            backgroundColor: globalColors.transparent,
            tintColor: globalColors.white,
          }}
        />
        {/* <View style={styles.profileview}>

                <Image
                    source={{ uri: selectedImage || `http://54.190.192.105:9117/public/${user?.image}` }}
                    defaultSource={DEFAULT_PROFILE}
                    style={styles.profileImage}
                />

                <TouchableOpacity onPress={onPhotoPress}>
                    <Image
                        source={UPDATE_CAMERA}
                        style={styles.smallimage}
                    />
                </TouchableOpacity>
            </View> */}
      </>
    );
  };

  //   custome validation for name

  const handleName = (value) => {
    if (value.trim() === "") {
      setShowNameErrorMessage(true);
      setShowNameErrorMessage(stringsOfLanguage.validation.missing_firstName);
    } else if (!validateName(value)) {
      setShowNameErrorMessage(true);
      setShowNameErrorMessage("First name should not more than 60 character");
    } else {
      setShowNameErrorMessage(false);
    }
  };

  //   custome validation for last name
  const handleLastName = (value) => {
    if (value.trim() === "") {
      setShowLastNameErrorMessage(true);
      setShowLastNameErrorMessage(stringsOfLanguage.validation.missing_lastname);
    } else if (!validateName(value)) {
      setShowLastNameErrorMessage(true);
      setShowLastNameErrorMessage("Last name should not more than 60 character");
    } else {
      setShowLastNameErrorMessage(false);
    }
  }

  //   custome validation for email
  const handleEmail = () => {
    if (email.trim() === "") {
      setShowErrorMessage(true);
      setShowErrorMessage("Email is missing");
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
      setShowPasswordErrorMessage("Password is missing");
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

  //   custome validation for mobile
  const [mobileError, setmobileError] = useState(false);
  const handleMobileChange = () => {
    if (mobileNo.trim() === "") {
      setmobileError(true);
      setmobileError("Contact number is missing");
    } else if (!validateMobile(mobileNo)) {
      setmobileError(true);
      setmobileError(stringsOfLanguage.validation.invalid_mobile);
    } else {
      setmobileError(false);
    }
  };
  //   custome validation for address
  const [addressError, setAddressError] = useState(false);
  const handleAddressChange = (value) => {
    if (value.trim() === "") {
      setAddressError(true);
      setAddressError(stringsOfLanguage.validation.missing_address);
    } else if (!validateAddress(value)) {
      setAddressError(true);
      setAddressError("Address should not more than 200 characters");
    } else {
      setAddressError(false);
    }
  };
  //   custome validation for city
  const [cityError, setCityError] = useState(false);
  const handleCityChange = (value) => {

    if (value.trim() === "") {
      setCityError(true);
      setCityError(stringsOfLanguage.validation.missing_city);
    } else if (!validateName(value)) {
      setCityError(true);
      setCityError("City should not more than 60 character and not allow numeric values");
    } else {
      setCityError(false);
    }
  };
  //   custome validation for State
  const [stateError, setStateError] = useState(false);
  const handleStateChange = (value) => {
    if (value.trim() === "") {
      setStateError(true);
      setStateError(stringsOfLanguage.validation.missing_state);
    } else if (!validateName(value)) {
      setStateError(true);
      setStateError("State should not more than 60 character and not allow numeric values");
    } else {
      setStateError(false);
    }
  };

  const renderPage = () => {
    switch (selected) {
      case 0:
        return (
          <>
            <View style={styles.textInputView}>
              {/* <TouchableOpacity
                style={{ alignItems: "center", marginVertical: 14 }}
                onPress={openBottomSheet}
              >
                {selectedImageURI ? (
                  <Image
                    source={{ uri: selectedImageURI }}
                    style={{ borderRadius: 50, width: 100, height: 100 }}
                  />
                ) : (
                  <Image
                    source={selectCamera}
                    style={{ width: 100, height: 100 }}
                    resizeMode="cover"
                  />
                )}
              </TouchableOpacity> */}
              {
                (pageType == 'Register') ?
                  <>
                    <TextField
                      label={stringsOfLanguage.singup.FirstName}
                      placeholder="First Name"
                      value={firstName}
                      onChangeText={(value) => {
                        setFirstName(value);
                        handleName(value);
                      }}
                      icon={true}
                      image={User}
                      autoCapitalize="none"
                      onBlur={() => handleName(firstName)}
                      keyboardType="default"
                    />
                    {showNameErrorMessage && (
                      <Text style={styles.errorText}>{showNameErrorMessage}</Text>
                    )}

                    <TextField
                      label={stringsOfLanguage.singup.LastName}
                      placeholder="Last Name"
                      value={lastName}
                      onChangeText={(value) => {
                        setLastName(value);
                        handleLastName(value);
                      }}
                      icon={true}
                      image={User}
                      onBlur={() => handleLastName(lastName)}
                      autoCapitalize="none"
                      keyboardType="default"
                    />
                    {showLastNameErrorMessage && (
                      <Text style={styles.errorText}>{showLastNameErrorMessage}</Text>
                    )}

                    <TextField
                      label={stringsOfLanguage.singup.Email}
                      placeholder="Email"
                      value={email}
                      onChangeText={(value) => {
                        setEmail(value);
                        handleEmail(value);
                      }}
                      icon={true}
                      onBlur={() => handleEmail(email)}
                      image={mail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                    {showErrorMessage && (
                      <Text style={styles.errorText}>{showErrorMessage}</Text>
                    )}

                    <TextField
                      placeholder="Password"
                      label={stringsOfLanguage.singup.Password}
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
                      placeholder="Confirm Password"
                      label={stringsOfLanguage.singup.ConfirmPassword}
                      value={confirmPassword}
                      onChangeText={(value) => {
                        setConfirmPassword(value);
                        checkConfirmPassword(value);
                      }}
                      icon={true}
                      rightIcon={true}
                      onBlur={() => checkConfirmPassword(confirmPassword)}
                      image={lock}
                      theme={{
                        colors: {
                          primary: showConformPasswordErrorMessage ? 'red' : globalColors.primaryTheme,
                          text: globalColors.blacktext,
                          placeholder: globalColors.black,
                          disabled: globalColors.black,
                        },
                      }}
                      rightIconHide={showEye}
                      rightIconShow={eye}
                      secure={true}
                    // error={showConformPasswordErrorMessage}
                    />
                    {/* {showConformPasswordErrorMessage && (
                <Text style={styles.errorText}>{showConformPasswordErrorMessage}</Text>
              )} */}
                    <Button
                      onPress={() => handleNextPress()} // Call the handleNextPress function when the button is pressed
                      style={[styles.button, { opacity: !isFormValid() ? 0.5 : 1 }]}
                      textStyle={styles.buttonText}
                      title={stringsOfLanguage.singup.Next}
                      disabled={!isFormValid()}
                    />
                    <View style={styles.signUpView}>
                      <Text style={styles.accountText}>
                        {stringsOfLanguage.singup.Alreadyaccount}{" "}
                      </Text>
                      <TouchableOpacity>
                        <Text
                          style={styles.signUpText}
                          onPress={() => navigation.navigate("Login")}
                        >
                          {stringsOfLanguage.singup.Login}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                  :
                  null
              }

              {
                (pageType == "Verify") ?
                  <>

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
                      onPress={() => onOtpSubmit()} // Call the handleNextPress function when the button is pressed
                      style={[styles.button, { opacity: !isOtpValid() ? 0.5 : 1 }]}
                      textStyle={styles.buttonText}
                      title={'Verify'}
                      disabled={!isOtpValid()}
                    />
                    <View style={styles.signUpView}>
                      <Text style={styles.accountText}>
                        {stringsOfLanguage.singup.Alreadyaccount}{" "}
                      </Text>
                      <TouchableOpacity>
                        <Text
                          style={styles.signUpText}
                          onPress={() => navigation.navigate("Login")}
                        >
                          {stringsOfLanguage.singup.Login}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                  :
                  null
              }


              {/* <BottomSheet
                ref={bottomSheetRef}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={200}
                customStyles={{
                  wrapper: { backgroundColor: "rgba(0,0,0,0.5)" },
                  draggableIcon: { backgroundColor: "#000" },
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    marginHorizontal: 20,
                    marginVertical: 5,
                    fontFamily: FONTS.BOLD,
                  }}
                >
                  Upload Profile Photo
                </Text>
                <TouchableOpacity
                  style={{ marginVertical: 13, marginHorizontal: 20 }}
                  onPress={() => handleOptionSelect("camera")}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      marginBottom: 17,
                    }}
                  >
                    <Image source={camera} /> Use mobile camera
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginHorizontal: 20 }}
                  onPress={() => handleOptionSelect("upload")}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      marginBottom: 17,
                    }}
                  >
                    <Image source={gallery} /> Upload from file
                  </Text>
                </TouchableOpacity>
              </BottomSheet> */}
            </View>
          </>
        );
      case 1:
        return (
          <>
            <View style={styles.textInputView}>
              <TextField
                label={stringsOfLanguage.singup.ContactNumber}
                placeholder="Contact Number"
                value={mobileNo}
                onChangeText={(value) => {
                  setMobileNo(value);
                  handleMobileChange(value);
                }}
                icon={true}
                image={call}
                autoCapitalize={"none"}
                onBlur={() => handleMobileChange(mobileNo)}
              />
              {mobileError && (
                <Text style={styles.errorText}>
                  {mobileError}
                </Text>
              )}

              <TextField
                label={stringsOfLanguage.singup.Address}
                placeholder="Address"
                value={address}
                onChangeText={(value) => {
                  setAddress(value);
                  handleAddressChange(value);
                }}
                onBlur={() => handleAddressChange(address)}
                icon={true}
                image={map}
                autoCapitalize={"none"}
              />
              {addressError && (
                <Text style={styles.errorText}>
                  {addressError}
                </Text>
              )}
              <TextField
                label={stringsOfLanguage.singup.City}
                placeholder="City"
                value={city}
                onChangeText={(value) => {
                  setCity(value);
                  handleCityChange(value);
                }}
                onBlur={() => handleCityChange(city)}
                icon={true}
                image={map}
                autoCapitalize={"none"}
              />
              {cityError && (
                <Text style={styles.errorText}>
                  {cityError}
                </Text>
              )}
              <TextField
                label={stringsOfLanguage.singup.State}
                placeholder="State"
                value={state}
                onChangeText={(value) => {
                  setState(value);
                  handleStateChange(value);
                }}
                onBlur={() => handleStateChange(state)}
                icon={true}
                image={map}
                autoCapitalize={"none"}
              />
              {stateError && (
                <Text style={styles.errorText}>
                  {stateError}
                </Text>
              )}
              <TextField
                placeholder={"Insurance Number"}
                label={stringsOfLanguage.singup.InsuranceNumber}
                value={insuranceNo}
                onChangeText={(value) => setInsuranceNo(value)}
                icon={true}
                image={shield}
              />
              <TextField
                placeholder={"Insurance Provider"}
                label={stringsOfLanguage.singup.InsuranceProvider}
                value={insuranceProvider}
                onChangeText={(value) => setInsuranceProvider(value)}
                icon={true}
                image={shield}
              />
              {/* Back Button */}
              <View style={styles.backBtnView}>
                {/* <TouchableOpacity style={styles.backView}>
                                <Text
                                    style={styles.backText}
                                    onPress={() => handleBackPress()}
                                >
                                    Back
                                </Text>
                            </TouchableOpacity> */}
                <Button
                  onPress={() => {
                    submitOtherUserData();
                  }}
                  style={[styles.otherInfoBtn, { opacity: !isOtheinfoFormValid() ? 0.5 : 1 }]}
                  textStyle={styles.buttonText}
                  title={stringsOfLanguage.singup.Submit}
                  disabled={!isOtheinfoFormValid()}
                />
              </View>

              <View style={styles.signUpView}>
                <Text style={styles.accountText}>
                  {/* {stringsOfLanguage.singup.Alreadyaccount}{" "} */}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={styles.signUpText}
                    onPress={() => navigation.navigate("Login")}
                  >
                    {/* {stringsOfLanguage.singup.Login} */}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <ScrollViewR5
      renderHeader={__headerComponent}
      headerStyle={{ backgroundColor: globalColors.primaryTheme }}
      bodyStyle={styles.contentContainerStyle}
    >
      <ReactNativeSegmentedControlTab
        selectedIndex={selected}
        allowFontScaling={false}
        values={[
          stringsOfLanguage.singup.GeneralInfo,
          stringsOfLanguage.singup.OtherInfo,
        ]}
        onTabPress={handleTabPress}
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        tabTextStyle={styles.tabTextStyle}
        activeTabTextStyle={styles.activeTabTextStyle}
        tabsContainerStyle={styles.tabsContainerStyle}
      />
      {renderPage()}
    </ScrollViewR5>
  );
};
export default Register;

