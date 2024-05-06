import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  Button,
  View,
  Text,
  Image,
  Pressable,
  Linking,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
// import Ionicons from 'react-native-vector-icons/Ionicons';
import TabNavigator from "./TabNavigator";
import {
  patient,
  close,
  editBtnD,
  Lock,
  logout,
  notificationD,
  dropdown,
  setting,
  selectCamera,
} from "../assets/images/index";
import * as AppActions from "@actions";
import { store } from "../store/configureStore";
import GLOBALS from "../constants";
const { FONTS, COLOR ,Strings} = GLOBALS;
import { globalColors } from "@/theme";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import stringsOfLanguage from '../constants/ScreenStrings'
import setLanguage from "../constants/setLanguage";
const Drawer = createDrawerNavigator();
// import Icon from 'react-native-vector-icons/FontAwesome';

function CustomDrawerContent(props) {
  const [lang,setLang]=useState()
  const  SetLanguage=async (lang)=>{
    console.log('langauya',lang);
     setLang(lang)
     setLanguage(lang)
    // stringsOfLanguage.setLanguage(lang)
    setIsSettingsOpen(!isSettingsOpen);
    setSelectedItem(null);
    navigation.closeDrawer()

  }

  const [data, setData] = useState([
    // { id: 1, title: 'DummyMenu', children: [] },
    {
      id: 2,
      // title: stringsOfLanguage.drawer.Language,
      title: stringsOfLanguage.drawer.Language,
      children: [
        { id: 21, title: 'English' },
        { id: 22, title: 'ジャパニーズ' },
      ],
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setSelectedItem(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)} style={{marginTop:5}}>
      <Text style={styles.subTabText}>{item.title}</Text>
    </TouchableOpacity>
  );
  const renderItemChild = ({ item }) => (
    <TouchableOpacity  onPress={()=>SetLanguage(item.title)} style={{marginTop:5,marginLeft:10}}>
      <Text style={[styles.subTabText,{marginTop:3}]} >{item.title}</Text>
    </TouchableOpacity>
  );

  const renderNestedList = () => {
    if (!selectedItem || selectedItem.children.length === 0) {
      return null;
    }

   
    return (
      <FlatList
        data={selectedItem.children}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItemChild}
      />
    );
  };


  const { navigation } = props;
  let { getState, dispatch } = store;
  const profileData = useSelector(
    (state) => state.authReducer?.profileData?.data
  );
  console.log(profileData, "profileData<<--->");
  logoutPress = () => {
    dispatch(AppActions.Logout(navigation));
  };
  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        AppActions.getProfile((res) => {
          // alert('hi')
          console.log(res, "res>>>>??>");
          // setEmail(res?.emailId);
          // setPhone(res?.phoneNumber);
          // setImage(res?.photoPath);
          // setAddess(res?.address);
          // setName(res?.firstName);
          // setlastName(res?.lastName);
        })
      );
    }, [])
  );
  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: "#FFFFFF",
        padding: 0,
        marginTop: 0,
      }}
    >
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View style={styles.mainView}>
          <Text style={styles.heading}>{stringsOfLanguage.MediPulse}</Text>
          <Pressable
            style={styles.crossIcon}
            onPress={() => navigation.closeDrawer()}
          >
            <Image source={close} />
          </Pressable>
        </View>

        {/* Profile Image */}
        <View style={styles.profileView}>
          {/* <Image
            source={patient}
            style={styles.productImage}
          /> */}
          {profileData?.profile?.profilePhoto ? (
            <Image
              style={styles.productImage}
              resizeMode="cover"
              // source={{
              //   uri:
              //     "https://www.google.com:9169/uploads/" +
              //     profileData?.profile?.profilePhoto,
              // }}
              source={{
                uri: profileData?.profile?.profilePhoto,
              }}

            />
          ) : (
            <Image
              source={selectCamera}
              style={styles.staticUser}
              resizeMode="cover"
            />
          )}
          {/* Information of user */}
          <View style={styles.verticaltextview}>
            <Text style={styles.addressText}>
              {profileData?.profile?.firstName} {profileData?.profile?.lastName}
            </Text>
            <View style={styles.viewstyle}>
              <Text style={styles.flatText}>{stringsOfLanguage.drawer.Patient}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <Image source={editBtnD} style={styles.editBtnD} />
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        {/* notifications view */}
        {/* <View style={styles.notificationView}>
          <View style={styles.notifications}>
            <Image
              source={notificationD}
              style={styles.notificationImg}
            />
          </View>
          <View style={styles.notificationTxt}>
            <Text style={styles.tabText}>{'John Doe'}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} >
            <Image source={notificationD}
              style={styles.switch} />
          </TouchableOpacity>
        </View> */}
      </View>
      <DrawerItem
        inactiveTintColor={"black"}
        activeBackgroundColor={"white"}
        activeTintColor={"black"}
        focused={true}
        label={({ focused, color }) => (
          <Text style={styles.tabText}>{stringsOfLanguage.drawer.Notifications}</Text>
        )}
        icon={({ focused, color, size }) => (
          <Image source={notificationD} style={styles.notificationImg} />
        )}
        onPress={() => navigation.navigate("Home")}
        style={{ padding: 0 }}
      />
      <View style={styles.line}></View>


      <DrawerItem
        inactiveTintColor={"black"}
        activeBackgroundColor={"white"}
        activeTintColor={"black"}
        focused={true}
        onPress={() => toggleSettings() }
        label={({ focused, color }) => (
          <View>
            <View style={styles.dropDownStyle} >
            <Text style={styles.tabText}> {stringsOfLanguage.drawer.Setting} </Text>
            <Image source={dropdown} style={styles.notificationImg} />
            </View>
          {isSettingsOpen && (
        <View style={{marginTop:10,marginLeft:10}}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          {renderNestedList()}
        </View>
      )}
          </View>
        )}
        icon={({ focused, color, size }) => (
          <Image source={setting} style={styles.notificationImg} />
        )}
        style={{ padding: 0 }}
      />
      <View style={styles.line}></View>



      <DrawerItem
        inactiveTintColor={"black"}
        activeBackgroundColor={"white"}
        activeTintColor={"black"}
        focused={true}
        label={({ focused, color }) => (
          <Text style={styles.tabText}>{stringsOfLanguage.drawer.ChangePassword}</Text>
        )}
        icon={({ focused, color, size }) => (
          <Image source={Lock} style={styles.notificationImg} />
        )}
        onPress={() =>
          navigation.reset({
            index: 1,
            routes: [
              {
                name: "AuthStack",
                state: {
                  routes: [
                    {
                      name: "ChangePassword",
                    },
                  ],
                },
              },
            ],
          })
        }
        style={{ padding: 0 }}
      />
      <View style={styles.line}></View>
      <DrawerItem
        inactiveTintColor={"black"}
        activeBackgroundColor={"white"}
        activeTintColor={"black"}
        focused={false}
        label={({ focused, color }) => (
          <Text style={styles.tabText}>{stringsOfLanguage.drawer.Logout}</Text>
        )}
        icon={({ focused, color, size }) => (
          <Image source={logout} style={styles.notificationImg} />
        )}
        onPress={() => logoutPress()}
        style={{ padding: 0 }}
      />
      <View style={styles.line}></View>
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "left",
        drawerStyle: { width: "85%" },
      }}
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
  },
  heading: {
    flex: 3,
    fontFamily: FONTS.BOLD,
    fontSize: 35,
    LineHeight: 47,
    color: "#171717",
    textAlign: "right",
  },
  crossIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  productImage: {
    width: 59,
    height: 59,
    alignSelf: "center",
    borderRadius: 50,
  },
  staticUser: {
    width: 59,
    height: 59,
    alignSelf: "center",
  },
  villaText: {
    color: globalColors.black,
    fontSize: 14,
  },

  verticaltextview: {
    flex: 1,
    marginHorizontal: 20,
  },

  addressText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 22,
    lineHeight: 27,
    color: "#171717",
    marginVertical: 3,
  },

  flatText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 16,
    lineHeight: 19,
    color: "#5E6982",
  },
  alarmImage: {
    height: 11.11,
    width: 11.11,
  },
  viewstyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 2,
  },
  dateTimeView: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#F4F4F4",
    // marginHorizontal:13,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonsView: {
    marginBottom: 10,
    marginTop: 5,
    marginHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
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
    alignItems: "center",
  },
  symptomsTxt: {
    color: globalColors.white,
    fontSize: 13,
    lineHeight: 16,
  },
  editBtnD: {
    height: 26,
    width: 24,
  },
  profileView: {
    flexDirection: "row",
    marginTop: 44,
    marginBottom: 30,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  // notification
  notificationView: {
    flexDirection: "row",
    marginTop: 40,
    paddingHorizontal: 1,
  },
  notifications: {
    flex: 1,
  },
  notificationImg: {},
  notificationTxt: {
    flex: 9,
  },
  switch: {
    flex: 1,
  },
  tabText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 18,
    lineHeight: 22,
    color: "#171717",
  },
  subTabText:{
    fontFamily: FONTS.MEDIUM,
    fontSize: 16,
    lineHeight: 22,
    color: "#171717",
  },
  dropDownStyle:{
    flexDirection:"row",
    alignItems:'center',
    justifyContent:"space-between"
  }
});
