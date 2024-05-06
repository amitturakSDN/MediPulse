// screens/Home.js
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderR5 from '../../../components/HeaderR5';
import { notification } from '../../../assets/images';
import { globalColors } from '@/theme';
import ViewCrv from '../../../components/ViewCrv';
import { dropdown } from '../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import * as AppActions from '@actions';
import { TextField } from '../../../components';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { calendar } from '../../../assets/images';
import HospitalsModel from '../../../components/HospitalsModel';
import { Button } from '../../../components';
import DepartmentModel from '../../../components/DepartmentModel';
import moment from 'moment';

function BookAppointment(props) {
  const params = props.route.params || {};
  const { personDetailsId, personId, } = params;
  console.log(personDetailsId, personId, 'personId');

  const { navigation } = props;
 

  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.homeReducer?.dashboardData?.data);
  

  const [modalVisible, setModalVisible] = useState(false);
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [hospitalList, setHospitalList] = useState(null);
  const [departmentList, setDepartmentList] = useState(null);

  const [hospitalId, setHospitalId] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const [page, setpage] = useState(1);
  const today = moment().format('YYYY-MM-DD'); // Get today's date
  const minDate = today;
  const currentDate = new Date();
// Add 3 months to the current date
const maxDate = new Date(currentDate);
maxDate.setMonth(currentDate.getMonth() + 3);

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeDepartmentModal = () => {
    setDepartmentModalVisible(false);
  };

  const openCalendar = () => {
    setCalendarOpen(true);
  };

  const closeCalendar = () => {
    setCalendarOpen(false);
  };

 

  global.date = selectedDate;

  const handleHospitalSelect = (hospital, hospitalId) => {
    setHospitalId(hospitalId);
    global.clinic = hospital;
    console.log(hospital, hospitalId, 'hospital++++++');
    setSelectedHospital(hospital);
    setSelectedDepartment(null);
    setSelectedDate(null);
    setSelectedSection('department');
    dispatch(AppActions.getDepartmentList(hospitalId, (res) => {
      const filteredDepartments = res?.data?.filter((dept) => dept?.is_workflow == false);
      console.log(res.data, 'departmentres>>>>>');
      setDepartmentList(filteredDepartments);
    }));
  };

  const handleDepartmentSelect = (department, departmentId) => {
    setDepartmentId(departmentId);
    console.log(department, departmentId, 'department_____');
    setSelectedDepartment(department);
    setSelectedDate(null);
    setSelectedSection('date');
  };

  const openModal = () => {
    setModalVisible(true);
    setSelectedHospital(null);
  };

  const openDepartmentModal = () => {
    setDepartmentModalVisible(true);
    setSelectedDepartment(null);
    setSelectedDate(null);
    setSelectedSection(null);
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(AppActions.getHospitalList((res) => {
        console.log(res.data.rows, 'res>>>>>');
        setHospitalList(res?.data?.rows);
      }));
    }, [])
  );

  const __headerComponent = () => {
    return (
      <>
        <HeaderR5
          title={'Book New Appointment'}
          isBack
          titlestyle={styles.headerText}
          leftIconStyle={{
            backgroundColor: globalColors.transparent,
            tintColor: globalColors.white,
          }}
        />
      </>
    );
  };

  const searchDoctorPress = () => {
    dispatch(AppActions.searchDoctorList(hospitalId, departmentId, selectedDate, page, navigation));
  };

  const isButtonDisabled = !(selectedHospital && selectedDepartment && selectedDate);

  return (
    <View style={[styles.container]}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContainer}
          style={{
            margin: 0,
          }}
        >
          {/* top header */}
          {__headerComponent()}
          <ViewCrv>
            <View style={styles.selectHospitalView}>
              <Text style={styles.selectHospitalTxt}>Select Hospital</Text>
              <TouchableOpacity onPress={openModal} style={styles.selectDropdown}>
                <Text style={styles.selectText}>{selectedHospital ? selectedHospital : 'Select'}</Text>
                <View style={{ justifyContent: 'center' }}>
                  <Image source={dropdown} />
                </View>
              </TouchableOpacity>
              <HospitalsModel
                data={hospitalList}
                isVisible={modalVisible}
                onHospitalSelect={handleHospitalSelect}
                onClose={closeModal}
              />

              {selectedSection === 'department' && (
                <>
                  <View style={{ marginVertical: 5 }}></View>
                  <Text style={styles.selectHospitalTxt}>Select Department</Text>
                  <TouchableOpacity onPress={openDepartmentModal} style={styles.selectDropdown}>
                    <Text style={styles.selectText}>{selectedDepartment ? selectedDepartment : 'Select'}</Text>
                    <View style={{ justifyContent: 'center' }}>
                      <Image source={dropdown} />
                    </View>
                  </TouchableOpacity>
                </>
              )}

              {selectedHospital && selectedSection !== 'department' && (
                <>
                  <View style={{ marginVertical: 5 }}></View>
                  <Text style={styles.selectHospitalTxt}>Select Department</Text>
                  <TouchableOpacity onPress={openDepartmentModal} style={styles.selectDropdown}>
                    <Text style={styles.selectText}>{selectedDepartment ? selectedDepartment : 'Select'}</Text>
                    <View style={{ justifyContent: 'center' }}>
                      <Image source={dropdown} />
                    </View>
                  </TouchableOpacity>
                  <DepartmentModel
                    data={departmentList}
                    isVisible={departmentModalVisible}
                    onDepartmentSelect={handleDepartmentSelect}
                    onClose={closeDepartmentModal}
                  />

                  {selectedDepartment && (
                    <>
                      <View style={{ marginVertical: 5 }}></View>
                      <Text style={styles.selectHospitalTxt}>Select Booking Date</Text>
                      <TouchableOpacity onPress={openCalendar} style={styles.selectDropdown}>
                        <Text style={styles.selectText}>{selectedDate ? selectedDate : 'Select'}</Text>
                        <View style={{ justifyContent: 'center' }}>
                          <Image style={{ width: 18, height: 20 }} source={calendar} />
                        </View>
                      </TouchableOpacity>
                      {isCalendarOpen && (
                        <Calendar
                          minDate={minDate}
                          maxDate={maxDate}
                          onDayPress={(day) => {
                            setSelectedDate(day.dateString);
                            closeCalendar();
                          }}
                          markedDates={{
                            [selectedDate]: {
                              selected: true,
                              disableTouchEvent: true,
                              selectedDotColor: 'orange',
                            },
                          }}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </View>
            <View style={styles.buttonView}>
              <Button
                onPress={searchDoctorPress}
                style={[styles.button, { opacity: isButtonDisabled ? 0.5 : 1 }]}
                textStyle={styles.buttonText}
                title={'Search Doctor'}
                disabled={isButtonDisabled}
              />
            </View>
          </ViewCrv>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}

export default BookAppointment;
