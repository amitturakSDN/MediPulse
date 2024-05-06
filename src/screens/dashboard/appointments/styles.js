import {StyleSheet} from 'react-native';
import {globalColors} from '@/theme';
import GLOBALS from '../../../constants';
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
    fontFamily:FONTS.BOLD,
    fontSize: 18,
    LineHeight: 22,
    color:'#171717',
    marginHorizontal:20,
    marginBottom:9
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
    bottom: '1%', // Adjust the bottom value as per your requirement
    alignSelf: 'center', // Adjust the right value as per your requirement
    zIndex: 100, // Ensure the button has a higher z-index than other elements
  },
  buttonImage: {
    width:26,
    height :23,
    // marginHorizontal:25,
    marginVertical:10
  },
  headerText:{
    fontFamily:FONTS.BOLD,
    fontSize: 22,
    LineHeight: 30,
    color:globalColors.white,
  },
  scannerContainer:{
    flexDirection:'row',
    // justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#171717cc',
    borderRadius:40,
    paddingVertical:4,
    paddingHorizontal:18
  },
  qrText:{
    color:'#FFFF',
    fontFamily: FONTS.MEDIUM,
    fontSize: 16,
    LineHeight: 17,
    // marginRight:25,
    marginVertical:10
  }
});

export default styles;
