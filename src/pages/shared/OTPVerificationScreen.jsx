import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import CustomAlert from '../../components/CustomAlert';

export default function OTPVerificationScreen({ navigation }) {
  const [timer, setTimer] = useState(180);
  const [otp, setOtp] = useState('');
  const otpInputRef = useRef(null);
  const route = useRoute();
  const [loading, setLoading] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    canRedirect: false,
    message: '',
  });

  // On success we stash the params so hideAlert can navigate
  const [pendingSuccessPayload, setPendingSuccessPayload] = useState(null);

  const correl_id = route.params?.correl_id;

  useEffect(() => {
    if (!correl_id) {
      console.warn('No correl_id received in OTPVerificationScreen');
      setAlertProps({
        canRedirect: false,
        message: 'Missing correl_id. Please restart signup.',
      });
      setAlertVisible(true);
    }
  }, [correl_id]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const showAlert = ({ message, canRedirect = false }) => {
    setAlertProps({ message, canRedirect });
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    if (pendingSuccessPayload) {
      // navigate after alert dismissed
      navigation.navigate('PasswordSetUp', pendingSuccessPayload);
      console.log('the log vlaues are', pendingSuccessPayload);
      setPendingSuccessPayload(null);
    }
  };

  const handleConfirm = async () => {
    if (!correl_id) {
      showAlert({ message: 'Missing correl_id. Please restart signup.' });
      return;
    }
    if (otp.length !== 6) {
      showAlert({ message: 'Please enter a 6-digit OTP.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://recupe.in/api/verifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correl_id,
          otp,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch (e) {
        throw new Error('Invalid JSON response from server');
      }

      console.log('verifyOTP response:', data);

      if (data.status === 'S' || data.result_code === 0) {
        // success: show alert and store payload for navigation after close
        setPendingSuccessPayload({ otp, correl_id });
        showAlert({
          message: 'OTP verified. Redirecting...',
          canRedirect: false,
        });
        // navigation.navigate('PasswordSetUp', pendingSuccessPayload);
      } else {
        const msg =
          data.message ||
          data.result_info?.message ||
          'OTP verification failed';
        showAlert({ message: msg });
      }
    } catch (err) {
      console.error('verifyOTP error:', err);
      showAlert({ message: 'Unable to verify OTP. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#08979d" barStyle="light-content" />

      <View style={styles.headerTitle}>
        <Text style={styles.title}>OTP Verification</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.subtitle}>
          We sent a verification code to your email
        </Text>

        <OTPTextInput
          ref={otpInputRef}
          inputCount={6}
          handleTextChange={setOtp}
          textInputStyle={styles.otpInput}
          tintColor="#08979d"
        />

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn’t receive the code?</Text>
          <Text style={styles.resendTimer}> Resend {formatTime(timer)}</Text>
        </View>

        <TouchableOpacity
          // style={[
          //   styles.confirmButton,
          //   (otp.length !== 6 || loading) && { opacity: 0.6 },
          // ]}
          style={styles.confirmButton}
          onPress={handleConfirm}
          // disabled={otp.length !== 6 || loading}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.confirmButtonText}>CONFIRM</Text>
          )}
        </TouchableOpacity>
      </View>

      <CustomAlert
        isVisible={alertVisible}
        message={alertProps.message}
        onClose={hideAlert}
        canRedirect={alertProps.canRedirect}
        redirectRoute="PasswordSetUp"
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08979d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    height: '70%',
  },
  headerTitle: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: 'black',
    marginTop: 15,
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    color: '#000',
    fontSize: 20,
    width: 45,
    height: 50,
    textAlign: 'center',
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    marginBottom: 10,
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  resendText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  resendTimer: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#08979d',
  },
  confirmButton: {
    width: '100%',
    backgroundColor: '#08979d',
    borderRadius: 10,
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
});



// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   ActivityIndicator,
// } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import OTPTextInput from 'react-native-otp-textinput';
// import CustomAlert from '../../components/CustomAlert';

// export default function OTPVerificationScreen({ navigation }) {
//   const [timer, setTimer] = useState(180);
//   const [otp, setOtp] = useState('');
//   const otpInputRef = useRef(null);
//   const route = useRoute();
//   const [loading, setLoading] = useState(false);

//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertProps, setAlertProps] = useState({
//     canRedirect: false,
//     message: '',
//   });

//   const correl_id = route.params?.correl_id;

//   useEffect(() => {
//     if (!correl_id) {
//       console.warn('No correl_id received in OTPVerificationScreen');
//       setAlertProps({
//         canRedirect: false,
//         message: 'Missing correl_id. Please restart signup.',
//       });
//       setAlertVisible(true);
//     }
//   }, [correl_id]);

//   useEffect(() => {
//     let interval = null;
//     if (timer > 0) {
//       interval = setInterval(() => {
//         setTimer(prev => prev - 1);
//       }, 1000);
//     }
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [timer]);

