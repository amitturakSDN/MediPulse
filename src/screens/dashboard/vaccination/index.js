// screens/Documents.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import { notification, pdf, calendar, TimeCircle, heightOne, weightOne, heartOne, bmiOne, bpOne, pulseOne, injection } from '../../../assets/images'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderR5 from '../../../components/HeaderR5';
import { globalColors } from '@/theme';
import ViewCrv from '../../../components/ViewCrv';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CustomSearchBar from '../../../components/CustomSearchBar';
import * as AppActions from '@actions';
import moment from 'moment';

const vaccineData = [
  {
    id: 1,
    image: injection,
    name: 'Covid Vaccine',
    brand: 'Pfizer–BioNTech',
    date: '05-15-2023',
    batch: 'Batch no. 4121Z037',
  },
  {
    id: 2,
    image: injection,
    name: 'Tetanus Toxoid',
    brand: 'Pfizer–BioNTech',
    date: '05-15-2023',
    batch: 'Batch no. 54321547',
  },
  {
    id: 3,
    image: injection,
    name: 'Flu vaccine (influenza)',
    brand: 'Pfizer–BioNTech',
    date: '05-15-2023',
    batch: 'Batch no. 4121Z037',
  },
  {
    id: 5,
    image: injection,
    name: 'Hepatitis B vaccine',
    brand: 'Pfizer–BioNTech',
    date: '05-15-2023',
    batch: 'Batch no. 4121Z037',
  },
  {
    id: 6,
    image: injection,
    name: 'Hepatitis B vaccine',
    brand: 'Pfizer–BioNTech',
    date: '05-15-2023',
    batch: 'Batch no. 4121Z037',
  },
  // Add more objects for additional items
];
function Vaccination(props) {
  const params = props.route.params || {};
  const { personDetailsId, personId } = params;
  console.log(personDetailsId, personId, 'personId')
  const { navigation } = props;
  const [vaccinationData, setVaccinationData] = useState([]);
  const [searchResults, setSearchResults] = useState(vaccinationData);
  const [searchTerm, setSearchTerm] = useState('');


  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        AppActions.getDashboardData(navigation,(res) => {
          console.log(res?.data?.appointments, 'getDashboardData>>????')
          if (res?.code == 200) {
            setVaccinationData(res?.data?.vaccinations)
          }
        }),
      );
    }, []),
  );
  const searchVaccinations = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm.trim() === '') {
      setSearchResults(vaccinationData);
    } else {
      const filteredData = vaccinationData.filter((item) => {
        const name = item.vaccinationType.toLowerCase();
        return name.includes(searchTerm.toLowerCase());
      });
      setSearchResults(filteredData);
    }
  };
  const __headerComponent = () => {
    return (
      <>
        <HeaderR5
          title={"Vaccination"}
          isBack
          titlestyle={styles.title}
          leftIconStyle={{
            backgroundColor: globalColors.transparent,
            tintColor: globalColors.white
          }}
        />
      </>
    );
  }


  return (
    <View style={[styles.container]}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContainer}
          style={{
            margin: 0,
          }}>
          {/* top header */}
          {__headerComponent()}
          <ViewCrv>
            <View style={styles.searchView}>
            <CustomSearchBar onSearch={searchVaccinations} placeholder="Search Vaccine" />

            </View>
            <FlatList
            data={searchTerm.trim() === '' ? vaccinationData : searchResults}
             keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <>
                <View style={{ flexDirection: 'row', marginHorizontal: 20,marginBottom:12 }}>
                  <View style={{ justifyContent: 'center' }}>
                    <Image source={injection} style={styles.productImage} />
                  </View>
                  <View style={styles.verticaltextview}>
                    <Text style={styles.addressText}>{item?.vaccinationType}</Text>
                    <View style={styles.viewstyle}>
                      <Text style={styles.dateTxt}>{item?.manufacturer}</Text>
                    </View>
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <Text style={styles.dateTxt}>{moment(item?.createdAt).format('MMMM DD, YYYY')}</Text>
                    <Text style={styles.dateTxt}>{item?.lotNo}</Text>
                  </View>
               
                </View>
              <View style={styles.line}></View>

                </>
                
              )}
            />
          </ViewCrv>

        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
export default Vaccination;
