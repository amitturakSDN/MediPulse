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
import { Rectangle, circle } from '../assets/images';
import GLOBALS from '../constants';
import CustomSearchBar from './CustomSearchBar';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '@actions';
const BloodTypeModel = (props) => {
  const {
    isVisible,
    onClose,
    data,
  } = props;
  
  const [selectedValue, setSelectedValue] = useState(null);

  // const [newData, setNewData] = useState(data);
  const dispatch = useDispatch();
console.log(data,'data>>>');
  const renderItem = ({ item }) => (
    <View style={styles.listView}>
      <Image source={circle} />
      <View style={{ justifyContent: 'center' }}>
        <Text style={styles.listText}>{item.title}</Text>
      </View>
    </View>
  );

  const closeModal = () => {
    // setSelectedValue(null);
    // setSelectedTobacco(null);
    // setSelectedAlcohol(null);
    onClose();
  };



  const handleItemPress = (item) => {
    setSelectedValue(item.type);
    // setSelectedTobacco(item.type);
    props.onSelect(item.type,item?.id); 
    onClose();
   
    // props.onTobaccoSelect(item?.type,item?.id); 
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
            
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleItemPress(item)}
                    style={({ pressed }) => [
                      styles.listItem,
                      { backgroundColor: pressed ? '#EFEFEF' : 'transparent' }
                    ]}
                  >
                    <Image source={circle} />
                    <Text style={styles.listText}>{item.type}</Text>
                  </Pressable>
                )}
                keyExtractor={(item) => item.id}
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
    marginTop: '70%',
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
    // height:'30%',
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

export default BloodTypeModel;
