import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '@/theme';
import TextR5 from '../../../../components/TextR5';
// import Three_dot from '../../../assets/Images/three-dots.png';
import { patient,Calendar,TimeCircle,call,map } from '../../../../assets/images'
import moment from 'moment';
import { Button } from '../../../../components';
import { RFValue } from 'react-native-responsive-fontsize';
import GLOBALS from '../../../../constants';
import { useSelector } from 'react-redux';
const { FONTS, COLOR, Strings } = GLOBALS;
const CurrentApoointmentCard = ({ data }) => {
  console.log(data, 'datacheck>>>')
  const clicnicName = global.clinic;
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
            <Text style={styles.addressText}>{data?.firstname} {data?.lastname}</Text>
            <View style={styles.viewstyle}>
                <Text style={styles.flatText}>
                    {data?.department?.department_name}
                </Text>
            </View>
        </View>
      </View>
      <View  style={styles.infoView}>
        {/* <View style={styles.NumberView}>
        <Image source={call} />
          <Text style={styles.infoText}>{data?.user?.mobile_number}</Text>
      
        </View> */}
        <View style={styles.addressView}>
        <Image source={map} />
          <Text style={styles.infoText}>{clicnicName}</Text>
        </View>
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
    marginTop: 17,
    fontFamily:FONTS.BOLD,
    fontSize: 18,
    LineHeight: 22,
    color:'#171717',
  },

  flatText: {
    color: globalColors.gray,
    fontSize: 12,
    marginTop:4
  },
  infoView:{
    // alignItems:'center'
  },
  NumberView:{
    flexDirection:'row',
    marginHorizontal:80
  },
  addressView:{
    marginVertical:10,
    flexDirection:'row',
    marginHorizontal:80
  },
  infoText:{
   justifyContent:'flex-start',
    marginHorizontal:10,
    fontFamily:FONTS.REGULAR,
    fontSize: 16,
    LineHeight: 22,
    color:'#171717',
  }
});
