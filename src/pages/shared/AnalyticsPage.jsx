import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const AnalyticsPage = () => {
  const navigation = useNavigation();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [items, setItems] = useState([
    { label: 'By Test', value: 'test' },
    { label: 'By Patient', value: 'patient' },
  ]);

  const onSubmit = () => {
    console.log({
      type: selectedType,
      startDate,
      endDate,
    });
    // Handle logic here
  };

  return (
    <>
      <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{ opacity: 0 }}
          disabled={true}
        >
          <Entypo name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics</Text>
      </View>

      <View style={styles.container}>
        {/* Dropdown */}
        <Text style={styles.label}>Select Type</Text>
        <DropDownPicker
          open={openDropdown}
          value={selectedType}
          items={items}
          setOpen={setOpenDropdown}
          setValue={setSelectedType}
          setItems={setItems}
          placeholder="Select an option"
          style={styles.dropdown}
          dropDownContainerStyle={{ borderColor: '#ccc' }}
          textStyle={{ fontFamily: 'Poppins-Regular' }}
        />

        {/* Start Date */}
        <Text style={styles.label}>Start Date</Text>
        <TouchableOpacity
          onPress={() => setShowStartPicker(true)}
          style={styles.dateInput}
        >
          <Text style={styles.dateText}>
            {startDate ? moment(startDate).format('DD-MM-YYYY') : 'DD-MM-YYYY'}
          </Text>
          <MaterialCommunityIcons name="calendar" size={20} color="#666" />
        </TouchableOpacity>

        {showStartPicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={(e, selected) => {
              setShowStartPicker(Platform.OS === 'ios');
              if (selected) setStartDate(selected);
            }}
          />
        )}

        {/* End Date */}
        <Text style={styles.label}>End Date</Text>
        <TouchableOpacity
          onPress={() => setShowEndPicker(true)}
          style={styles.dateInput}
        >
          <Text style={styles.dateText}>
            {endDate ? moment(endDate).format('DD-MM-YYYY') : 'DD-MM-YYYY'}
          </Text>
          <MaterialCommunityIcons name="calendar" size={20} color="#666" />
        </TouchableOpacity>

        {showEndPicker && (
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            display="default"
            onChange={(e, selected) => {
              setShowEndPicker(Platform.OS === 'ios');
              if (selected) setEndDate(selected);
            }}
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AnalyticsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0097A7',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0097A7',
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
    fontFamily: 'Poppins-SemiBold',
  },
  dropdown: {
    borderColor: '#ccc',
    marginBottom: 10,
  },
  dateInput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  submitButton: {
    backgroundColor: '#0097A7',
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
