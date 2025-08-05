import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomAlert from '../../components/CustomAlert';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    canRedirect: false,
    message: '',
  });

  const showAlert = (message, canRedirect = false) => {
    setAlertProps({
      ...alertProps,
      message,
      canRedirect,
    });
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const submit = async () => {
    // let apiRes = await fetch('https://recupe.in/api/login', {
    //   // let apiRes = await fetch('https://r/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Access-Control-Origin': '*',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: 'lakshmi.impaxive+1@gmail.com',
    //     password: 'Impaxive@1',
    //   }),
    // });
    // let data = await apiRes.json();
    // if (data.status === 'S') {
    //   console.log(data, '========== login');
    //   await AsyncStorage.setItem('userData', JSON.stringify(data.result_info));
    //   await AsyncStorage.setItem('token', data.token);
    //   await AsyncStorage.setItem('recupe_id', data.recupe_id);
    //   await AsyncStorage.setItem('correl_id', data.correl_id);
    //   await AsyncStorage.setItem('role_id', String(data.role_id));

    //   if (data?.is_profile_updated === 'N') {
    //     // Navigate to profile page for profile update
    //     navigation.navigate('ProfilePage');
    //     return;
    //   }
    //   if (data?.is_first_time_login === 'Y') {
    //     // Navigate to reset password page for first time login
    //     navigation.navigate('ResetPasswordPage');
    //     return;
    //   }
    //   // Role-based navigation
    //   if (data?.is_first_time_login === 'N') {
    //     navigation.navigate('MainTabs', { Screen: 'DcHome' });
    //     return;
    //   }

    //   // if (data?.role_id === 3) {
    //   //   await AsyncStorage.setItem('dc_id', String(data.result_info.dc_id));
    //   // }

    //   navigation.replace('MainTabs', { Screen: 'Home' });
    // } else if (data.status === 'E') {
    //   await AsyncStorage.clear();
    //   setAlertProps({
    //     ...alertProps,
    //     message: data.message,
    //     canRedirect: false,
    //   });
    //   showAlert(data.message);
    // } else {
    //   await AsyncStorage.clear();
    //   setAlertProps({
    //     ...alertProps,
    //     message: 'Invalid Credentials',
    //     canRedirect: false,
    //   });
    //   showAlert('Invalid Credentials');
    // }

    const checkInputType = () => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const mobilePattern =
        /^\+?(\d{1,4})?[-.\s]?(\d{3})[-.\s]?(\d{3,4})[-.\s]?(\d{3,4})$/;

      if (emailPattern.test(username)) {
        return 'email';
      } else if (mobilePattern.test(username)) {
        return 'mobile';
      } else {
        return 'invalid';
      }
    };

    checkInputType();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!username.trim()) {
      setAlertProps({
        ...alertProps,
        message: 'Please enter your Email.',
        canRedirect: false,
      });
      showAlert('Please enter your Email.');
      return;
    } else if (!emailPattern.test(username)) {
      setAlertProps({
        ...alertProps,
        message: 'Please enter a valid email address.',
        canRedirect: false,
      });
      showAlert('Please enter a valid email address.');
      return;
    } else if (!password.trim()) {
      setAlertProps({
        ...alertProps,
        message: 'Password required!',
        canRedirect: false,
      });
      showAlert('Password required!');
      return;
    } else {
      setLoading(true);
      try {
        let apiRes = await fetch('https://recupe.in/api/login', {
          // let apiRes = await fetch('https://r/api/login', {
          method: 'POST',
          headers: {
            'Access-Control-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
        let data = await apiRes.json();
        if (data.status === 'S') {
          console.log(data, '========== login');
          await AsyncStorage.setItem(
            'userData',
            JSON.stringify(data.result_info),
          );
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('recupe_id', data.recupe_id);
          await AsyncStorage.setItem('correl_id', data.correl_id);
          await AsyncStorage.setItem('role_id', String(data.role_id));

          if (data?.is_profile_updated === 'N') {
            // Navigate to profile page for profile update
            navigation.navigate('AccountPage');
            return;
          }
          if (data?.is_first_time_login === 'Y') {
            // Navigate to reset password page for first time login
            navigation.navigate('ResetPasswordPage');
            return;
          }
          // Role-based navigation
          if (data?.is_first_time_login === 'N') {
            navigation.navigate('MainTabs', { Screen: 'DcHome' });
            return;
          }

          // if (data?.role_id === 3) {
          //   await AsyncStorage.setItem('dc_id', String(data.result_info.dc_id));
          // }

          navigation.replace('MainTabs', { Screen: 'Home' });
        } else if (data.status === 'E') {
          await AsyncStorage.clear();
          setAlertProps({
            ...alertProps,
            message: data.message,
            canRedirect: false,
          });
          showAlert(data.message);
        } else {
          await AsyncStorage.clear();
          setAlertProps({
            ...alertProps,
            message: 'Invalid Credentials',
            canRedirect: false,
          });
          showAlert('Invalid Credentials');
        }
      } catch (error) {
        // await AsyncStorage.clear();
        console.error('Error making API call:', error);
        setAlertProps({
          ...alertProps,
          message: 'Something went wrong',
          canRedirect: false,
        });
        showAlert('Something went wrong');
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar backgroundColor="#08979d" barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Top 30% Header */}
          <View style={styles.firstContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
          </View>
          <View style={{ flex: 7 }}>
            <ScrollView
              style={styles.secondContainer}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.card}>
                <Text style={styles.loginText}>Login</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Email"
                    placeholderTextColor="black"
                    value={username}
                    onChangeText={text => {
                      const disallowedPattern =
                        /<script.*?>.*?<\/script>|<.*?>|[{}[\]\\`"'<>]/gi;
                      if (!disallowedPattern.test(text)) {
                        setUsername(text);
                      }
                    }}
                    maxLength={255}
                  />
                </View>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="black"
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={text => {
                      const allowedCharsPattern = /^[a-zA-Z0-9.@_\-]*$/;

                      // Only update password if typed characters are allowed
                      if (allowedCharsPattern.test(text)) {
                        setPassword(text);
                      }
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesome
                      name={showPassword ? 'eye' : 'eye-slash'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() => {
                    Keyboard.dismiss();
                    submit();
                  }}
                >
                  <Text style={styles.loginBtnText}>LOGIN</Text>
                </TouchableOpacity>

                <Text style={styles.newUser}>
                  New user?{' '}
                  <Text
                    style={styles.signup}
                    onPress={() => navigation.navigate('Signup')}
                  >
                    Signup
                  </Text>
                </Text>
              </View>

              <Text style={styles.powered}>
                Powered by <Text style={styles.recupe}>RECUPE</Text>
              </Text>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <CustomAlert
        isVisible={alertVisible}
        message={alertProps.message}
        onClose={hideAlert}
        canRedirect={alertProps.canRedirect}
        redirectRoute=""
        navigation={navigation}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08979d',
  },
  firstContainer: {
    flex: 3, // 30%
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondContainer: {
    // flex: 7, // 70%
    flexGrow: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    // padding: 20,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 28,
    alignSelf: 'flex-start',
    // paddingTop: 25,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  passwordContainer: {
    width: '100%',
    height: 60,
    borderColor: '#ddd',
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  forgot: {
    color: 'black',
    alignSelf: 'flex-end',
    fontSize: 19,
    marginBottom: 15,
    fontFamily: 'Poppins-Regular',
  },
  loginBtn: {
    backgroundColor: '#08979d',
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  newUser: {
    marginTop: 24,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  signup: {
    color: '#08979d',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  powered: {
    // marginTop: 130,
    marginTop: 135,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  recupe: {
    fontSize: 22,
    color: '#08979d',
    fontFamily: 'Poppins-Regular',
  },
});
