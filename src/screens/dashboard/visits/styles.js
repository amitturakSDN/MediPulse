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
  visitListView:{
   
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: globalColors.white,
    marginHorizontal:17,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5, // Required for Android shadows
  },
  visitName:{
    fontFamily:FONTS.BOLD,
    fontSize: 18,
    LineHeight: 22,
    color:'#000000', 
  },
  vistDetailText:{
    fontFamily:FONTS.BOLD,
    fontSize: 15,
    LineHeight: 16,
    color:'#84818A', 
    marginTop:8
    // alignSelf:'center'
  }
});

export default styles;
