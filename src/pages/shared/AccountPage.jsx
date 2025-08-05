import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomAlert from '../../components/CustomAlert';

export default function AccountPage() {
  const [email, setEmail] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [center, setCenter] = useState('');
  const [city, setCity] = useState('');
  const [correl_id, setCorrelId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    canRedirect: false,
    message: '',
    redirectRoute: '',
  });

  const navigation = useNavigation();

  const showAlert = (message, canRedirect = false, redirectRoute = '') => {
    setAlertProps({ message, canRedirect, redirectRoute });
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    if (alertProps.canRedirect && alertProps.redirectRoute) {
      navigation.replace(alertProps.redirectRoute);
    }
  };

  const doctorList = [
    { label: 'Doctor', value: 'doctor' },
    { label: 'Diagnostic Centre', value: 'diagnostic_centre' },
  ];

  useEffect(() => {
    (async () => {
      try {
        const storedCorrel = await AsyncStorage.getItem('correl_id');
        if (storedCorrel) setCorrelId(storedCorrel);
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) setAuthToken(storedToken);
      } catch (e) {
        console.warn('Failed to read stored values', e);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    if (!selectedDoctor) {
      showAlert('Please select account type');
      return;
    }
    if (!center.trim()) {
      showAlert(
        selectedDoctor === 'Doctor'
          ? 'Please enter clinic name.'
          : 'Please enter center name.',
      );
      return;
    }
    if (!city.trim()) {
      showAlert('Please enter city.');
      return;
    }
    if (!correl_id) {
      showAlert('Missing correl_id. Please restart the flow.');
      return;
    }
    if (!authToken) {
      showAlert('Missing authentication token. Please complete prior step.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        account_type:
          selectedDoctor === 'Doctor' ? 'doctor' : 'diagnostic_centre',
        name: '',
        pic_name: '',
        clinic_name: selectedDoctor === 'Doctor' ? center : '',
        center_name: selectedDoctor !== 'Doctor' ? center : '',
        email: email.trim(),
        city: city.trim(),
        mobile: '',
        correl_id,
      };

      const res = await fetch('https://recupe.in/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': authToken,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('signup response:', data);
      if (data.status === 'S' || data.result_code === 0) {
        showAlert('Account updated', true, 'MainTabs');
      } else {
        const msg =
          data.message || data.result_info?.message || 'Failed to signup';
        showAlert(msg);
      }
    } catch (err) {
      console.error('signup error:', err);
      showAlert('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar backgroundColor="#08979d" barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.firstContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
          </View>
          <View style={styles.scrollWrapperOne}>
            <View style={styles.scrollingContainer}></View>
          </View>
          <View style={styles.secondContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.card}>
                <Text style={styles.label}>Let's Set Up Your Account</Text>

                <View style={styles.dropdownSearchWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsDropdownVisible(prev => !prev);
                      setSearchQuery('');
                    }}
                  >
                    <View style={styles.searchInputWrapper}>
                      <Text style={[styles.searchInput, { color: 'black' }]}>
                        {selectedDoctor || 'Tell Us Who You Are'}
                      </Text>
                      <FontAwesome6
                        name="chevron-down"
                        size={13}
                        color="#999"
                      />
                    </View>
                  </TouchableOpacity>

                  {isDropdownVisible && (
                    <View style={styles.dropdownList}>
                      {doctorList
                        .filter(item =>
                          item.label
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()),
                        )
                        .map(item => (
                          <TouchableOpacity
                            key={item.value}
                            style={styles.dropdownItem}
                            onPress={() => {
                              setSelectedDoctor(item.label);
                              setIsDropdownVisible(false);
                              setSearchQuery('');
                            }}
                          >
                            <Text style={styles.dropdownText}>
                              {item.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  )}
                </View>

                {selectedDoctor.length !== 0 && (
                  <>
                    <View style={styles.searchInputWrapper}>
                      <TextInput
                        placeholder={
                          selectedDoctor === 'Doctor'
                            ? 'Clinic Name'
                            : 'Center Name'
                        }
                        placeholderTextColor="black"
                        value={center}
                        onChangeText={setCenter}
                        style={styles.searchInput}
                      />
                    </View>

                    <View style={styles.searchInputWrapper}>
                      <TextInput
                        placeholder="City"
                        placeholderTextColor="black"
                        value={city}
                        onChangeText={setCity}
                        style={styles.searchInput}
                      />
                    </View>
                  </>
                )}

                <TouchableOpacity
                  style={styles.sendBtn}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.sendBtnText}>UPDATE</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

          <CustomAlert
            isVisible={alertVisible}
            message={alertProps.message}
            onClose={hideAlert}
            canRedirect={alertProps.canRedirect}
            redirectRoute={alertProps.redirectRoute}
            navigation={navigation}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#08979d' },
  firstContainer: { flex: 3, justifyContent: 'center', alignItems: 'center' },
  secondContainer: {
    flex: 7,
    backgroundColor: '#fff',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
  },
  scrollContent: { alignItems: 'center', paddingBottom: 40 },
  title: { fontSize: 35, color: '#fff', fontFamily: 'Poppins-Medium' },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 26,
    alignSelf: 'flex-start',
    marginTop: 32,
    marginBottom: 10,
    fontFamily: 'Poppins-Medium',
  },
  scrollWrapperOne: {
    height: 20,
    backgroundColor: '#08979d',
  },
  scrollingContainer: {
    height: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dropdownSearchWrapper: { width: '100%' },
  searchInputWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingRight: 20,
    paddingVertical: 4,
    marginVertical: 8,
  },
  searchInput: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    flex: 1,
  },
  dropdownList: {
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    marginTop: 5,
    padding: 10,
    paddingHorizontal: 20,
  },
  dropdownItem: { paddingVertical: 8 },
  dropdownText: { fontSize: 16, fontFamily: 'Poppins-Regular' },
  sendBtn: {
    backgroundColor: '#08979d',
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  sendBtnText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
});
