import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const EditProfilePage = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setSelectedImage(response.assets[0]);
        }
      },
    );
  };

  const renderInput = (label, value = '', disabled = false) => (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, disabled && styles.disabledInput]}
        value={value}
        editable={!disabled}
        placeholderTextColor="#aaa"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Upload Section */}
        <View style={styles.uploadContainer}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.uploadedImage}
            />
          ) : (
            <MaterialIcon name="image" size={90} color="#0097A7" />
          )}

          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadText}>UPLOAD</Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        {renderInput('Recup ID', 'REC_DC_83941094', true)}
        {renderInput('Center Name', 'Lakshmi DC')}
        {renderInput('PIC Name', 'Lakshmi')}
        {renderInput('Email', 'lakshmi.impaxive+1@gmail.com', true)}
        {renderInput('Phone', '8309005002')}
        {renderInput('State')}
        {renderInput('City', 'Hyderabad')}
        {renderInput('Pincode')}
        {renderInput('Address')}
      </ScrollView>
      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateText}>UPDATE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0097A7',
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0097A7',
    // padding: 20,
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  scroll: {
    padding: 16,
  },
  uploadContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  uploadedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  uploadButton: {
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#0097A7',
    paddingVertical: 6,
    paddingHorizontal: 50,
    borderRadius: 6,
  },
  uploadText: {
    color: '#0097A7',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  input: {
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  disabledInput: {
    color: '#888',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#0097A7',
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelText: {
    color: '#0097A7',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
  updateButton: {
    flex: 1,
    backgroundColor: '#0097A7',
    paddingVertical: 12,
    marginLeft: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  updateText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});
