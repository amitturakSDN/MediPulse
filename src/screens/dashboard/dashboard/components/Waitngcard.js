import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '@/theme';
import TextR5 from '../../../../components/TextR5';
// import Three_dot from '../../../assets/Images/three-dots.png';
import { patient } from '../../../../assets/images'
import moment from 'moment';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button } from '../../../../components';
import CircularProgress from 'react-native-circular-progress-indicator';
import GLOBALS from '../../../../constants';
const { FONTS, COLOR, Strings } = GLOBALS;
const WaitingCard = ({ item, index, style }) => {
    const navigation = useNavigation();
    return (
        // main view
        <View
            style={styles.container}
            onPress={() => 1}>
            {/* Profile Image */}

            <View style={styles.waitingRoom}>
                <Text style={styles.waitingRoomTxt}>Waiting Room</Text>
                <View style={{ flexDirection: 'row', marginVertical: 7 }}>
                    <Text style={styles.appointmentNo}>Appt. No.:</Text>
                    <Text style={styles.appointmentVal}>#125</Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 7 }}>
                    <Text style={styles.appointmentNo}>Status: </Text>
                    <Text style={styles.appointmentVal}>Waiting</Text>
                </View>


                <Button
                    onPress={() => {
                    }}
                    style={styles.button}
                    textStyle={styles.buttonText}
                    title={'cancel'}
                />
            </View>
            {/* Information of user */}
            <View style={styles.verticaltextview}>
                <CircularProgress
                    value={40}
                    radius={65}
                    // title={`You are ${40}`}
                    // subtitle="in line"
                    inActiveStrokeOpacity={0.5}
                    activeStrokeColor={globalColors.primaryTheme}
                    activeStrokeWidth={12}
                    inActiveStrokeWidth={12}
                    progressValueStyle={{  fontFamily: FONTS.BOLD, color: globalColors.primaryTheme }}
                    progressValueColor={globalColors.primaryTheme}
                />
            </View>

        </View>
    );
};

export default memo(WaitingCard);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 18,
        marginVertical: 25,
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
    },

    productImage: {
        width: 68,
        height: 68,
        alignSelf: 'center',
        margin: 7
    },

    villaText: {
        color: globalColors.black,
        fontSize: 14,
    },

    waitingRoom: {
        flex: 1.3,
        marginRight: 10,
        marginLeft: 15,
    },
    verticaltextview: {
        flex: 1,
    },

    addressText: {
        color: globalColors.gray,
        paddingTop: 5,
        fontSize: 14,
    },

    flatText: {
        color: globalColors.gray,
        fontSize: 12,
        marginLeft: 5,
    },
    alarmImage: {
        height: 11.11,
        width: 11.11,
    },
    viewstyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
    },

    buttonText: {
        fontFamily: FONTS.BOLD,
        fontSize: 15,
        color: '#171717',
        textAlign: 'center',
        lineHeight: 20,
        color: globalColors.white,
        // fontFamily: globalFonts.medium
        marginVertical:-5
    },
    button: {
        backgroundColor: globalColors.primaryTheme,
        height: 35,
        width: 130,
        marginTop: RFValue(7),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RFValue(7),
        boxSizing: 'border-box',
    },

    waitingRoomTxt: {
        fontSize: 22,
        fontFamily: FONTS.BOLD,
        lineHeight: 27,
        marginBottom: 10
    },
    appointmentNo: {
        fontSize: 15,
        fontWeight: 'normal',
        lineHeight: 18,

    },
    appointmentVal: {
        color: '#5E6982',
        marginHorizontal: 6
    }
});

