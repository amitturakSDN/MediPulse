import {StyleSheet} from 'react-native';
import {globalColors} from '@/theme';
import GLOBALS from '../../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
const { FONTS, COLOR, Strings } = GLOBALS;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.primaryTheme,
  },
  safeAreaView: {
    flex: 1,
  },
  logo: {
    height: 45.04,
    width: 36.03,
    marginLeft: 20,
    marginVertical: 20,
    // alignSelf: "center"
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerText:{
    fontFamily:FONTS.BOLD,
    fontSize: 18,
    LineHeight: 22,
    color:globalColors.white,
  },
  selectHospitalView:{
    marginHorizontal:20,marginTop:30
  },
  selectHospitalTxt:{
    fontFamily:FONTS.REGULAR,
    fontSize: 16,
    LineHeight: 22,
    color:'#171717',
  },
  selectDropdown:{
   flexDirection:'row',
   justifyContent:'space-between',
   borderRadius:10,
   marginTop:9,
    padding:15,
      transform: [{ scaleX: 1 }, { scaleY: 1 }],
      backgroundColor:'#F4F4F4',
      flex: 1,
      
  },
  selectText:{
    fontFamily:FONTS.REGULAR,
    fontSize: 16,
    LineHeight: 22,
    color:'#171717',
  },
  buttonText: { 
    fontFamily:FONTS.BOLD,
    fontSize: 20,
    LineHeight: 27,
    color:'#171717',
    color: globalColors.white, 
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
  buttonView:{
    bottom:0,
    marginHorizontal:20
  }
});

export default styles;
