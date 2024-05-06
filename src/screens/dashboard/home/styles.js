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
    marginTop:15,
    marginHorizontal:20,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    color: '#171717',
  },
  txt:{
    fontFamily:FONTS.MEDIUM,
    fontSize: 16,
    LineHeight: 19,
    color:'#84818A',
    textAlign:'center',
    marginBottom:7
  },
  bookNow:{
    // marginTop:18,
    marginHorizontal:17,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    color: '#171717',
  },
  // floating button scanner
  // buttonContainer: {
  //   position: 'absolute',
  //   // bottom: 60,
  //   alignSelf: 'center',
  //   backgroundColor: 'transparent', // Set the background color to 'transparent' or your desired color
  // },
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
  title:{
    fontFamily:FONTS.BOLD,
    fontSize: 35,
    LineHeight: 47,
    color:'#FFFFFF', 
    // alignSelf:'center'
  },
  eventContainer:{
      // paddingHorizontal: 4,
      paddingVertical: 9,
      marginTop: 18,
      backgroundColor: globalColors.white,
      marginHorizontal: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 5, // Required for Android shadows
      marginBottom:75
  },
  listText:{
    fontFamily:FONTS.MEDIUM,
    fontSize: 18,
    LineHeight: 22,
    color:'#171717', 
  },
  noDataTxt:{
    fontFamily:FONTS.BOLD,
    fontSize: 14,
    LineHeight: 22,
    color:'#171717', 
    textAlign:'center',

  },
  hospitalVisitsView:{
    marginHorizontal:20,
    // backgroundColor:'#D7ECF2'
  },
  symptomsTxt: {
    fontFamily:FONTS.MEDIUM,
    fontSize: 13,
    LineHeight: 36,
    color:globalColors.white, 
  },
  btnSymptoms: {
    height: 25,
    width:'25%',
    paddingHorizontal: 10,
    backgroundColor: globalColors.primaryTheme,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
    // marginBottom:5
  },

  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#F0F0F0',
    marginBottom:13
  },
  linee: {
    width: '100%',
    height: 2,
    backgroundColor: '#F0F0F0',
    marginTop:5
  },
  clinicName: {
    fontFamily:FONTS.BOLD,
    fontSize: 18,
    LineHeight: 22,
    color:'#171717', 
  },
  dateTimeView: {
    marginVertical: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vitalsView: {
    // marginHorizontal:20,
    marginVertical:5
  },
  vitalsCardView: {
   flexDirection:'row',
  // justifyContent:'space-evenly'
 
  },
  vitalsCardFirst: {
    width:147,
    padding:7,
    marginRight:25,
   flexDirection:'row',
    borderRadius: 10,
    opacity: 0.75,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 4, // Add this line for Android shadow
 
  },
  vitalsCardSecond: {
   
  },
  imgView:{
    justifyContent:'center'
  },
  imgDetails:{
   height:44,
   width:44
  },
  detailsView:{
    marginHorizontal:5
  },
  valueTxt:{
    fontFamily:FONTS.MEDIUM,
    fontSize: 16,
    LineHeight: 19,
    color:'#171717', 
    textAlign:'center'
  },
  labelTxt:{
    fontFamily:FONTS.MEDIUM,
    fontSize: 14,
    LineHeight: 17,
    color:'#171717', 
    textAlign:'center'
  },
  vaccinNameView:{
  flexDirection:'row'
  },
  tvaccinTxt:{
    fontFamily:FONTS.MEDIUM,
    fontSize: 16,
    LineHeight: 19,
    color:'#3BC4CA', 
    marginHorizontal:10
  },

  verticaltextview: {
    flex: 1,
    marginHorizontal: 20,
  },
  addressText: {
    marginVertical: 5,
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    LineHeight: 19,
    color: '#171717',
  },
  viewstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2,
  },
  dateTxt: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 14,
    LineHeight: 17,
    color: '#808598',
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
