// screens/Home.js
import React, { Component, useState } from 'react';
import { Platform, StyleSheet, TextInput, View, Image, TouchableOpacity, } from 'react-native';
// import Images from '../../assets/images';
import { search } from '../assets/images'
import GLOBALS from '../constants';
import { moderateScale } from '../../helpers/ResponsiveFonts';
// const windowHeight = Dimensions.get('window').height;
const { FONTS, COLOR, Strings } = GLOBALS;

const CustomSearchBar = ({ onSearch,placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={text => {
          setSearchTerm(text);
          handleSearch(); // Invoke handleSearch whenever the text changes
        }}
        value={searchTerm}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image style={{ width: 20, height: 20 }} source={search} />
      </TouchableOpacity>
    </View>
  );
}
export default CustomSearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    padding: 15,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    marginRight: 8,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto', // different font family for iOS
    fontSize: Platform.OS === 'ios' ? 16 : 14, // different font size for iOS
  },
  image: {
    width: 20,
    height: 20,
  },
});
