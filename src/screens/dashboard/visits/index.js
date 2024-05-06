// screens/Visits.js
import React, { useEffect, useState } from 'react';
import { Button, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderR5 from '../../../components/HeaderR5';
import { notification } from '../../../assets/images'
import { globalColors } from '@/theme';
import ViewCrv from '../../../components/ViewCrv';
import { scan } from '../../../assets/images';
import { QRCodeScanner } from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { store } from '../../../store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { EmptyComponent } from '../../../components/EmptyComponent';
import * as AppActions from '@actions';
import moment from 'moment';
import Strings from '../../../constants/string';
import stringsOfLanguage from '../../../constants/ScreenStrings'    

function Visits(props) {
  const params = props.route.params || {};
  const { personDetailsId, personId } = params;
  console.log(personDetailsId, personId, 'personId')
  const [dashboardDataFlatList, setDashboardDataFlatList] = useState(false);
  const [dashboardData, setDashboardData] = useState(false);
  const [recentVisits, setRecentVisits] = useState([]);

  const { navigation } = props;
 
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        AppActions.getDashboardData(navigation,(res) => {
          console.log(res?.data?.appointments, 'getDashboardData>>????')
          if (res?.code == 200) {
            setDashboardDataFlatList(res?.data?.appointments)
            setDashboardData(res?.data)
            setRecentVisits(res?.data?.recentVisits)
          }
        }),
      );
    }, []),
  );
  
  function getDate(number) {
    return moment(number).format('D MMMM YYYY');
  }
  function getTime(number) {
return moment(number).format('hh:mm A');
  }
  function getVisiName (number){
    
    const withoutPTag = number.replace(/<p>/g, "").replace(/<\/p>/g, "");
    return withoutPTag
  }
  console.log(dashboardData?.waitingQueue, 'dashboardData?.waitingQueue')
  const __headerComponent = () => {
    return (
      <>
        <HeaderR5
          title={stringsOfLanguage.visits.Visits}
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
            <View style={{ marginTop: 16 }}></View>
            {recentVisits?.length === 0 ? (
              <EmptyComponent title={stringsOfLanguage.visits.NoVisits} /> 
            ) : (
              <FlatList
              data={recentVisits}
              renderItem={({ item }) => (
                <ViewCrv>
                  <TouchableOpacity onPress={()=>navigation.navigate('visitsDetails',{visitId:item._id})} style={styles.visitListView}>
                    <Text style={styles.visitName}>{'MediPulse Inc.'}</Text>
                    <Text style={styles.vistDetailText}>{getDate(item.createdAt)} - {getTime(item.createdAt)}</Text>
                  </TouchableOpacity>
                </ViewCrv>
              )}
              // keyExtractor={(item) => item.id.toString()}
            />
            )}
          
          </ViewCrv>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
export default Visits;
