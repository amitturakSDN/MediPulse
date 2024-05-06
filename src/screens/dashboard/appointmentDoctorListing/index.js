import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderR5 from '../../../components/HeaderR5';
import { patient,next } from '../../../assets/images';
import { globalColors } from '@/theme';
import ViewCrv from '../../../components/ViewCrv';
import { useFocusEffect } from '@react-navigation/native';
import * as AppActions from '@actions';
import { useSelector } from 'react-redux';
import { EmptyComponent } from '../../../components/EmptyComponent';

function DoctorListing(props) {
  const params = props.route.params || {};
  const { personDetailsId, personId } = params;
  console.log(personDetailsId, personId, 'personId');
  const [scannerVisible, setScannerVisible] = useState(false);
  const { navigation } = props;
  const doctorsList = useSelector(state => state.appointmentReducer?.doctorsList?.data?.doctors);
  console.log(doctorsList, 'doctorsList>>>')
  const clicnicName = global.clinic;
  const date =global.date;
  const data = [
    {
      id: 1,
      name: 'Dr. George Johnson',
      specialization: 'Dermatologist',
    },
   
    // Add more data items as needed
  ];
  const onpressDoctor = (doctorId) => {
    navigation.navigate('BookNowForm', { doctorId });
  }

//   useFocusEffect(
//     React.useCallback(() => {
//       dispatch(
//         AppActions.getHospitalList((res)=>{
// console.log(res,'res>>>>>')
//         }),
//       );
//     }, []),
//   );
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
  };

  const renderListItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onpressDoctor(item.doctor_id)} style={styles.container1}>
        <Image source={patient} style={styles.productImage} />
          <View style={styles.verticaltextview}>
            <Text style={styles.addressText}>{item.firstname} {item.lastname}</Text>
            <View style={styles.viewstyle}>
              <Text style={styles.flatText}>{item?.department?.department_name}</Text>
            </View>
          </View>
          <View style={{justifyContent:'center', marginHorizontal:15}}>
          <Image source={next} />
          </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContainer}
          style={{
            margin: 0,
          }}
        >
          {/* top header */}
          {__headerComponent()}
       
          <ViewCrv>
            <View style={styles.listViewMain}>
              <Text style={styles.textName}>{clicnicName}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.listingView}>
            {doctorsList?.length === 0 ? (
        <EmptyComponent title={'No Doctors Available'} />
      ) : (
        <FlatList
                data={doctorsList}
                renderItem={renderListItem}
                keyExtractor={(item) => item.id}
              />
      )}
              
            </View>
          </ViewCrv>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}

export default DoctorListing;
