import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import { Rectangle, check, uncheck } from '../assets/images';
import GLOBALS from '../constants';
import CustomSearchBar from './CustomSearchBar';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '@actions';

const AllergiesModel = (props) => {
  const {
    isVisible,
    checkInDate,
    checkInTime,
    checkOutDate,
    checkOutTime,
    duration,
    status,
    onClose,
    onDepartmentSelect,
    handleAllergiesSelect,
    selectedAllergies,
    data,
  } = props;

  const [selectedValues, setAllergies] = useState(selectedAllergies);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <View style={styles.listView}>
      <Image source={circle} />
      <View style={{ justifyContent: 'center' }}>
        <Text style={styles.listText}>{item.type}</Text>
      </View>
    </View>
  );

  const closeModal = () => {
    handleAllergiesSelect(selectedValues);
    onClose();
  };

  const handleItemPress = (item) => {
    const index = selectedValues?.indexOf(item.type);
    let updatedValues = [...selectedValues];

    if (index === -1) {
      // Item is not selected, add it to the selectedValues array
      updatedValues.push(item.type);
    } else {
      // Item is already selected, remove it from the selectedValues array
      updatedValues.splice(index, 1);
    }

    setAllergies(updatedValues);
  };

  const handleSearch = (text) => {
    const filtered = data.filter((item) =>
      item.type.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.footer}>
              <CustomSearchBar
                placeholder="Search Allergies"
                onSearch={handleSearch}
              />
              <View style={{ marginVertical: 5 }}></View>
              <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleItemPress(item)}
                    style={({ pressed }) => [
                      styles.listItem,
                      { backgroundColor: pressed ? '#EFEFEF' : 'transparent' },
                    ]}
                  >
                    <Image
                      source={selectedValues?.includes(item.type) ? check : uncheck}
                      style={styles.checkboxIcon}
                    />
                    <Text style={styles.listText}>{item.type}</Text>
                  </Pressable>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
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
    // backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    // marginTop: '%',
    backgroundColor: 'white',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 0
    },
    marginHorizontal: 20,
    // height:'45%',
    width:'90%'
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
  checkboxIcon: {
    width: 24,
    height: 24,
    marginRight: 4,
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
  }
});

export default AllergiesModel;
