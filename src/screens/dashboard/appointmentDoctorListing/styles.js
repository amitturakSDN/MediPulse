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
  container1: {
    flexDirection:'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 2,
    marginVertical: 10,

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
  listViewMain:{
    marginTop:30
  },
  textName:{
    fontFamily:FONTS.BOLD,
    fontSize: 18,
    LineHeight: 22,
    color:'#171717', 
    marginLeft:30
  },
  date:{
    fontFamily:FONTS.MEDIUM,
    fontSize: 16,
    LineHeight: 19,
    color:'#171717',
    marginLeft:30,
    marginVertical:5
  },
  listingView:{
    marginTop:10,
    borderTopLeftRadius:30,
    borderTopEndRadius:30,
    backgroundColor:globalColors.white,
    height:'100%',
    paddingHorizontal:20,
    paddingTop:20
  },
  productImage: {
    width: 59,
    height: 59,
    alignSelf: 'center',
    margin:7
  },

  villaText: {
    color: globalColors.black,
    fontSize: 14,
  },

  verticaltextview: {
    flex: 1,
    marginRight: 10,
    marginLeft: 7,
  },

  addressText: {
    marginTop: 17,
    fontFamily:FONTS.BOLD,
    fontSize: 18,
    LineHeight: 22,
    color:'#171717',
  },

  flatText: {
    color: globalColors.gray,
    fontSize: 12,
    // marginLeft: 5,
  },
});

export default styles;
