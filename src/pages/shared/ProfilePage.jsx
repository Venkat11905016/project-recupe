import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ProfilePage = () => {
  const navigation = useNavigation();

  const user = {
    name: 'Ajay',
    centerName: 'Ajay diagnostic center',
    email: 'Ajaymeru02@gmail.com',
    mobile: '9999999999',
    recupeId: 'REC_DC_05271256',
    plan: 'Free Plan',
    validityEndDate: '03-09-2025',
    state: '--',
    city: 'Hyd',
    pincode: '--',
    address: '--',
    imageUrl: '../../assets/images/home-vector.60eaedb1083724ec6f59.png',
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Image
              source={{ uri: user.imageUrl }}
              style={styles.profileImage}
              resizeMode="contain"
            />
            <View style={{ flex: 1, marginLeft: 20 }}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.subText}>{user.centerName}</Text>
              <Text style={styles.subText}>{user.email}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('EditProfilePage')}
            >
              <Text style={styles.editText}>EDIT</Text>
              <MaterialCommunityIcons name="pencil" size={16} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.card, styles.cardTwo]}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
          <InfoItem label="Recupe ID" value={user.recupeId} />
          <InfoItem label="Center Name" value={user.centerName} />
          <InfoItem label="PIC Name" value={user.name} />
          <InfoItem label="Email" value={user.email} />
          <InfoItem label="Mobile" value={user.mobile} />
          <InfoItem label="Plan" value={user.plan} />
          <InfoItem label="Validity End Date" value={user.validityEndDate} />
        </View>

        <View style={[styles.card, styles.cardTwo]}>
          <Text style={styles.sectionTitle}>Additional Info</Text>
          <InfoItem label="State" value={user.state} />
          <InfoItem label="City" value={user.city} />
          <InfoItem label="Pincode" value={user.pincode} />
          <InfoItem label="Address" value={user.address} />
        </View>
      </ScrollView>
    </View>
  );
};

const InfoItem = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0097A7',
    // padding: 20,
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
  },
  header: {
    backgroundColor: '#0097A7',
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 23,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  card: {
    padding: 14,
    borderRadius: 12,
    // borderColor: 'grey',
    // borderWidth: 3,
    marginBottom: 16,
  },
  cardTwo: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 3,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 2,
  },
  subText: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  editButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 3,
    paddingHorizontal: 10,
    borderRadius: 28,
    right: 0,
    top: 0,
  },
  editText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    marginRight: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  infoRow: {
    marginBottom: 5,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#555',
  },
  value: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
});
