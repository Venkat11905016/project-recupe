import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

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
      <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.text}>{item.referredBy}</Text>
        <Text numberOfLines={1} style={styles.text}>
          {item.tests}
        </Text>
      </View>
      <Text style={styles.date}>{item.date}</Text>
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
      <Text style={styles.header}>Reports</Text>
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
    backgroundColor: '#0097A7',
    padding: 20,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0097A7',
    padding: 20,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  date: {
    alignSelf: 'center',
    color: '#555',
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
});
