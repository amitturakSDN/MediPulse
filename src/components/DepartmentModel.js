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
  ScrollView
} from 'react-native';
import { Rectangle, circle } from '../assets/images';
import GLOBALS from '../constants';
const { API_URL, NETWORK_STATUS, ACTION_TYPE } = GLOBALS;
import CustomSearchBar from './CustomSearchBar';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '@actions';
import { EmptyComponent } from './EmptyComponent';
// import { ScrollView } from 'react-native-gesture-handler';
const DepartmentModel = (props) => {
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
    data,
  } = props;

  const [selectedValue, setSelectedValue] = useState(null);
  const [newData, setNewData] = useState(data);
  const dispatch = useDispatch();
  const renderItem = ({ item }) => (
    <View style={styles.listView}>
      <Image source={circle} />
      <View style={{ justifyContent: 'center' }}>
        <Text style={styles.listText}>{item.title}</Text>
      </View>
    </View>
  );

  const closeModal = () => {
    setSelectedValue(null);
    onClose();
  };

  useEffect(() => {
    setNewData(data)
  }, [data])
  const handleItemPress = (item) => {
    console.log(item?.department_symptoms,'item?.department_symptoms');
    setSelectedValue(item.department_name);
    dispatch({
      type: ACTION_TYPE.SET_DEPARTMENTLIST_DATA,
      payload: item?.department_symptoms ? JSON.parse(item?.department_symptoms) : [],
    });
    setSelectedValue(item.department_name);
    onClose();
    props.onDepartmentSelect(item.department_name,item.id); // Corrected line: Call onDepartmentSelect instead of onHospitalSelect
  };
  const searchDepartment = (data) => {
    dispatch(
      AppActions.searchDepartmentList(data,(res) => {
        console.log(res.data, 'searchHospitalList>>>>>')
        setNewData(res?.data?.rows)
      }),
    );
  }
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
            <CustomSearchBar placeholder="Search Department" onSearch={searchTerm => searchDepartment(searchTerm)} />
              {/* <View style={styles.listView}>
                <Image source={Rectangle} />
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.listText}>{'Search Nearby'}</Text>
                </View>
              </View> */}
              {/* <View style={styles.line}></View> */}
              <ScrollView style={styles.scrollView}>
              {newData?.length === 0 ? (
              <EmptyComponent title={"No department available"} /> 
            ) : (
              <FlatList
              data={newData}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleItemPress(item)}
                  style={({ pressed }) => [
                    styles.listItem,
                    { backgroundColor: pressed ? '#EFEFEF' : 'transparent' }
                  ]}
                >
                  <Image source={circle} />
                  <Text style={styles.listText}>{item.department_name}</Text>
                </Pressable>
              )}
              keyExtractor={(item) => item.id}
            />
            )}
              
              </ScrollView>
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
    marginTop: '35%',
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
    // height: '45%',
    width: '90%',
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
    paddingHorizontal: 16,
    marginRight:33
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
   scrollView: {
    maxHeight: 300, // Adjust the maximum height of the list here
  }
});

export default DepartmentModel;
