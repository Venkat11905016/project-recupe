import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const EditProfilePage = ({ navigation }) => {
  const [profile, setProfile] = useState({
    recupeId: 'REC_DC_05271256',
    centerName: 'Ajay diagnostic center',
    picName: 'Ajay',
    email: 'Ajaymeru02@gmail.com',
    phone: '9999999999',
    state: '',
    city: 'Hyd',
    pincode: '',
    address: '',
  });

  const [imageUri, setImageUri] = useState(null);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          Alert.alert('Image Picker Error', response.errorMessage);
        } else {
          const uri = response.assets[0].uri;
          setImageUri(uri);
        }
      },
    );
  };

  const handleUpdate = () => {
    console.log('Updated profile:', profile);
    console.log('Selected image:', imageUri);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
      <Text style={styles.header}>Edit Profile</Text>

      <Image
        source={
          imageUri
            ? { uri: imageUri }
            : require('../../assets/images/home-vector.60eaedb1083724ec6f59.png')
        }
        style={styles.image}
        resizeMode="cover"
      />

      <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
        <Text style={styles.uploadText}>UPLOAD</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={profile.recupeId}
        editable={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Center Name"
        value={profile.centerName}
        onChangeText={text => handleChange('centerName', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="PIC Name"
        value={profile.picName}
        onChangeText={text => handleChange('picName', text)}
      />

      <TextInput style={styles.input} value={profile.email} editable={false} />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={profile.phone}
        onChangeText={text => handleChange('phone', text)}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="State"
        value={profile.state}
        onChangeText={text => handleChange('state', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        value={profile.city}
        onChangeText={text => handleChange('city', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Pincode"
        value={profile.pincode}
        onChangeText={text => handleChange('pincode', text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={profile.address}
        onChangeText={text => handleChange('address', text)}
        multiline
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
          <Text style={styles.updateText}>UPDATE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 10,
    color: '#006d6d',
    fontFamily: 'Poppins-Bold',
  },
  image: {
    width: '100%',
    height: 120,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  uploadButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#006d6d',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadText: {
    color: '#006d6d',
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    fontFamily: 'Poppins-Regular',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: '#009999',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 0.48,
  },
  updateBtn: {
    backgroundColor: '#009999',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 0.48,
  },
  cancelText: {
    color: '#009999',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  updateText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
});
