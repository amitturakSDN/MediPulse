// screens/Home.js
import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import GLOBALS from '../constants';
import { moderateScale } from '../helpers/ResponsiveFonts';
const windowHeight = Dimensions.get('window').height;
const {FONTS, COLOR, Strings} = GLOBALS;

const CustomOtpInput = React.forwardRef((props, ref) => {
  let {
    label = '',
    placeholder = '',
    keyboardType = '',
    value = '',
    onChangeText = () => {},
    containerStyle = {},
    inputStyle = {},
    onKeyPress = () => {},
    maxLength = 50,
  } = props;
  return (
    <View style={containerStyle}>
      {label && <Text style={styles.inputLabel}>{label} </Text>}

      <TextInput
        ref={ref}
        maxLength={maxLength}
        style={[styles.textInput, inputStyle]}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        selectionColor={COLOR.BLUE_THEME}
        onKeyPress={onKeyPress}
        onChangeText={txt => onChangeText(txt)}
      />
    </View>
  );
});

export default CustomOtpInput;

const styles = StyleSheet.create({
  inputLabel: {
    fontFamily: FONTS.LIGHT,
    fontSize: moderateScale(16),
    color: COLOR.FORM_LABEL,
    paddingTop: 15,
    paddingBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    // borderRadius: 5,
    // padding: 12,
    borderColor: COLOR.BLUE_THEME,
    fontSize: 18,
    fontFamily: FONTS.REGULAR,
    color: COLOR.BLACK
  },
});