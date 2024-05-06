import { StyleSheet, Dimensions } from 'react-native';
import GLOBALS from '../../../constants';
const { FONTS, COLOR } = GLOBALS;


const styles = StyleSheet.create({

  textStyle: {
    fontSize: 18, color: COLOR.textColor, marginTop: 3
  },
  formContainer: {
    backgroundColor: COLOR.TEXT_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: '40%',
  },
  cancelButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
})

export default styles;