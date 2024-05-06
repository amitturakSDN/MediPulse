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
  upcomingText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 16,
    lineHeight: 22,
    color: '#171717',
    marginHorizontal: 20,
  },
  buttonsView: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping of buttons to next line if needed
    marginVertical: 10,
    marginHorizontal: 17,
  },
  btnSymptoms: {
    height: 30,
    paddingHorizontal: 10,
    backgroundColor: globalColors.white,
    borderRadius: 20,
    marginHorizontal: 3,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3BC4CA',
  },
  otherBtnSymptoms: {
    height: 30,
    paddingHorizontal: 10,
    backgroundColor: globalColors.primaryTheme,
    borderRadius: 20,
    marginHorizontal: 3,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3BC4CA',
  },
  selectedSymptom: {
    backgroundColor: '#3BC4CA',
  },
  symptomsTxt: {
    flexDirection:'row',
    flexWrap:'wrap',
    color: globalColors.primaryTheme,
    fontSize: 13,
    lineHeight: 16,
  },
  otherSymptomsTxt: {
    color: globalColors.white,
    fontSize: 13,
    lineHeight: 16,
  },
  selectedSymptomsTxt:{
  color:globalColors.white
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
  headerText:{
    fontFamily:FONTS.BOLD,
    fontSize: 18,
    LineHeight: 22,
    color:globalColors.white,
  },
  genderView:{
    flexDirection:'row',
    marginVertical:6,
  },
  maleView:{
    flexDirection:'row',
    justifyContent:'space-between',
    
        overflow: 'hidden',
      
      
        alignItems: 'center',
        justifyContent: 'center',
        width: '25%',
        height: 44,
        marginRight:10,
  },
  femaleView:{
    flexDirection:'row',
    justifyContent:'space-between',
   
        overflow: 'hidden',
       
        alignItems: 'center',
        justifyContent: 'center',
        width: '32%',
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
  genderText:{
    marginHorizontal:7,
    fontFamily:FONTS.REGULAR,
    fontSize: 16,
    LineHeight: 22,
    color:globalColors.primaryTheme,
   
  },
  selectDropdown:{
    marginHorizontal:18,
    flexDirection:'row',
    justifyContent:'space-between',
    borderRadius:10,
    marginVertical:11,
     padding:15,
       transform: [{ scaleX: 1 }, { scaleY: 1 }],
       backgroundColor:globalColors.whiteGrey,
      //  flex: 1,
   },
   selectText:{
     fontFamily:FONTS.REGULAR,
     fontSize: 16,
     LineHeight: 22,
     color:'#171717',
   },

   addSymptomsView:{
    flexDirection:'row',
    marginHorizontal:17
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
    marginBottom:20,
  
  },
  buttonView:{
    bottom:0,
    marginHorizontal:20
  }
});

export default styles;
