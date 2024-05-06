import React, { useState } from 'react';
import { View,Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '@actions';
import styles from './styles';
import {closeIcon } from '../../../assets/images'

const SCREEN_HEIGHT = Dimensions.get("window").height;

function ScanQR(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [scannerOpen, setScannerOpen] = useState(true);

  const onSuccess = (e) => {
    if (scannerOpen) {
      console.log('Scan===', JSON.parse(e?.data).waitingRoomId);
      const waitingRoomid = JSON.parse(e?.data).waitingRoomId;
      let scanData = {
        "waitingRoomId": waitingRoomid
      };
      dispatch(AppActions.enrollWaitingRoom(scanData, navigation, (res) => {
        console.log(res, 'res>>????');
        if (res?.code === 200) {
          console.log(res, 'res+++++');
        }
      }));
    }
  };

  const handleCancel = () => {
    setScannerOpen(false);
    navigation.goBack()
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        nestedScrollEnabled={true}
        extraScrollHeight={100}
      >
        <View style={styles.formContainer}>
          {scannerOpen && (
            <QRCodeScanner
              onRead={onSuccess}
              showMarker
              markerStyle={{
                borderColor: "#ffffff",
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 3,
                marginBottom: '20%'
              }}
              cameraStyle={{ height: SCREEN_HEIGHT }}
            />
          )}
          {scannerOpen && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
             <Image source={closeIcon} /> 
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default ScanQR;
