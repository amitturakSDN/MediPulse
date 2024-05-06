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
import { Rectangle, circle } from '../assets/images';
import GLOBALS from '../constants';
import { globalColors, globalFonts } from '@/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button, TextField } from '../components';
import { useSelector } from 'react-redux';
const { FONTS, COLOR, Strings } = GLOBALS;
const TimeSlotModel = (props) => {
  const {
    isVisible,
    onClose,
    onBookingSlotSelect
  } = props;

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  const slotsData = useSelector(state => state.appointmentReducer?.availableSlots?.data);
  console.log(slotsData, 'slotsData<<--->')
  const closeModal = () => {
    setSelectedValue(null);
    onClose();
  };

  const handleButtonPress = (index) => {
    const selectedSlot = slotsData[index];

    if (selectedSlot.available) {
      setSelectedButton(index);
      let timeParts = selectedSlot?.slot_start_time?.split(":")
      let updatedTime = timeParts[0] + ":" + timeParts[1]
      setSelectedValue(updatedTime);
      console.log(selectedSlot.slot_start_time, 'timeslot');
    } else {
    }
  };

  const handleDonePress = () => {
    onBookingSlotSelect(selectedValue);
    closeModal();
  };

  const renderButton = (index) => {
    const isSelected = selectedButton === index;
    const selectedSlot = slotsData[index];
  
    if (selectedSlot) {
      let timeParts = selectedSlot.slot_start_time.split(":");
      let updatedTimeString = timeParts[0] + ":" + timeParts[1];
  
      if (selectedSlot.available) {
        return (
          <TouchableHighlight
            key={index}
            style={[styles.slotButton, isSelected && styles.selectedSlotButton]}
            underlayColor="transparent"
            onPress={() => handleButtonPress(index)}
          >
            <Text style={[styles.slotButtonText, isSelected && styles.selectedSlotButtonText]}>
              {updatedTimeString}
            </Text>
          </TouchableHighlight>
        );
      } else {
        return (
          <View
            key={index}
            style={styles.disabledSlotButton}
            pointerEvents="none"
          >
            <Text style={styles.disabledSlotButtonText}>
              {updatedTimeString}
            </Text>
          </View>
        );
      }
    } else {
      return <View key={`empty-${index}`} style={styles.emptySlotButton} />;
    }
  };
  

  const renderButtonRow = (startIndex, endIndex) => {
    const buttons = [];
  
    for (let i = startIndex; i <= endIndex; i++) {
      buttons.push(renderButton(i));
    }
  
    // Calculate the number of empty buttons required
    const remainingButtons = 3 - buttons.length;
  
    for (let i = 0; i < remainingButtons; i++) {
      buttons.push(<View key={`empty-${i}`} style={styles.emptySlotButton} />);
    }
  
    return buttons;
  };
  

  const renderButtonGrid = () => {
    if (!Array.isArray(slotsData)) {
      return null; // or render a loading indicator or an error message
    }

    const buttonGrid = [];
    const totalButtons = slotsData.length;
    const buttonsPerRow = 3;
    const totalRows = Math.ceil(totalButtons / buttonsPerRow);

    for (let i = 0; i < totalRows; i++) {
      const startIndex = i * buttonsPerRow;
      const endIndex = Math.min(startIndex + buttonsPerRow - 1, totalButtons - 1);
      buttonGrid.push(
        <View key={i} style={styles.buttonRow}>
          {renderButtonRow(startIndex, endIndex)}
        </View>
      );
    }

    return buttonGrid;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.listView}>
              <Text style={styles.listText}>{'Select Booking Time'}</Text>
            </View>
            <View style={styles.slotsView}>
              {slotsData?.length ? 
              renderButtonGrid() :
             <Text style={styles.noSlot}>No slots available</Text>
              }
              <Button
                onPress={handleDonePress}
                style={styles.button}
                textStyle={styles.buttonText}
                title={slotsData?.length ? 'Done' : 'Close'}
              />
            </View>
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
    // height: '57%',
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
  slotsView: {
    margin: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noSlot:{
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    LineHeight: 17,
    color: 'gray',
    marginVertical:19,
    marginHorizontal:20
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  slotButton: {
    width: '32%',
    height: 37,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#3BC4CA",
    justifyContent: 'center',
    alignItems: 'center',

  },
  disabledSlotButton: {
    width: '32%',
    height: 37,
    backgroundColor: globalColors.whiteGrey,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: globalColors.whiteGrey,
    justifyContent: 'center',
    alignItems: 'center',

  },
  disabledSlotButtonText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    LineHeight: 17,
    color: 'gray',
  },
  selectedSlotButton: {
    backgroundColor: '#3BC4CA', // Change the color for the selected button
  },
  slotButtonText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    LineHeight: 17,
    color: '#3BC4CA',
  },
  selectedSlotButtonText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    LineHeight: 17,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: globalColors.primaryTheme,
    height: RFValue(44),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(7),
    marginVertical: 6
  },
  buttonText: {
    fontFamily: FONTS.BOLD,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 27,
    color: globalColors.white,
  },
  emptySlotButton: {
    width: '32%',
    height: 37,
  },
});

export default TimeSlotModel;
