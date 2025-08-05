import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import DcHome from '../pages/dc/DcHome';
import LabReportsPage from '../pages/dc/LabReports';
import ReferralsPage from '../pages/dc/ReferralsPage';
import MorePage from '../pages/dc/More';
import CreateReferral from '../pages/doctor/CreateReferral';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.customButtonContainer}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.customButton}>{children}</View>
  </TouchableOpacity>
);

export default function TabNavigator() {
  const [userRole, setUserRole] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    // Fetch from AsyncStorage or API
    setUserRole('dc');
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#08979d',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: 'Poppins-Regular',
          paddingTop: 5,
          paddingBottom: 1,
        },
        tabBarStyle: {
          // position: 'absolute',
          height: 70,
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
          elevation: 5,
          backgroundColor: '#fff',
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return (
              <Entypo
                name="home"
                size={size}
                color={color}
                style={styles.icon}
              />
            );
          } else if (route.name === 'Referrals') {
            return (
              <FontAwesome6
                name="person-rays"
                size={size}
                color={color}
                style={styles.icon}
              />
            );
          } else if (route.name === 'Lab Reports') {
            return (
              <FontAwesome6
                name="file-waveform"
                size={size}
                color={color}
                style={styles.icon}
              />
            );
          } else if (route.name === 'More') {
            return (
              <Entypo
                name="dots-three-horizontal"
                size={size}
                color={color}
                style={styles.icon}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={DcHome} />
      <Tab.Screen name="Referrals" component={ReferralsPage} />
      {userRole === 'docor' && (
        <Tab.Screen
          name="CreateRefferal"
          component={CreateReferral}
          options={{
            tabBarButton: props => (
              <CustomTabBarButton
                {...props}
                onPress={() => {
                  navigation.navigate('CreateRefferal');
                }}
              >
                <FontAwesome6 name="plus" size={24} color="#fff" />
              </CustomTabBarButton>
            ),
          }}
        />
      )}
      <Tab.Screen name="Lab Reports" component={LabReportsPage} />
      <Tab.Screen name="More" component={MorePage} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingTop: 4,
  },
  customButtonContainer: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#08979d',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
