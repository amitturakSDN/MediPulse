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
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(10),
    marginVertical:'10%',
    position:'absolute',
    bottom:-10,
    marginHorizontal:RFValue(17)
    
  },
  buttonn: {
    backgroundColor: globalColors.primaryTheme,
    height: RFValue(45),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(10),
    marginVertical:'10%',
    
    
  },
  otherInfoBtn: {
    flex:1,
    backgroundColor: globalColors.primaryTheme,
    height: RFValue(45),
    width: '60%',
    marginTop: RFValue(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(10),
    
  },
  backBtnView:{
    flexDirection:'row',
    position:'absolute',
    justifyContent: 'space-between',
    bottom:18,
    marginHorizontal: RFValue(16)

  },
  backView:{
    flex:1,
    alignSelf:'center',
    alignItems: 'flex-start',
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

  tabView: {marginVertical:10 },
  textInputView: { marginHorizontal: RFValue(16), paddingVertical: RFValue(7) },
  profileCameraImg: {
    width:100,height:100
   },
   profileCameraUrl: {
    width:100,height:100,borderRadius:50
   },
  
  genderView:{
    flexDirection:'row',
    marginVertical:6,
    marginHorizontal:2
  },
  maleView:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E1E1E1',
        alignItems: 'center',
        justifyContent: 'center',
        width: '25%',
        height: 44,
        marginRight:10,
  },
  femaleView:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E1E1E1',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        height: 44,
        marginRight:10,
  },
  otherView:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E1E1E1',
        alignItems: 'center',
        justifyContent: 'center',
        width: '27%',
        height: 44,
        marginRight:10,
  },
  genderTexts:{
    marginHorizontal:7,
    fontFamily:FONTS.REGULAR,
    fontSize: 16,
    LineHeight: 22,
    color:'#84818A',
   
  },

// tabbar
tabStyle: {
  borderColor: 'transparent',
  backgroundColor: 'transparent',
  paddingVertical:17,
  marginHorizontal:5
},
activeTabStyle: {
  borderBottomColor: globalColors.primaryTheme,
  borderBottomWidth: 2,
  backgroundColor: 'transparent',
  marginHorizontal:5
},
tabTextStyle: {
  color: '#84818A',
  fontFamily: FONTS.REGULAR,
  fontSize: 20,
},
activeTabTextStyle: {
  fontFamily:  FONTS.BOLD,
  color: globalColors.primaryTheme,
  fontSize: 20,
},
tabsContainerStyle: {
},
upcomingText: {
  fontFamily: FONTS.REGULAR,
  fontSize: 16,
  lineHeight: 22,
  color: '#171717',
  marginHorizontal: 7,
},
selectDropdown:{
  // marginHorizontal:7,
  flexDirection:'row',
  justifyContent:'space-between',
  borderRadius:10,
  marginVertical:11,
   padding:15,
     transform: [{ scaleX: 1 }, { scaleY: 1 }],
     backgroundColor:globalColors.whiteGrey,
    //  flex: 1,
 },
selectDropdownn:{
  // marginHorizontal:7,
  flexDirection:'row',
  justifyContent:'space-between',
  borderRadius:10,
  marginVertical:11,
   padding:15,
     transform: [{ scaleX: 1 }, { scaleY: 1 }],
opacity:0.5,
backgroundColor:globalColors.whiteGrey,
 },
 selectText:{
   fontFamily:FONTS.REGULAR,
   fontSize: 16,
   LineHeight: 22,
   color:'#171717',
 },
 medicationView:{
  flexDirection:'row'
 },
 medicationInput:{
  width:'80%'
 },
 add:{
  alignItems:'flex-end',
  justifyContent:'center',
  marginHorizontal:5
 },
 remove:{
  justifyContent:'center',
  marginHorizontal:20
 },
 closeImg:{
  height:40,
  width:40
 },
 errorText:{
  fontFamily:  FONTS.REGULAR,
  color: '#FF0000',
  fontSize: 13,
  marginBottom:2
},
disabled: {
  opacity: 0.5, // Example style for making the TouchableOpacity look disabled
},
});


