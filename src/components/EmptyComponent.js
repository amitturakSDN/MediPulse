import {globalColors } from '@/theme';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import GLOBALS from '../constants';
const { FONTS, COLOR, Strings } = GLOBALS;

export function EmptyComponent({ style, textStyle, title, isLoading, loaderColor, ...rest }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        marginVertical: 5,
      }}
    >
      <Text
        style={{
          fontSize: RFValue(16),
          fontFamily: FONTS.BOLD,
          textAlign: 'center',
          color: 'gray',
          // paddingTop: RFPercentage(2),
        }}
      >
        {title}
      </Text>
      </View>
  );
}
