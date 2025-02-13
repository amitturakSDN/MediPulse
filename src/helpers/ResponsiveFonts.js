'use strict';

import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

const baseWidth = 350;
const baseHeight = 650;

const widthScale = width;
const heightScale = height;
const scale = size => (width / baseWidth) * size;
const verticalScale = size => (height / baseHeight) * size;
const moderateScale = (size, factor = 0.5) => {
  if (Platform.OS === 'web') {
    factor = 0.1;
  }
  return size + (scale(size) - size) * factor;
};

export {
  scale,
  verticalScale,
  moderateScale,
  width,
  height,
  widthScale,
  heightScale,
};