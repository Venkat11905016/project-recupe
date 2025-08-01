import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';

const AssignAssociationPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [recupID, setRecupID] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const navigation = useNavigation();

  const doctorList = [
    { label: 'Raven', value: 'raven' },
    { label: 'John', value: 'john' },
    { label: 'Goutham', value: 'goutham' },
    { label: 'venkat', value: 'venkat' },
    { label: 'Mukund', value: 'mukund' },
  ];

  const handleSubmit = () => {
    if (!selectedDoctor && !recupID) {
      Alert.alert(
        'Validation Error',
        'Please select a doctor or enter a Recupé ID',
      );
      return;
    }

    Alert.alert('Success', 'Association Submitted');
    setSelectedDoctor('');
    setSearchQuery('');
    setRecupID('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}
        >
          <FontAwesome6 name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.headerRight}
        >
          <Entypo name="home" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleWrapper}>
        <Text style={styles.headerTitle}>Assign Association</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Doctor Dropdown */}
          <Text style={styles.label}>Doctor *</Text>
          <View style={styles.dropdownSearchWrapper}>
            <View style={styles.searchInputWrapper}>
              <FontAwesome6
                name="magnifying-glass"
                size={16}
                color="#999"
                style={{ opacity: isDropdownVisible ? 1 : 0, marginRight: 6 }}
              />
              <TextInput
                placeholder={isDropdownVisible ? 'Search' : 'Select Doctor'}
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
                <FontAwesome6
                  name={isDropdownVisible ? 'xmark' : 'chevron-down'}
                  size={15}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

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

          {/* OR Section */}
          <Text style={styles.orText}>OR</Text>

          {/* Recupe ID Input */}
          <Text style={styles.label}>Recupe ID *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Recupe ID"
            value={recupID}
            onChangeText={setRecupID}
            placeholderTextColor="#aaa"
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AssignAssociationPage;

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#0097A7',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  titleWrapper: {
    backgroundColor: '#0097A7',
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: 10,
  },
  headerLeft: {
    position: 'absolute',
    left: 16,
    top: 14,
  },
  headerRight: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  headerTitle: {
    fontSize: 23,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  container: {
    padding: 20,
    flexGrow: 1,
  },
  label: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 8,
    // padding: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
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
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  dropdownList: {
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
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
  orText: {
    textAlign: 'center',
    // marginVertical: 10,
    marginTop: 15,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    margin: 10,
    backgroundColor: '#0097A7',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
