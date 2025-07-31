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
      <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome6 name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>More</Text>

        {items.map(item => (
          <TouchableOpacity
            key={item.label}
            style={styles.button}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={styles.label}>{item.label}</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color="#0097A7"
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
    backgroundColor: '#0097A7',
    padding: 20,
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 20,
    color: '#0097A7',
    fontFamily: 'Poppins-Bold',
  },
  button: {
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 16,
    color: '#222',
    fontFamily: 'Poppins-Medium',
  },
});
