import React, { memo,useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '@/theme';
import TextR5 from '../../../../components/TextR5';
// import Three_dot from '../../../assets/Images/three-dots.png';
import { patient } from '../../../../assets/images'
import moment from 'moment';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button } from '../../../../components';
import CircularProgress from 'react-native-circular-progress-indicator';
import CancelAppointmentModal from '../../../../components/CancelAppointmentModal';
import stringsOfLanguage from '../../../../constants/ScreenStrings' 
import GLOBALS from '../../../../constants';
const { FONTS, COLOR, Strings } = GLOBALS;   
const WaitingCard = ({ data,queueNumber}) => {
    console.log(data,'data>>>');
    const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    return (
        // main view
        <View
            style={styles.container}
            onPress={() => 1}>
            {/* Profile Image */}

            <View style={styles.waitingRoom}>
                <Text style={styles.waitingRoomTxt}>{stringsOfLanguage.model.WaitingRoom}</Text>
                <View style={{ flexDirection: 'row', marginVertical: 7 }}>
                    {/* <Text style={styles.appointmentNo}>Appt. No.:</Text>
                    <Text style={styles.appointmentVal}>#125</Text> */}
                     <Text style={styles.appointmentNo}>{data?.department_name} </Text>
                </View>
               
                <View style={{ flexDirection: 'row', marginVertical: 7 }}>
                    <Text style={styles.appointmentNo}>{stringsOfLanguage.model.Status} </Text>
                    <Text style={styles.appointmentVal}>{data?.status}</Text>
                </View>


                <Button
                   onPress={()=>cancelAppointmentPress()}
                    style={styles.button}
                    textStyle={styles.buttonText}
                    title={stringsOfLanguage.model.cancel}
                />
                <CancelAppointmentModal
                    isSuccessVisible={isModalVisible}
                    onSuccessClose={() => setIsModalVisible(false)}
                    appointmentId = {data?.id}
                    isWaiting = {true}
                    />
            </View>
            {/* Information of user */}
            <View style={styles.verticaltextview}>
                <CircularProgress
                    value={queueNumber}
                    radius={65}
                    // title={`You are ${40}`}
                    // subtitle="in line"
                    inActiveStrokeOpacity={7.5}
                    activeStrokeColor={'#E6E7E8'}
                    inActiveStrokeColor={globalColors.primaryTheme}
                    activeStrokeWidth={12}
                    inActiveStrokeWidth={12}
                    progressValueStyle={{  fontFamily: FONTS.BOLD, color: globalColors.primaryTheme }}
                    progressValueColor={globalColors.primaryTheme}
                   
                />
            </View>

        </View>
    );
};

export default memo(WaitingCard);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 18,
        marginTop: 23,
        backgroundColor: globalColors.white,
        marginHorizontal: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        width: 68,
        height: 68,
        alignSelf: 'center',
        margin: 7
    },

    villaText: {
        color: globalColors.black,
        fontSize: 14,
    },

    waitingRoom: {
        flex: 1.3,
        marginRight: 10,
        marginLeft: 15,
    },
    verticaltextview: {
        flex: 1,
    },

    addressText: {
        color: globalColors.gray,
        paddingTop: 5,
        fontSize: 14,
    },

    flatText: {
        color: globalColors.gray,
        fontSize: 12,
        marginLeft: 5,
    },
    alarmImage: {
        height: 11.11,
        width: 11.11,
    },
    viewstyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
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
    button: {
        backgroundColor: globalColors.primaryTheme,
        height: 35,
        width: 130,
        marginTop: RFValue(7),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RFValue(7),
        boxSizing: 'border-box',
    },

    waitingRoomTxt: {
        fontSize: 22,
        fontFamily: FONTS.BOLD,
        lineHeight: 27,
        marginBottom: 10
    },
    appointmentNo: {
        fontSize: 15,
        fontFamily: FONTS.REGULAR,
        lineHeight: 18,

    },
    appointmentVal: {
        color: '#5E6982',
        marginHorizontal: 6,
        fontFamily: FONTS.REGULAR,
    }
});

