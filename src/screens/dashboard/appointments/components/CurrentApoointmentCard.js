import React, { memo, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '@/theme';
import TextR5 from '../../../../components/TextR5';
import { patient, calendar, TimeCircle, selectCamera } from '../../../../assets/images';
import moment from 'moment';
import { Button } from '../../../../components';
import { RFValue } from 'react-native-responsive-fontsize';
import GLOBALS from '../../../../constants';
import CancelAppointmentModal from '../../../../components/CancelAppointmentModal';
import stringsOfLanguage from '../../../../constants/ScreenStrings'
import SuccessCancelAppointment from '../../../../components/SuccessCancelAppointment';

const { FONTS, COLOR, Strings } = GLOBALS;

const CurrentAppointmentCard = ({ data }) => {
  console.log(data, 'data+>>>>');
  // const appoinmentId = data?.id
  // const doctorId = data?.doctor_id
  // console.log(appoinmentId,doctorId , 'apoointment id and doctor id');
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const cancelAppointmentPress = () => {
    setIsModalVisible(true);

    // const requestData = {
    //   appointmentId: appointments[0]?.id,
    //   appointmentCancelReason : "Dukhna band zall"
    // };
    // dispatch(AppActions.cancelOppointment(requestData));
  };
  // const appooinmentId = data.id
  const handleDonePress = () => {
    setIsSuccessModalVisible(true);
  };
  const closeSuccessModal = () => {
    setIsSuccessModalVisible(false);
  };
  return (
    <>
      <View>
        {data
          ?.filter((item) => item?.status === 'BOOKED' || item?.status === 'RESCHEDULED')
          ?.map((item, index) => (
            <View style={styles.container}>
              <View style={styles.card} key={index}>
                {/* Profile Image */}
                <View style={{ flexDirection: 'row' }}>
                  {/* <Image source={patient} style={styles.productImage} /> */}

                  <Image
                    source={item?.profile ? { uri: item.profile } : selectCamera}
                    resizeMode="cover"
                    style={styles.productImage}
                  />
                  {/* Information of user */}
                  <View style={styles.verticaltextview}>
                    <Text style={styles.addressText}>{'MediPulse Inc.'}</Text>
                    <View style={styles.viewstyle}>
                      <Text style={styles.flatText}>{`Dr. ${item.doctor_name} -`} </Text>
                      <Text style={styles.flatText}>{item.department_name}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.dateTimeViewGray}>
                  <Text>
                    <Image source={calendar} /> {moment(item.appointment_date).format('MMMM DD, YYYY')}
                  </Text>
                  <Text>
                    <Image source={TimeCircle} /> {moment(item.appointment_time, 'HH:mm:ss').format('hh:mm A')}
                  </Text>
                </View>
                <View style={styles.buttonsView}>
                  {item.symptoms.map((symptom, index) => (
                    <View style={styles.btnSymptoms} key={index}>
                      <Text style={styles.symptomsTxt}>{symptom}</Text>
                    </View>
                  ))}
                </View>
                {item?.status == 'CANCELLED'
                 ? <View><Text style={styles.cancelTxt}>This Appointment is cancelled</Text></View> 
                 : (item?.waitingRoomQueStatus != 'IN-FLIGHT' && 
                  <View style={styles.buttonsVieww}>
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
                      appointmentId={item?.id}
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
                          navigation.navigate('Reschedule', { appoinmentId: item?.id, doctorId: item?.doctor_id, appointmentType: item?.appointment_type, appointmentDate: item?.appointment_date, appointmentTime: item?.appointment_time });
                        }}
                        style={styles.buttonReschedule}
                        textStyle={styles.buttonRescheduleText}
                        title={stringsOfLanguage.model.Reschedule}
                      />
                    </View>
                  </View>)}
              </View>
            </View>
          ))}
      </View>
      <View>
        {data
          ?.filter((item) => item?.status === 'CANCELLED')
          ?.map((item, index) => (
            <View style={styles.containerCanceled}>
              <View style={styles.card} key={index}>
                {/* Profile Image */}
                <View style={{ flexDirection: 'row' }}>
                  {/* <Image source={patient} style={styles.productImage} /> */}
                  {/* <Image source={{ uri: item?.profile }} resizeMode="cover" style={styles.productImage} /> */}
                  <Image
                    source={item?.profile ? { uri: item.profile } : selectCamera}
                    resizeMode="cover"
                    style={styles.productImage}
                  />
                  {/* Information of user */}
                  <View style={styles.verticaltextview}>
                    <Text style={styles.addressText}>{'MediPulse Inc.'}</Text>
                    <View style={styles.viewstyle}>
                      <Text style={styles.flatText}>{`Dr. ${item.doctor_name} -`} </Text>
                      <Text style={styles.flatText}>{item.department_name}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.dateTimeView}>
                  <Text>
                    <Image source={calendar} /> {moment(item.appointment_date).format('MMMM DD, YYYY')}
                  </Text>
                  <Text>
                    <Image source={TimeCircle} /> {moment(item.appointment_time, 'HH:mm:ss').format('hh:mm A')}
                  </Text>
                </View>
                <View style={styles.buttonsView}>
                  {item.symptoms.map((symptom, index) => (
                    <View style={styles.btnSymptoms} key={index}>
                      <Text style={styles.symptomsTxt}>{symptom}</Text>
                    </View>
                  ))}
                </View>
                {item?.status == 'CANCELLED' 
                ? <View><Text style={styles.cancelTxt}>This Appointment is cancelled</Text></View> 
                :  (item?.waitingRoomQueStatus != 'IN-FLIGHT' && 
                  <View style={styles.buttonsVieww}>
                    <View style={styles.cancelBtnView}>
                      <Button
                        onPress={() => cancelAppointmentPress()}
                        style={styles.button}
                        textStyle={styles.buttonText}
                        title={'Cancel  Appointment'}
                      />
                    </View>
                    <CancelAppointmentModal
                      isSuccessVisible={isModalVisible}
                      onSuccessClose={() => setIsModalVisible(false)}
                      appointmentId={data?.id}
                      isWaiting={false}
                    />
                    <View style={styles.rescheduleBtnView}>
                      <Button
                        onPress={() => {
                          navigation.navigate('Reschedule', { appoinmentId: data?.id, doctorId: data?.doctor_id, appointmentType: item?.appointment_type, appointmentDate: item?.appointment_date, appointmentTime: item?.appointment_time });
                        }}
                        style={styles.buttonReschedule}
                        textStyle={styles.buttonRescheduleText}
                        title={'Reschedule'}
                      />
                    </View>
                  </View>)}
              </View>

            </View>
          ))}
      </View>
    </>
  );
};
export default memo(CurrentAppointmentCard);
const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginVertical: 10,
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
  containerCanceled: {
    padding: 8,
    marginVertical: 10,
    backgroundColor: 'lightgray',
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

  productImage: {
    width: 59,
    height: 59,
    alignSelf: 'center',
    margin: 7,
    borderRadius: 50
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


  flatText: {
    fontFamily: FONTS.BOLD,
    fontSize: 13,
    lineHeight: 22,
    color: '#171717',
    flexShrink: 1, // Allow text to shrink if needed to fit within the container
  },
  alarmImage: {
    height: 11.11,
    width: 11.11,
  },

  viewstyle: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Change from 'center' to 'flex-start'
    paddingTop: 2,
    flexWrap: 'wrap', // Allow text to wrap to the next line
  },
  dateTimeView: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#E6E7E8',
    // marginHorizontal:13,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateTimeViewGray: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F4F4F4',
    // marginHorizontal:13,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  buttonsView: {
    marginBottom: 10,
    marginTop: 5,
    marginHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  btnSymptoms: {
    height: 25,
    // width:100,
    paddingHorizontal: 10,
    backgroundColor: globalColors.primaryTheme,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 10
  },
  symptomsTxt: {
    color: globalColors.white,
    fontSize: 13,
    lineHeight: 16,


  },
  buttonsVieww: {
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
  cancelTxt: {
    fontFamily: FONTS.BOLD,
    fontSize: 14,
    lineHeight: 17,
    color: '#171717',
    margin: 10,
  },
});
