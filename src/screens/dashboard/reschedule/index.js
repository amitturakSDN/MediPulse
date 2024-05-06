// screens/Documents.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import { notification, pdf, calendar,checkBox, checkBoxSelect, TimeCircle, heightOne, weightOne, heartOne, bmiOne, bpOne, pulseOne, injection } from '../../../assets/images'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderR5 from '../../../components/HeaderR5';
import { globalColors } from '@/theme';
import ViewCrv from '../../../components/ViewCrv';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import CustomSearchBar from '../../../components/CustomSearchBar';
import TimeSlotModel from '../../../components/TimeSlotModel';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from '../../../components';
import * as AppActions from '@actions';
import moment from 'moment';
import stringsOfLanguage from '../../../constants/ScreenStrings'    
function Reschedule(props) {
  const params = props.route.params || {};
  const { appoinmentId, doctorId, appointmentType, appointmentDate, appointmentTime} = props.route.params;
  // console.log(personDetailsId, personId, 'personId')
  const { navigation } = props;
  console.log(appoinmentId,'appoinmentId>>>')
  console.log(doctorId,'doctorId>>>')
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(appointmentDate || null);
  const [slots, setSlots] = useState(null);
  const [selectedBookingSlot, setSelectedBookingSlot] = useState(appointmentTime?.slice(0, 5) || null);
  const [timeSlot, setTimeSlot] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState(appointmentType || '');
  const today = moment().format('YYYY-MM-DD'); // Get today's date
  const minDate = today;


  const handleTimeSlotSelect = (selectedTimeSlot) => {
    console.log(selectedTimeSlot, 'selectedBookingSlot<-->')

    setSelectedBookingSlot(selectedTimeSlot);
    closeModal();
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const closeSuccessModel = () => {
    setIsSuccessful(false);
    navigation.navigate('Home')
  };
  const handleCheckboxSelection = (option) => {
    setSelectedOption(option);
  };

  const getDoctorSlots = (date) => {
    dispatch(
      AppActions.getAvialbleSlots(date,doctorId, (res) => {
        console.log(res?.data, 'getAvialbleSlots>>????')
        if (res?.code == 200) {
          setSlots(res?.data)
        }
      }),
    );
  }
  useEffect(() => {
    // Update the selectedBookingSlot value when it changes
    // This ensures that the TouchableOpacity component reflects the selected value
  }, [selectedBookingSlot]);

  const openCalendar = () => {
    setSelectedBookingSlot(null);
    setCalendarOpen(true);
  };

  const closeCalendar = () => {
    setCalendarOpen(false);
  };

  const convertTo24HourFormat = (time12) => {
    const [time, modifier] = time12.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}:00`;
  }


  const BookNowPress = () => {
    if (isButtonEnabled) {
     
      const time24 = convertTo24HourFormat(selectedBookingSlot);
      const initialTime = time24;
      const timeToAdd = 30; // Number of minutes to add
  
      // Parse the initial time and add the minutes
      const newTime = moment(initialTime, 'HH:mm:ss')
        .add(timeToAdd, 'minutes')
        .format('HH:mm:ss');
      let bookingData = {
        slot_start_time: time24,
        slot_end_time: newTime,
        new_appointment_date: selectedDate,
        appointmentId:appoinmentId,
        appointment_type: selectedOption,
      };
      console.log(bookingData, 'bookingData>>>')
      dispatch(
        AppActions.rescheduleAppointment(bookingData,2, navigation, (res) => {
          if (res?.code == 201) {
            // setIsSuccessful(true);
          }
        }),
      );
    }
  };
  useEffect(() => {
    checkFormCompletion();
  }, [selectedOption,selectedDate, selectedBookingSlot]);
  const checkFormCompletion = () => {
    if (
      selectedOption !== '' &&
      selectedDate !== null &&
      selectedBookingSlot !== null 
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };
  const __headerComponent = () => {
    return (
      <>
        <HeaderR5
          title={stringsOfLanguage.reschedule.Reschedule}
          isBack
          titlestyle={styles.title}
          leftIconStyle={{
            backgroundColor: globalColors.transparent,
            tintColor: globalColors.white
          }}
        />
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
            <View>
            <Text style={styles.upcomingText}>{stringsOfLanguage.reschedule.AppointmentType}</Text>
              <View style={styles.genderView}>
                <TouchableOpacity
                  style={styles.maleView}
                  onPress={() => handleCheckboxSelection('VISIT')}
                >
                  <View style={styles.checkBoxView}>
                    <Image
                      source={
                        selectedOption === 'VISIT' ? checkBoxSelect : checkBox
                      }
                    />
                  </View>
                  <Text style={styles.genderTexts}>{stringsOfLanguage.reschedule.Visit}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.femaleView}
                  onPress={() => handleCheckboxSelection('VACCINATION')}
                >
                  <View style={styles.checkBoxView}>
                    <Image
                      source={
                        selectedOption === 'VACCINATION' ? checkBoxSelect : checkBox
                      }
                    />
                  </View>
                  <Text style={styles.genderTexts}>{stringsOfLanguage.reschedule.Vaccination}</Text>
                </TouchableOpacity>

              </View>
              <Text style={styles.upcomingText}>{stringsOfLanguage.reschedule.BookingDate}</Text>
              <TouchableOpacity onPress={openCalendar} style={styles.selectDropdown}>
                <Text style={styles.selectText}>{selectedDate ? selectedDate : stringsOfLanguage.reschedule.Select}</Text>
                <View style={{ justifyContent: 'center' }}>
                  <Image style={{ width: 18, height: 20 }} source={calendar} />

                </View>
              </TouchableOpacity>
              {isCalendarOpen && (
                <Calendar
                  minDate={minDate} // Set the minimum selectable date to today
                  onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                    getDoctorSlots(day.dateString)
                    closeCalendar();
                  }}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedDotColor: 'orange',
                    },
                  }}
                />
              )}
              <Text style={styles.upcomingText}>{stringsOfLanguage.reschedule.BookingTime}</Text>
              <TouchableOpacity onPress={openModal} style={styles.selectDropdown}>
                <Text style={styles.selectText}>{selectedBookingSlot ? selectedBookingSlot : '00:00'}</Text>
                <View style={{ justifyContent: 'center' }}>
                  <Image style={{ width: 17, height: 17 }} source={TimeCircle} />
                </View>
              </TouchableOpacity>

              <TimeSlotModel
                isVisible={isModalVisible}
                onClose={closeModal}
                onBookingSlotSelect={handleTimeSlotSelect}
              />
              
            </View>
            <Button
                onPress={() => BookNowPress()}
                style={[styles.button, { opacity: !isButtonEnabled ? 0.5 : 1 }]}
                textStyle={styles.buttonText}
                title={stringsOfLanguage.reschedule.RescheduleAppointment}
                disabled={!isButtonEnabled} // Pass the disabled prop based on the isButtonEnabled state
              />
          </ViewCrv>

        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
export default Reschedule;
