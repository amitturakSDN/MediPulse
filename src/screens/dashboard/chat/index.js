// screens/Home.js
import React, { useEffect, useState } from 'react';
import { Button, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderR5 from '../../../components/HeaderR5';
import { notification } from '../../../assets/images'
import { globalColors } from '@/theme';
import ViewCrv from '../../../components/ViewCrv';
import Card from './components/Card';
import Waitngcard from './components/Waitngcard';
import CurrentApoointmentCard from './components/CurrentApoointmentCard';
import DocumentsList from './components/DocumentsList';
import Allergies from './components/Allergies';
import { scan } from '../../../assets/images';
import { QRCodeScanner } from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Strings from '../../../constants/string';
import stringsOfLanguage from '../../../constants/ScreenStrings'    
function Home(props) {

 
  const [scannerVisible, setScannerVisible] = useState(false);
const {navigation} = props;
  const onSuccess = (e) => {
    // Handle the scanned QR code data here
    console.log('QR code scanned:', e.data);
  };

  const scannerPress = () => {
    navigation.navigate('ScanQR')
  };

  const __headerComponent = () => {

    return (
      <>
        <HeaderR5
          title={"MediPulse"}
          isdrawer
          rightIcon={notification}
          titlestyle={{ color: globalColors.white, fontSize: 32 }}
          leftIconStyle={{
            backgroundColor: globalColors.transparent,
            tintColor: globalColors.white
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
  }

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
            <Waitngcard />
            <Text style={styles.upcomingText}>Current Appointment</Text>
            <CurrentApoointmentCard />
            <Text style={styles.upcomingText}>Documents</Text>
            <DocumentsList />
            {/* <Text style={styles.upcomingText}>Allergies</Text> */}
            {/* <Allergies /> */}
            <Text style={styles.upcomingText}>{stringsOfLanguage.LatestEvent}</Text>

          </ViewCrv>
        </KeyboardAwareScrollView>
        <TouchableOpacity onPress={() => scannerPress()} style={styles.buttonContainer}>
          <Image source={scan} style={styles.buttonImage} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
export default Home;
