// screens/Visits.js
import React, { useEffect, useState } from 'react';
import { Button, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderR5 from '../../../components/HeaderR5';
import { notification } from '../../../assets/images'
import { globalColors } from '@/theme';
import ViewCrv from '../../../components/ViewCrv';
import { scan, medics, allergiess, bmii } from '../../../assets/images';
import { QRCodeScanner } from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { store } from '../../../store/configureStore';
import ReactNativeSegmentedControlTab from 'react-native-segmented-control-tab';

import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import * as AppActions from '@actions';
import HealthDetails from '../profile/components/HealthDetails';
import CurrentMedditation from './components/CurrentMedditation';
import DocumentsList from './components/DocumentsList';
import { EmptyComponent } from '../../../components/EmptyComponent';
import { decryptSOAPData } from '../../../constants/encryption';
function VisitsDetails(props) {
  const params = props.route.params || {};
  const { visitId } = params;
  console.log(visitId, 'visitId')
  const encKey = useSelector(state => state.authReducer?.profileData?.data?.profile?.uniqueEncryptionKey);
    // console.log(encKey, 'profileData<<--->')
  const medicationData = useSelector(state => state.authReducer?.profileData?.data?.profile?.other_info?.currentMedication);
  console.log(medicationData,'medication>>>');
  const [selected, setSelected] = useState(0);
  const [visitDetails, setVisitDetails] = useState({});
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [doctData, setDocData] = useState([]);

  const { navigation } = props;
  const data = [
    {
      insuranceNumber: 'Panadol',
      description: 'Medication',
      image: medics,
    },
    {
      insuranceNumber: 'Allergies',
      description: 'Sand, Sea Food',
      image: allergiess,
    },
    {
      insuranceNumber: 'Blood Type',
      description: '18.5',
      image: bmii,
    },


  ];
  const dataMeditation = [
    {
      insuranceNumber: 'Actylsalicyclic Acid (ASA)',
      description: 'Medication',
      image: medics,
    },
    {
      insuranceNumber: 'Diphenhydramine',
      description: 'Sand, Sea Food',
      image: medics,
    },
    {
      insuranceNumber: 'Hydrochlorothiazide',
      description: '18.5',
      image: medics,
    },


  ];
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        AppActions.getVisitDetailsById(visitId, (res) => {
          console.log(res, 'getVisitDetails>>????')
          if (res?.code == 200) {
            setVisitDetails(res?.data?.visitDetails)
            setPrescriptionData(res?.data?.visitDetails?.prescription)
            setDocData(res?.data?.VisitDocument?.docs)
          }
        }),
      );
    }, []),
  );
  const __headerComponent = () => {
    return (
      <>
        <HeaderR5
          title={"Routine checkup"}
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
  const handleTabPress = index => {
    setSelected(index);
  };
  const renderPage = () => {
    switch (selected) {
      case 0:
        return <>
          <View style={styles.dataView}>
          {prescriptionData.length > 0 ? (
            prescriptionData.map((data, index) => (
              <>
               <View key={index}>
                <Text style={styles.doctorName}>Medicine Name : <Text style={styles.specialization}>{decryptSOAPData(encKey,data?.note)}</Text></Text>

                {/* <Text style={styles.para}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text> */}
                <View style={{ marginVertical: 4 }}></View>
                <Text style={styles.doctorName}>Quantity : <Text style={styles.specialization}>{decryptSOAPData(encKey,data.qty)}</Text></Text>

                <View style={{ marginVertical: 4 }}></View>
                <Text style={styles.doctorName}>Unit : <Text style={styles.specialization}>{decryptSOAPData(encKey,data.unit)}</Text></Text>
                <View style={{ marginVertical: 4 }}></View>
                {data.day && (
                <Text style={styles.doctorName}>
                  Day: <Text style={styles.specialization}>{decryptSOAPData(encKey, data.day)}</Text>
                </Text>
              )}

                <View style={{ marginVertical: 4 }}></View>

              </View>
              <View style={styles.line}></View>
              </>
             
            ))
            ): (
              <EmptyComponent title={'No Data Available'} />
            )}
          </View>

        </>;
      case 1:
        return <>
          <View style={styles.dataView}>
            <Text style={styles.para}>{decryptSOAPData(encKey,visitDetails?.summary)}</Text>
            <View style={{ marginVertical: 4 }}></View>
          </View>
        </>
      default:
        return null;
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
            <View style={styles.mainView}>
              {/* <View style={styles.healthView}>
                <Text style={styles.healthTxt}>Health Records</Text>
                <Text style={styles.healthDate}>20 May 2023</Text>

              </View> */}
              {/* <View style={styles.listContainer}>
                <FlatList
                  data={data}
                  renderItem={({ item }) => <HealthDetails item={item} profileData={data} />}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View> */}
              {/* <View style={{marginVertical:4}}></View> */}

              {/* <Text style={styles.healthTxt}>Historical</Text> */}
              <View style={{ marginVertical: 6 }}></View>
              <View style={styles.listContainer}>
                <ReactNativeSegmentedControlTab
                  selectedIndex={selected}
                  allowFontScaling={false}
                  values={['Prescription', 'Summary']}
                  onTabPress={handleTabPress}
                  tabStyle={styles.tabStyle}
                  activeTabStyle={styles.activeTabStyle}
                  tabTextStyle={styles.tabTextStyle}
                  activeTabTextStyle={styles.activeTabTextStyle}
                  tabsContainerStyle={styles.tabsContainerStyle}
                />
                {renderPage()}
              </View>
              {/* <View style={{ marginVertical: 5 }}></View>
              <Text style={styles.healthTxt}>Current Medications</Text>
              <View style={{ marginVertical: 8 }}></View>

              <View style={styles.listContainer}>
                {medicationData?.length === 0 ? (
                  <EmptyComponent title={'No Medications Available'} />
                ) : (
                  <CurrentMedditation profileData={medicationData} />
                )}
               
                 
              </View> */}
              <View style={{ marginVertical: 8 }}></View>
              <Text style={styles.healthTxt}>File Attachment</Text>
              <View style={{ marginVertical: 8 }}></View>

              <View style={styles.listContainer}>
              {doctData?.length === 0 ? (
                  <EmptyComponent title={'No Documents Available'} />
                ) : (
                  <DocumentsList doctData={doctData} />
                )}
               
              </View>

            </View>


          </ViewCrv>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
export default VisitsDetails;
