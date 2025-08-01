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
import Icon from 'react-native-vector-icons/Ionicons';

const AnalyticsPage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  // const [items, setItems] = useState([
  //   { label: 'By Test', value: 'test' },
  //   { label: 'By Patient', value: 'patient' },
  // ]);

  const doctorList = [
    { label: 'By Test', value: 'test' },
    { label: 'By Patient', value: 'patient' },
  ];
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
        <View style={styles.dropdownSearchWrapper}>
          <View style={styles.searchInputWrapper}>
            <TextInput
              placeholderTextColor="black"
              value={searchQuery}
              onChangeText={text => {
                setSearchQuery(text);
                setIsDropdownVisible(true);
              }}
              style={styles.searchInput}
            />

            <TouchableOpacity
              onPress={() => {
                if (isDropdownVisible) {
                  setIsDropdownVisible(false);
                  setSearchQuery('');
                } else {
                  setIsDropdownVisible(true);
                }
              }}
            >
              <FontAwesome6 name="chevron-down" size={15} color="#999" />
            </TouchableOpacity>
          </View>

          {isDropdownVisible && (
            <View style={styles.dropdownList}>
              {doctorList
                .filter(item =>
                  item.label.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map(item => (
                  <TouchableOpacity
                    key={item.value}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedDoctor(item.value);
                      setSearchQuery(item.label);
                      setIsDropdownVisible(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>

        {/* Start Date */}
        <Text style={styles.label}>Start Date</Text>
        <TouchableOpacity
          onPress={() => setShowStartPicker(true)}
          style={styles.dateInput}
        >
          <Text style={styles.dateText}>
            {startDate ? moment(startDate).format('DD-MM-YYYY') : 'DD-MM-YYYY'}
          </Text>
          <Icon name="calendar" size={20} color="#666" />
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
          <Icon name="calendar" size={20} color="#666" />
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
  },
  header: {
    backgroundColor: '#0097A7',
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: 20,
  },
  dropdownSearchWrapper: {
    marginBottom: 10,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingRight: 20,
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  dropdownList: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 5,
    padding: 10,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize: 16,
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
  headerTitle: {
    fontSize: 23,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  label: {
    fontSize: 19,
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
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 19,
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
