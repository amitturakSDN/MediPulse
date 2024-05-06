import React, { memo } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { globalColors } from '@/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import GLOBALS from '../../../../constants';
import { scan, medics, allergiess, bmii } from '../../../../assets/images';

const { FONTS, COLOR, Strings } = GLOBALS;

const CurrentMedditation = ({ item, profileData }) => {
  return (
    <>
    {profileData.map((data, index) => ( 
     
        <View style={styles.row}>
     
       
     <Image source={medics} style={styles.productImage} />
     <View style={styles.verticalTextContainer}>
       <Text style={styles.addressText} key={index}>{data}</Text>
     </View>
  

</View>
     
  
     ))}
      </>
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
    marginVertical: 20,
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

export default memo(CurrentMedditation);
