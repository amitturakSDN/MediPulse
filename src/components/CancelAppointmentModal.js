import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Rectangle, circle, success, cancel } from '../assets/images';
import GLOBALS from '../constants';
import { globalColors, globalFonts } from '@/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button, TextField } from '.';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import SuccessCancelAppointment from './SuccessCancelAppointment';
const { FONTS, COLOR, Strings } = GLOBALS;
import * as AppActions from '@actions';
import { useDispatch } from 'react-redux';
import stringsOfLanguage from '../constants/ScreenStrings'
const CancelAppointmentModal = (props) => {
  const {
    isSuccessVisible,
    onSuccessClose,
    appointmentId,
    isWaiting
  } = props;
  console.log(isSuccessVisible, 'isSuccessVisible')
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [ModalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const { navigation } = props;
  const closeSuccessModel = () => {
    onSuccessClose();
  };


  const handleDonePress = () => {
      
    dispatch(AppActions.getDashboardData(navigation, (res) => {
      console.log(res?.data, 'getDashboardData>>?');
      if (res?.code === 200) {
        console.log('getDashboardData');
      }
    }));
  };
  
  const closeModal = () => {
    setModalVisible(false);
  };
 
  const cancelAppointmentPress = async () => {
    setErrorMessage('');
  
    if (!reason.trim()) {
      setErrorMessage('Please enter a reason for cancellation.');
      return;
    }
  
    if (!isWaiting) {
      const requestData = {
        appointmentId: appointmentId,
        appointmentCancelReason: reason,
      };
      dispatch(AppActions.cancelOppointment(requestData, async (res) => {
        console.log(res, 'res}}}}}');
        if (res) {
          console.log(res, 'res1}}}}}');
          setModalVisible(true);
          props.onSuccessClose();
          props.handleDonePress();
        }
      }));
    } else {
      const requestBody = {
        waitingRoomQueueId: appointmentId,
        appointmentCancelReason: reason,
      };
      dispatch(AppActions.outFromWaitingRoom(requestBody, async (res) => {
        console.log(res, 'res}}}}}');
        if (res) {
          console.log(res, 'res1}}}}}');
          setModalVisible(true);
          props.onSuccessClose();
          props.handleDonePress();
        }
      }));
    }
  };
  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSuccessVisible}
      onRequestClose={closeSuccessModel}
    >
      <TouchableWithoutFeedback >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>


            <View style={styles.successView}>
              <View style={styles.successImgView}>
                <Image source={cancel} />
              </View>
            </View>
            <Text style={styles.congratulationsText}>{stringsOfLanguage.model.cancelappointment}</Text>
            <Text style={styles.cancelText}>{stringsOfLanguage.model.cancelmessage}</Text>
            {/* <Text style={styles.cancelText}>This will cancel your appointment with <Text style={styles.doctorTxt}>Dr. George Johnson</Text>, are you sure?</Text> */}
            <View style={styles.line}></View>
            <Text style={styles.reasonText}>{stringsOfLanguage.model.CancelReason}</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                onChangeText={(e) => {
                  setReason(e);
                  setErrorMessage(''); // Clear the error message on every text change
                }}
                value={reason}
                placeholder={stringsOfLanguage.model.addreason}
              />
              {errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
              )}
            </View>


            <View style={styles.line}></View>
            <View style={styles.btnView}>
              <TouchableOpacity onPress={() => closeSuccessModel()}><Text style={styles.cBtn}>{stringsOfLanguage.model.Cancel}</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => cancelAppointmentPress()} >
                <Text style={styles.coBtn}>{stringsOfLanguage.model.Confirm}</Text>
              </TouchableOpacity>

            </View>
            <SuccessCancelAppointment
              SuccessVisible={ModalVisible}
              SuccessClose={() => setModalVisible(false)}
              handleDonePress={() => handleDonePress()}
            // closeModel={()=> closeSuccessModel()}
            />
            {/* <Button
                onPress={handleDonePress}
                style={styles.button}
                textStyle={styles.buttonText}
                title={'Co style={styles.coBtn}ntinue'}
              /> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    // marginTop: '%',
    backgroundColor: 'white',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 0
    },
    marginHorizontal: 20,
    // height: '35%',
    width: '90%'
  },

  listView: {
    paddingHorizontal: 14,
    paddingVertical: 20,
    backgroundColor: '#F4F4F4'
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  listText: {
    fontSize: 18,
    fontFamily: GLOBALS.FONTS.MEDIUM,
    lineHeight: 22,
    color: '#333333',
    marginHorizontal: 7,
    textAlign: 'center'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 15
  },

  successView: {
    paddingVertical: 25
  },
  successImgView: {
    alignItems: 'center'
  },
  successText: {
    fontSize: 25,
    fontFamily: FONTS.BOLD,
    lineHeight: 30,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  congratulationsText: {
    fontSize: 18,
    fontFamily: FONTS.BOLD,
    lineHeight: 22,
    color: '#192E49',
    textAlign: 'center',
    // marginVertical:14,
    marginHorizontal: 40
  },
  cancelText: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    lineHeight: 22,
    color: '#666666',
    textAlign: 'center',
    // marginVertical:14,
    marginHorizontal: 20,
    marginVertical: 10
  },
  reasonText: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    lineHeight: 22,
    color: '#171717',
    marginHorizontal: 20
  },
  inputView: {
    height: RFValue(50),
    width: '90%',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    marginHorizontal: RFValue(15),
    borderWidth: 0,
    borderTopRightRadius: RFValue(10),
    borderTopLeftRadius: RFValue(10),
    backgroundColor: globalColors.whiteGrey,
  },
  input: {
    margin: 20
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginBottom: 10
  },
  cBtn: {
    fontSize: 20,
    fontFamily: FONTS.MEDIUM,
    lineHeight: 55,
    color: '#171717',
  },
  coBtn: {
    fontSize: 20,
    fontFamily: FONTS.MEDIUM,
    lineHeight: 55,
    color: '#171717',
  },
  doctorTxt: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    lineHeight: 22,
    color: '#171717',
    textAlign: 'center',
    // marginVertical:14,
    marginHorizontal: 20,
    marginVertical: 10
  },
  successDetails: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  label: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    lineHeight: 27,
    color: '#84818A',

  },
  value: {
    fontSize: 16,
    fontFamily: FONTS.SEMI_BOLD,
    lineHeight: 27,
    color: '#171717',
  },

  button: {
    backgroundColor: globalColors.primaryTheme,
    height: RFValue(44),
    width: '92%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(7),
    marginVertical: 14,
    marginHorizontal: 14
  },
  buttonText: {
    fontFamily: FONTS.BOLD,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 27,
    color: globalColors.white,
  },
  errorText: {
    fontFamily: FONTS.REGULAR,
    color: '#FF0000',
    fontSize: 13,
    marginBottom: 2,
    marginVertical: 10
  },
});

export default CancelAppointmentModal;
