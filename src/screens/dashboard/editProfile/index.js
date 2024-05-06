import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, TextField } from '../../../components';
import { login, closeIcon, logo, mail, lock, User, calendar, dropdown, greater, less, checkBox, checkBoxSelect, call, map, shield, selectCamera, camera, gallery, addImg } from '../../../assets/images/index';
import { Image, TextInput, ImageBackground, Platform, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles.js';
import { globalColors } from '@/theme';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ScrollViewR5 from '../../../components/ScrollViewR5';
import HeaderR5 from '../../../components/HeaderR5';
import BottomSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import GLOBALS from '../../../constants';
import * as AppActions from '../../../actions';
const { API_URL, NETWORK_STATUS, ACTION_TYPE } = GLOBALS;
import axios from "axios";
import { store } from '../../../store/configureStore';
import ReactNativeSegmentedControlTab from 'react-native-segmented-control-tab';
const { FONTS, COLOR, Strings } = GLOBALS;
import { Calendar, LocaleConfig } from 'react-native-calendars';
import HospitalsModel from '../../../components/HospitalsModel';
import BloodTypeModel from '../../../components/BloodTypeModel';
import { useFocusEffect } from '@react-navigation/native';
import AllergiesModel from '../../../components/AllergiesModel';
import stringsOfLanguage from '../../../constants/ScreenStrings'
import { alertWithOneBtn } from '../../../helpers/common';
import { validateAddress, validateMobile, validateName } from '../../../utils/ValidationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPicker from 'react-native-calendar-picker';


const BloodData = [
    {
        type: "A+",
        id: 1
    },
    {
        type: "A-",
        id: 2
    },
    {
        type: "B+",
        id: 3
    },
    {
        type: "B-",
        id: 4
    },
    {
        type: "AB+",
        id: 5
    },
    {
        type: "AB-",
        id: 6
    },
    {
        type: "O+",
        id: 7
    },
    {
        type: "O-",
        id: 8
    },
]
const TobaccoData = [
    {
        type: "5 Cigarettes",
        id: 1
    },
    {
        type: "10 Cigarettes",
        id: 2
    },
    {
        type: "15 Cigarettes",
        id: 3
    },
    {
        type: "20+ Cigarettes",
        id: 4
    },
    {
        type: "No",
        id: 5
    }
]
const TobaccoDataj = [
    {
        type: "タバコ5本",
        id: 1
    },
    {
        type: "タバコ10本",
        id: 2
    },
    {
        type: "タバコ15本",
        id: 3
    },
    {
        type: "20本以上のタバコ",
        id: 4
    },
    {
        type: "いいえ",
        id: 5
    }
]
const AlcoholData = [
    {
        type: "1 Glass",
        id: 1
    },
    {
        type: "2 Glasses",
        id: 2
    },
    {
        type: "3 Glasses",
        id: 3
    },
    {
        type: "4 Glasses",
        id: 4
    },
    {
        type: "No",
        id: 5
    }
]
const AlcoholDataj = [
    {
        type: "グラス1杯",
        id: 1
    },
    {
        type: "2 グラス",
        id: 2
    },
    {
        type: "3 グラス",
        id: 3
    },
    {
        type: "4 ガラス",
        id: 4
    },
    {
        type: "いいえ",
        id: 5
    }
]
const AllergiesData = [
    {
        type: "Milk",
        id: 1
    },
    {
        type: "Egg",
        id: 2
    },
    {
        type: "Peanut",
        id: 3
    },
    {
        type: "Soy",
        id: 4
    },
    {
        type: "Mango",
        id: 5
    },
    {
        type: "Wheat",
        id: 6
    },
    {
        type: "Tree Nut",
        id: 7
    },
    {
        type: "ShellFish",
        id: 8
    },
    {
        type: "Fish",
        id: 9
    },
    {
        type: "Dust",
        id: 10
    },
    {
        type: "Other",
        id: 11
    },
]
export const EditProfile = (props) => {
    const [selectedStartDate, setSelectedStartDate] = useState(null);

    const onDateChange = (date) => {
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;
        console.log("Selected date>>>>>>", formattedDate);
        setSelectedStartDate(formattedDate);
        setSelectedDate(formattedDate);
        closeCalendar();
    };
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';



    const [lang, setLang] = useState('')
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('language');
            await setLang(value)
            console.log('Retrieved value:', value);
            return value;
        } catch (e) {
            console.log('erro while get Async storage >>', e)
        }
    }
    getData()
    let { navigation } = props;
    const bottomSheetRef = useRef(null);
    const dispatch = useDispatch();
    const profileData = useSelector(state => state.authReducer?.profileData?.data);
    console.log(profileData, 'profileData<<--->')
    const [firstName, setFirstName] = useState(profileData?.profile?.firstName || '');
    const [lastName, setLastName] = useState(profileData?.profile?.lastName || '');
    const [email, setEmail] = useState(profileData?.user?.email || '');
    const [password, setPassword] = useState('');
    const [mobileNo, setMobileNo] = useState((profileData?.profile?.phoneNumber)?.toString() || '');
    const [address, setAddress] = useState(profileData?.profile?.address || '');
    const [city, setCity] = useState(profileData?.profile?.city || '');
    const [state, setState] = useState(profileData?.profile?.state || '');
    const [insuranceNo, setInsuranceNo] = useState(profileData?.profile?.insuranceNo || '');
    const [insuranceProvider, setInsuranceProvider] = useState(profileData?.profile?.insuranceProvider || '');
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    let originalDate = new Date(profileData?.profile?.DOB);
    const [selectedDate, setSelectedDate] = useState(profileData?.profile?.DOB ? profileData.profile.DOB.split('T')[0] : '');



    const [modalData, setModalData] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleTobacco, setModalVisibleTobacco] = useState(false);
    const [modalVisibleAlcohol, setModalVisibleAlcohol] = useState(false);
    const [modalVisibleAllergies, setModalVisibleAllergies] = useState(false);

    const [selectedOption, setSelectedOption] = useState(profileData?.profile?.gender || '');
    // const [allergies, setAllergies] = useState(profileData?.profile?.other_info?.allergies && profileData?.profile?.other_info?.allergies.length > 0 ? profileData?.profile?.other_info?.allergies : []);
    const [allergies, setAllergies] = useState(profileData?.profile?.other_info?.allergies && profileData?.profile?.other_info?.allergies.length > 0 ? profileData?.profile?.other_info?.allergies.join(', ') : []);
    // const [bloodType, setBloodType] = useState(profileData?.profile?.other_info?.bloodType || '');
    const [selectedBloodType, setSelectedBloodType] = useState(profileData?.profile?.other_info?.bloodType || '');
    const [height, setHeight] = useState(profileData?.profile?.other_info?.height && profileData?.profile?.other_info?.height != 0 ? (profileData?.profile?.other_info?.height)?.toString() : '');
    const [weight, setWeight] = useState(profileData?.profile?.other_info?.weight && profileData?.profile?.other_info?.weight != 0 ? (profileData?.profile?.other_info?.weight)?.toString() : '');
    const [tobacco, setTobacco] = useState(profileData?.profile?.other_info?.smokingPackPerDay || '');
    const [alcohol, setAlcohol] = useState(profileData?.profile?.other_info?.drinkingGlassPerDay || '')
    const [BMI, setBMI] = useState(profileData?.profile?.other_info?.BMI || null)
    const [pulse, setPulse] = useState((profileData?.profile?.other_info?.pulse)?.toString() || '')
    const [heartRate, setHeartRate] = useState((profileData?.profile?.other_info?.setHeartRate)?.toString() || '')
    const [BP, setBP] = useState((profileData?.profile?.other_info?.bp) || '')

    const [currentMedication, setCurrentMedication] = useState(['']);
    const [isValuePresent, setIsValuePresent] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageURI, setSelectedImageURI] = useState(null);
    const [token, setToken] = useState('');
    const [imageSource, setImageSource] = useState(null);
    const [selected, setSelected] = useState(0);

    // error state
    const [showNameErrorMessage, setShowNameErrorMessage] = useState(false);
    const [showLastNameErrorMessage, setShowLastNameErrorMessage] = useState(false);
    const [mobileError, setmobileError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [stateError, setStateError] = useState(false);
    const layout = useWindowDimensions();

    useFocusEffect(
        React.useCallback(() => {
            dispatch(
                AppActions.getProfile(res => {
                }),
            );
        }, []),
    );
    /**Show alert on validation error */
    const showAlert = message => {
        alertWithOneBtn(
            stringsOfLanguage.customAlert.title,
            message,
            stringsOfLanguage.customAlert.button,
        );
    };
    const handleCheckboxSelection = (option) => {
        setSelectedOption(option);
    };

    const openCalendar = () => {
        setCalendarOpen(true);
    };

    const closeCalendar = () => {
        setCalendarOpen(false);
    };
    const handleTabPress = index => {
        setSelected(index);
    };
    const handleBackPress = () => {
        setSelected(selected - 1);
    };
    const handleNextPress = () => {
        submitGeneralUserData();
    };

    const openBottomSheet = () => {
        bottomSheetRef.current.open();
    };

    const submitProfilePicture = () => {
        console.log(selectedImage, 'selectedImage>>>>');
        let formData = new FormData();
        formData.append('image', {
            uri: selectedImage?.path,
            type: selectedImage?.mime,
            name: 'profile.jpg',
        });
        dispatch(AppActions.ProfilePicture(formData, setSelected(selected + 1)));
    };

    const submitGeneralUserData = () => {
        if (isFormValid()) {
            let userData = {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "phoneNumber": mobileNo,
            };
            dispatch(AppActions.profileUpdate(userData, (res) => {
                console.log(res, 'res>>>>>>>>>>>>>>>>>>>>>>')
                if (res?.code == 200) {
                    if (selectedImage) {
                        submitProfilePicture();
                    } else {
                        setSelected(selected + 1)
                    }
                }
            }));
        }
    };
    const submitOtherUserData = () => {

        if (isOtheinfoFormValid()) {
            let otherUserData = {
                "address": address,
                "city": city,
                "state": state,
                "insuranceNo": insuranceNo,
                'insuranceProvider': insuranceProvider,
            };
            dispatch(AppActions.otherUserUpdate(otherUserData, setSelected(selected + 1)));
        }
    };
    const medicalInfoUpdate = () => {
        let medicalData = {
            "DOB": selectedDate,
            "gender": selectedOption,
            'other_info': {
                "allergies": allergies,
                "bloodType": selectedBloodType,
                "height": Number(height),
                "weight": Number(weight),
                "smokingPackPerDay": tobacco,
                "drinkingGlassPerDay": alcohol,
                "BMI": BMI,
                "pulse": Number(pulse),
                "heartRate": Number(heartRate),
                "bp": BP,
                "currentMedication": currentMedication.filter((medication) => medication !== '')
            }
        }
        dispatch(AppActions.medicalUserUpdate(medicalData, navigation));

    }
    const handleOptionSelect = (option) => {
        if (option === 'camera') {
            // Open camera and capture image
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                includeBase64: true,
            }).then((image) => {
                setSelectedImage(image);
                setSelectedImageURI(image.path); // Set the selected image URI
                bottomSheetRef.current.close();
            });
        } else if (option === 'upload') {
            // Open image picker from files
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                includeBase64: true,
            }).then((image) => {
                setSelectedImage(image);
                setSelectedImageURI(image.path); // Set the selected image URI
                bottomSheetRef.current.close();
            });
        }
    };

    const addInputField = () => {
        if (!isValuePresent) {
            return; // Prevent adding a blank input if no value is present
        }

        setCurrentMedication([...currentMedication, '']);
        setIsValuePresent(false); // Reset isValuePresent to false for the next input
    };

    const removeInputField = (index) => {
        if (index) {
            return; // Prevent removing the first value without adding a new value
        }

        const updatedMedication = [...currentMedication];
        updatedMedication.splice(index, 1);
        setCurrentMedication(updatedMedication);
        setIsValuePresent(updatedMedication.length > 0);
    };

    const handleInputChange = (index, text) => {
        const updatedMedication = [...currentMedication];
        updatedMedication[index] = text;
        setCurrentMedication(updatedMedication);
        setIsValuePresent(updatedMedication.length > 0);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalVisibleTobacco(false)
        setModalVisibleAlcohol(false)
        setModalData(null)
    };
    const closeallergiesModel = () => {
        setModalVisibleAllergies(false)
        // setAllergies(null)
    }
    const openModal = (data) => {
        console.log(data, 'data++++++');
        setModalData(data)
        setModalVisible(true);
        setSelectedBloodType(null);
    };
    const openModalTobacco = (data) => {
        console.log(data, 'data++++++');
        setModalData(data)
        setModalVisibleTobacco(true);
        setTobacco(null);
    };
    const openModalAlcohol = (data) => {
        console.log(data, 'data++++++');
        setModalData(data)
        setModalVisibleAlcohol(true);
        setAlcohol(null);
    };
    const openAllergiesModel = () => {
        setModalVisibleAllergies(true);
        setAllergies(null);
    };
    const onBloodTypeSelect = (bloodType, hospitalId) => {
        setSelectedBloodType(bloodType);
    };
    const onTobaccoSelect = (value, hospitalId) => {
        setTobacco(value);
    };
    const onAlcoholSelect = (value, hospitalId) => {
        setAlcohol(value);
    };
    const handleAllergiesSelect = (allergies, id) => {
        console.log(allergies.join(', '), 'allergies>>><')
        setAllergies(allergies);
    };
    const maxDate = new Date(); // Today
   const mindate = new Date(); // Today
