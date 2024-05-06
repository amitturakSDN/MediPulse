// screens/Home.js
import React, { useEffect, useState } from 'react';
import { Button, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderR5 from '../../../components/HeaderR5';
import { notification } from '../../../assets/images'
import { globalColors } from '@/theme';
import ViewCrv from '../../../components/ViewCrv';
import WorkflowCard from './components/WorkflowCard';
import CurrentApoointmentCard from './components/CurrentApoointmentCard';
import { plus,workFlowCheck,workFlowUncheck,qr,scan } from '../../../assets/images';
import { QRCodeScanner } from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { store } from '../../../store/configureStore';
import { useDispatch,useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import * as AppActions from '@actions';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { EmptyComponent } from '../../../components/EmptyComponent';
import Strings from '../../../constants/string';
import stringsOfLanguage from '../../../constants/ScreenStrings'    
import { io } from "socket.io-client";
function Appointments(props) {
const {navigation} = props;
  const params = props.route.params || {};
  const { personDetailsId, personId } = params;
  console.log(personDetailsId,personId,'personId')
  // const [myAppointmentList, setMyAppointmentList] = useState([]);
  const myAppointmentList = useSelector(state => state.appointmentReducer?.myAppointmentList?.data?.upcomingAppointments);
  const token = useSelector(state => state.authReducer?.loginData?.data?.access_token);
  const userid = useSelector(state => state.authReducer?.loginData?.data?.user?.id);
  const [inflightData,setInflightData] = useState([]);
  const [department,setDepartment] = useState();
  const dispatch = useDispatch();
  const MediPulseSocket = io('wss://ss.stagingsdei.com:9169', {
    query: {
      token,
    },
  });
  useEffect(() => {
    if (userid && token) {
      MediPulseSocket.emit("subscribe", userid);
    }
  }, [])
  useEffect(() => {
    if (MediPulseSocket) {
      MediPulseSocket.on('labtest-inflight-data-patient', (res) => {
        console.log(res?.data, 'listensocket>>')
        setInflightData(res?.data)

        // dispatch({
        //   type: ACTION_TYPE.SET_DASHBOARD_DATA,
        //   payload: res?.data,
        // });
      });
    }
  }, [MediPulseSocket]);

useFocusEffect(
  React.useCallback(() => {
    dispatch(
      AppActions.getMyAppointmentList( (res) => {
        console.log(res?.data, 'getMyAppointmentList>>????')
        if (res?.code == 200) {
         
          // setMyAppointmentList(res?.data?.upcomingAppointments)
        }
    }),
    );
  }, []),
);
useFocusEffect(
  React.useCallback(() => {
    dispatch(
      AppActions.getInflightData( (res) => {
        console.log(res?.data, 'getdata++++>>')
        if (res?.code == 200 && res?.data) {
          setInflightData(res?.data)
          setDepartment(res?.data[0]?.doctorDetails?.department?.department_name)
        }
    }),
    );
  }, []),
);
  const BookNewAppointment = () =>{
   navigation.navigate('BookAppointment')
  }
  const __headerComponent = () => {

    
    return (
      <>
        <HeaderR5
          title={stringsOfLanguage.appoiments.title}
          isdrawer
          rightIcon={plus}
          titlestyle={styles.headerText}
          leftIconStyle={{
            backgroundColor: globalColors.transparent,
            tintColor: globalColors.white
          }}
          onRightIconPress={BookNewAppointment}
        />
        {/* <View style={styles.profileview}>

            <Image
                source={{ uri: selectedImage || `http://54.190.192.105:9117/public/${user?.image}` }}
                defaultSource={DEFAULT_PROFILE}
                style={styles.profileImage}
            />

            <TouchableOpacity onPress={onPhotoPress}>
                <Image
                    source={UPDATE_CAMERA}
                    style={styles.smallimage}
                />
            </TouchableOpacity>
        </View> */}
      </>
    );
  }
  const scannerPress = () => {
    navigation.navigate('ScanQR')

    // navigation.navigate('Profile', { personDetailsId: item.id })}

  };
  // Conditionally render the scanner button
  const renderScannerButton = () => {
    if (inflightData && inflightData?.patientWorkflowData) {
      const filteredAppointments = inflightData?.patientWorkflowData[0]?.workflow;
      if (filteredAppointments?.length > 0) {
        return (
          <TouchableOpacity onPress={scannerPress} style={styles.buttonContainer}>
          <Image source={scan} style={styles.buttonImage} />
          <View style={styles.scannerContainer}>
          <Image source={qr} style={styles.buttonImage} />
          <View style={{marginHorizontal:6}}></View>
          <Text style={styles.qrText}>{stringsOfLanguage.model.ScanQR}</Text>
          </View>
        </TouchableOpacity>
        )

      }
    }
    return null;
  };

  return (
   
    <View style={[styles.container]}>
      <SafeAreaView style={styles.safeAreaView}>
      {renderScannerButton()}
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContainer}
          style={{
            margin: 0,
          }}>
          {/* top header */}
          {__headerComponent()}
          <ViewCrv>
            {/* <View style={{ marginVertical: 13}}></View> */}
          <WorkflowCard departmentName={department} inflightData={inflightData} />
          {myAppointmentList?.filter((item) => item?.status === 'BOOKED' || item?.status === 'RESCHEDULED' || item?.status === 'CANCELLED')?.length !== 0 ? (
           <>
          {/* <Text style={styles.upcomingText}>{stringsOfLanguage.appoiments.UpcomingAppointment}</Text> */}
          <CurrentApoointmentCard data={myAppointmentList} />
           </>
          ) : (
            <EmptyComponent title={stringsOfLanguage.appoiments.NoAppointment} />
          )}
          </ViewCrv>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
export default Appointments;
