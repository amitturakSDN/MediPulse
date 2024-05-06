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
  headertext: {
    fontSize: 30,
    color: globalColors.white,
    paddingHorizontal: 20,
  },
  logo: {
    height: 45.04,
    width: 36.03,
    marginLeft: 20,
    marginVertical: 20,
    // alignSelf: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  pagerView: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    height: 250,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  upcomingText:{
    marginTop:18,
    marginHorizontal:17,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    color: '#171717',
  },
  bookNow:{
    // marginTop:18,
    marginHorizontal:17,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    color: '#171717',
  },
  // floating button scanner
  buttonContainer: {
    position: 'absolute',
    bottom: 20, // Adjust the position as per your requirement
    alignSelf: 'center',
    backgroundColor: 'transparent', // Set the background color to 'transparent' or your desired color
  },
  buttonImage: {
    width:110,
    height :50
  },
  title:{
    fontFamily:FONTS.BOLD,
    fontSize: 22,
    LineHeight: 30,
    color:'#FFFFFF', 
    // marginLeft:30
  },
  DocView:{
    marginVertical:30
  },
  DocList:{
    marginHorizontal:20
  },
  button: {
    backgroundColor: globalColors.primaryTheme,
    height: RFValue(45),
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(10),
    marginVertical:20,
    marginHorizontal:20,
    position:'absolute',
    bottom:0
    
  },
  buttonText: { 
    fontFamily:FONTS.BOLD,
    fontSize: 20,
    textAlign:'center',
    lineHeight: 27, 
    color: globalColors.white, 
   },
});

export default styles;
