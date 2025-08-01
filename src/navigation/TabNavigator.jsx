import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import DcHome from '../pages/dc/DcHome';
import LabReportsPage from '../pages/dc/LabReports';
import ReferralsPage from '../pages/dc/ReferralsPage';
import MorePage from '../pages/dc/More';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return (
              <Entypo
                name="home"
                size={size}
                color={color}
                style={{ paddingTop: 4 }}
              />
            );
          } else if (route.name === 'Referrals') {
            return (
              <FontAwesome6
                name="person-rays"
                size={size}
                color={color}
                style={{ paddingTop: 4 }}
              />
            );
          } else if (route.name === 'Lab Reports') {
            return (
              <FontAwesome6
                name="file-waveform"
                size={size}
                color={color}
                style={{ paddingTop: 4 }}
              />
            );
          } else if (route.name === 'More') {
            return (
              <Entypo
                name="dots-three-horizontal"
                size={size}
                color={color}
                style={{ paddingTop: 4 }}
              />
            );
          }
        },
        tabBarActiveTintColor: '#0097A7',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: 'Poppins-Regular',
          paddingTop: 5,
          paddingBottom: 1,
        },
        tabBarStyle: {
          paddingVertical: 1,
          height: 70,
        },
      })}
    >
      <Tab.Screen name="Home" component={DcHome} />
      <Tab.Screen name="Referrals" component={ReferralsPage} />
      <Tab.Screen name="Lab Reports" component={LabReportsPage} />
      <Tab.Screen name="More" component={MorePage} />
    </Tab.Navigator>
  );
}
