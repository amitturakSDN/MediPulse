import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { globalColors, globalFonts } from '@/theme';
import GLOBALS from '../../../constants';
const { FONTS, COLOR, Strings } = GLOBALS;
export const styles = StyleSheet.create({
  icons: {
    height: RFValue(15),
    width: RFValue(15),
    marginTop: RFValue(3),
  },
  button: {
    backgroundColor: globalColors.primaryTheme,
    height: RFValue(45),
    width: '100%',
    marginTop: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(7),
  },
  imageBack: { height: RFPercentage(55) },
  imageBackText: { flex: 1, marginHorizontal:RFValue(25) },
  MediPulseTxt:{
    marginTop:RFValue(28),
    fontFamily: FONTS.BOLD,
      fontSize: 35,
      lineHeight: 47,
      color:'#FFFFFF',
      marginVertical:12
      // Font family: Roboto
  },
  simplestTxt:{
    fontFamily: FONTS.REGULAR,
    
    fontSize: 28,
    lineHeight: 39,
    color:'#FFFFFF',
  },
  healthTxt:{
    fontFamily: FONTS.BOLD,
    fontSize: 28,
    lineHeight: 39,
    color:'#FFFFFF',
  },
  logoImage: { height: RFPercentage(28), width: RFPercentage(28) },
  bottomView: {
    flex: 2,
    backgroundColor: '#ffffff',
    bottom: RFValue(60),
    borderTopStartRadius: RFValue(23),
    borderTopEndRadius: RFValue(23),
  },
  signInText: {
    fontSize: 25,
    color: '#171717',
    textAlign:'center',
    lineHeight: 27,
    marginVertical:15,
    fontFamily:FONTS.BOLD
  },
  forgetText: {
    fontSize: 20,
    color: '#171717',
    textAlign:'center',
    lineHeight: 27,
    // marginVertical:5,
    fontFamily:FONTS.MEDIUM
  },
  inputStyles: {
    height: RFValue(50),
    width: '100%',
    borderRadius: RFValue(10),
    marginTop: RFValue(15),
    borderWidth: 0,
 
  },
  stayView:{
    flexDirection:'row',
   marginTop:10
  },
  staySigntxt: {
    fontFamily:FONTS.REGULAR,
    fontSize: 16,
    color:'#84818A',
  },
  forgotpass: {
    fontFamily:FONTS.MEDIUM,
    fontSize: 16,
    color:globalColors.primaryTheme,
    textAlign:'right'
  },
  buttonText: { 
    fontFamily:FONTS.BOLD,
    fontSize: 20,
    textAlign:'center',
    lineHeight: 27, 
    color: globalColors.white, 
    },
  accountText: {
    color: globalColors.grey,
    fontFamily:FONTS.REGULAR,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
  },
  signUpText: { color: globalColors.primaryTheme, fontFamily:FONTS.MEDIUM,
    fontSize: 16, },
  textInputView: { marginHorizontal: RFValue(16), paddingVertical: RFValue(15) },
  signUpView: {
    flexDirection: 'row',
    marginTop: RFValue(23),
    alignSelf: 'center',
  },
  errorText:{
    fontFamily:  FONTS.REGULAR,
    color: '#FF0000',
    fontSize: 13,
    marginBottom:2
  }
});
