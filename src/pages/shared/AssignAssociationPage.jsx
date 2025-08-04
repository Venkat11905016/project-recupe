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
      <StatusBar backgroundColor="#08979d" barStyle="light-content" />
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

          {recupID.length == 0 && (
            <>
              <Text style={styles.label}>Doctor *</Text>
              <View style={styles.dropdownSearchWrapper}>
                <View style={styles.searchInputWrapper}>
                  {isDropdownVisible && (
                    <FontAwesome6
                      name="magnifying-glass"
                      size={16}
                      color="#999"
                      style={{ marginLeft: 15, marginRight: -5 }}
                    />
                  )}
                  <TextInput
                    placeholder={isDropdownVisible ? 'Search' : 'Select Doctor'}
                    placeholderTextColor="black"
                    value={searchQuery}
                    onChangeText={text => {
                      setSearchQuery(text);
                      setIsDropdownVisible(true);
                    }}
                    onPress={() => {
                      if (isDropdownVisible) {
                        setIsDropdownVisible(false);
                        setSearchQuery('');
                      } else {
                        setIsDropdownVisible(true);
                      }
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
                    {isDropdownVisible ? (
                      <FontAwesome6 name={'xmark'} size={20} color="#999" />
                    ) : (
                      <FontAwesome6
                        name={'chevron-down'}
                        size={13}
                        color="#999"
                      />
                    )}
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
            </>
          )}

          {recupID.length == 0 && selectedDoctor.length == 0 && (
            <Text style={styles.orText}>OR</Text>
          )}

          {selectedDoctor.length == 0 && (
            <>
              <Text style={styles.label}>Recupe ID *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Recupe ID"
                value={recupID}
                onChangeText={setRecupID}
                placeholderTextColor="#aaa"
              />
            </>
          )}
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
    backgroundColor: '#08979d',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  titleWrapper: {
    backgroundColor: '#08979d',
    paddingTop: 10,
    paddingBottom: 20,
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
    marginTop: 15,
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
    paddingLeft: 15,
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
    backgroundColor: '#08979d',
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
