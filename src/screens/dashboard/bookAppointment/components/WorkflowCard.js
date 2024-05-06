import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '@/theme';
import TextR5 from '../../../../components/TextR5';
// import Three_dot from '../../../assets/Images/three-dots.png';
import { patient, Calendar, TimeCircle } from '../../../../assets/images'
import moment from 'moment';
import { Button } from '../../../../components';
import { RFValue } from 'react-native-responsive-fontsize';
import GLOBALS from '../../../../constants';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
const { FONTS, COLOR, Strings } = GLOBALS;
const WorkflowCard = ({ item, index, style }) => {
  const navigation = useNavigation();
  const buttonTextStyle = {
    color: 'red'
};
  return (
    // main view
    <View
      style={styles.container}
    >
      {/* Profile Image */}
      <View style={{
        flexDirection: 'row'
      }}>
        <Image
          source={patient}
          style={styles.productImage}
        />
        {/* Information of user */}
        <View style={styles.verticaltextview}>
          <Text style={styles.addressText}>{'Dr. George Johnson'}</Text>
          <View style={styles.viewstyle}>
            <Text style={styles.flatText}>
              Dermatologist
            </Text>
          </View>
        </View>

      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 7 }}>
        <View style={{ flexDirection: 'row', marginVertical: 7 }}>
          <Text style={styles.appointmentNo}>Appt. No.:</Text>
          <Text style={styles.appointmentVal}>#125</Text>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 7 }}>
          <Text style={styles.appointmentNo}>Status: </Text>
          <Text style={styles.appointmentstatus}>In Flight</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <Text style={styles.upcomingText}>Workflow</Text>

      <ProgressSteps style={{ width: '50%',color:'red' }}>
        <ProgressStep completedCheckColor={buttonTextStyle} label="Xray" nextBtnStyle={{ width: 100 }}>
          <View style={{ alignItems: 'center' }}>
          </View>
        </ProgressStep>
        <ProgressStep label="Sonography" nextBtnStyle={{ width: 100 }}>
          <View style={{ alignItems: 'center' }}>
          </View>
        </ProgressStep>
        <ProgressStep label="Lipid Profile" nextBtnStyle={{ width: 100 }}>
          <View style={{ alignItems: 'center' }}>
          </View>
        </ProgressStep>
        <ProgressStep label="Blood Sugar " nextBtnStyle={{ width: 100 }}>
          <View style={{ alignItems: 'center' }}>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>

  );
};

export default memo(WorkflowCard);
const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginVertical: 25,
    backgroundColor: globalColors.white,
    marginHorizontal: 17,
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
    width: 59,
    height: 59,
    alignSelf: 'center',
    margin: 7
  },

  villaText: {
    color: globalColors.black,
    fontSize: 14,
  },

  verticaltextview: {
    flex: 1,
    marginRight: 10,
    marginLeft: 7,
  },

  addressText: {
    marginTop: 17,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    LineHeight: 22,
    color: '#171717',
  },

  flatText: {
    color: globalColors.gray,
    fontSize: 12,
    // marginLeft: 5,
  },
  alarmImage: {
    height: 11.11,
    width: 11.11,
  },
  viewstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2,
  },
  dateTimeView: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F4F4F4',
    // marginHorizontal:13,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonsView: {
    marginBottom: 10,
    marginTop: 5,
    marginHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    // justifyContent:'space-between'
  },
  btnSymptoms: {
    height: 25,
    // width:100,
    paddingHorizontal: 10,
    backgroundColor: globalColors.primaryTheme,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: "center",
    alignItems: 'center'
  },
  symptomsTxt: {
    color: globalColors.white,
    fontSize: 13,
    lineHeight: 16,
  },
  appointmentNo: {
    fontSize: 15,
    fontWeight: 'normal',
    lineHeight: 18,

  },
  appointmentVal: {
    color: '#5E6982',
    marginHorizontal: 6
  },
  appointmentstatus: {
    color: globalColors.primaryTheme,
    marginHorizontal: 6
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10
  },
  upcomingText: {
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    LineHeight: 22,
    color: '#171717',
    marginLeft: 7
  },

  completedCheckColor:{
    color:globalColors.primaryTheme
  },
  completedLabelColor:{
    color:globalColors.primaryTheme
  },
});
