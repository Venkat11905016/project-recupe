// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   StatusBar,
//   Image,
// } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import Icon from 'react-native-vector-icons/Feather';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

// const EditProfilePage = ({ navigation }) => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleUpload = () => {
//     launchImageLibrary(
//       {
//         mediaType: 'photo',
//         quality: 0.7,
//       },
//       response => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.errorCode) {
//           console.log('ImagePicker Error: ', response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           setSelectedImage(response.assets[0]);
//         }
//       },
//     );
//   };
// const handleUpdate = async () => {
//   try {
//     setLoading(true);
//     const tokenHeaders = await requestOptions(); // this gives { method, headers }

//     const dc_id = await AsyncStorage.getItem('dc_id');
//     const correl_id = await AsyncStorage.getItem('correl_id');
//     const email = await AsyncStorage.getItem('email');
//     const recupe_id = await AsyncStorage.getItem('recupe_id');

//     const body = new FormData();
//     body.append('dc_id', dc_id);
//     body.append('correl_id', correl_id);
//     body.append('email', email);
//     body.append('center_name', centerName);
//     body.append('pic_name', picName);
//     body.append('mobile', phone);
//     body.append('city', city);
//     body.append('pincode', pincode);
//     body.append('address', address);
//     body.append('recupe_id', recupe_id);
//     body.append('state', 'Andhra Pradesh');
//     body.append('country', 'India');
//     body.append('is_approved', 'Y');

//     const response = await fetch('https://recupe.in/api/updateDC', {
//       method: 'PUT',
//       headers: {
//         ...tokenHeaders.headers,
//         'Content-Type': 'multipart/form-data',
//       },
//       body,
//     });

//     const data = await response.json();
//     console.log('Update response:', data);

//     if (data.status === 'S' && data.result_code === 0) {
//       setAlertProps({
//         message: 'Profile updated successfully!',
//         canRedirect: true,
//       });
//     } else if (data.status === 'F' && data.result_code === 505) {
//       redirectLogin(navigation);
//     } else {
//       setAlertProps({
//         message: data.message || 'Something went wrong',
//         canRedirect: false,
//       });
//     }

//     setAlertVisible(true);
//   } catch (error) {
//     console.error('Update error:', error);
//     setAlertProps({
//       message: 'Something went wrong',
//       canRedirect: false,
//     });
//     setAlertVisible(true);
//   } finally {
//     setLoading(false);
//   }
// };

//   const renderInput = (label, value = '', disabled = false) => (
//     <View style={styles.inputWrapper}>
//       <Text style={styles.label}>{label}</Text>
//       <TextInput
//         style={[styles.input, disabled && styles.disabledInput]}
//         value={value}
//         editable={!disabled}
//         placeholderTextColor="#aaa"
//       />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <StatusBar backgroundColor="#08979d" barStyle="light-content" />
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <FontAwesome6 name="arrow-left" size={28} color="#fff" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Entypo name="home" size={30} color="#fff" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Edit Profile</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.scroll}>
//         {/* Upload Section */}
//         <View style={styles.uploadContainer}>
//           {selectedImage ? (
//             <Image
//               source={{ uri: selectedImage.uri }}
//               style={styles.uploadedImage}
//             />
//           ) : (
//             <MaterialIcon name="image" size={90} color="#08979d" />
//           )}

//           <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
//             <Text style={styles.uploadText}>UPLOAD</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Input Fields */}
//         {renderInput('Recup ID', 'REC_DC_83941094', true)}
//         {renderInput('Center Name', 'Lakshmi DC')}
//         {renderInput('PIC Name', 'Lakshmi')}
//         {renderInput('Email', 'lakshmi.impaxive+1@gmail.com', true)}
//         {renderInput('Phone', '8309005002')}
//         {renderInput('State')}
//         {renderInput('City', 'Hyderabad')}
//         {renderInput('Pincode')}
//         {renderInput('Address')}
//       </ScrollView>
//       {/* Buttons */}
//       <View style={styles.buttonRow}>
//         <TouchableOpacity
//           style={styles.cancelButton}
//           onPress={() => {
//             navigation.goBack();
//           }}
//         >
//           <Text style={styles.cancelText}>CANCEL</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.updateButton}>
//           <Text style={styles.updateText}>UPDATE</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default EditProfilePage;
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestOptions, redirectLogin } from '../../../token';
import CustomAlert from '../../components/CustomAlert';

