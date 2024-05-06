import {StyleSheet} from 'react-native';
import {globalColors} from '@/theme';
import { RFValue } from 'react-native-responsive-fontsize';
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
    marginHorizontal:17,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    color: '#171717',
  },
  mainView:{
    marginHorizontal:20
  },
  profileView: { 
    flexDirection:'row',
    marginTop:30,
    marginBottom:19
     
    },
    profileCamera: { 
      flex:2,
      alignItems:'flex-end'
    },
    profileCameraImg: {
      width:100,height:100
     },
     profileCameraUrl: {
      width:100,height:100,borderRadius:50
     },
    
    editBtnView: {
     flex:1,
     alignItems:'flex-end'
    },
    editImg: {
     height:24,width:24
    },

    username:{
      fontFamily:FONTS.BOLD,
      fontSize:18,
      lineHeight:22,
      textAlign:'center',
      color:'#171717'
    },
    address:{
      fontFamily:FONTS.MEDIUM,
      fontSize:16,
      lineHeight:19,
      color:'#5E6982',
      textAlign:'center',
      marginVertical:8
    },
    mailView:{
    flexDirection:'row',
    alignSelf:'center'
    },
    mailImgView:{
      // flex:1,
      alignItems:'flex-end'
    },
    mailImg:{
      width: 21.5,
      height: 19.34,
    },
    mail:{
      // flex:2,
      marginHorizontal:10,
      fontFamily:FONTS.MEDIUM,
      fontSize:16,
      lineHeight:19,
      color:'#5E6982',
    },
    callView:{
      alignSelf:'center',
      flexDirection:'row',
      marginVertical:13,
      },
      callImgView:{
      
        alignItems:'flex-end'
      },
      callImg:{
       
        marginHorizontal:10,
        width: 16,
        height: 16,
        // alignSelf:'center'
      },
      dataImg:{
        alignSelf:'center',
        marginBottom:4
      },

    call:{
     
      fontFamily:FONTS.MEDIUM,
      fontSize:16,
      lineHeight:19,
      color:'#5E6982',
      // marginVertical:12
    },
    hralthRecord:{
      flex :1
    },
    hralthRecordImg:{
      maxWidth:"100%"
    },
    listContainer:{
        paddingTop:12,
        paddingLeft:12,
        marginVertical: 10,
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
    title:{
      fontFamily:FONTS.BOLD,
      fontSize: 22,
      LineHeight: 30,
      color:'#FFFFFF', 
    },
    boxContainer:{
      flexDirection:'row',
      backgroundColor:'#3BC4CA',
      borderRadius:20,
      // height:120,
      justifyContent:'space-around',
      alignItems:'center',
      paddingVertical:13,
    },
    boxText:{
      color: '#FFFFFF',
      marginTop:4,
      fontFamily:FONTS.REGULAR,
      fontSize: 14,
      textAlign:'center'
    },
    boxValue:{
      color: '#FFFFFF',
      marginTop:4,
      fontFamily:FONTS.BOLD,
      fontSize: 14,
      textAlign:'center'
    
    },
    line: {
      width: 1,
      height: "80%",
      backgroundColor: "#F0F0F0",
    },
    
});

export default styles;