//   const formatTime = seconds => {
//     const mins = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, '0');
//     const secs = (seconds % 60).toString().padStart(2, '0');
//     return `${mins}:${secs}`;
//   };

//   const showAlert = ({ message, canRedirect = false }) => {
//     setAlertProps({ message, canRedirect });
//     setAlertVisible(true);
//   };

//   const hideAlert = () => {
//     setAlertVisible(false);
//   };

//   const handleConfirm = async () => {
//     if (!correl_id) {
//       showAlert({ message: 'Missing correl_id. Please restart signup.' });
//       return;
//     }
//     if (otp.length !== 6) {
//       showAlert({ message: 'Please enter a 6-digit OTP.' });
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch('https://recupe.in/api/verifyOTP', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           correl_id,
//           otp,
//         }),
//       });

//       let data;
//       try {
//         data = await res.json();
//       } catch (e) {
//         throw new Error('Invalid JSON response from server');
//       }

//       console.log('verifyOTP response:', data);

//       if (data.status === 'S' || data.result_code === 0) {
//         // show success alert (no redirect via alert)
//         showAlert({
//           message: 'OTP verified. Redirecting...',
//           canRedirect: false,
//         });
//         // immediately navigate with payload
//         navigation.navigate('PasswordSetUp', { otp, correl_id });
//       } else {
//         const msg =
//           data.message ||
//           data.result_info?.message ||
//           'OTP verification failed';
//         showAlert({ message: msg });
//       }
//     } catch (err) {
//       console.error('verifyOTP error:', err);
//       showAlert({ message: 'Unable to verify OTP. Please try again.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#08979d" barStyle="light-content" />

//       <View style={styles.headerTitle}>
//         <Text style={styles.title}>OTP Verification</Text>
//       </View>
//       <View style={styles.card}>
//         <Text style={styles.subtitle}>
//           We sent a verification code to your email
//         </Text>

//         <OTPTextInput
//           ref={otpInputRef}
//           inputCount={6}
//           handleTextChange={setOtp}
//           textInputStyle={styles.otpInput}
//           tintColor="#08979d"
//         />

//         <View style={styles.resendContainer}>
//           <Text style={styles.resendText}>Didn’t receive the code?</Text>
//           <Text style={styles.resendTimer}> Resend {formatTime(timer)}</Text>
//         </View>

//         <TouchableOpacity
//           style={styles.confirmButton}
//           onPress={handleConfirm}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator />
//           ) : (
//             <Text style={styles.confirmButtonText}>CONFIRM</Text>
//           )}
//         </TouchableOpacity>
//       </View>

//       <CustomAlert
//         isVisible={alertVisible}
//         message={alertProps.message}
//         onClose={hideAlert}
//         canRedirect={false}
//         redirectRoute="PasswordSetUp" // unused since canRedirect is false
//         navigation={navigation}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#08979d',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     width: '100%',
//     alignItems: 'center',
//     padding: 20,
//     paddingTop: 50,
//     height: '70%',
//   },
//   headerTitle: {
//     height: '30%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 35,
//     color: 'white',
//     fontFamily: 'Poppins-SemiBold',
//   },
//   subtitle: {
//     fontSize: 20,
//     textAlign: 'center',
//     fontFamily: 'Poppins-Medium',
//     color: 'black',
//     marginTop: 15,
//     marginBottom: 20,
//   },
//   otpInput: {
//     borderWidth: 1,
//     borderRadius: 10,
//     borderColor: 'black',
//     color: '#000',
//     fontSize: 20,
//     width: 45,
//     height: 50,
//     textAlign: 'center',
//     elevation: 0,
//     shadowColor: 'transparent',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0,
//     shadowRadius: 0,
//     marginBottom: 10,
//   },
//   resendContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   resendText: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: 18,
//   },
//   resendTimer: {
//     fontFamily: 'Poppins-Medium',
//     fontSize: 18,
//     color: '#08979d',
//   },
//   confirmButton: {
//     width: '100%',
//     backgroundColor: '#08979d',
//     borderRadius: 10,
//     marginTop: 40,
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     alignItems: 'center',
//   },
//   confirmButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     textAlign: 'center',
//     fontFamily: 'Poppins-Medium',
//   },
// });
