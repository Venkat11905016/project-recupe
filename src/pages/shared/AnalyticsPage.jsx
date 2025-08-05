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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import CustomAlert from '../../components/CustomAlert';
import { requestOptions, redirectLogin } from '../../../token';
const AnalyticsPage = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

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

  // Alert state
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

  const onSubmit = async () => {
    if (!dcId || !startDate || !endDate || !selectedType) {
      setAlertProps({ canRedirect: false, message: 'Please fill all fields' });
      return showAlert();
    }

    const start = moment(startDate).format('YYYY-MM-DD');
    const end = moment(endDate).format('YYYY-MM-DD');

    let url = '';
    if (selectedType === 'referrals') {
      url = `https://recupe.in/api/getReferralsByDcByRange/${dcId}/${start}/${end}`;
    } else if (selectedType === 'lab_reports') {
      url = `https://recupe.in/api/getReportsByDcByRange/${dcId}/${start}/${end}`;
    } else {
      setAlertProps({ canRedirect: false, message: 'Invalid type selected' });
      return showAlert();
    }

    try {
      setLoading(true);
      const headers = await requestOptions();
      const response = await fetch(url, headers);
      const data = await response.json();

      if (data.status === 'S' && data.result_code === 0) {
        setResults(data.result_info || []);
      } else if (data.status === 'F' && data.result_code === 505) {
        redirectLogin(navigation);
      } else {
        setAlertProps({
          canRedirect: false,
          message: data.message || 'Something went wrong',
        });
        showAlert();
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setAlertProps({
        canRedirect: false,
        message: 'Something went wrong!',
      });
      showAlert();
    } finally {
      setLoading(false);
    }
  };

  // const onSubmit = () => {
  //   console.log({
  //     type: selectedType,
  //     startDate,
  //     endDate,
  //   });
  // };

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
            <TextInput
              placeholderTextColor="black"
              value={searchQuery}
              editable={false} // prevents keyboard and allows full touch area
              style={styles.searchInput}
            />
            <FontAwesome6 name="chevron-down" size={15} color="#999" />
          </TouchableOpacity>

          {isDropdownVisible && (
            <View style={styles.dropdownList}>
              {typeList
                .filter(item =>
                  item.label.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map(item => (
                  <TouchableOpacity
                    key={item.value}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedType(item.value);
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
});
