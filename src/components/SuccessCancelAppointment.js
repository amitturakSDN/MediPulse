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
import { Rectangle, circle,success,successSign } from '../assets/images';
import GLOBALS from '../constants';
import { globalColors, globalFonts } from '@/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button, TextField } from '.';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import * as AppActions from '@actions';
const { FONTS, COLOR, Strings } = GLOBALS;
const SuccessCancelAppointment = (props) => {
  const {navigation} = props;
  const {
    SuccessVisible,
    SuccessClose,
    handleDonePress,
  } = props;

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
const dispatch = useDispatch()
  const closeSuccessModel = () => {
    SuccessClose();
  };

  const handledonePress = () => {
    // onBookingSlotSelect(selectedValue);
    handleDonePress();
    closeSuccessModel();
        dispatch(
          AppActions.getDashboardData(navigation,(res) => {
            console.log(res?.data, 'getDashboardData>>?')
            if (res?.code == 200) {
            }
          }))
          dispatch(
            AppActions.getMyAppointmentList( (res) => {
              console.log(res?.data, 'getMyAppointmentList>>????')
              if (res?.code == 200) {
                // setMyAppointmentList(res?.data?.upcomingAppointments)
              }
          }))
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={SuccessVisible}
      onRequestClose={closeSuccessModel}
    >
      <TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>


              <View style={styles.successView}>
                <View style={styles.successImgView}>
                  <Image source={successSign} />
                </View>
              </View>
              <Text  style={styles.congratulationsText}>Appointment Cancelled Successfully!</Text>
              {/* <Text  style={styles.cancelText}>Your appointment with <Text style={styles.doctorTxt}>Dr. George Johnson</Text>, has been cancelled successfully with below reason.</Text>
              <View style={styles.line}></View>
              <Text  style={styles.reasonText}>Cancel Reason</Text>
              <Text style={styles.reasoShow}>Out of station on that date.</Text>
              <View style={styles.line}></View> */}
<View style={styles.btnView}>
  <TouchableOpacity onPress={()=>handledonePress()} ><Text style={styles.cBtn}>Done</Text></TouchableOpacity>  

</View>
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
    paddingVertical:25
  },
  successImgView: {
    alignItems:'center'
  },
  successText:{
    fontSize: 25,
    fontFamily: FONTS.BOLD,
    lineHeight: 30,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  congratulationsText:{
    fontSize: 18,
    fontFamily: FONTS.BOLD,
    lineHeight: 22,
    color: '#008D17',
    textAlign: 'center',
    // marginVertical:14,
    marginHorizontal:40
  },
  cancelText:{
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    lineHeight: 22,
    color: '#666666',
    textAlign: 'center',
    // marginVertical:14,
    marginHorizontal:20,
    marginVertical:10
  },
  reasonText:{
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    lineHeight: 22,
    color: '#171717',
    marginHorizontal:30
  },
  reasoShow:{
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    lineHeight: 22,
    color: '#171717',
    marginHorizontal:30,
    marginTop:6
  },
  input:{
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
  btnView:{
    marginHorizontal:40,
    marginBottom:10,
  },
  cBtn:{
    fontSize: 20,
    fontFamily: FONTS.MEDIUM,
    lineHeight: 45,
    color: '#171717',
   textAlign:'center'

  },
 
  doctorTxt:{
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    lineHeight: 22,
    color: '#171717',
    textAlign: 'center',
    // marginVertical:14,
    marginHorizontal:20,
    marginVertical:10
  },
  successDetails: {
    marginTop:5,
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:20
  },
  label:{
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    lineHeight: 27,
    color: '#84818A',
    
  },
  value:{
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
    marginHorizontal:14
  },
  buttonText: {
    fontFamily: FONTS.BOLD,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 27,
    color: globalColors.white,
  },
});

export default SuccessCancelAppointment;
