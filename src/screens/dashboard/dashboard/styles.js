import {StyleSheet} from 'react-native';
import {globalColors} from '@/theme';

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
    fontWeight:"bold",
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
});

export default styles;
