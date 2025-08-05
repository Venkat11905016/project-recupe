import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const testsList = [
  'CBP',
  'MRI',
  'Blood Test',
  'Urine Test',
  'X-Ray',
  'CT Scan',
];

const CreateReferral = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTests, setSelectedTests] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(true); // change to false if you want to hide initially

  const toggleTestSelection = test => {
    if (selectedTests.includes(test)) {
      setSelectedTests(selectedTests.filter(item => item !== test));
    } else {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const filteredTests = testsList.filter(test =>
    test.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Patient Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter patient name"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Mobile Number *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        keyboardType="phone-pad"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Diagnostic Center *</Text>
      <TouchableOpacity style={styles.dropdownDisabled}>
        <Text style={styles.dropdownText}>Select Center</Text>
        <Icon name="chevron-down" size={20} color="#999" />
      </TouchableOpacity>

      <Text style={styles.label}>Tests *</Text>
      <View style={styles.dropdownSearchWrapper}>
        <View style={styles.searchInputWrapper}>
          <TextInput
            placeholder="Search Tests"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Icon name="close" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {dropdownVisible && (
          <View style={styles.dropdownList}>
            <FlatList
              data={filteredTests}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => toggleTestSelection(item)}
                >
                  <View style={styles.checkbox}>
                    {selectedTests.includes(item) && (
                      <View style={styles.checked} />
                    )}
                  </View>
                  <Text style={styles.dropdownText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Selected Tests Display */}
        {selectedTests.length > 0 && (
          <View style={styles.selectedContainer}>
            {selectedTests.map((test, index) => (
              <View key={index} style={styles.selectedItem}>
                <Text style={styles.selectedText}>{test}</Text>
                <TouchableOpacity onPress={() => toggleTestSelection(test)}>
                  <Icon name="close-circle" size={18} color="#08979d" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createText}>CREATE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateReferral;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  dropdownDisabled: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  dropdownSearchWrapper: {
    marginTop: 8,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
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
    marginTop: 8,
    maxHeight: 200,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#08979d',
    borderRadius: 3,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 10,
    height: 10,
    backgroundColor: '#08979d',
    borderRadius: 2,
  },
  selectedContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedItem: {
    flexDirection: 'row',
    backgroundColor: '#e0f7f7',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginRight: 6,
    color: '#08979d',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cancelBtn: {
    borderColor: '#08979d',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  createBtn: {
    backgroundColor: '#08979d',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  cancelText: {
    color: '#08979d',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  createText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});
