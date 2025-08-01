import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ReportInfoPage = () => {
  const navigation = useNavigation();

  const patientName = 'Pavan';
  const mobileNumber = '6886828683';

  const reports = [
    { id: 1, testName: 'CBP', fileName: 'aditya-kumar-hal' },
    { id: 2, testName: 'MRI', fileName: 'screencapture-127' },
    { id: 3, testName: 'CBP', fileName: 'screencapture-127' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 2 }]}>{item.id}</Text>
      <Text style={[styles.cell, { flex: 4 }]}>{item.testName}</Text>
      <Text style={[styles.cell, { flex: 10 }]} numberOfLines={1}>
        {item.fileName}
      </Text>
      <TouchableOpacity style={[styles.iconButton, { flex: 2 }]}>
        <MaterialCommunityIcons name="eye" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {/* Fixed Header Section */}
      <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
      <View style={styles.iconHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Report Info</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Form */}
        <Text style={styles.label}>Patient Name</Text>
        <TextInput value={patientName} style={styles.input} editable={false} />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput value={mobileNumber} style={styles.input} editable={false} />

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>#</Text>
          <Text style={[styles.tableHeaderText, { flex: 3 }]}>Test Name</Text>
          <Text style={[styles.tableHeaderText, { flex: 9 }]}>File Name</Text>
          <Text style={[styles.tableHeaderText, { flex: 5 }]}>Action</Text>
        </View>

        {/* Report List */}
        <FlatList
          data={reports}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />
      </ScrollView>
    </>
  );
};

export default ReportInfoPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: '#0097A7',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 23,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  iconHeader: {
    backgroundColor: '#0097A7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
  },
  label: {
    fontSize: 18,
    marginTop: 12,
    marginBottom: 6,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 24,
  },
  tableHeaderText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 3,
    fontFamily: 'Poppins-Regular',
  },
  iconButton: {
    backgroundColor: '#0097A7',
    borderRadius: 5,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
});
