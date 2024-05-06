
import stringsOfLanguage from '../constants/ScreenStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from '../../App';
import RNRestart from 'react-native-restart';


const SetLanguage = async (lang) => {
   await AsyncStorage.setItem('language', lang)
//    const localStorageLanguage = await AsyncStorage.getItem('language');
//    console.log("localStorageLanguage",localStorageLanguage);
//    stringsOfLanguage.setLanguage(lang)
        RNRestart.restart();
};

export default SetLanguage;
