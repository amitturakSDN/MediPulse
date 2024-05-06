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
    fontFamily:FONTS.MEDIUM,
    fontSize: 13,
    LineHeight: 16,
    color:'#84818A', 
    marginTop:8
  },
  mainView:{
    marginVertical: 20,
    marginHorizontal:20,
  },
  listContainer:{
    paddingVertical:10,
    paddingLeft:12,
    backgroundColor: globalColors.white,
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

healthView:{
flexDirection:'row',
justifyContent:'space-between',
marginBottom:17
},
healthTxt:{
  fontFamily:FONTS.BOLD,
  fontSize: 18,
  LineHeight: 22,
  color:'#171717', 
  marginTop:8
},
healthDate:{
  fontFamily:FONTS.MEDIUM,
  fontSize: 13,
  LineHeight: 16,
  color:'#84818A', 
  marginTop:8
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


dataView:{
  marginTop:25,
  marginHorizontal:20,
},
doctorName:{
  fontFamily:  FONTS.SEMI_BOLD,
  color: '#171717',
  fontSize: 16,
  lineHeight:15,
  marginBottom:10
},
specialization:{
  fontFamily:  FONTS.MEDIUM,
  color: '#5E6982',
  fontSize: 16,
  lineHeight:15,
  marginBottom:8
},
para:{
  fontFamily:  FONTS.REGULAR,
  color: '#5E6982',
  fontSize: 14,
  lineHeight:23,
  marginBottom:10

},
line: {
  width: '100%',
  height: 3,
  backgroundColor: '#F0F0F0',
  marginBottom:20
}
});

export default styles;
