import React, { memo, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalColors } from '@/theme';
import TextR5 from '../../../../components/TextR5';
import { patient, workFlowCheck, workFlowUncheck, lineverticle, selectCamera } from '../../../../assets/images';
import moment from 'moment';
import { Button } from '../../../../components';
import { RFValue } from 'react-native-responsive-fontsize';
import GLOBALS from '../../../../constants';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import stringsOfLanguage from '../../../../constants/ScreenStrings'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { decryptSOAPData } from '../../../../constants/encryption';
import { useSelector } from 'react-redux';
const { FONTS, COLOR, Strings } = GLOBALS;

const WorkflowCard = ({ inflightData, departmentName }) => {
  console.log(inflightData?.patientWorkflowData, 'inflightData____')
  const navigation = useNavigation();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const encKey = useSelector(state => state.authReducer?.profileData?.data?.profile?.uniqueEncryptionKey);
  const handleCheckboxPress = (checkboxLabel) => {
    if (selectedCheckboxes.includes(checkboxLabel)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((label) => label !== checkboxLabel));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxLabel]);
    }
  };

  const isCheckboxSelected = (checkboxLabel) => {
    return selectedCheckboxes.includes(checkboxLabel?.status);
  };
  const RenderCard = ({ item }) => {
    console.log(item?.patientWorkflowData[0]?.workflow, 'appooinmentId<<<<<<<>')
    const workflowData = item?.patientWorkflowData[0]?.workflow || [];
// const workflowData = [
//   {
//     "_id": "64c25c7ff1035adf50a63020",
//     "departmentId": "2",
//     "status": "In-Progress",
//     "title": "X-Ray"
//   },
//   {
//     "_id": "64c25c7ff1035adf50a63020",
//     "departmentId": "2",
//     "status": "In-Progress",
//     "title": "X-Ray"
//   },
//   {
//     "_id": "64c25c7ff1035adf50a63020",
//     "departmentId": "2",
//     "status": "In-Progress",
//     "title": "X-Ray"
//   },
//   {
//     "_id": "64c25c7ff1035adf50a63020",
//     "departmentId": "2",
//     "status": "In-Progress",
//     "title": "X-Ray"
//   },
//   {
//     "_id": "64c25c7ff1035adf50a63020",
//     "departmentId": "2",
//     "status": "In-Progress",
//     "title": "X-Ray"
//   },
//    {
//     "_id": "64c25c7ff1035adf50a63020",
//     "departmentId": "2",
//     "status": "In-Progress",
//     "title": "X-Ray"
//   },
//   {
//     "_id": "64c25c7ff1035adf50a63021",
//     "departmentId": "3",
//     "status": "Pending",
//     "title": "MRI"
//   }
// ]
    // Combine the text
    const combinedText = `Dr. ${item?.doctorDetails?.firstname} ${item?.doctorDetails?.lastname} - ${departmentName}`;

    // Check if the combined text length exceeds 20 characters
    const truncatedText =
      combinedText.length > 33
        ? `${combinedText.substring(0, 30)}...`
        : combinedText;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          {/* <Image source={patient} style={styles.productImage} /> */}
          {/* <Image source={{ uri: item?.doctorDetails?.profile }} resizeMode="cover" style={styles.productImage} /> */}
          <Image
            source={item?.doctorDetails?.profile ? { uri: item?.doctorDetails?.profile } : selectCamera}
            resizeMode="cover"
            style={styles.productImage}
          />
          <View style={styles.verticaltextview}>
            <Text style={styles.addressText}>{'MediPulse Inc.'}</Text>
            <View style={styles.viewstyle}>
              <Text style={styles.flatText}>{item?.doctorDetails?.firstname} {item?.doctorDetails?.lastname} -</Text>
              <Text style={styles.flatText}> {departmentName}</Text>
              {/* <Text style={styles.flatText}>{truncatedText}</Text> */}
            </View>
          </View>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 7 }}>
          <View style={{ flexDirection: 'row', marginVertical: 7 }}>
            {/* <Text style={styles.appointmentNo}>{stringsOfLanguage.appoiments.ApptNo}</Text>
            <Text style={styles.appointmentVal}>{inflightData?.AppointmentNo}</Text> */}
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 7 }}>
            <Text style={styles.appointmentNo}>{stringsOfLanguage.appoiments.Status}</Text>
            <Text style={styles.appointmentstatus}>In Flight</Text>
          </View>
        </View>

        <View style={styles.line} />

        <Text style={styles.upcomingText}>{stringsOfLanguage.appoiments.Workflow}</Text>


        <View style={styles.container1}>
          {workflowData?.length > 0 && <Image source={lineverticle} style={styles.lineImage} />}
          <View style={styles.checkboxContainer}>
            {workflowData.map((workflowItem, index) => (
              <View style={styles.checkboxItem} key={index}>
                <View
                  // onPress={() => handleCheckboxPress(workflowItem)}
                  style={styles.checkboxTouchable}
                >
                  <Image
                    source={workflowItem?.status === "DONE" ? workFlowCheck : workFlowUncheck}
                    style={styles.checkboxImage}
                  />
                  {/* <Image source={workFlowUncheck} /> */}
                </View>
                <Text style={styles.checkboxLabel}>{workflowItem?.title}</Text>
              </View>
            ))}
          </View>
        </View>


      </View>
    );
  };
  return (
    <View style={{ paddingBottom: 20 }}>
      {
        inflightData?.length > 0 ?
          // <SwiperFlatList
          //   autoplayLoop
          //   showPagination
          //   data={inflightData}
          //   renderItem={renderCard}
          // />
          <RenderCard item={inflightData[0]} />
          :
          null
      }
    </View>

  );
};

export default memo(WorkflowCard);

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 8,
    marginBottom: 13,
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
    margin: 7,
    borderRadius: 50
  },
  verticaltextview: {
    flex: 1,
    marginHorizontal: 95,
    marginLeft: 7,
    marginTop: 13
  },
  addressText: {
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    lineHeight: 22,
    color: '#171717',
  },
  flatText: {
    // color: globalColors.gray,
    // fontSize: 12,
    fontFamily: FONTS.BOLD,
    fontSize: 13,
    lineHeight: 22,
    color: '#171717',
  },
  viewstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2,
  },
  appointmentNo: {
    fontSize: 15,
    fontWeight: 'normal',
    lineHeight: 18,
  },
  appointmentVal: {
    color: '#5E6982',
    marginHorizontal: 6,
  },
  appointmentstatus: {
    color: globalColors.primaryTheme,
    marginHorizontal: 6,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
  upcomingText: {
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    lineHeight: 22,
    color: '#171717',
    marginLeft: 7,
  },
  container1: {
    margin: 20,
  },
  lineImage: {
    width: 2,
    height: 200,
    marginLeft: 12,
  },
  checkboxContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: 'column',
  },
  checkboxItem: {
    flexDirection: 'row',
    marginBottom: 10,

  },
  checkboxTouchable: {
    marginRight: 10,
  },
  checkboxImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  checkboxLabel: {
    fontFamily: FONTS.BOLD,
    fontSize: 14,
    lineHeight: 17,
    color: '#171717',
    marginLeft: 13,
  },
});
