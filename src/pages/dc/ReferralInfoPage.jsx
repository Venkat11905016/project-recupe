import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ReferralInfoPage = () => {
  const navigation = useNavigation();

  const patientName = 'Vinay';
  const mobileNumber = '3333333333';
  const tests = ['Blood test', 'Dengue test', 'Sugar test'];
  const status = 'Partially Completed';

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header - OUTSIDE ScrollView */}
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
        <Text style={styles.headerTitle}>Referral Info</Text>
      </View>

      {/* Scrollable Form Section */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Patient Name</Text>
        <TextInput value={patientName} style={styles.input} editable={false} />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput value={mobileNumber} style={styles.input} editable={false} />

        <Text style={styles.label}>Tests</Text>
        <View style={styles.testContainer}>
          {tests.map(test => (
            <View key={test} style={styles.testChip}>
              <Text style={styles.testText}>{test}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.label}>Status</Text>
        <TextInput value={status} style={styles.input} editable={false} />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>BACK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => navigation.navigate('ReportInfo')}
          >
            <Text style={styles.uploadText}>UPLOAD REPORTS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReferralInfoPage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#0097A7',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  iconHeader: {
    backgroundColor: '#0097A7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    fontFamily: 'Poppins-Regular',
  },
  testContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  testChip: {
    backgroundColor: '#0097A7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 4,
  },
  testText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  backButton: {
    borderWidth: 1.5,
    borderColor: '#0097A7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
  },
  uploadButton: {
    backgroundColor: '#0097A7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    marginLeft: 10,
  },
  backText: {
    textAlign: 'center',
    color: '#0097A7',
    fontFamily: 'Poppins-Bold',
  },
  uploadText: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
});
