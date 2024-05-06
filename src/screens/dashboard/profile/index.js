// screens/Home.js
import React, { useEffect, useState } from 'react';
import { Button, View, Text, SafeAreaView, Image, Linking, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderR5 from '../../../components/HeaderR5';
import { globalColors } from '@/theme';
import ViewCrv from '../../../components/ViewCrv';
import { selectCamera, edit, call, mail, healthRecord, allergies, blood, insurance, bmi,alcohol,tobacco, bloodType, weight, height } from '../../../assets/images/index';
import HealthDetails from './components/HealthDetails';
import GLOBALS from '../../../constants';
import * as AppActions from '@actions';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import stringsOfLanguage from '../../../constants/ScreenStrings'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment/moment';

const { FONTS, COLOR, Strings } = GLOBALS;
// const data = [
//   {
//     insuranceNumber: stringsOfLanguage.profile.NotAvailable,
//     description: stringsOfLanguage.profile.YourInsurancenumber,
//     image: insurance,
//   },
//   {
//     insuranceNumber: stringsOfLanguage.profile.NotAvailable,
//     description: stringsOfLanguage.profile.Allergies,
//     image: allergies,
//   },
//   {
//     insuranceNumber: stringsOfLanguage.profile.NotAvailable,
//     description: stringsOfLanguage.profile.BloodType,
//     image: blood,
//   },
//   {
//     insuranceNumber: stringsOfLanguage.profile.NotAvailable,
//     description: stringsOfLanguage.profile.BMI,
//     image: bmi,
//   },
//   {

//     insuranceNumber: stringsOfLanguage.profile.NotAvailable,
//     description: stringsOfLanguage.profile.Pulse,
//     image: blood,
//   },
//   {
//     insuranceNumber: stringsOfLanguage.profile.NotAvailable,
//     description: stringsOfLanguage.profile.HeartRate,
//     image: blood,
//   },
//   {
//     insuranceNumber: stringsOfLanguage.profile.NotAvailable,
//     description: stringsOfLanguage.profile.BP,
//     image: blood,
//   },
//   {
//     insuranceNumber: stringsOfLanguage.profile.NotAvailable,
//     description: stringsOfLanguage.profile.Tobacco,

//     image: blood,
//   },
//   {
//     insuranceNumber: stringsOfLanguage.profile.NotAvailable,
//     description: stringsOfLanguage.profile.Alcohol,
//     image: blood,
//   },

//   // Add more items as needed
// ];
const data = [
  {
    insuranceNumber: "Your Insurance number",
    description: 'Not Available',
    image: insurance,
  },
  {
    insuranceNumber: 'Allergies',
    description: 'Not Available',
    image: allergies,
  },
  {
    insuranceNumber: 'BMI',
    description: 'Not Available',
    image: bmi,
  },
  {
    insuranceNumber: 'Tobacco',
    description: 'Not Available',

    image: tobacco,
  },
  {
    insuranceNumber: 'Alcohol',
    description: 'Not Available',
    image: alcohol,
  },

  // Add more items as needed
];


const data1 = [
  {
    insuranceNumber: "あなたの保険番号",
    description: '利用不可',
    image: insurance,
  },
  {
    insuranceNumber: 'アレルギー',
    description: '利用不可',
    image: allergies,
  },
  {
    insuranceNumber: '血液型',
    description: '利用不可',
    image: blood,
  },
  {
    insuranceNumber: 'ティッカー',
    description: '利用不可',
    image: bmi,
  },
  {
    insuranceNumber: 'タバコ',
    description: '利用不可',

    image: tobacco,
  },
  {
    insuranceNumber: 'アルコール',
    description: '利用不可',
    image: alcohol,
  },

  // Add more items as needed
];
function Profile(props) {
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

  // const url_settings = 'MediPulseapp://settingsscreen';
  const [scannerVisible, setScannerVisible] = useState(false);
  const { navigation } = props;
  const dispatch = useDispatch();
  const profileData = useSelector(state => state.authReducer?.profileData?.data);
  console.log(profileData,'>>profileData');
  console.log(profileData?.profile?.profilePhoto, 'image1')
  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        AppActions.getProfile(res => {
          // alert('hi')
          console.log(res.data, 'res>>>>??+++');
          // setEmail(res?.emailId);
          // setPhone(res?.phoneNumber);
          // setImage(res?.photoPath);
          // setAddess(res?.address);
          // setName(res?.firstName);
          // setlastName(res?.lastName);
        }),
      );
    }, []),
  );
  
  const maskDigits = (data) => {
    let input = data?.toString()
    if (!input) {
      return ""; // Return an empty string if the input is null or empty
    }
  
   
  
    const maskedPart = input.slice(0, -4).replace(/\d/g, '*');
    const lastFourDigits = input.slice(-4);
    return maskedPart + lastFourDigits;
  };
  const __headerComponent = () => {
    return (
      <>
        <HeaderR5
          title={stringsOfLanguage.profile.title}
          isdrawer
          titlestyle={styles.title}
          leftIconStyle={{
            backgroundColor: globalColors.transparent,
            tintColor: globalColors.white
          }}
        />
      </>
    );
  }
  function year(profileData) {
    const dateString = profileData;
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const yearDifference = currentDate.getFullYear() - givenDate.getFullYear();
    return yearDifference
  }
  function month(profileData) {
    if (profileData) {
      const today = moment();
      const ageYears = today.diff(profileData, 'years');
      const ageMonths = today.diff(profileData, 'months');
      if (ageMonths === 0) {

        if (ageYears === 0) {
          return '';
        } else {
          return `${ageYears} Y`;
        }
      } else if (ageYears === 0) {
        return `${ageMonths} M`;
      } else if (ageMonths % 12 === 0) {
        return `${ageYears} Y`;
      } else {
        const months = ageMonths % 12;
        return `${ageYears} Y, ${months} M`;
      }
    } else {
      return '';
    }
  }
  
  return (
    <View style={[styles.container]}>
      <SafeAreaView style={styles.safeAreaView}>
        {/* <Button
      title="Click Here"
      onPress={() => Linking.openURL(url_settings)}
      /> */}
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContainer}
          style={{
            margin: 0,
          }}>
          {/* top header */}
          {__headerComponent()}
          <ViewCrv>
            <View style={styles.mainView}>
              <View style={styles.profileView}>
                <View style={styles.profileCamera}
                >
                  {profileData?.profile?.profilePhoto ?
                    <Image style={styles.profileCameraUrl} resizeMode="cover" source={{ uri: profileData.profile.profilePhoto }} />
                    // <Image style={styles.profileCameraUrl} resizeMode="cover" source={{ uri: 'https://www.google.com:9169/uploads/' + profileData?.profile?.profilePhoto }} />
                    :
                    <Image source={selectCamera} style={styles.profileCameraImg} resizeMode="cover" />
                  }

                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('EditProfile') }} style={styles.editBtnView}>
                  <Image source={edit} style={styles.editImg} />
                </TouchableOpacity>
              </View>
              <Text style={styles.username}>
                {profileData?.profile?.firstName} {profileData?.profile?.lastName}
                {profileData?.profile?.gender && profileData?.profile?.DOB && ` / ${profileData?.profile?.gender} / ${month(profileData?.profile?.DOB)}`}
              </Text>
              <Text style={styles.address}>{profileData?.profile?.address}</Text>
              <View style={styles.mailView}>
                <View style={styles.mailImgView}>
                  <Image style={styles.mailImg} source={mail} />
                </View>
                <Text style={styles.mail}>{profileData?.user?.email}</Text>
              </View>
              <View style={styles.callView}>
                {profileData?.profile?.phoneNumber && (
                  <View style={styles.callImgView}>
                    <Image style={styles.callImg} source={call} />
                  </View>
                )}
                {profileData?.profile?.phoneNumber && (
                  <Text style={styles.call}>{maskDigits(profileData?.profile?.phoneNumber)}</Text>
                )}
              </View>
              {/* <View style={styles.hralthRecord}>
                <Image style={styles.hralthRecordImg} resizeMode="contain" source={healthRecord} />
              </View> */}

              <View style={styles.boxContainer}>
                <View>
                  <Image style={styles.dataImg} source={bloodType} />
                  <Text style={styles.boxText}>{stringsOfLanguage.profile.BloodType}</Text>
                  {profileData?.profile?.other_info?.bloodType ? (
                    <Text style={styles.boxValue}>{profileData?.profile?.other_info?.bloodType}</Text>
                  ) : (
                    <Text style={styles.boxValue}>{stringsOfLanguage.profile.AddType}</Text>
                  )}
                </View>
                <View style={styles.line}></View>

                <View style={{ alignContent: 'center' }}>
                  <Image style={styles.dataImg} source={height} />
                  <Text style={styles.boxText}>{stringsOfLanguage.profile.Height}</Text>
                  {profileData?.profile?.other_info?.height ? (
                    <Text style={styles.boxValue}>{profileData?.profile?.other_info?.height} CM</Text>
                  ) : (
                    <Text style={styles.boxValue}>{stringsOfLanguage.profile.AddHeight}</Text>
                  )}
                </View>
                <View style={styles.line}></View>

                <View>
                  <Image style={styles.dataImg} source={weight} />
                  <Text style={styles.boxText}>{stringsOfLanguage.profile.Weight}</Text>
                  {profileData?.profile?.other_info?.weight ? (
                    <Text style={styles.boxValue}>{profileData?.profile?.other_info?.weight} KG</Text>
                  ) : (
                    <Text style={styles.boxValue}>{stringsOfLanguage.profile.AddWeight}</Text>
                  )}
                </View>
              </View>



              <View style={styles.listContainer}>
                <FlatList
                  data={lang == 'English' ? data : data}
                  renderItem={({ item }) => <HealthDetails item={item} profileData={profileData} />}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

            </View>
          </ViewCrv>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
export default Profile;
