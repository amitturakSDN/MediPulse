import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '@/theme';
import TextR5 from '../../../../components/TextR5';
// import Three_dot from '../../../assets/Images/three-dots.png';
import { patient,Calendar,TimeCircle } from '../../../../assets/images'
import moment from 'moment';
import { Button } from '../../../../components';
import { RFValue } from 'react-native-responsive-fontsize';

const CurrentApoointmentCard = ({ item, index, style }) => {
  const navigation = useNavigation();

  return (
    // main view
    <View
      style={styles.container}
      >
      {/* Profile Image */}
      <View style={{
        flexDirection:'row'
      }}>
        <Image
            source={patient}
            style={styles.productImage}
        />
        {/* Information of user */}
        <View style={styles.verticaltextview}>
            <Text style={styles.addressText}>{'Dr. George Johnson'}</Text>
            <View style={styles.viewstyle}>
                <Text style={styles.flatText}>
                    Dermatologist
                </Text>
            </View>
        </View>
      </View>
      <View style={styles.dateTimeView}>
        <Text> <Image source={Calendar} />    June 02, 2023</Text>
        <Text><Image source={TimeCircle} />    9:30 AM</Text>
      </View>
      <View style={styles.buttonsView}>
        <View style={styles.btnSymptoms}><Text style={styles.symptomsTxt}>Back Pain</Text></View>
        <View style={styles.btnSymptoms}><Text style={styles.symptomsTxt}>Chest Pain</Text></View>
        <View style={styles.btnSymptoms}><Text style={styles.symptomsTxt}>Heart Pain</Text></View>
      
      </View>
    </View>
  );
};

export default memo(CurrentApoointmentCard);
const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginVertical: 25,
    backgroundColor: globalColors.white,
    marginHorizontal:17,
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
    margin:7
  },

  villaText: {
    color: globalColors.black,
    fontSize: 14,
  },

  verticaltextview: {
    flex: 1,
    marginRight: 10,
    marginLeft: 7,
  },

  addressText: {
    marginTop:17,
    fontWeight:"bold",
    fontSize: 18,
    color: globalColors.black,
  },

  flatText: {
    color: globalColors.gray,
    fontSize: 12,
    // marginLeft: 5,
  },
  alarmImage: {
    height: 11.11,
    width: 11.11,
  },
  viewstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2,
  },
  dateTimeView: {
    marginVertical:10,
    marginHorizontal:10,
    paddingHorizontal:15,
    paddingVertical:10,
    backgroundColor:'#F4F4F4',
    // marginHorizontal:13,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  buttonsView: {
    marginBottom:10,
    marginTop:5,
    marginHorizontal:10,
    paddingVertical:5,
    flexDirection:'row',
    // justifyContent:'space-between'
  },
  btnSymptoms:{
    height:25,
    // width:100,
    paddingHorizontal:10,
    backgroundColor:globalColors.primaryTheme,
    borderRadius:20,
    marginRight:10,
    justifyContent:"center",
    alignItems:'center'
  },
  symptomsTxt:{
    color:globalColors.white,
    fontSize:13,
    lineHeight:16,

    
  }
});
