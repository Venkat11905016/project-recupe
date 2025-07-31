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
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';

const AssignAssociationPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [recupID, setRecupID] = useState('');
  const navigation = useNavigation();

  const doctorList = [
    { label: 'Select Doctor', value: '' },
    { label: 'Dr. Harsha', value: 'harsha' },
    { label: 'Dr. Meena', value: 'meena' },
    { label: 'Dr. Anil', value: 'anil' },
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
          <Text style={styles.label}>Doctor *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedDoctor}
              onValueChange={itemValue => setSelectedDoctor(itemValue)}
              style={styles.pickerText}
            >
              {doctorList.map(doctor => (
                <Picker.Item
                  key={doctor.value}
                  label={doctor.label}
                  value={doctor.value}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.orText}>OR</Text>

          <Text style={styles.label}>Recupé ID *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Recupé ID"
            value={recupID}
            onChangeText={setRecupID}
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingVertical: 10,
    paddingHorizontal: 16,
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
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  pickerText: {
    fontFamily: 'Poppins-Regular',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#009999',
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
