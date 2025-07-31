import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const referralsData = [
  {
    id: '1',
    name: 'suresh',
    date: '29-07-2025',
    doctor: 'Pavankalyan',
    tests: 'Dengue test, Blood test',
  },
  {
    id: '2',
    name: 'Harsha',
    date: '05-07-2025',
    doctor: 'Pavankalyan',
    tests: 'Blood test, Sugar test',
  },
  {
    id: '3',
    name: 'Vinay',
    date: '12-06-2025',
    doctor: 'Pavankalyan',
    tests: 'Sugar test, Blood test',
  },
  {
    id: '4',
    name: 'Pavan',
    date: '06-06-2025',
    doctor: 'Pavankalyan',
    tests: 'Dengue test, Sugar test',
  },
];

export default function ReferralsPage() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ReferralInfo', { referral: item })}
    >
      <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{item.date}</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color="#0097A7"
          />
        </View>
      </View>
      <Text style={styles.doctor}>{item.doctor}</Text>
      <Text style={styles.tests} numberOfLines={1}>
        {item.tests}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome6 name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Referrals</Text>
      <TextInput placeholder="Search" style={styles.searchInput} />
      <FlatList
        data={referralsData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#0097A7',
    padding: 20,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // or 'flex-start' based on spacing preference
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0097A7',
    padding: 20,
  },
  searchInput: {
    margin: 15,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 20,
    fontFamily: 'Poppins-Regular',
  },
  list: { paddingHorizontal: 15 },
  card: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  date: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Medium',
  },
  doctor: {
    color: '#888',
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
  tests: {
    color: '#444',
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
  },
});
