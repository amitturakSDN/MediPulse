// screens/Home.js
import { io } from "socket.io-client";

import React, { useEffect, useState } from 'react';

import { Button, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderR5 from '../../../components/HeaderR5';
import { notification, pdf, calendar, TimeCircle, heightOne, weightOne, heartOne, bmiOne, bpOne, pulseOne, injection } from '../../../assets/images'
import { globalColors } from '@/theme';
import ViewCrv from '../../../components/ViewCrv';
import Card from './components/Card';
import BookNowCard from './components/BookNowCard';
import CurrentApoointmentCard from './components/CurrentApoointmentCard';
import DocumentsList from './components/DocumentsList';
import Allergies from './components/Allergies';
import { ExpandableListView } from 'react-native-expandable-listview';
import Waitngcard from './components/Waitngcard';
import { scan,qr } from '../../../assets/images';
import { QRCodeScanner } from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { store } from '../../../store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import * as AppActions from '@actions';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
// import MediPulseSocket from '../../../socket';
import moment from 'moment';
import GLOBALS from '../../../constants';
import { getMediPulseSocket } from '../../../socket';
import { EmptyComponent } from "../../../components/EmptyComponent";
import Strings from '../../../constants/string';
import stringsOfLanguage from '../../../constants/ScreenStrings'    

const { API_URL, NETWORK_STATUS, ACTION_TYPE } = GLOBALS;
function Home(props) {
  const params = props.route.params || {};
  const { personDetailsId, personId } = params;
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer?.loginData?.data?.access_token);
  const userid = useSelector(state => state.authReducer?.loginData?.data?.user?.id);
  const dashboard = useSelector(state => state.homeReducer?.dashboardData?.data);

  console.log(dashboard?.appointments, 'dashboardData+++')
  console.log(personDetailsId, personId, 'personId')
  const [scannerVisible, setScannerVisible] = useState(false);
  // const [dashboardDataFlatList, setDashboardDataFlatList] = useState(dashboard?.appointments ? dashboard?.appointments : []);
  // const [dashboardData, setDashboardData] = useState(dashboard ? dashboard : []);
  // const [healthData, setHealthData] = useState(dashboard?.patientHealthData?.other_info ? dashboard?.patientHealthData?.other_info : []);
  // const [docsData, setDocsData] = useState(dashboard?.recentDocs ? dashboard?.recentDocs : []);
  // const [vaccinations, setVaccinations] = useState(dashboard?.vaccinations ? dashboard?.vaccinations : []);
  // const [recentVisits, setRecentVisits] = useState(dashboard?.recentVisits ? dashboard?.recentVisits : []);

  const [queueNumber, setQueueNumber] = useState(dashboardData?.waitingQueue?.queue_number);

  const dashboardDataFlatList = useSelector(state => state.homeReducer?.dashboardData?.data?.appointments);
  let dataNew = dashboardDataFlatList?.filter((appointment) => (appointment?.status == "BOOKED" || appointment?.status === 'RESCHEDULED'))

  const dashboardData = useSelector(state => state.homeReducer?.dashboardData?.data);
  console.log(dashboardData, 'dashboardData>><');
  const healthData = useSelector(state => state.homeReducer?.dashboardData?.data?.patientHealthData?.other_info);
  const docsData = useSelector(state => state.homeReducer?.dashboardData?.data?.recentDocs);
  const vaccinations = useSelector(state => state.homeReducer?.dashboardData?.data?.vaccinations);
  const recentVisits = useSelector(state => state.homeReducer?.dashboardData?.data?.recentVisits);
  const [hasNfc, setHasNFC] = useState(null);
  const { navigation } = props;
  const MediPulseSocket = io('wss://ss.stagingsdei.com:9169', {
    query: {
      token,
    },
  });
  console.log(healthData,'healthData>>');
  // const MediPulseSocket = getMediPulseSocket()
  useEffect(() => {
    if (userid && token) {
      MediPulseSocket.emit("subscribe", userid);
    }
  }, [])
  useEffect(() => {
    if (MediPulseSocket) {
      MediPulseSocket.on('updated-waiting-queue-notification-mobile', (res) => {
        console.log(res, 'listensocket')
        setQueueNumber(res?.data)
        // dispatch({
        //   type: ACTION_TYPE.SET_DASHBOARD_DATA,
        //   payload: res?.data,
        // });
      });
      MediPulseSocket.on('current-patient-queue-status-mobile', (res) => {
        console.log(res, 'listensocket')
        // setQueueNumber(res?.data)
        let tempdashboard = {waitingQueue : null,...dashboardData}
        tempdashboard.waitingQueue = res?.data
        dispatch({
          type: ACTION_TYPE.SET_DASHBOARD_DATA,
          payload: tempdashboard,
        });
      });
    }
  }, [MediPulseSocket]);

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported()

      setHasNFC(deviceIsSupported)
      if (deviceIsSupported) {
        await NfcManager.start()
      }
    }

    checkIsSupported()
  }, [])
  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      console.log('tag found',tag.ndefMessage)
    })

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    }
  }, [])

  const readTag = async () => {
    await NfcManager.registerTagEvent();
  }

  // if (hasNfc === null) return null;

  // if (!hasNfc) {
  //   return (
  //     <View style={styles.sectionContainer}>
  //       <Text>NFC not supported</Text>
  //     </View>
  //   )
  // }
  const scannerPress = () => {
    navigation.navigate('ScanQR')

    // navigation.navigate('Profile', { personDetailsId: item.id })}

  };
  console.log(token, 'token>>>')
  console.log(userid, 'userid>>>')
  function handleItemClick({ index }) {
    console.log(index);
  }
  function handleInnerItemClick({ innerIndex, item, itemIndex }) {
    console.log(innerIndex);
  }
  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        AppActions.getDashboardData(navigation, (res) => {
          console.log(res?.data, 'getDashboardData>>??')
          if (res?.code == 200) {

            setQueueNumber(res?.data?.waitingQueue?.queue_number)
            // setDashboardDataFlatList(res?.data?.appointments)
            // setDashboardData(res?.data)
            // setHealthData(res?.data?.patientHealthData?.other_info)
            // setDocsData(res?.data?.recentDocs)
            // setVaccinations(res?.data?.vaccinations)
            // setRecentVisits(res?.data?.recentVisits)
          }
        }),
      );
    }, []),
  );
  function convertToBytes(number) {
    if (number >= 1e9) {
      return (number / 1e9).toFixed(2) + ' GB';
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(2) + ' MB';
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(2) + ' KB';
    } else {
      return number + ' bytes';
    }
  }
  function getDate(number) {
    return moment(number).format('YYYY-MM-DD');
  }
  function getTime(number) {
    return moment(number).format('hh:mm A');
  }
  function getVisiName(number) {
    const withoutPTag = number.replace(/<p>/g, "").replace(/<\/p>/g, "");
    return withoutPTag
  }

  console.log(dashboardData?.waitingQueue, 'dashboardData?.waitingQueue')
  const __headerComponent = () => {
    return (
      <>
        <HeaderR5
          title={stringsOfLanguage.MediPulse}
          isdrawer
          rightIcon={notification}
          titlestyle={styles.title}
          leftIconStyle={{
            backgroundColor: globalColors.transparent,
            tintColor: globalColors.white
          }}
        />
      </>
    );
  }
  const CONTENT = [
    {
      id: '42',
      categoryName: stringsOfLanguage.home.HospitalVisits,
      subCategory: [
        {
          customInnerItem: (
            <>
              {docsData?.length === 0 ? (
                <Text style={styles.noDataTxt}>{stringsOfLanguage.home.NoDataFound}</Text>
              ) : (
                <View style={styles.hospitalVisitsView}>
                  {/* <View style={styles.viewAllBtn}><Text style={styles.viewAllTxt}>View All</Text></View> */}
                  <TouchableOpacity onPress={() => { navigation.navigate('Visits') }} style={{ alignSelf: 'flex-end' }}>
                    <View style={styles.btnSymptoms} >
                      <Text style={styles.symptomsTxt}>View All</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.line}></View>
                  <View>
                    {recentVisits?.map((visit, index) => (
                      <View key={index}>
                        {/* <Text style={styles.clinicName}>{getVisiName(visit?.subjective)}</Text> */}
                        <View style={styles.dateTimeView}>
                          <Text>
                            <Image source={calendar} /> {getDate(visit.createdAt)}
                          </Text>
                          <Text>
                            <Image source={TimeCircle} /> {getTime(visit.createdAt)}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </>

          )
        },
      ],
    },
    {
      id: '95',
      categoryName: stringsOfLanguage.home.HealthChecks,
      subCategory: [
        {
          customInnerItem: (
            <View style={styles.hospitalVisitsView}>
              {/* <TouchableOpacity onPress={()=>{navigation.navigate('Visits')}} style={{ alignSelf: 'flex-end' }}>
                <View style={styles.btnSymptoms} >
                  <Text style={styles.symptomsTxt}>View All</Text>
                </View>
              </TouchableOpacity> */}
              <View style={styles.linee}></View>
              <View style={styles.dateTimeView}>
                <Text style={styles.clinicName}>{stringsOfLanguage.home.Vitals}</Text>
                <Text>
                  {/* <Image source={calendar} />   22 May, 2023 */}
                </Text>
              </View>
              <View style={styles.vitalsView}>
                <View style={styles.vitalsCardView}>
                  <View style={styles.vitalsCardFirst}>
                    <View style={styles.imgView}>
                      <Image style={styles.imgDetails} source={heightOne} />
                    </View>
                    <View style={styles.detailsView}>
                      <Text style={styles.valueTxt}>{healthData?.height}</Text>
                      <Text style={styles.labelTxt}>{stringsOfLanguage.home.Height}</Text>
                    </View>
                  </View>
                  <View style={styles.vitalsCardFirst}>
                    <View style={styles.imgView}>
                      <Image style={styles.imgDetails} source={weightOne} />
                    </View>
                    <View style={styles.detailsView}>
                      <Text style={styles.valueTxt}>{healthData?.weight}</Text>
                      <Text style={styles.labelTxt}>{stringsOfLanguage.home.Weight}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.vitalsView}>
                <View style={styles.vitalsCardView}>
                  <View style={styles.vitalsCardFirst}>
                    <View style={styles.imgView}>
                      <Image style={styles.imgDetails} source={bmiOne} />
                    </View>
                    <View style={styles.detailsView}>
                      <Text style={styles.valueTxt}>{healthData?.BMI}</Text>
                      <Text style={styles.labelTxt}>{stringsOfLanguage.home.BMI}</Text>
                    </View>
                  </View>
                  {/* <View style={styles.vitalsCardFirst}>
                    <View style={styles.imgView}>
                      <Image style={styles.imgDetails} source={bmiOne} />
                    </View>
                    <View style={styles.detailsView}>
                      <Text style={styles.valueTxt}>{healthData?.BMI}</Text>
                      <Text style={styles.labelTxt}>BMI</Text>
                    </View>
                  </View> */}
                </View>
              </View>
              {/* <View style={styles.vitalsView}>
                <View style={styles.vitalsCardView}>
                  <View style={styles.vitalsCardFirst}>
                    <View style={styles.imgView}>
                      <Image style={styles.imgDetails} source={bpOne} />
                    </View>
                    <View style={styles.detailsView}>
                      <Text style={styles.valueTxt}>{healthData?.bp}</Text>
                      <Text style={styles.labelTxt}>BP (H/L)</Text>
                    </View>
                  </View>
                  <View style={styles.vitalsCardFirst}>
                    <View style={styles.imgView}>
                      <Image style={styles.imgDetails} source={pulseOne} />
                    </View>
                    <View style={styles.detailsView}>
                      <Text style={styles.valueTxt}>{healthData?.pulse}</Text>
                      <Text style={styles.labelTxt}>Pulse</Text>
                    </View>
                  </View>
                </View>
              </View> */}
            </View>
          )
        },
      ],
    },
    {
      id: '94',
      categoryName: stringsOfLanguage.home.Vaccinations,
      subCategory: [
        {
          customInnerItem: (
            <>
              {vaccinations?.length === 0 ? (
                <Text style={styles.noDataTxt}>{stringsOfLanguage.home.NoDataFound}</Text>
              ) : (
                <View style={styles.hospitalVisitsView}>
                  <TouchableOpacity onPress={() => { navigation.navigate('Vaccination') }} style={{ alignSelf: 'flex-end' }}>
                    <View style={styles.btnSymptoms} >
                      <Text style={styles.symptomsTxt}>View All</Text>
                    </View>
                  </TouchableOpacity>

                  {vaccinations?.map(vaccination => (
                    <React.Fragment key={vaccination._id}>
                      <View style={styles.linee}></View>
                      <View style={styles.dateTimeView}>
                        <Text style={styles.clinicName}>{vaccination.vaccinationType} Vaccine</Text>
                        <Text>
                          <Image source={calendar} /> {moment(vaccination.createdAt).format('MMMM DD, YYYY')} {/* Assuming you want to show the createdAt date */}
                        </Text>
                      </View>
                      <View style={styles.vaccinNameView}>
                        <Image source={injection} />
                        <Text style={styles.tvaccinTxt}>{vaccination.manufacturer}</Text>
                      </View>
                    </React.Fragment>
                  ))}
                </View>
              )}

            </>


          )
        },
      ],
    },
    {
      id: '93',
      categoryName: stringsOfLanguage.home.Documents,
      subCategory: [
        {
          customInnerItem: (
            <>
              {docsData?.length === 0 ? (
                <Text style={styles.noDataTxt}>{stringsOfLanguage.home.NoDataFound}</Text>
              ) : (
                <>
                  <TouchableOpacity onPress={() => { navigation.navigate('Documents') }} style={{ alignSelf: 'flex-end' }}>
                    <View style={styles.btnSymptoms}>
                      <Text style={styles.symptomsTxt}>View All</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.linee}></View>

                  {docsData?.map((doc, index) => (
                    <View key={index} style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 15 }}>
                      <View style={{ justifyContent: 'center' }}>
                        <Image source={pdf} style={styles.productImage} />
                      </View>
                      <View style={styles.verticaltextview}>
                        <Text style={styles.addressText}>{doc.originalname}</Text>
                        <View style={styles.viewstyle}>
                          <Text style={styles.dateTxt}>{convertToBytes(doc.size)}</Text>
                        </View>
                      </View>
                      <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.dateTxt}>{moment(doc.createdAt).format('MMMM DD, YYYY')}</Text>
                      </View>
                    </View>
                  ))}
                </>
              )}
            </>
          )
        },
      ],
    },
  ];
  // Conditionally render the scanner button
  const renderScannerButton = () => {
    if (dashboardData && dashboardData.appointments) {
      const filteredAppointments = dashboardData.appointments.filter(appointment => appointment.status == "BOOKED" || appointment?.status === 'RESCHEDULED');
      if (filteredAppointments.length > 0) {
        return (
          <TouchableOpacity onPress={scannerPress} style={styles.buttonContainer}>
            {/* <Image source={scan} style={styles.buttonImage} /> */}
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
  const renderWaitingcard = () => {
    if (dashboardData?.waitingQueue?.queue_number) {
      return (
        <>
          <Waitngcard queueNumber={queueNumber} data={dashboardData?.waitingQueue} />
        </>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container]}>
      <SafeAreaView style={styles.safeAreaView}>
        {/* Render the scanner button */}
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

            {renderWaitingcard()}
            {/* <Text style={styles.upcomingText}>{'Book Appoinment'}</Text> */}
            {
             
              dataNew?.length > 0 ?
                <>
            <Text style={styles.upcomingText}>{stringsOfLanguage.home.UpcomingAppointment} <Text style={styles.txt}>({stringsOfLanguage.home.Within24Hr})</Text></Text>
                  <CurrentApoointmentCard data={dataNew} />
                  <BookNowCard />
                </> :
                <BookNowCard />
            }

            {/* <TouchableOpacity style={[styles.btn, styles.btnScan]} onPress={readTag}>
              <Text style={{marginVertical:10, color: "red" }}>Scan Tag</Text>
            </TouchableOpacity> */}
            
            <Text style={styles.upcomingText}>{stringsOfLanguage.LatestEvent}</Text>
            <View style={styles.eventContainer}>
              <ExpandableListView
                // ExpandableListViewStyles={{backgroundColor:'red'}}
                itemLabelStyle={styles.listText}
                itemContainerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                data={CONTENT} // required
                onInnerItemClick={handleInnerItemClick}
                onItemClick={handleItemClick}
              />
            </View>

          </ViewCrv>
          {/* <TouchableOpacity onPress={scannerPress} style={styles.buttonContainer}>
              <Image source={scan} style={styles.buttonImage} />
            </TouchableOpacity> */}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
export default Home;

