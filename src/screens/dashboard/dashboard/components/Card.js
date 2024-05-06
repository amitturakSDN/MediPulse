import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '@/theme';
import TextR5 from '../../../../components/TextR5';
// import Three_dot from '../../../assets/Images/three-dots.png';
import { patient } from '../../../../assets/images'
import moment from 'moment';
import { Button } from '../../../../components';
import { RFValue } from 'react-native-responsive-fontsize';

const Card = ({ item, index, style }) => {
  const navigation = useNavigation();

  return (
    // main view
    <View
      style={styles.container}
      >
      {/* Profile Image */}
      <Image
        source={patient}
        style={styles.productImage}
      />

      {/* Information of user */}
      <View style={styles.verticaltextview}>
        <TextR5 style={styles.addressText}>{'jjjj'}</TextR5>
        <View style={styles.viewstyle}>
          <Image source={patient} style={styles.alarmImage} />
       
            <TextR5 style={styles.flatText}>
             Hii
            </TextR5>
       
        </View>
      </View>
      
    </View>
  );
};

export default memo(Card);
const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginVertical: 25,
    backgroundColor: globalColors.white,
    marginHorizontal:17,
    flexDirection: 'row',
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
    margin:7
  },

  villaText: {
    color: globalColors.black,
    fontSize: 14,
  },

  verticaltextview: {
    flex: 1,
    marginRight: 10,
    marginLeft: 15,
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
});
