import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { globalColors } from '@/theme';
import { closeIcon, circle, pdf, checkBox, checkBoxSelect } from '../assets/images';
import GLOBALS from '../constants';
import CustomSearchBar from './CustomSearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components';

import * as AppActions from '@actions';
import { RFValue } from 'react-native-responsive-fontsize';
import { alertWithOneBtn } from '../helpers/common';

const ActionSheetModal = (props) => {
  const {
    isVisible,
    onClose,
    data,
    payload
  } = props;

  const [selectedValue, setSelectedValue] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const closeModal = () => {
    setSelectedValue(null);
    onClose();
  };

  const handleItemPress = (itemId) => {
    setSelectedValue(itemId);
  };

  const searchHospital = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (!data) {
      // Handle the case when the data array is undefined
      setFilteredData([]);
      return;
    }

    if (searchTerm.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          (item.firstname &&
            item.firstname.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.lastname &&
            item.lastname.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredData(filtered);
    }
  };
  
  const showAlert = message => {
    alertWithOneBtn(
      "Document shared with doctor successfully.",
      message,
      'OK',
    );
  };
  const onSubmiDocumentPress = () => {
    // Create the payload with the selected document names
    const dataToSend = {
      filesToSend: payload,
    };

    // Dispatch the action to share the documents
    dispatch(AppActions.shareDocuments(dataToSend, selectedValue, (res) => {
      console.log(res?.data, 'getshareDocuments>>?');
      if (res?.code === 200) {
        showAlert();
      }
    }));

    closeModal();
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.listItem}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => handleItemPress(item.id)}>
            <Image
              style={styles.shareImg}
              source={selectedValue === item.id ? checkBoxSelect : checkBox}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.addressText}>{item?.firstname} {item?.lastname}</Text>
        </View>
      </View>
    </View>
  );

  const [filteredData, setFilteredData] = useState(data);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.footer}>
              <View style={styles.crosView}>
                <Text style={styles.shareText}>Share document with</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Image style={styles.cancelImg} source={closeIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.line}></View>
              <CustomSearchBar placeholder="Search Doctor" onSearch={searchHospital} />

              <View style={styles.listingView}>
                <FlatList
                  data={filteredData}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                />
                <Button
                  onPress={onSubmiDocumentPress}
                  style={selectedValue ? styles.button : styles.disabledButton}
                  textStyle={selectedValue ? styles.buttonText : styles.disabledButtonText}
                  title={'Share Document'}
                  disabled={!selectedValue}
                  disabledTextStyle={styles.disabledButtonText}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    marginTop: '44%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 0
    },
    marginHorizontal: 20,
    height: '80%',
    width: '100%'
  },
  footer: {
    marginVertical: 12,
  },
  listView: {
    flexDirection: 'row',
    marginHorizontal: 14,
    marginVertical: 10
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  listText: {
    fontSize: 18,
    fontFamily: GLOBALS.FONTS.MEDIUM,
    lineHeight: 22,
    color: GLOBALS.COLOR.BLACK,
    marginHorizontal: 7
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10
  },
  crosView: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  shareText: {
    fontSize: 20,
    fontFamily: GLOBALS.FONTS.BOLD,
    lineHeight: 23,
    color: GLOBALS.COLOR.BLACK,
    marginHorizontal: 7
  },
  // 
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
    fontFamily: GLOBALS.FONTS.BOLD,
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
    marginVertical: 20
  },
  disabledButtonText: {
    fontFamily: GLOBALS.FONTS.BOLD,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 27,
    color: globalColors.white,
  },
  container: {
    marginVertical: 5
  },
  addressText: {
    marginVertical: 5,
    marginHorizontal: 15,
    fontFamily: GLOBALS.FONTS.MEDIUM,
    fontSize: 18,
    LineHeight: 50,
    color: '#171717',
  },
  listingView: {
    marginHorizontal: 17,
    marginVertical: 20
  },
  verticaltextview: {
    flex: 1,
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  checkboxContainer: {
    width: 30, // Set the desired width for the checkbox container
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareImg: {
    width: 35, // Adjust the width and height according to your image size
    height: 35,
  },
});

export default ActionSheetModal;
