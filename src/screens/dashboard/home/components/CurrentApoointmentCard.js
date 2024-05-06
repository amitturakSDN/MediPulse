import React, { memo, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '@/theme';
import TextR5 from '../../../../components/TextR5';
import { patient, calendar, TimeCircle,selectCamera } from '../../../../assets/images';
import moment from 'moment';
import { Button } from '../../../../components';
import { RFValue } from 'react-native-responsive-fontsize';
import GLOBALS from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import * as AppActions from '@actions';
import CancelAppointmentModal from '../../../../components/CancelAppointmentModal';
import stringsOfLanguage from '../../../../constants/ScreenStrings'    
import SuccessCancelAppointment from '../../../../components/SuccessCancelAppointment';
const { FONTS, COLOR, Strings } = GLOBALS;
const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

const CurrentApoointmentCard = ({ data }) => {
  const navigation = useNavigation();
  console.log(data, 'data+++++');
  const dispatch = useDispatch();
  const appointments = data.filter(appointment => appointment.status !== 'CANCELLED');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);


  const closeModal = () => {
    setIsModalVisible(false);
  };
  const cancelAppointmentPress = () => {
    setIsModalVisible(true);

    // const requestData = {
    //   appointmentId: appointments[0]?.id
    // };
    // dispatch(AppActions.cancelOppointment(requestData));
  };
  const handleDonePress = () => {
    setIsSuccessModalVisible(true);
  };
  const closeSuccessModal = () => {
    setIsSuccessModalVisible(false);
  };
  const renderCard = ({ item }) => {
    const appointment = item;

    const appoinmentId = appointment?.id
    const doctorId = appointment?.doctor_id
    const appointmentType = appointment?.appointment_type
    const appointmentDate = appointment?.appointment_date
    const appointmentTime = appointment?.appointment_time
    console.log(appointment, 'appointment<<<<<<<')
   // Combine the text
  const combinedText = `Dr. ${appointment.firstname} ${appointment.lastname} - ${appointment.department_name}`;

  // Check if the combined text length exceeds 20 characters
  const truncatedText =
    combinedText.length > 35
      ? `${combinedText.substring(0, 32)}...`
      : combinedText;
    return (
      <View style={styles.container}>
        {/* Profile Image */}
        <View style={{ flexDirection: 'row' }}>
          {/* <Image source={patient} style={styles.productImage} /> */}
          {/* <Image source={{ uri: appointment?.profile }} resizeMode="cover" style={styles.productImage} /> */}
          <Image
              source={appointment?.profile ? { uri: appointment?.profile } : selectCamera}
              resizeMode="cover"
              style={styles.productImage}
            />
          {/* Information of user */}
          <View style={styles.verticaltextview}>
            <Text style={styles.addressText}>{'MediPulse Inc.'}</Text>
            <View style={styles.viewstyle}>
              <Text style={styles.flatText}>{truncatedText}</Text>
              {/* <Text style={styles.departmentText}></Text> */}
            </View>
          </View>
        </View>
        <View style={styles.dateTimeView}>
          <Text>
            <Image source={calendar} />   {moment(appointment.appointment_date).format('MMM DD, YYYY')}
          </Text>
          <Text>
            <Image source={TimeCircle} />   {moment(appointment.appointment_time, 'HH:mm:ss').format('h:mm A')}
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.symptomsContainer}>
          <View style={styles.symptomsWrapper}>
            {appointment.symptoms.map((symptom, index) => (
              <View style={styles.btnSymptoms} key={index}>
                <Text style={styles.symptomsTxt}>{symptom}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        {appointment?.waitingRoomQueStatus != 'IN-FLIGHT' && 
        <View style={styles.buttonsView}>
          <View style={styles.cancelBtnView}>
            <Button
              onPress={() => cancelAppointmentPress()}
              style={styles.button}
              textStyle={styles.buttonText}
              title={stringsOfLanguage.model.CancelAppointments}
            />
          </View>
          <CancelAppointmentModal
          isSuccessVisible={isModalVisible}
          onSuccessClose={() => closeModal()}
          appointmentId={appointment?.id}
          isWaiting={false}
          handleDonePress={() => handleDonePress()} // Pass the function here
        />
        <SuccessCancelAppointment
          SuccessVisible={isSuccessModalVisible}
          SuccessClose={() => closeSuccessModal()}
          handleDonePress={() => handleDonePress()}
        />
          <View style={styles.rescheduleBtnView}>
            <Button
              onPress={() => {

                navigation.navigate('Reschedule', { appoinmentId, doctorId, appointmentType, appointmentDate, appointmentTime});
              }}
              style={styles.buttonReschedule}
              textStyle={styles.buttonRescheduleText}
              title={stringsOfLanguage.model.Reschedule}
            />
          </View>
        </View>}
      </View>
    );
  };

  return (
    <View style={styles.swipeContainer}>
      <SwiperFlatList
        autoplayLoop
        showPagination
        data={appointments}
        renderItem={renderCard}
      />
    </View>
  );
};

export default memo(CurrentApoointmentCard);


const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginVertical: 20,
    backgroundColor: globalColors.white,
    marginHorizontal: 17,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5, // Required for Android shadows
  },
  swipeContainer: {
    paddingBottom: 10,
  },
  productImage: {
    width: 59,
    height: 59,
    alignSelf: 'center',
    margin: 7,
    borderRadius:50
  },
  villaText: {
    color: globalColors.black,
    fontSize: 14,
  },
  verticaltextview: {
    flex: 1,
    marginRight: 10,
    marginLeft: 7,
    marginTop: 13
  },
  addressText: {
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    lineHeight: 22,
    color: '#171717',
  },
 
  
  alarmImage: {
    height: 11.11,
    width: 11.11,
  },
  viewstyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 2,
  },
  flatText: {
    fontFamily: FONTS.BOLD,
    fontSize: 13,
    lineHeight: 22,
    color: '#171717',
  },
  departmentText: {
    fontFamily: FONTS.BOLD,
    fontSize: 13,
    lineHeight: 22,
    color: '#171717',
    flexWrap:'wrap'
  },
  dateTimeView: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  symptomsContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
    width: Dimensions.get('window').width - 50, // Subtracting the horizontal margins of the container
  },
  symptomsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnSymptoms: {
    height: 25,
    paddingHorizontal: 10,
    backgroundColor: globalColors.primaryTheme,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symptomsTxt: {
    color: globalColors.white,
    fontSize: 13,
    lineHeight: 16,
  },
  buttonsView: {
    marginBottom: 10,
    marginTop: 5,
    marginHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: globalColors.primaryTheme,
    height: 32,
    marginTop: RFValue(7),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonText: {
    textAlign: 'center',
    lineHeight: 20,
    color: globalColors.white,
    marginVertical: -5,
    fontFamily: FONTS.BOLD,
    fontSize: 15,
    lineHeight: 20,
  },
  buttonReschedule: {
    backgroundColor: globalColors.white,
    height: 32,
    marginTop: RFValue(7),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: globalColors.primaryTheme,
    marginHorizontal: 10,
  },
  buttonRescheduleText: {
    textAlign: 'center',
    lineHeight: 20,
    color: globalColors.primaryTheme,
    marginVertical: -5,
    fontFamily: FONTS.BOLD,
    fontSize: 15,
    lineHeight: 20,
  },
});
