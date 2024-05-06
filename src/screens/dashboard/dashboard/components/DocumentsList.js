import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '@/theme';
import TextR5 from '../../../../components/TextR5';
// import Three_dot from '../../../assets/Images/three-dots.png';
import { patient,Calendar,TimeCircl,pdf } from '../../../../assets/images'
import moment from 'moment';
import { Button } from '../../../../components';
import { RFValue } from 'react-native-responsive-fontsize';

const DocumentsList = ({ item, index, style }) => {
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
            source={pdf}
            style={styles.productImage}
        />
        {/* Information of user */}
        <View style={styles.verticaltextview}>
            <Text style={styles.addressText}>{'Blood Test'}</Text>
            <View style={styles.viewstyle}>
                <Text style={styles.flatText}>
                548 kb
                </Text>
            </View>
        </View>
        <View style={styles.date}>
        <Text style={styles.dateTxt}>05-25-2003</Text>
      </View>
      </View>
     
    </View>
  );
};

export default memo(DocumentsList);
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
    // width: 59,
    // height: 59,
    alignSelf: 'center',
    margin:7
  },

  villaText: {
    color: globalColors.black,
    fontSize: 14,
  },

  verticaltextview: {
    flex: 1,
   marginHorizontal:10
  },

  addressText: {
    marginVertical:5,
    fontStyle:'normal',
    fontSize: 16,
    lineHeight:19,
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
  date:{
    marginHorizontal:9,
    marginVertical:7
  },
  dateTxt:{
    color:'#5E6982',
    fontSize:14,
    lineHeight:17
  }

 });
