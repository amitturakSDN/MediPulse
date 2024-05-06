import React, { memo } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { globalColors } from '@/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import GLOBALS from '../../../../constants';

const { FONTS, COLOR, Strings } = GLOBALS;


const HealthDetails = ({ item, profileData }) => {
  let value = item.insuranceNumber;

  if (profileData && profileData.profile && profileData.profile.other_info) {
    const { other_info } = profileData.profile;
  
    switch (item.insuranceNumber) {
      case 'Your Insurance number':
        value = profileData.profile.insuranceNo || value;
        break;
      case 'Allergies':
        value =
          other_info.allergies && other_info.allergies.length > 0
            ? other_info.allergies.join(', ')
            : 'Not Available';
        break;
      case 'Blood Type':
        value = other_info.bloodType || 'Not Available';
        break;
      case 'BMI':
        value = other_info.BMI || 'Not Available';
        break;
      case 'Tobacco':
        value = other_info.smokingPackPerDay || 'Not Available';
        break;
      case 'Alcohol':
        value = other_info.drinkingGlassPerDay || 'Not Available';
        break;
      default:
        break;
    }
  } else {
    value = 'Not Available';
  }
  return (
    <View style={styles.row}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.verticalTextContainer}>
        <Text style={styles.addressText}>{value ? value :item.description }</Text>
        <View style={styles.viewStyle}>
          <Text style={styles.flatText}>{item.insuranceNumber}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  productImage: {
    width: 53,
    height: 53,
    alignSelf: 'center',
    margin: 7,
  },
  verticalTextContainer: {
    flex: 1,
    marginRight: 10,
    marginHorizontal: 12,
  },
  addressText: {
    marginTop: 7,
    color: '#171717',
    fontSize: 18,
    fontFamily: FONTS.MEDIUM, // Replace with your font family
    lineHeight: 22,
  },
  flatText: {
    color: '#84818A',
    fontSize: 16,
    fontFamily: FONTS.REGULAR, // Replace with your font family
    lineHeight: 19,
    marginVertical: 3,
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2,
  },
});

export default memo(HealthDetails);