const EditProfilePage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // User fields
  const [recupeId, setRecupeId] = useState('');
  const [centerName, setCenterName] = useState('');
  const [picName, setPicName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    message: '',
    canRedirect: false,
  });

  const showAlert = () => setAlertVisible(true);
  const hideAlert = () => setAlertVisible(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(
        (await AsyncStorage.getItem('userData')) || '{}',
      );
      const dc_id = userInfo.dc_id;
      const correl_id = await AsyncStorage.getItem('correl_id');

      const headers = await requestOptions();
      const response = await fetch(
        `https://recupe.in/api/getDCInfo/${correl_id}`,
        headers,
      );
      const data = await response.json();

      if (data.status === 'S' && data.result_code === 0) {
        const info = data.result_info;
        setRecupeId(info.recupe_id || '');
        setCenterName(info.center_name || '');
        setPicName(info.pic_name || '');
        setEmail(info.email || '');
        setPhone(info.mobile || '');
        setState(info.state || '');
        setCity(info.city || '');
        setPincode(info.pincode || '');
        setAddress(info.address || '');
      } else if (data.status === 'F' && data.result_code === 505) {
        redirectLogin(navigation);
      } else {
        setAlertProps({
          message: data.message || 'Failed to load profile',
          canRedirect: false,
        });
        showAlert();
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      setAlertProps({ message: 'Something went wrong', canRedirect: false });
      showAlert();
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      response => {
        if (response.assets?.length > 0) {
          setSelectedImage(response.assets[0]);
        }
      },
    );
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const tokenHeaders = await requestOptions();
      const dc_id = await AsyncStorage.getItem('dc_id');
      const correl_id = await AsyncStorage.getItem('correl_id');

      const formData = new FormData();
      formData.append('dc_id', dc_id);
      formData.append('correl_id', correl_id);
      formData.append('email', email);
      formData.append('center_name', centerName);
      formData.append('pic_name', picName);
      formData.append('mobile', phone);
      formData.append('city', city);
      formData.append('pincode', pincode);
      formData.append('address', address);
      formData.append('recupe_id', recupeId);
      formData.append('state', state);
      formData.append('country', 'India');
      formData.append('is_approved', 'Y');

      if (selectedImage) {
        formData.append('profile_image', {
          uri: selectedImage.uri,
          name: selectedImage.fileName || 'profile.jpg',
          type: selectedImage.type || 'image/jpeg',
        });
      }

      const response = await fetch('https://recupe.in/api/updateDC', {
        method: 'PUT',
        headers: {
          ...tokenHeaders.headers,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      console.log('Update response:', data);

      if (data.status === 'S' && data.result_code === 0) {
        setAlertProps({
          message: 'Profile updated successfully!',
          canRedirect: true,
        });
      } else if (data.status === 'F' && data.result_code === 505) {
        redirectLogin(navigation);
      } else {
        setAlertProps({
          message: data.message || 'Update failed',
          canRedirect: false,
        });
      }

      showAlert();
    } catch (error) {
      console.error('Update error:', error);
      setAlertProps({ message: 'Something went wrong', canRedirect: false });
      showAlert();
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (label, value, setter, disabled = false) => (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, disabled && styles.disabledInput]}
        value={value}
        onChangeText={setter}
        editable={!disabled}
        placeholderTextColor="#aaa"
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#08979d" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#08979d" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.uploadContainer}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.uploadedImage}
            />
          ) : (
            <MaterialIcon name="image" size={90} color="#08979d" />
          )}
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadText}>UPLOAD</Text>
          </TouchableOpacity>
        </View>

        {renderInput('Recup ID', recupeId, setRecupeId, true)}
        {renderInput('Center Name', centerName, setCenterName)}
        {renderInput('PIC Name', picName, setPicName)}
        {renderInput('Email', email, setEmail, true)}
        {renderInput('Phone', phone, setPhone)}
        {renderInput('State', state, setState)}
        {renderInput('City', city, setCity)}
        {renderInput('Pincode', pincode, setPincode)}
        {renderInput('Address', address, setAddress)}
      </ScrollView>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateText}>UPDATE</Text>
        </TouchableOpacity>
      </View>

      <CustomAlert
        visible={alertVisible}
        onClose={hideAlert}
        message={alertProps.message}
        onRedirect={() => {
          if (alertProps.canRedirect) navigation.goBack();
        }}
      />
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
    backgroundColor: '#08979d',
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#08979d',
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
    borderColor: '#08979d',
    paddingVertical: 6,
    paddingHorizontal: 50,
    borderRadius: 6,
  },
  uploadText: {
    color: '#08979d',
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
    borderColor: '#08979d',
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: '#08979d',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
  updateButton: {
    flex: 1,
    backgroundColor: '#08979d',
    paddingVertical: 12,
    marginLeft: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});
