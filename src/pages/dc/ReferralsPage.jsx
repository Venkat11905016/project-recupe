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
import Icon from 'react-native-vector-icons/Ionicons';

const referralsData = [
  {
    id: '1',
    name: 'Suresh',
    date: '29-07-2025',
    doctor: 'Pavankalyan',
    tests: 'Dengue test, Blood test,',
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
      <View style={styles.newRow}>
        <Text style={styles.doctor}>{item.doctor}</Text>
        {/* <Text style={styles.tests} numberOfLines={1}>
          {item.tests}
        </Text> */}
        <Text style={styles.tests} numberOfLines={1} ellipsizeMode="tail">
          {item.tests}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
      <Text style={styles.header}>Referrals</Text>
      {/* <TextInput
        placeholder="Search"
        placeholderTextColor="black"
        style={styles.searchInput}
      /> */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <Icon name="search" size={24} color="black" style={styles.searchIcon} />
      </View>
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
    fontSize: 23,
    paddingTop: 10,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0097A7',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // or 'flex-start' based on spacing preference
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 30,
    height: 60,
    margin: 18,
    paddingHorizontal: 10,
    paddingLeft: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },

  searchIcon: {
    marginLeft: 10,
  },
  // searchInput: {
  //   margin: 15,
  //   padding: 10,
  //   height: 60,
  //   borderColor: '#ccc',
  //   paddingLeft: 20,
  // },
  list: { paddingHorizontal: 15 },
  card: {
    borderWidth: 3,
    borderColor: '#dfdfdfff',
    borderRadius: 4,
    padding: 15,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  date: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  doctor: {
    color: 'grey',
    marginTop: 5,
    fontSize: 17,
    // maxWidth: 200,
    fontFamily: 'Poppins-Regular',
  },
  tests: {
    color: 'grey',
    marginTop: 2,
    fontSize: 17,
    // maxWidth: 200,
    fontFamily: 'Poppins-Regular',
  },
});
