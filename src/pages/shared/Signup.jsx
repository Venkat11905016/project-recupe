import React, { useEffect, useState } from 'react';
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
import CustomAlert from '../../components/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Signup({ navigation }) {
  const [content, setContent] = useState({
    name: '',
    email: '',
    mobile: '',
    recupe_id: null,
  });
  const [selected, setSelected] = useState({ key: 0, value: '' });
  const navigator = useNavigation();
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    canRedirect: false,
    message: '',
  });

  // For Recupe_id
  useEffect(() => {
    const recupe_id = navigation
      .getState()
      .routes.find(route => route.name === 'Signup')?.params?.recupe_id;
    if (recupe_id) {
      setContent(prev => ({ ...prev, recupe_id }));
      console.log('Recupe ID from signup:', recupe_id);
    }
  }, [navigation]);

  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const submit = async () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobilePattern =
      /^\+?(\d{1,4})?[-.\s]?(\d{3})[-.\s]?(\d{3,4})[-.\s]?(\d{3,4})$/;
    if (!content.name) {
      setAlertProps({
        ...alertProps,
        message: 'Please enter your Name.',
        canRedirect: false,
      });
      showAlert();
      return;
    } else if (!content.email) {
      setAlertProps({
        ...alertProps,
        message: 'Please enter Email address.',
        canRedirect: false,
      });
      showAlert();
      return;
    } else if (!emailPattern.test(content.email)) {
      setAlertProps({
        ...alertProps,
        message: 'Please enter a valid Email address.',
        canRedirect: false,
      });
      showAlert();
      return;
    } else if (!content.mobile) {
      setAlertProps({
        ...alertProps,
        message: 'Please enter Mobile number.',
        canRedirect: false,
      });
      showAlert();
      return;
    } else if (!mobilePattern.test(content.mobile)) {
      setAlertProps({
        ...alertProps,
        message: 'Please enter a valid Mobile number.',
        canRedirect: false,
      });
      showAlert();
    } else {
      setLoading(true);
      let data = {
        name: content.name,
        email: content.email,
        mobile: content.mobile,
      };

      console.log(data, 'apiData');
      try {
        // let apiRes = await fetch('https://recupe.in/api/login', {
        let apiRes = await fetch('https://recupe.in/api/preSignUp', {
          method: 'POST',
          headers: {
            'Access-Control-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: content.name,
            email: content.email,
            mobile: content.mobile,
          }),
        });
        let data = await apiRes.json();
        console.log(data);
        if (data.status === 'S') {
          // setAlertProps({
          //   ...alertProps,
          //   message: 'Signup submitted. Check email for OTP.',
          //   canRedirect: true,
          // });

          // showAlert();
          // setLoading(true);
          AsyncStorage.setItem('correl_id', data.correl_id);
          // setTimeout(() => {
          //   navigation.replace('OtpVerification', {
          //     correl_id: data.correl_id,
          //   });
          // }, 1000);
          navigation.replace('OtpVerification', {
            correl_id: data.correl_id,
          });

          //           const handleAlertClose = () => {
          //   setAlertVisible(false);
          //   if (alertProps.canRedirect) {
          //     navigation.replace('OtpVerification', {
          //       correl_id: data.correl_id,
          //     });
          //   }
          // };
        } else if (data.status === 'E') {
          await AsyncStorage.clear();
          setAlertProps({
            ...alertProps,
            message: data.message,
            canRedirect: false,
          });
          showAlert();
        } else {
          await AsyncStorage.clear();
          setAlertProps({
            ...alertProps,
            message: 'Invalid Crendentials',
            canRedirect: false,
          });
          showAlert();
        }
      } catch (error) {
        setAlertProps({
          ...alertProps,
          message: 'Something went wrong',
          canRedirect: false,
        });
        showAlert();
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
          {/* 30% Header */}
          <View style={styles.firstContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
          </View>

          {/* 70% Scrollable Form */}
          <View style={styles.secondContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.card}>
                <Text style={styles.signupText}>Signup</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="#000"
                  value={content.name}
                  onChangeText={input =>
                    setContent({ ...content, name: input })
                  }
                />

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#000"
                  value={content.email}
                  onChangeText={input =>
                    setContent({
                      ...content,
                      email: input,
                    })
                  }
                />

                <View style={styles.mobileInputContainer}>
                  <Text style={styles.countryCode}>+91</Text>
                  <TextInput
                    style={styles.mobileInput}
                    placeholder="Mobile"
                    placeholderTextColor="#000"
                    keyboardType="numeric"
                    value={content.mobile}
                    maxLength={10}
                    onChangeText={input => {
                      const onlyNumbers = input.replace(/[^0-9]/g, '');
                      setContent({
                        ...content,
                        mobile: onlyNumbers,
                      });
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.signupBtn}
                  onPress={() => {
                    Keyboard.dismiss();
                    submit();
                  }}
                >
                  <Text style={styles.signupBtnText}>SIGNUP</Text>
                </TouchableOpacity>

                <Text style={styles.loginText}>
                  Already a user?{' '}
                  <Text
                    style={styles.loginLink}
                    onPress={() => navigation.navigate('Login')}
                  >
                    Login
                  </Text>
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <CustomAlert
        isVisible={alertVisible}
        message={alertProps.message}
        onClose={hideAlert}
        canRedirect={alertProps.canRedirect}
        redirectRoute="OtpVerification"
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
    flex: 7, // 70%
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 60,
  },
  title: {
    fontSize: 35,
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 28,
    alignSelf: 'flex-start',
    marginTop: 40,
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    width: '100%',
    height: 55,
    fontSize: 18,
    color: 'black',
    borderColor: '#ddd',
    borderWidth: 3,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  signupBtn: {
    backgroundColor: '#08979d',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  signupBtnText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  loginText: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  loginLink: {
    fontSize: 20,
    color: '#08979d',
    fontFamily: 'Poppins-SemiBold',
  },
  powered: {
    marginTop: 30,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  recupe: {
    color: '#08979d',
    fontFamily: 'Poppins-Bold',
  },
  mobileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderColor: '#ddd',
    borderWidth: 3,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  countryCode: {
    fontSize: 18,
    marginRight: 8,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },

  mobileInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
});
