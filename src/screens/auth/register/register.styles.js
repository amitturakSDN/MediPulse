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
    borderRadius: RFValue(10),
    
  },
  otherInfoBtn: {
    backgroundColor: globalColors.primaryTheme,
    height: RFValue(45),
    width: '100%',
    marginTop: RFValue(6),
    alignSelf:'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(10),
    
  },
  backBtnView:{
    flexDirection:'row',justifyContent: 'space-between',
  },
  backView:{
    alignSelf:'center',
    alignItems: 'center',
  },
  backText:{
   fontFamily:FONTS.BOLD,
    fontSize: 20,
    LineHeight: 27,
    color:globalColors.primaryTheme,
    marginHorizontal:10
  },

  imageBack: { height: RFPercentage(25) },
  // imageBackView: { flex: 1, alignItems: 'center', marginTop: RFValue(70) },
  logoImage: { height: RFPercentage(28), width: RFPercentage(28) },
  bottomView: {
    flex: 2,
    backgroundColor: '#ffffff',
    bottom: RFValue(80),
    borderTopStartRadius: RFValue(23),
    borderTopEndRadius: RFValue(23),
  },
  signInText: {
    fontSize: RFValue(22),
    // fontFamily: globalFonts.semibold,
    marginVertical: RFValue(10),
  },
  inputStyles: {
    height: RFValue(50),
    width: '100%',
    borderRadius: RFValue(10),
    marginTop: RFValue(15),
    borderWidth: 0,
    // fontFamily: globalFonts.regular,
  },
  forgotpass: {
    alignSelf: 'flex-end',
    color: globalColors.primaryTheme,
    marginTop: 10,
    // fontFamily: globalFonts.regular,
    fontSize: RFValue(16),
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
  tabView: {marginVertical:10 },
  textInputView: { marginHorizontal: RFValue(16), paddingVertical: RFValue(7) },
  signUpView: {
    flexDirection: 'row',
    marginTop: RFValue(15),
    alignSelf: 'center',
  },
  
// tabbar
tabStyle: {
  borderColor: 'transparent',
  backgroundColor: 'transparent',
  paddingVertical:17
},
activeTabStyle: {
  borderBottomColor: globalColors.primaryTheme,
  borderBottomWidth: 2,
  backgroundColor: 'transparent',
},
tabTextStyle: {
  color: '#84818A',
  fontFamily: FONTS.REGULAR,
  fontSize: 20
},
activeTabTextStyle: {
  fontFamily:  FONTS.BOLD,
  color: globalColors.primaryTheme,
  fontSize: 20
},
tabsContainerStyle: {
  // marginBottom: 10,
},
errorText:{
  fontFamily:  FONTS.REGULAR,
  color: '#FF0000',
  fontSize: 13,
  marginBottom:2
},
confirmPasswordInput: {
  // Add your regular styles for the input field here
  // For example:
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 5,
  paddingHorizontal: 10,
  paddingVertical: 8,
  marginBottom: 10,
},
errorInput: {
  borderColor: 'red', // Change the border color to red when there's an error
},

viewStyle: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  marginHorizontal: 17,
  marginTop: 50,
  // marginVertical: 20,
},
inputContainer: {
  width: 36,
  // marginRight: 11,
  marginHorizontal: 9,
  height: 36
},
inputStyle: {
  textAlign: 'center',
  fontSize: 20
},
otp: {
  fontSize: 16,
  color: '#5E5E5E',
  // marginTop: 8,
  fontFamily: FONTS.REGULAR
},
});


