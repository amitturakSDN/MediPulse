import React, { memo, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '@/theme';
import TextR5 from '../../../../components/TextR5';
import { patient, Calendar, check, uncheck, pdf } from '../../../../assets/images';
import GLOBALS from '../../../../constants';
import { Button } from '../../../../components';
import { RFValue } from 'react-native-responsive-fontsize';
import ActionSheetModal from '../../../../components/ActionSheetModal';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as AppActions from '@actions';
import { EmptyComponent } from '../../../../components/EmptyComponent';
import stringsOfLanguage from '../../../../constants/ScreenStrings'    

const { FONTS, COLOR, Strings, BASE_URL } = GLOBALS;

const DocumentsList = ({ dataList, data }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const dispatch = useDispatch();
  console.log(data, 'data<<>>>>>>>>>')
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleItemPress = (itemName) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter((name) => name !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  const handleDownload = (s3key) => {
      console.log(s3key,"file>>>");
    dispatch(AppActions.downloadDocument(s3key,(res) => {
      console.log(res.data, 'getDoctorList>>>>>');
    }));
    // Replace the following URL with the actual URL from where you want to download the file
  //   const fileUrl = BASE_URL + 'examine/downloadFile?s3Key=public/' + path;
  // console.log(fileUrl,"file>>>");
    // Linking.openURL(fileUrl).catch((err) => console.error('An error occurred', err));
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=> handleDownload(item?.s3key)} style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={pdf} style={styles.productImage} />
        <View style={styles.verticaltextview}>
          <Text style={styles.addressText}>{item?.originalname}</Text>
          <View style={styles.viewstyle}>
            <Text style={styles.dateTxt}>{moment(item?.createdAt).format('MMMM DD, YYYY')}</Text>
          </View>
        </View>
        <View style={styles.date}>
          <TouchableOpacity onPress={() => handleItemPress(item?.originalname)}>
            <Image
              style={styles.shareImg}
              source={selectedItems.includes(item?.originalname) ? check : uncheck}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />
    </TouchableOpacity>
  );

  const handleShareDocuments = () => {
    // Create the payload with the selected document names
    const payload = {
      filesToSend: selectedItems,
    };

    setModalVisible(true);
  };
  return (
    <>
      
        <FlatList data={dataList} renderItem={renderItem} />
    
      <ActionSheetModal payload={selectedItems} data={data} isVisible={modalVisible} onClose={closeModal} />
      {dataList?.length === 0 ? (
      null
      ) : 
      <Button
        onPress={handleShareDocuments}
        style={selectedItems.length === 0 ? styles.disabledButton : styles.button}
        textStyle={selectedItems.length === 0 ? styles.disabledButtonText : styles.buttonText}
        title={`${stringsOfLanguage.documents.Share} ${selectedItems.length} ${stringsOfLanguage.documents.SelectedDocuments}`}
        disabled={selectedItems.length === 0}
        disabledTextStyle={styles.disabledButtonText}
      />
}
    </>
  );
};

export default memo(DocumentsList);

const styles = StyleSheet.create({
  productImage: {
    width: 31,
    height: 42,
    alignSelf: 'center',
    margin: 7,
  },
  shareImg: {
    // width: 24,
    // height: 24,
  },
  villaText: {
    color: globalColors.black,
    fontSize: 14,
  },
  verticaltextview: {
    flex: 1,
    marginHorizontal: 10,
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
  date: {
    marginHorizontal: 9,
    justifyContent: 'center',
  },
  dateTxt: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 14,
    LineHeight: 17,
    color: '#808598',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
  button: {
    backgroundColor: globalColors.primaryTheme,
    height: RFValue(45),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(10),
    marginVertical: 20,
    // marginHorizontal:20,
    // position:'absolute',
    // bottom:0
  },
  buttonText: {
    fontFamily: FONTS.BOLD,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 27,
    color: globalColors.white,
  },
  disabledButton: {
    backgroundColor: 'rgba(59, 196, 202, 0.64)',
    height: RFValue(45),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(10),
    marginVertical: 20,
  },
  disabledButtonText: {
    fontFamily: FONTS.BOLD,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 27,
    color: globalColors.white,
  },
});
