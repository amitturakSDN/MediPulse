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
  TouchableHighlight
} from 'react-native';
import { Rectangle, circle,success } from '../assets/images';
import GLOBALS from '../constants';
import { globalColors, globalFonts } from '@/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button, TextField } from '.';
const { FONTS, COLOR, Strings } = GLOBALS;
const AppointmentSuccessModal = (props) => {
  const {
    isSuccessVisible,
    onSuccessClose,
  } = props;

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  const closeSuccessModel = () => {
    onSuccessClose();
  };

  const handleDonePress = () => {
    // onBookingSlotSelect(selectedValue);
    closeSuccessModel();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSuccessVisible}
      onRequestClose={closeSuccessModel}
    >
      <TouchableWithoutFeedback onPress={closeSuccessModel}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>


              <View style={styles.successView}>
                <View style={styles.successImgView}>
                  <Image source={success} />
                </View>
                  <Text style={styles.successText}>Success!</Text>
              </View>
              <Text  style={styles.congratulationsText}>Congratulations, your Appointment is successfully booked.</Text>
           
            <Button
                onPress={handleDonePress}
                style={styles.button}
                textStyle={styles.buttonText}
                title={'Continue'}
              />
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
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 0
    },
    marginHorizontal: 20,
    height: '35%',
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
    marginVertical: 10
  },
  
  successView: {
    // margin: 15,
    backgroundColor:globalColors.primaryTheme,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    paddingVertical:15
  },
  successImgView: {
    alignItems:'center'
  },
  successText:{
    fontSize: 25,
    fontFamily: FONTS.BOLD,
    lineHeight: 30,
    color: '#FFFFFF',
    marginTop:6,
    textAlign: 'center'
  },
  congratulationsText:{
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    lineHeight: 19,
    color: '#5E6982',
    textAlign: 'center',
    marginVertical:14,
    marginHorizontal:10
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

export default AppointmentSuccessModal;