mindate.setFullYear(mindate.getFullYear() - 123); // Subtract 123 years from today's year

// If you want to ensure the minimum date starts from the beginning of the day (00:00:00)
mindate.setHours(0, 0, 0, 0);


    // BMI calculation
    const calculateBMI = () => {
        if (height == 0 || weight == 0 || !height || !weight) {
            setBMI(''); // Reset BMI state to an empty string if height or weight is 0
        } else {
            const heightInMeters = height / 100; // Convert height to meters
            const bmi = weight / (heightInMeters * heightInMeters); // Calculate BMI using the formula

            setBMI(bmi.toFixed(2)); // Update the BMI state with the calculated value (rounded to 2 decimal places)
        }
    };

    // Call calculateBMI function whenever the height or weight changes
    useEffect(() => {
        calculateBMI();
    }, [height, weight]);

    const setheight = (value) => {
        if (value <= 275) {
            setHeight(value);
        }
    }
    const setweight = (value) => {
        if (value <= 700) {
            setWeight(value);
        }
    }
    const __headerComponent = () => {
        return (
            <>
                <HeaderR5
                    title={stringsOfLanguage.editProfile.EditProfile}
                    isBack
                    titlestyle={{ color: globalColors.white }}
                    leftIconStyle={{
                        backgroundColor: globalColors.transparent,
                        tintColor: globalColors.white
                    }}
                />
            </>
        );
    }

    //   custome validation for name
    const handleName = (value) => {
        if (value.trim() === "") {
            setShowNameErrorMessage(true);
            setShowNameErrorMessage(stringsOfLanguage.validation.missing_firstName);
        } else if (!validateName(value)) {
            setShowNameErrorMessage(true);
            setShowNameErrorMessage("First name should not more than 60 character and not allow numeric values");
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
            setShowLastNameErrorMessage("Last name should not more than 60 character and not allow numeric values");
        } else {
            setShowLastNameErrorMessage(false);
        }
    }
    //   custome validation for mobile
    const handleMobileChange = () => {
        if (mobileNo.trim() === "") {
            setmobileError(true);
            setmobileError("Please enter your contact number");
        } else if (!validateMobile(mobileNo)) {
            setmobileError(true);
            setmobileError(stringsOfLanguage.validation.invalid_mobile);
        } else {
            setmobileError(false);
        }
    };
    //   custome validation for address

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
    const isFormValid = () => {
        return (
            firstName.trim() !== '' &&
            lastName.trim() !== '' &&
            mobileNo.trim() !== '' &&
            !showNameErrorMessage &&
            !showLastNameErrorMessage &&
            !mobileError

        );
    };
    const isOtheinfoFormValid = () => {
        return (
            address.trim() !== '' &&
            city.trim() !== '' &&
            state.trim() !== '' &&
            !addressError &&
            !cityError &&
            !stateError
        );
    };
    const renderPage = () => {
        switch (selected) {
            case 0:
                return <>
                    <View style={styles.textInputView}>
                        <TouchableOpacity style={{ alignItems: 'center', marginVertical: 14 }} onPress={openBottomSheet}>
                            {/* {profileData?.profile?.profilePhoto ?
                                <Image style={styles.profileCameraUrl} resizeMode="cover" source={{ uri: 'https://https://www.google.com/uploads/' + profileData.profile.profilePhoto }} />
                                :
                                <Image source={selectCamera} style={styles.profileCameraImg} resizeMode="cover" />
                            } */}
                            {selectedImageURI ? (
                                <Image source={{ uri: selectedImageURI }} style={{ borderRadius: 50, width: 100, height: 100 }} />
                            ) : (
                                profileData?.profile?.profilePhoto ?
                                    <Image style={styles.profileCameraUrl} resizeMode="cover" source={{ uri: profileData.profile.profilePhoto }} />
                                    // <Image style={styles.profileCameraUrl} resizeMode="cover" source={{ uri: 'https://www.google.com:9169/uploads/' + profileData.profile.profilePhoto }} />
                                    :
                                    <Image source={selectCamera} style={{ width: 100, height: 100 }} resizeMode="cover" />
                            )}


                        </TouchableOpacity>
                        <TextField
                            label={stringsOfLanguage.editProfile.FirstName}
                            placeholder="First Name"
                            value={firstName}
                            // onChangeText={(value) => setFirstName(value)}
                            onChangeText={(value) => {
                                setFirstName(value);
                                handleName(value);
                            }}
                            onBlur={() => handleName(firstName)}
                            icon={true}
                            image={User}
                            autoCapitalize={'none'}
                            keyboardType="default"
                        />
                        {showNameErrorMessage && (
                            <Text style={styles.errorText}>{showNameErrorMessage}</Text>
                        )}
                        <TextField
                            label={stringsOfLanguage.editProfile.LastName}
                            placeholder="Last Name"
                            value={lastName}
                            // onChangeText={(value) => setLastName(value)}
                            onChangeText={(value) => {
                                setLastName(value);
                                handleLastName(value);
                            }}
                            onBlur={() => handleLastName(lastName)}
                            icon={true}
                            image={User}
                            autoCapitalize={'none'}
                            keyboardType="default"
                        />
                        {showLastNameErrorMessage && (
                            <Text style={styles.errorText}>{showLastNameErrorMessage}</Text>
                        )}
                        <TextField
                            label={stringsOfLanguage.editProfile.ContactNumber}
                            placeholder="Contact Number"
                            value={mobileNo}
                            // onChangeText={(value) => setMobileNo(value)}
                            onChangeText={(value) => {
                                setMobileNo(value);
                                handleMobileChange(value);
                            }}
                            onBlur={() => handleMobileChange(mobileNo)}
                            icon={true}
                            image={call}
                            autoCapitalize={'none'}
                        // keyboardType=""
                        />
                        {mobileError && (
                            <Text style={styles.errorText}>
                                {mobileError}
                            </Text>
                        )}
                        <TextField
                            label={stringsOfLanguage.editProfile.Email}
                            placeholder="Email"
                            value={email}
                            onChangeText={(value) => setEmail(value)}
                            icon={true}
                            image={mail}
                            autoCapitalize={'none'}
                            keyboardType="email-address"
                            disabled={true}
                        />

                        {/* <TextField
                            placeholder={'Password'}
                            label="Password"
                            value={password}
                            onChangeText={(value) => setPassword(value)}
                            icon={true}
                            image={lock}
                            secure={true}
                        /> */}


                        <BottomSheet
                            ref={bottomSheetRef}
                            closeOnDragDown={true}
                            closeOnPressMask={true}
                            height={200}
                            customStyles={{
                                wrapper: { backgroundColor: 'rgba(0,0,0,0.5)' },
                                draggableIcon: { backgroundColor: '#000' },

                            }}
                        >
                            <Text style={{ fontSize: 20, marginHorizontal: 20, marginVertical: 5, fontFamily: FONTS.BOLD, }}>Upload Profile Photo</Text>
                            <TouchableOpacity style={{ marginVertical: 13, marginHorizontal: 20 }} onPress={() => handleOptionSelect('camera')}>
                                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 17 }}><Image source={camera} />     Use mobile camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={() => handleOptionSelect('upload')}>
                                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 17 }}><Image source={gallery} />     Upload from file</Text>
                            </TouchableOpacity>
                        </BottomSheet>
                    </View>
                    <Button
                        onPress={() => handleNextPress()} // Call the handleNextPress function when the button is pressed
                        style={[styles.button, { opacity: !isFormValid() ? 0.5 : 1 }]}
                        textStyle={styles.buttonText}
                        title={stringsOfLanguage.editProfile.Next}
                        disabled={!isFormValid()}
                    />
                </>;
            case 1:
                return <>
                    <View style={styles.textInputView}>

                        <TextField
                            label={stringsOfLanguage.editProfile.Address}
                            placeholder="Address"
                            value={address}
                            // onChangeText={(value) => setAddress(value)}
                            onChangeText={(value) => {
                                setAddress(value);
                                handleAddressChange(value);
                            }}
                            onBlur={() => handleAddressChange(address)}
                            icon={true}
                            image={map}
                            autoCapitalize={'none'}
                        />
                        {addressError && (
                            <Text style={styles.errorText}>
                                {addressError}
                            </Text>
                        )}
                        <TextField
                            label={stringsOfLanguage.editProfile.City}
                            placeholder="City"
                            value={city}
                            // onChangeText={(value) => setCity(value)}
                            onChangeText={(value) => {
                                setCity(value);
                                handleCityChange(value);
                            }}
                            onBlur={() => handleCityChange(city)}
                            icon={true}
                            image={map}
                            autoCapitalize={'none'}
                        />
                        {cityError && (
                            <Text style={styles.errorText}>
                                {cityError}
                            </Text>
                        )}
                        <TextField
                            label={stringsOfLanguage.editProfile.State}
                            placeholder="State"
                            value={state}
                            // onChangeText={(value) => setState(value)}
                            onChangeText={(value) => {
                                setState(value);
                                handleStateChange(value);
                            }}
                            onBlur={() => handleStateChange(state)}
                            icon={true}
                            image={map}
                            autoCapitalize={'none'}
                        />
                        {stateError && (
                            <Text style={styles.errorText}>
                                {stateError}
                            </Text>
                        )}
                        <TextField
                            placeholder={'Insurance Number'}
                            label={stringsOfLanguage.editProfile.InsuranceNumber}
                            value={insuranceNo}
                            onChangeText={(value) => setInsuranceNo(value)}
                            icon={true}
                            image={shield}
                            keyboardType="numeric"
                        />

                    </View>
                    {/* Back Button */}
                    <View style={styles.backBtnView}>
                        <TouchableOpacity style={styles.backView}>
                            <Text
                                style={styles.backText}
                                onPress={() => handleBackPress()}
                            >
                                {stringsOfLanguage.editProfile.Back}
                            </Text>
                        </TouchableOpacity>
                        <Button
                            onPress={() => submitOtherUserData()}
                            style={[styles.otherInfoBtn, { opacity: !isOtheinfoFormValid() ? 0.5 : 1 }]}
                            textStyle={styles.buttonText}
                            title={stringsOfLanguage.editProfile.Next}
                            disabled={!isOtheinfoFormValid()}
                        />
                    </View>
                </>
            case 2:
                return <>
                    <View style={styles.textInputView}>
                        <Text style={styles.upcomingText}>{stringsOfLanguage.editProfile.DOB}</Text>
                        {
                            profileData?.profile?.DOB ? 
                            <View style={styles.selectDropdownn}>
                            <Text style={styles.selectText}>{selectedDate ? selectedDate : 'Select'}</Text>
                            <View style={{ justifyContent: 'center' }}>
                                <Image style={{ width: 18, height: 20 }} source={calendar} />
                            </View>
                            </View> 
                        :
                        <TouchableOpacity onPress={openCalendar} style={styles.selectDropdown}>
                            <Text style={styles.selectText}>{selectedDate ? selectedDate : 'Select'}</Text>
                            <View style={{ justifyContent: 'center' }}>
                                <Image style={{ width: 18, height: 20 }} source={calendar} />
                            </View>
                            </TouchableOpacity> 
                        }
                        
                        {isCalendarOpen && (
                            <CalendarPicker
                                onDateChange={onDateChange}
                                previousTitle={<Image style={{ width: 10, height: 10 }} source={less} />}
                                nextTitle={<Image style={{ width: 10, height: 10 }} source={greater} />}
                                //  minDate={}
                                maxDate={maxDate}
                                minDate={mindate}
                            />



                            // <Calendar
                            //     onDayPress={(day) => {
                            //         setSelectedDate(day.dateString);
                            //         closeCalendar();
                            //     }}
                            //     markedDates={{
                            //         [selectedDate]: {
                            //             selected: true,
                            //             disableTouchEvent: true,
                            //             selectedDotColor: 'orange',
                            //         },
                            //     }}
                            // />

                        )
                        }
                        {console.log("selectedDate>>>>", selectedDate)}
                        <Text style={styles.upcomingText}>{stringsOfLanguage.editProfile.Gender}</Text>
                        <View style={styles.genderView}>
                            <TouchableOpacity
                                style={styles.maleView}
                                onPress={() => handleCheckboxSelection('Male')}
                            >
                                <View style={styles.checkBoxView}>
                                    <Image
                                        source={
                                            selectedOption === 'Male' ? checkBoxSelect : checkBox
                                        }
                                    />
                                </View>
                                <Text style={styles.genderTexts}>{stringsOfLanguage.editProfile.Male}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.femaleView}
                                onPress={() => handleCheckboxSelection('Female')}
                            >
                                <View style={styles.checkBoxView}>
                                    <Image
                                        source={
                                            selectedOption === 'Female' ? checkBoxSelect : checkBox
                                        }
                                    />
                                </View>
                                <Text style={styles.genderTexts}>{stringsOfLanguage.editProfile.Female}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.otherView}
                                onPress={() => handleCheckboxSelection('Other')}
                            >
                                <View style={styles.checkBoxView}>
                                    <Image
                                        source={
                                            selectedOption === 'Other' ? checkBoxSelect : checkBox
                                        }
                                    />
                                </View>
                                <Text style={styles.genderTexts}>{stringsOfLanguage.editProfile.Other}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginVertical: 2 }}></View>
                        <Text style={styles.upcomingText}>{stringsOfLanguage.profile.BloodType}</Text>
                        <TouchableOpacity onPress={() => openModal(BloodData)} style={styles.selectDropdown}>
                            <Text style={styles.selectText}>{selectedBloodType ? selectedBloodType : stringsOfLanguage.editProfile.Select}</Text>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={dropdown} />
                            </View>
                        </TouchableOpacity>
                        <BloodTypeModel
                            data={modalData}
                            isVisible={modalVisible}
                            onSelect={onBloodTypeSelect}
                            onClose={closeModal}
                        />

                        {/* Allergies */}
                        <TextField
                            label={stringsOfLanguage.editProfile.Allergies}
                            placeholder="Allergies"
                            value={allergies}
                            onChangeText={(value) => setAllergies(value)}
                            icon={true}
                            image={map}
                            autoCapitalize={'none'}
                        />
                        {/* <View style={{ marginVertical: 2 }}></View>
                        <Text style={styles.upcomingText}>Select Allergies</Text>
                        <TouchableOpacity onPress={() => openAllergiesModel()} style={styles.selectDropdown}>
                            <Text style={styles.selectText}>{allergies?.length > 0 ? allergies?.join(', ') : 'Select'}</Text>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={dropdown} />
                            </View>
                        </TouchableOpacity>
                        <AllergiesModel
                            data={AllergiesData}
                            isVisible={modalVisibleAllergies}
                            handleAllergiesSelect={handleAllergiesSelect}
                            onClose={closeallergiesModel}
                            selectedAllergies={allergies}
                        /> */}
                        {/* Blood Type */}
                        {/* <TextField
                            placeholder="Blood Type"
                            label="Blood Type"
                            value={bloodType}
                            onChangeText={(value) => setBloodType(value)}
                            icon={true}
                            image={shield}
                        /> */}

                        {/* Height */}
                        <TextField
                            placeholder="Height (CM)"
                            label={stringsOfLanguage.editProfile.Height}
                            value={height}
                            onChangeText={(value) => setheight(value)}
                            icon={true}
                            image={shield}
                            keyboardType='numeric'
                        />

                        {/* Weight */}
                        <TextField
                            placeholder="Weight (KG)"
                            label={stringsOfLanguage.editProfile.Weight}
                            value={weight}
                            onChangeText={(value) => setweight(value)}
                            icon={true}
                            image={shield}
                            keyboardType='numeric'
                        />

                        {/* Tobacco */}
                        {/* <TextField
                            placeholder="Tobacco"
                            label="Tobacco"
                            value={tobacco}
                            onChangeText={(value) => setTobacco(value)}
                            icon={true}
                            image={shield}
                            keyboardType='numeric'
                        /> */}
                        <View style={{ marginVertical: 2 }}></View>
                        <Text style={styles.upcomingText}>{stringsOfLanguage.editProfile.Tobacco}</Text>
                        <TouchableOpacity onPress={() => openModalTobacco(lang == 'English' ? TobaccoData : TobaccoData)} style={styles.selectDropdown}>
                            <Text style={styles.selectText}>{tobacco ? tobacco : stringsOfLanguage.editProfile.Select}</Text>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={dropdown} />
                            </View>
                        </TouchableOpacity>
                        <BloodTypeModel
                            data={modalData}
                            isVisible={modalVisibleTobacco}
                            onSelect={onTobaccoSelect}
                            onClose={closeModal}
                        />
                        {/* <TextField
                            placeholder={'Alcohol'}
                            label="Alcohol"
                            value={alcohol}
                            onChangeText={(value) => setAlcohol(value)}
                            icon={true}
                            image={shield}
                            keyboardType='numeric'
                        /> */}
                        <View style={{ marginVertical: 2 }}></View>
                        <Text style={styles.upcomingText}>{stringsOfLanguage.editProfile.Alcohol}</Text>
                        <TouchableOpacity onPress={() => openModalAlcohol(lang == 'English' ? AlcoholData : AlcoholData)} style={styles.selectDropdown}>
                            <Text style={styles.selectText}>{alcohol ? alcohol : 'Select'}</Text>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={dropdown} />
                            </View>
                        </TouchableOpacity>
                        <BloodTypeModel
                            data={modalData}
                            isVisible={modalVisibleAlcohol}
                            onSelect={onAlcoholSelect}
                            onClose={closeModal}
                        />
                        <TextField
                            placeholder={'BMI'}
                            label={stringsOfLanguage.editProfile.BMI}
                            value={BMI}
                            onChangeText={(value) => setBMI(value)}
                            icon={true}
                            image={shield}
                            disabled={true}
                        />
                        {/* <TextField
                            placeholder={'Pulse'}
                            label="Pulse"
                            value={pulse}
                            onChangeText={(value) => setPulse(value)}
                            icon={true}
                            image={shield}
                        />
                        <TextField
                            placeholder={'Heart Rate'}
                            label="Heart Rate"
                            value={heartRate}
                            onChangeText={(value) => setHeartRate(value)}
                            icon={true}
                            image={shield}
                        />
                        <TextField
                            placeholder={'BP(H/L)'}
                            label="BP(H/L)"
                            value={BP}
                            onChangeText={(value) => setBP(value)}
                            icon={true}
                            image={shield}
                        /> */}
                        {currentMedication.map((medication, index) => (
                            <View style={styles.medicationView} key={index}>
                                <TextField
                                    icon={true}
                                    customStyle={styles.medicationInput}
                                    placeholder={'Medication'}
                                    label={stringsOfLanguage.editProfile.Medication}
                                    image={shield}
                                    value={medication}
                                    onChangeText={(text) => handleInputChange(index, text)}
                                />
                                {index === currentMedication.length - 1 && (
                                    <TouchableOpacity
                                        style={[styles.add, { opacity: currentMedication[index].trim() === '' ? 0.5 : 1 }]}
                                        onPress={addInputField}
                                        disabled={currentMedication[index].trim() === ''}
                                    >
                                        <Image source={addImg} />
                                    </TouchableOpacity>
                                )}
                                {currentMedication.length > 1 && ( // Add this condition to show the remove button only when there's more than one field
                                    <TouchableOpacity
                                        style={styles.remove}
                                        onPress={() => removeInputField(index)}
                                        disabled={currentMedication.length === 1}
                                    >
                                        <Image style={styles.closeImg} source={closeIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}


                        <Button
                            onPress={medicalInfoUpdate} // Call the handleNextPress function when the button is pressed
                            style={styles.buttonn}
                            textStyle={styles.buttonText}
                            title={stringsOfLanguage.editProfile.Submit}
                        />

                    </View>
                </>
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
                values={[stringsOfLanguage.editProfile.GeneralInfo, stringsOfLanguage.editProfile.OtherInfo, stringsOfLanguage.editProfile.MedicalInfo]}
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
export default EditProfile;
