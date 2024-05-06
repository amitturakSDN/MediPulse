import React, { memo,useState } from 'react';
import {
    StyleSheet, Image, View,
    TouchableOpacity, Text,Switch
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { globalColors } from '@/theme';
// import USER_ICON from './../../assets/Images/user_icon.png';
import {backIcon,drwawerIcon} from '../assets/images/index';
// import Logo from './../../assets/Images/logo.png';
import TextR5 from './TextR5';
import { RFValue } from 'react-native-responsive-fontsize';
import GLOBALS from '../constants';
const { FONTS, COLOR, Strings } = GLOBALS;

const HeaderR5 = ({
    title, isBack, rightIcon,activeInactiveButton,
    onRightIconPress, titlestyle, leftIconStyle,
    containerStyle, isdrawer,toggleSwitch,backFromListing,backFromChangePassword,
    ...props
}) => {
    const navigation = useNavigation();
    // const { user, token } = useSelector(state => state.user);
    const { user, token } = true;
    const [isEnabled, setIsEnabled] = useState(true);
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    


    const __onLeftPress = () => {
        if (isBack) {
            navigation.goBack();
        }else if(backFromChangePassword){
            navigation.reset({
                routes: [
                  {
                    name: "Home"
                  }
                ],
              })
        }  else {
            // navigation.navigate('Profile');
            navigation.openDrawer();
        }
    }

    const nonAuthBack = () => {
        if (navigation?.openDrawer) {
            navigation.openDrawer();
        } else {
            navigation?.goBack();
        }
    }

    return (

        <>
            {
                token
                    ?
                    <TouchableOpacity
                        onPress={() => nonAuthBack()}
                    // disabled
                    >
                        {/* <Image
                            source={drwawerIcon}
                            style={styles.logo}
                            resizeMode="contain"
                        /> */}
                        <Image
                            source={backIcon}
                            style={styles.logo}
                            // style={[styles.image, {
                            //     height: 22,
                            //     width: 24,
                            //     borderRadius: 15,
                            // }, leftIconStyle]}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    
                    :
                    <View style={[styles.conainer, containerStyle]}>
                        {
                            isdrawer
                                ?
                                <TouchableOpacity
                                    onPress={() => navigation.openDrawer()}
                                    style={{}}
                                >
                                    <Image
                                        source={drwawerIcon}
                                        style={[styles.image, {
                                            height: 31,
                                            width: 31,
                                            tintColor: "white",
                                            left: 12,
                                        }, leftIconStyle]}

                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                                :
                                // profile image
                                <TouchableOpacity
                                    onPress={__onLeftPress}
                                >
                                    {/* <Image
                                        source={isBack ? backIcon : { uri: `http://54.190.192.105:9117/public/${user?.image}` }}
                                        style={[styles.image, {
                                            height: isBack ? 22 : 40,
                                            width: isBack ? 24 : 40,
                                            borderRadius: isBack ? 15 : 20,
                                        }, leftIconStyle]}
                                        defaultSource={USER_ICON}
                                        resizeMode="contain"
                                    /> */}
                                    <Image
                                    source={backIcon}
                                    style={styles.logo}
                                    resizeMode="contain"
                                />
                                </TouchableOpacity>
                        }
                        {
                            // title for header
                            title
                                ?
                                // <TextR5 bold style={[styles.title, titlestyle]}>{title}</TextR5>
                                <Text  style={[styles.title, titlestyle]}>{title}</Text>
                                :
                                <View style={styles.title} />
                        }

                        {/* right icon */}
                        {
                            rightIcon
                                ?
                                <TouchableOpacity style={styles.rightIcon} onPress={onRightIconPress}>
                                    <Image
                                        source={rightIcon}
                                        style={styles.rightIconImage}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                                :
                                <View style={styles.rightIcon} />
                        }
                        {/* activeInactiveButon icon */}
                        {
                            activeInactiveButton
                                ?
                                <TouchableOpacity style={styles.rightIcon} onPress={onRightIconPress}>
                                      <Switch
                                            trackColor={{ false: "#767577", true: globalColors.primary }}
                                            thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleSwitch}
                                            value={isEnabled}
                                            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.8}] }}
                                        />
                                </TouchableOpacity>
                                :
                                <View style={styles.rightIcon} />
                        }
                    </View>

            }
        </>
    )
}

export default memo(HeaderR5);

const styles = StyleSheet.create({
    conainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        // paddingVertical: 18,
        paddingBottom:14
    },
    image: {
        backgroundColor: globalColors.white,
        overflow: 'hidden',
    },
    title: {
        flex: 80,
        fontSize: 22,
        textAlign: 'center',
        // marginLeft:RFValue(40),
        fontFamily:FONTS.BOLD
    },
    rightIcon: {
        flex:3,
        // overflow: 'hidden',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 43,
        width: 43,
    },
    rightIconImage: {
        // height: "50%",
        // width: "50%",
    },
    logo: {
        height: 20,
        width: 20,
        // marginLeft: ,
        // marginBottom: 20,
        // marginVertical:5
    }
});
