import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { spacing, globalColors } from '@/theme';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: spacing.xs,
    paddingTop: spacing.m,
    marginBottom: spacing.s,
  },
  input: {
    paddingHorizontal: spacing.xs,
  },
  label: {
    color: 'gray',
    position: 'absolute',
    top: 0,
    left: spacing.xs,
  },
  icons: {
    height: RFValue(15),
    width: RFValue(15),
    marginTop: RFValue(3),
  },
  inputStyle: {
    height: RFValue(50),
    width: '100%',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    borderWidth: 0,
    borderTopRightRadius: RFValue(10),
    borderTopLeftRadius: RFValue(10),
    backgroundColor: globalColors.whiteGrey,
  },
});

export function TextField({
  label,
  value,
  onChangeText,
  image,
  theme = {
    colors: {
      primary: globalColors.primaryTheme,
      text: globalColors.blacktext,
      placeholder: globalColors.black,
      disabled: globalColors.black,
    },
  },
  rightIconHide,
  rightIconShow,
  icon,
  rightIcon,
  secure = false,
  keyboardType = 'default',
  customStyle,
  error = false,
  multiline = false,
  disabled = false,
  autoCapitalize,
  maxLength,
  onSubmitEditing,
  forwardedRef,
  onTouchStart,
  onBlur,
  disableCopyPaste = false, // Add the prop for disabling copy-paste
  ...rest
}) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const handlePaste = (event) => {
    if (disableCopyPaste) {
      event.preventDefault(); // Prevent copy-paste if disabled
      onChangeText(''); // Clear the input value
    }
    onPaste(event);
  };

  return (
    <TextInput
      maxLength={maxLength}
      onSubmitEditing={onSubmitEditing}
      ref={forwardedRef}
      label={label}
      value={value}
      placeholder={''}
      underlineColor={'transparent'}
      onChangeText={onChangeText}
      selectionColor={'#000'}
      autoCapitalize={autoCapitalize}
      onBlur={onBlur}
      theme={theme} 
      onPaste={handlePaste}
      onTouchStart={onTouchStart}
      secureTextEntry={!isPasswordVisible && secure}
      disabled={disabled}
      multiline={multiline}
      keyboardType={keyboardType}
      numberOfLines={multiline ? 4 : 1}
      left={
        icon ? (
          <TextInput.Icon
            name={() => {
              return <Image style={styles.icons} source={image} resizeMode={'contain'} />;
            }}
          />
        ) : null
      }
      
      right={
        rightIcon ? (
          <TextInput.Icon
            name={() => {
              return (
               <TouchableOpacity onPress={togglePasswordVisibility}>
                <Image
                  style={styles.icons}
                  source={isPasswordVisible ? rightIconHide : rightIconShow}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              );
            }}
          />
        ) : null
      }
      style={[styles.inputStyle, customStyle,error && { borderColor: 'red', borderWidth: 1,borderBottomWidth:2 }]}
    />
  );
}
TextField.propTypes = {
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
