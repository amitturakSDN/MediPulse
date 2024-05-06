
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderR5 from '../../../components/HeaderR5';
import { addImg, notification } from '../../../assets/images'
import { globalColors } from '@/theme';
import ViewCrv from '../../../components/ViewCrv';
import WorkflowCard from './components/WorkflowCard';
import CurrentApoointmentCard from './components/CurrentApoointmentCard';
import { plus, checkBox, checkBoxSelect, calendar, TimeCircle } from '../../../assets/images';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { QRCodeScanner } from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { store } from '../../../store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import * as AppActions from '@actions';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { TextField } from '../../../components';
import { Button } from '../../../components';
import TimeSlotModel from '../../../components/TimeSlotModel';
import moment from 'moment';
import AppointmentSuccessModal from '../../../components/AppointmentSuccessModal';
function BookNowForm(props) {
  const params = props.route.params || {};
  const { doctorId } = props.route.params;
  console.log(doctorId, 'doctorId')
  const { personDetailsId, personId } = params;
  console.log(personDetailsId, personId, 'personId')
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState(null);
  const [selectedBookingSlot, setSelectedBookingSlot] = useState(null);
  const [timeSlot, setTimeSlot] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { navigation } = props;
  const [selectedOption, setSelectedOption] = useState('');
  const dashboardData = useSelector(state => state.homeReducer?.dashboardData?.data);
  console.log(dashboardData, 'dashboardData>>>')
  const doctorsList = useSelector(state => state.appointmentReducer?.doctorsList?.data?.doctors);
  const symptoms = useSelector(state => state.appointmentReducer?.symptoms);
  console.log(typeof symptoms, 'symptoms>>');
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [symptom, setSymptom] = useState('');
  const [symptomsList, setSymptomsList] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(false);
  console.log(doctorsList, 'doctorsList>>>')
  const today = moment().format('YYYY-MM-DD'); // Get today's date
  const minDate = today;
  const date = global.date;
  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        AppActions.getDoctorDetailsById(doctorId, (res) => {

          console.log(res.data, 'getDoctorDetailsById')
          if (res?.code == 200) {
            setDoctorDetails(res?.data)
          }
        }),
      );
    }, []),
  );
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


  const getDoctorSlots = (date) => {
    dispatch(
      AppActions.getAvialbleSlots(date, doctorId, (res) => {
        console.log(res?.data, 'getAvialbleSlots>>????')
        if (res?.code == 200) {
          setSlots(res?.data)
        }
      }),
    );
  }
  useEffect(() => {
    getDoctorSlots(date)
  }, []);
  useEffect(() => {
    // Update the selectedBookingSlot value when it changes
    // This ensures that the TouchableOpacity component reflects the selected value
  }, [selectedBookingSlot]);

  const handleCheckboxSelection = (option) => {
    setSelectedOption(option);
  };
  const openCalendar = () => {
    setCalendarOpen(true);
  };

  const closeCalendar = () => {
    setCalendarOpen(false);
  };
  const __headerComponent = () => {
    return (
      <>
        <HeaderR5
          title={"Book New Appointment"}
          isBack
          titlestyle={styles.headerText}
          leftIconStyle={{
            backgroundColor: globalColors.transparent,
            tintColor: globalColors.white
          }}

        />
      </>
    );
  }

  const addSymptom = () => {
    if (symptom.trim() !== '') {
      // Check if the symptom already exists in the symptomsList
      if (!symptomsList.includes(symptom)) {
        setSymptomsList([...symptomsList, symptom]); // Add the symptom to the existing list
        setSelectedSymptoms([...selectedSymptoms, symptom]); // Also add the symptom to the selected symptoms if needed
      }
      setSymptom(''); // Clear the text field
    }
  };

  const handleSymptomSelect = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((selected) => selected !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };
  const convertTo24HourFormat = (time12) => {
    const [time, modifier] = time12?.split(' ');
    let [hours, minutes] = time?.split(':');

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
      const concatenatedArray = [...selectedSymptoms];
      console.log(concatenatedArray, 'concatenatedArray>>>');
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
        new_appointment_date: date,
        appointment_type: selectedOption,
        symptoms: concatenatedArray
      };
      console.log(bookingData, 'bookingData>>>')
      dispatch(
        AppActions.bookAppointment(bookingData, doctorId, navigation, (res) => {
          if (res?.code == 201) {
            setIsSuccessful(true);
          }
        }),
      );
    }
  };
  useEffect(() => {
    checkFormCompletion();
  }, [selectedOption, selectedDate, selectedBookingSlot, selectedSymptoms, symptomsList]);
  const checkFormCompletion = () => {
    if (
      (selectedOption === 'VISIT' || selectedOption === 'VACCINATION') &&
      selectedBookingSlot !== null &&
      // selectedDate !== null &&
      selectedSymptoms.length > 0 || symptomsList.length > 0

    ) {
      setIsButtonEnabled(true); // Enable the button for 'VISIT' or 'VACCINATION' with a selected slot
    } else if ((selectedOption === 'LABTEST') && selectedBookingSlot !== null && selectedDate !== null) {
      setIsButtonEnabled(true); // Disable the button for the 'LABREPORT' option
    } else {
      setIsButtonEnabled(false); // Disable the button for other cases
    }
  };
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
            <CurrentApoointmentCard data={doctorDetails} />
            <Text style={styles.upcomingText}>Appointment Type</Text>
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
                <Text style={styles.genderTexts}>Visit</Text>
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
                <Text style={styles.genderTexts}>Vaccination</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.femaleView}
                onPress={() => handleCheckboxSelection('LABTEST')}
              >
                <View style={styles.checkBoxView}>
                  <Image
                    source={
                      selectedOption === 'LABTEST' ? checkBoxSelect : checkBox
                    }
                  />
                </View>
                <Text style={styles.genderTexts}>Lab Test</Text>
              </TouchableOpacity> */}
            </View>
            {/* <Text style={styles.upcomingText}>Select Booking Date</Text> */}
            {/* <TouchableOpacity onPress={openCalendar} style={styles.selectDropdown}>
              <Text style={styles.selectText}>{selectedDate ? selectedDate : 'Select'}</Text>
              <View style={{ justifyContent: 'center' }}>
                <Image style={{ width: 18, height: 20 }} source={calendar} />
              </View>
            </TouchableOpacity>
            {isCalendarOpen && (
              <Calendar
                minDate={minDate}
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                  setSelectedBookingSlot('00:00'); // Reset the selected time slot when the date changes
                  getDoctorSlots(date);
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
            )} */}
            <Text style={styles.upcomingText}>Select Booking Time</Text>
            <TouchableOpacity onPress={openModal} style={styles.selectDropdown}>
              <Text style={styles.selectText}>{selectedBookingSlot ? selectedBookingSlot : '00:00'}</Text>
              <View style={{ justifyContent: 'center' }}>
                <Image style={{ width: 17, height: 17 }} source={TimeCircle} />
              </View>
            </TouchableOpacity>

            <TimeSlotModel
              isVisible={isModalVisible}
              onClose={closeModal}
              onBookingSlotSelect={(timeSlot) => setSelectedBookingSlot(timeSlot)} // Update the selected time slot separately
            />
            {/* In the JSX code, conditionally render the sections based on selectedOption */}
            {selectedOption !== 'LABTEST' && (
              <>
                <View>
                  <Text style={styles.upcomingText}>Choose Symptoms</Text>
                  <View style={{ marginVertical: 1 }}></View>
                  <View style={styles.buttonsView}>
                    {/* Remove this rendering of symptoms list */}
                    {symptomsList.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.btnSymptoms,
                          selectedSymptoms.includes(item) && styles.selectedSymptom,
                        ]}
                        onPress={() => handleSymptomSelect(item)}
                      >
                        <Text style={[
                          styles.symptomsTxt,
                          selectedSymptoms.includes(item) && styles.selectedSymptomsTxt
                        ]}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                    {/* Keep the rendering of symptoms from the Redux store */}
                    {symptoms && symptoms.map((symptom, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.btnSymptoms,
                          selectedSymptoms.includes(symptom) && styles.selectedSymptom,
                        ]}
                        onPress={() => handleSymptomSelect(symptom)}
                      >
                        <Text style={[
                          styles.symptomsTxt,
                          selectedSymptoms.includes(symptom) && styles.selectedSymptomsTxt
                        ]}>{symptom}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>


                <View style={{ marginVertical: 3 }}></View>
                <Text style={styles.upcomingText}>Other Symptoms</Text>
                <View style={styles.addSymptomsView}>
                  <TextField
                    label="Add Symptoms"
                    placeholder="Add Symptoms"
                    value={symptom}
                    onChangeText={setSymptom}
                  />
                  <TouchableOpacity onPress={addSymptom}>
                    <Image style={{ position: 'absolute', right: 0, bottom: 12 }} source={addImg} />
                  </TouchableOpacity>
                </View>
                {/* <View style={styles.buttonsView}>
                {symptomsList.map((item, index) => (
                  <View key={index} style={styles.otherBtnSymptoms}>
                    <Text style={styles.otherSymptomsTxt}>{item}</Text>
                  </View>
                ))}
              </View> */}

              </>
            )}


            <View style={styles.buttonView}>
              <Button
                onPress={() => BookNowPress()}
                style={[styles.button, { opacity: !isButtonEnabled ? 0.5 : 1 }]}
                textStyle={styles.buttonText}
                title={'Book Now'}
                disabled={!isButtonEnabled} // Pass the disabled prop based on the isButtonEnabled state
              />
              {isSuccessful ?
                <AppointmentSuccessModal onSuccessClose={closeSuccessModel} />
                : null}
            </View>
          </ViewCrv>

        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
export default BookNowForm;

