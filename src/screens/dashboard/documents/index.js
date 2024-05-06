// screens/Documents.js
import React, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderR5 from '../../../components/HeaderR5';
import { notification } from '../../../assets/images'
import { globalColors } from '@/theme';
import ViewCrv from '../../../components/ViewCrv';
import { Button } from '../../../components';
import { scan } from '../../../assets/images';
import { QRCodeScanner } from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { store } from '../../../store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import * as AppActions from '@actions';
import CustomSearchBar from '../../../components/CustomSearchBar';
import DocumentsList from './components/DocumentsList';
import { alertWithOneBtn } from '../../../helpers/common';
import Strings from '../../../constants/string';
import stringsOfLanguage from '../../../constants/ScreenStrings'  
import { EmptyComponent } from '../../../components/EmptyComponent';

function Documents(props) {
  const params = props.route.params || {};
  const { personDetailsId, personId } = params;
  console.log(personDetailsId, personId, 'personId')
  const [dashboardDataFlatList, setDashboardDataFlatList] = useState(false);
  const [dashboardData, setDashboardData] = useState(false);
  const [docsData, setDocsData] = useState([]);
  const [doctorsList, setDoctorList] = useState([]);
  const { navigation } = props;
  const dispatch = useDispatch();
 

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        AppActions.getDashboardData(navigation,(res) => {
          console.log(res?.data?.recentDocs, 'getDashboardData>>????')
          if (res?.code == 200) {
            setDashboardDataFlatList(res?.data?.appointments)
            setDashboardData(res?.data)
            setDocsData(res?.data?.recentDocs)
          }
        }),
      );
    }, []),
  );
  useFocusEffect(
    React.useCallback(() => {
      dispatch(AppActions.getDoctorList((res) => {
        console.log(res.data, 'getDoctorList>>>>>');
        setDoctorList(res?.data);
       
      }));
    }, [])
  );


  console.log(dashboardData?.waitingQueue, 'dashboardData?.waitingQueue')
  const __headerComponent = () => {
    return (
      <>
        <HeaderR5
          title={stringsOfLanguage.documents.title}
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
  const searchDepartment = (searchTerm) => {
    const filteredDocs = dashboardData.recentDocs.filter(doc =>
      doc.originalname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDocsData(filteredDocs);
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
            <View style={styles.DocView}>
            <CustomSearchBar onSearch={searchTerm => searchDepartment(searchTerm)} placeholder={stringsOfLanguage.documents.SearchDocument} />

            </View>
            <View style={styles.DocList}>
            {docsData?.length === 0 ? (
           <View style={{marginTop:220}}>
             <EmptyComponent title={stringsOfLanguage.documents.NoDocuments} />
           </View>
            ) : (
              <DocumentsList data={doctorsList} dataList={docsData} />
            )}
            </View>
        
          </ViewCrv>
        
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
export default Documents;
