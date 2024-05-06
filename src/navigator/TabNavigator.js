import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, View, Text, Image, Pressable, Linking, Platform, Dimensions } from 'react-native';
import Home from '../screens/dashboard/home';
import Chat from '../screens/dashboard/chat';
import { lock, home, appointments, docs, visits, Profile,activeHome,profileActive,availabilityActive,visitsActive,docsActive } from '../assets/images';
import { globalColors } from '@/theme';
import Visits from '../screens/dashboard/visits';
import Appointments from '../screens/dashboard/appointments';
import Documents from '../screens/dashboard/documents';
import Profilee from '../screens/dashboard/profile';
import Strings from '../constants/string';
import stringsOfLanguage from '../constants/ScreenStrings'    

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const CustomTabBarButton = ({ children, onPress, isFocused, label }) => {
  const focusedLabelWidth = width * 0.2; // Adjust the width percentage according to your preference

  return (
    <Pressable
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginLeft: isFocused ? 0 : 20
      }}
      onPress={onPress}
    >
      {children}
      {isFocused && (
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            marginLeft: 25,
            flex: 1,
            maxWidth: focusedLabelWidth, // Set the maximum width for the focused label
          }}
          numberOfLines={1} // Truncate the text if it exceeds the width
          ellipsizeMode="tail" // Add ellipsis at the end if the text is truncated
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          flexDirection: 'row',
          backgroundColor: 'red',
          justifyContent: 'space-around',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 0,
          height: 75,
          padding: 10,
          backgroundColor: '#FFFFFF'
        },
        tabBarLabelStyle: {
          fontSize: 16,
          marginBottom: Platform.OS == 'android' ? 10 : -10,
        },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let customStyle = {};
          if (route.name === 'Home') {
            iconName = focused ? activeHome : home;
            customStyle = { marginRight: 5 };
          } else if (route.name === 'Visits') {
            iconName = focused ? visitsActive : visits;
            customStyle = { marginRight: 5 };
          } else if (route.name === 'Appointments') {
            iconName = focused ? availabilityActive : appointments;
            customStyle = { marginRight: 5 };
          } else if (route.name === 'Documents') {
            iconName = focused ? docsActive : docs;
            customStyle = { marginRight: 5 };
          } else if (route.name === 'Profile') {
            iconName = focused ? profileActive : Profile;
            customStyle = { marginRight: 5 };
          }
          return <Image source={iconName} resizeMode="contain" style={customStyle} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'yellow',
      })}
      tabBar={({ state, descriptors, navigation }) => (
        <View style={{ flexDirection: 'row', height: 75, backgroundColor:'#FFFFFF',elevation: 13,
        shadowColor: 'rgba(0, 0, 0, 0.1)',paddingHorizontal:20,
        shadowOffset: {
          width: 0,
          height: -5,
        },
        shadowRadius: 13, }}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            if (label === 'Home') {
              return (
                <CustomTabBarButton key={route.key} onPress={onPress} isFocused={isFocused} label={label}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: isFocused ? globalColors.primaryTheme : 'transparent',
                      paddingHorizontal: 10,
                      paddingVertical: 11,
                      borderRadius: 50,
                      marginLeft: isFocused ? 30 : 0 ,
                      width:isFocused ? 100 : 80
                    }}
                  >
                    {options.tabBarIcon({ focused: isFocused, color: 'white', size: 20 })}
                    {isFocused && (
                      <Text style={{ fontSize: 16, color: 'white', marginLeft: 5 }}>{label}</Text>
                    )}
                  </View>
                </CustomTabBarButton>
              );
            }

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                style={{  justifyContent: 'center', alignItems: 'center'}}
              >
                
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: isFocused ? globalColors.primaryTheme : 'transparent',
                    paddingHorizontal: isFocused ? 15 : 0,
                    marginHorizontal:isFocused ? 6 : 13,
                    // marginRight:isFocused ? 10 : 0, 
                    paddingVertical: 11,
                    borderRadius: 50,
                  }}
                >
                  {options.tabBarIcon({ focused: isFocused, color: 'white', size: 20 })}
                  {isFocused && (
                    <Text style={{ fontSize: 16, color: 'white', marginLeft: 5 }}>{label}</Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
    >
      <Tab.Screen name="Home" component={Home} options={{tabBarLabel:stringsOfLanguage.tabNavigater.Home}}/>
      <Tab.Screen name="Appointments" component={Appointments} options={{tabBarLabel:stringsOfLanguage.tabNavigater.Appointments}}/>
      <Tab.Screen name="Documents" component={Documents} options={{tabBarLabel:stringsOfLanguage.tabNavigater.Documents}}/>
      <Tab.Screen name="Visits" component={Visits} options={{tabBarLabel:stringsOfLanguage.tabNavigater.Visits}}/>
      <Tab.Screen name="Profile" component={Profilee} options={{tabBarLabel:stringsOfLanguage.tabNavigater.Profile}}/>
      {/* <Tab.Screen name={stringsOfLanguage.tabNavigater.Home} component={Home} />
      <Tab.Screen name={stringsOfLanguage.tabNavigater.Appointments} component={Appointments} />
      <Tab.Screen name={stringsOfLanguage.tabNavigater.Documents} component={Documents} />
      <Tab.Screen name={stringsOfLanguage.tabNavigater.Visits} component={Visits} />
      <Tab.Screen name={stringsOfLanguage.tabNavigater.Profile} component={Profilee} /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
