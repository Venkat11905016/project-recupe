import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import CustomAlert from '../../components/CustomAlert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { requestOptions, redirectLogin } from '../../../token';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AnalyticsPage = () => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const [reportsData, setReportsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = reportsData.filter(
      item =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.date.toLowerCase().includes(text.toLowerCase()) ||
        item.referredBy.toLowerCase().includes(text.toLowerCase()) ||
        item.tests.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [dcId, setDcId] = useState(null);
  const [results, setResults] = useState([]);
  const typeList = [
    { label: 'Referrals', value: 'referrals' },
    { label: 'Lab Reports', value: 'lab_reports' },
  ];
  const [loading, setLoading] = useState(false);
  // const renderItem = ({ item }) => (
  //   <TouchableOpacity style={styles.card}>
  //     <View style={styles.row}>
  //       <Text style={styles.name}>{item.name}</Text>
  //       <View style={styles.dateContainer}>
  //         <Text style={styles.date}>{item.date}</Text>
  //         <MaterialCommunityIcons
  //           name="chevron-right"
  //           size={28}
  //           color="#08979d"
  //         />
  //       </View>
  //     </View>
  //     <View style={styles.newRow}>
  //       <Text style={styles.doctor}>{item.referredBy}</Text>
  //       <Text style={styles.tests} numberOfLines={1}>
  //         {item.tests}
  //       </Text>
  //     </View>
  //   </TouchableOpacity>
  // );
  // Alert state
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('ReportInfo', { report: item.fullData })
      }
    >
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{item.date}</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={33}
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
    </TouchableOpacity>
  );

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    canRedirect: false,
    message: '',
  });

  const showAlert = () => setAlertVisible(true);
  const hideAlert = () => setAlertVisible(false);

  useEffect(() => {
    const fetchDcId = async () => {
      const userInfo = JSON.parse(
        (await AsyncStorage.getItem('userData')) || '{}',
      );
      const storedId = await AsyncStorage.getItem('dc_id');
      setDcId(storedId || userInfo.dc_id || null);
    };
    fetchDcId();
  }, []);

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  const formatDate = date => date.toISOString().split('T')[0];
  const onSubmit = async () => {
    if (!startDate || !endDate || !selectedType) {
      setAlertProps({
        canRedirect: false,
        message: 'Please fill all fields',
      });
      showAlert();
      return;
    }

    try {
      setLoading(true);
      let finalDcId = dcId;

      // If not available in state, fetch from storage
      if (!finalDcId) {
        const storedId = await AsyncStorage.getItem('dc_id');
        finalDcId = storedId;
      }

      // Still not available? Show error
      if (!finalDcId) {
        setAlertProps({
          canRedirect: false,
          message: 'DC ID not found. Please re-login.',
        });
        showAlert();
        return;
      }

      const headers = await requestOptions();
      const start = formatDate(startDate);
      const end = formatDate(endDate);

      let url = '';
      if (selectedType === 'referrals') {
        url = `https://recupe.in/api/getReferralsByDcByRange/${finalDcId}/${start}/${end}`;
      } else {
        url = `https://recupe.in/api/getReportsByDcByRange/${finalDcId}/${start}/${end}`;
      }

      console.log('Calling API with URL:', url);

      const response = await fetch(url, headers);
      const json = await response.json();
      console.log('Analytics Response:', json);

      if (json.status === 'S' && json.result_code === 0) {
        const mapped = json.result_info.map((item, index) => ({
          id: index.toString(),
          name: item.patient_name,
          date: item.created_date,
          referredBy: item.doctor_name,
          tests: item.tests || '',
        }));
        setData(mapped);
      } else if (json.status === 'F' && json.result_code === 505) {
        redirectLogin(navigation);
      } else {
        setAlertProps({
          canRedirect: false,
          message: json.message || 'Failed to fetch data',
        });
        showAlert();
        setData([]);
      }
    } catch (error) {
      console.error('Analytics fetch error:', error);
      setAlertProps({ canRedirect: false, message: 'Something went wrong' });
      showAlert();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#08979d" barStyle="light-content" />
      <CustomAlert
        isVisible={alertVisible}
        onClose={hideAlert}
        message={alertProps.message}
        canRedirect={alertProps.canRedirect}
        navigation={navigation}
        redirectRoute="Login"
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={28} color="#fff" />
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
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.searchInputWrapper}
            onPress={() => {
              setIsDropdownVisible(!isDropdownVisible);
            }}
          >
            <Text style={styles.searchInput}>
              {selectedType
                ? typeList.find(item => item.value === selectedType)?.label
                : 'Select Type'}
            </Text>
            <FontAwesome6 name="chevron-down" size={15} color="#999" />
          </TouchableOpacity>

          {isDropdownVisible && (
            <View style={styles.dropdownList}>
              {typeList.map(item => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedType(item.value);
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

        {/* Submit */}
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <Icon
            name="search"
            size={24}
            color="black"
            style={styles.searchIcon}
          />
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#08979d"
            style={{ marginTop: 20 }}
          />
        ) : data.length === 0 ? (
          <TouchableOpacity style={styles.cardNew}>
            <View style={styles.row}>
              <Text style={styles.name}>No Reports found</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 10 }}
          />
        )}

        {/* {loading ? (
          <ActivityIndicator
            size="large"
            color="#08979d"
            style={{ marginTop: 20 }}
          />
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 10 }}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', marginTop: 20 }}>
                No data found
              </Text>
            }
          />
        )} */}

        {/* content ends */}
      </View>

      {/* Date Pickers */}
      <DateModal
        visible={showStartPicker}
        date={startDate}
        setDate={setStartDate}
        onClose={() => setShowStartPicker(false)}
      />

      <DateModal
        visible={showEndPicker}
        date={endDate}
        setDate={setEndDate}
        onClose={() => setShowEndPicker(false)}
      />
    </>
  );
};

const DateModal = ({ visible, onClose, date, setDate }) => {
  const [tempDate, setTempDate] = useState(date || new Date());

  useEffect(() => {
    if (visible) setTempDate(date || new Date());
  }, [visible, date]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select date</Text>
          <View style={{ transform: [{ scale: 1.2 }], marginTop: 20 }}>
            <DatePicker
              // date={tempDate}
              date={tempDate || new Date()}
              mode="date"
              onDateChange={setTempDate}
              textColor="#000"
              maximumDate={new Date()}
              fadeToColor="none"
              androidVariant="iosClone"
            />
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelBtn}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDate(tempDate);
                onClose();
              }}
            >
              <Text style={styles.confirmBtn}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default AnalyticsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: '#08979d',
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#08979d',
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
    marginTop: 10,
    marginBottom: 6,
    fontFamily: 'Poppins-SemiBold',
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
    height: 60,
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
    paddingHorizontal: 20,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  dateInput: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 19,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  submitButton: {
    backgroundColor: '#08979d',
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 22,
    alignItems: 'center',
  },
  modalTitle: {
    textAlign: 'left',
    width: '100%',
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 16,
  },
  cancelBtn: {
    fontSize: 18,
    color: '#08979d',
    marginRight: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  confirmBtn: {
    fontSize: 18,
    color: '#08979d',
    marginLeft: 25,
    fontFamily: 'Poppins-SemiBold',
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
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
    marginRight: 3,
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
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 5,
  },
  cardNew: {
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 15,
    paddingHorizontal: 18,
    paddingVertical: 10,
    margin: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 30,
    height: 60,
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
