import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const ResetPasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigation = useNavigation();

  const handleReset = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Validation Error', 'New passwords do not match');
      return;
    }

    Alert.alert('Success', 'Password updated successfully');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="#0097A7" barStyle="light-content" />

      <View style={styles.iconHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>Reset Password</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Old Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry={!showOld}
          />
          <TouchableOpacity onPress={() => setShowOld(!showOld)}>
            <Icon name={showOld ? 'eye-slash' : 'eye'} size={24} />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNew}
          />
          <TouchableOpacity onPress={() => setShowNew(!showNew)}>
            <Icon name={showNew ? 'eye-slash' : 'eye'} size={24} />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirm}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Icon name={showConfirm ? 'eye-slash' : 'eye'} size={24} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>UPDATE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ResetPasswordPage;

const styles = StyleSheet.create({
  iconHeader: {
    backgroundColor: '#0097A7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  titleContainer: {
    backgroundColor: '#0097A7',
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 23,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  container: {
    padding: 20,
    flexGrow: 1,
  },
  label: {
    marginTop: 15,
    marginBottom: 8,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#0097A7',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});
