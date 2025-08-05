import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const MorePage = () => {
  const navigation = useNavigation();

  const items = [
    { label: 'Analytics', screen: 'AnalyticsPage' },
    { label: 'Profile', screen: 'ProfilePage' },
    { label: 'Invitations', screen: 'SentInvitePage' },
    { label: 'Associations', screen: 'AssignAssociationPage' },
    { label: 'Reset Password', screen: 'ResetPasswordPage' },
    { label: 'Logout', screen: 'Login' }, // or use your logout logic
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#08979d" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome6 name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>More</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {items.map(item => (
          <TouchableOpacity
            key={item.label}
            style={styles.button}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={styles.label}>{item.label}</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={35}
              color="#08979d"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MorePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#08979d',
    // padding: 20,
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
  },
  header: {
    fontSize: 23,
    textAlign: 'center',
    backgroundColor: '#08979d',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    paddingTop: 10,
    paddingBottom: 20,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
});
