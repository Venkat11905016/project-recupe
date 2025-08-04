import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
const reportsData = [
  {
    id: '1',
    name: 'Harsha',
    date: '05-07-2025',
    referredBy: 'Pavankalyan',
    tests: 'Blood test, Sugar',
  },
  {
    id: '2',
    name: 'Pavan',
    date: '12-06-2025',
    referredBy: 'Pavankalyan',
    tests: 'Dengue test, Sugar',
  },
  {
    id: '3',
    name: 'Kalyan',
    date: '06-06-2025',
    referredBy: 'Pavankalyan',
    tests: 'Sugar test',
  },
];

const LabReportsPage = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ReportInfo', { report: item })}
    >
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{item.date}</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={29}
            color="#08979d"
          />
        </View>
      </View>
      <View style={styles.newRow}>
        <Text style={styles.doctor}>{item.referredBy}</Text>
        <Text style={styles.tests} numberOfLines={1}>
          {item.tests}
        </Text>
      </View>
      {/* 
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.text}>{item.referredBy}</Text>
        <Text numberOfLines={1} style={styles.text}>
          {item.tests}
        </Text>
      </View>
      <Text style={styles.date}>{item.date}</Text> */}
    </TouchableOpacity>
  );

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
      <Text style={styles.header}>Reports</Text>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <Icon name="search" size={24} color="black" style={styles.searchIcon} />
      </View>
      <FlatList
        data={reportsData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default LabReportsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#08979d',
    fontSize: 23,
    paddingTop: 10,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  // card: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   backgroundColor: '#f2f2f2',
  //   padding: 15,
  //   borderRadius: 10,
  //   marginBottom: 10,
  // },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#08979d',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  // date: {
  //   alignSelf: 'center',
  //   color: '#555',
  //   fontSize: 13,
  //   fontFamily: 'Poppins-Medium',
  // },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // or 'flex-start' based on spacing preference
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
    fontFamily: 'Poppins-Regular',
  },
  tests: {
    color: 'grey',
    marginTop: 2,
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
  card: {
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 30,
    height: 60,
    // margin: 18,
    // marginVertical: 18,
    marginTop: 20,
    marginBottom: 8,
    marginHorizontal: 12,
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
    marginRight: 15,
  },
});
