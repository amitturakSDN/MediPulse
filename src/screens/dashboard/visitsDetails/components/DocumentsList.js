import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '@/theme';
import TextR5 from '../../../../components/TextR5';
import { patient, Calendar, share, pdf } from '../../../../assets/images';
import GLOBALS from '../../../../constants';

const { FONTS, COLOR, Strings } = GLOBALS;

const DocumentsList = ({ doctData }) => {
  const navigation = useNavigation();

  const data = [
    { id: 1, name: 'Blood Test', date: '05-25-2003' },
    { id: 2, name: 'Sonography', date: '06-15-2003' },
    { id: 3, name: 'MRI', date: '07-10-2003' },
    { id: 4, name: 'Blood Sugar', date: '07-10-2003' },

    // Add more items here
  ];

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={pdf} style={styles.productImage} />
        <View style={styles.verticaltextview}>
          <Text style={styles.addressText}>{item.originalname}</Text>
          {/* <View style={styles.viewstyle}>
            <Text style={styles.dateTxt}>{item.date}</Text>
          </View> */}
        </View>
        <View style={styles.date}>
          <Image style={styles.shareImg} source={share} />
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );

  return (
    <FlatList
      data={doctData}
      renderItem={renderItem}
      // keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default memo(DocumentsList);

const styles = StyleSheet.create({
  
  productImage: {
    width: 31,
    height: 42,
    alignSelf: 'center',
    margin:7
  },
  shareImg:{
    width: 24,
    height: 24,
  },

  villaText: {
    color: globalColors.black,
    fontSize: 14,
  },

  verticaltextview: {
    flex: 1,
   marginHorizontal:10,
   justifyContent:'center'
  },

  addressText: {
    marginVertical: 5,
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    LineHeight: 19,
    color: '#171717',
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
    fontFamily: FONTS.MEDIUM,
    fontSize: 14,
    LineHeight: 17,
    color: '#808598',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10
  }

 });
