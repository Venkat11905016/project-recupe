// import { useNavigation } from '@react-navigation/native';
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
// } from 'react-native';

// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

// const SentInvitePage = () => {
//   const [name, setName] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const navigation = useNavigation();

//   const handleInvite = () => {
//     if (!name || !mobileNumber) {
//       Alert.alert('Validation Error', 'Both fields are required.');
//       return;
//     }

//     Alert.alert('Success', `Invite sent to ${name}`);
//     setName('');
//     setMobileNumber('');
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       {/* Header Section - OUTSIDE KeyboardAvoidingView */}
//       <StatusBar backgroundColor="#08979d" barStyle="light-content" />
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <FontAwesome6 name="arrow-left" size={28} color="#fff" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Entypo name="home" size={30} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.titleWrapper}>
//         <Text style={styles.title}>Sent Invite</Text>
//       </View>

//       {/* Content Section */}
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           <Text style={styles.label}>Name *</Text>
//           <TextInput style={styles.input} value={name} onChangeText={setName} />

//           <Text style={styles.label}>Mobile Number *</Text>
//           <TextInput
//             style={styles.input}
//             value={mobileNumber}
//             onChangeText={setMobileNumber}
//             keyboardType="phone-pad"
//             maxLength={10}
//           />
//         </ScrollView>
//         <TouchableOpacity style={styles.button} onPress={handleInvite}>
//           <Text style={styles.buttonText}>SEND INVITE</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// export default SentInvitePage;

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#08979d',
//     paddingHorizontal: 15,
//     paddingBottom: 15,
//     paddingTop: 5,
//   },
//   titleWrapper: {
//     backgroundColor: '#08979d',
//     paddingTop: 10,
//     paddingBottom: 20,
//   },
//   title: {
//     fontSize: 23,
//     fontFamily: 'Poppins-Regular',
//     color: '#fff',
//     textAlign: 'center',
//   },
//   scrollContainer: {
//     padding: 20,
//     paddingTop: 10,
//     flexGrow: 1,
//   },
//   label: {
//     fontFamily: 'Poppins-SemiBold',
//     marginTop: 20,
//     marginBottom: 5,
//     fontSize: 20,
//   },
//   input: {
//     borderWidth: 3,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     fontFamily: 'Poppins-Regular',
//   },
//   button: {
//     // marginTop: 40,
//     margin: 10,
//     backgroundColor: '#08979d',
//     paddingVertical: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontFamily: 'Poppins-Regular',
//     fontSize: 18,
//   },
// });
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Linking,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const SentInvitePage = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const navigation = useNavigation();

  const handleInvite = async () => {
    if (!name.trim() || !mobileNumber.trim()) {
      Alert.alert('Validation Error', 'Both fields are required.');
      return;
    }

    if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
      Alert.alert(
        'Invalid Number',
        'Please enter a valid 10-digit mobile number.',
      );
      return;
    }

    const message = `Hello ${name},

Lakshmi has invited you to join our growing digital healthcare platform. Registering will help you connect with more patients and grow your practice online.

Click here to get started: https://recupe.in/connect/signup?REC_DC_83941094

Thank you,
Team Impaxive Solutions`;

    const phoneWithCountryCode = `91${mobileNumber}`;
    const url = `https://wa.me/${phoneWithCountryCode}?text=${encodeURIComponent(
      message,
    )}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Error', 'WhatsApp is not installed.');
        return;
      }
      await Linking.openURL(url);

      setName('');
      setMobileNumber('');
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      Alert.alert('Error', 'Failed to open WhatsApp.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <StatusBar backgroundColor="#08979d" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Sent Invite</Text>
      </View>

      {/* Content */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>Name *</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Mobile Number *</Text>
          <TextInput
            style={styles.input}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={handleInvite}>
          <Text style={styles.buttonText}>SEND INVITE</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SentInvitePage;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#08979d',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
  },
  titleWrapper: {
    backgroundColor: '#08979d',
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 23,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    textAlign: 'center',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 10,
    flexGrow: 1,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
  },
  input: {
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  button: {
    margin: 10,
    backgroundColor: '#08979d',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
});
