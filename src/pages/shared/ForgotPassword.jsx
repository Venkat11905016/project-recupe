import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    canRedirect: false,
    message: '',
  });

  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const submit = async () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setAlertProps({
        ...alertProps,
        message: 'Email required!',
        canRedirect: false,
      });
      showAlert();
      return;
    } else if (!emailPattern.test(email)) {
      setAlertProps({
        ...alertProps,
        message: 'Please enter valid Email',
        canRedirect: false,
      });
      showAlert();
      return;
    } else if (email.length > 255) {
      setAlertProps({
        ...alertProps,
        message: 'Email should be less than 255 characters.',
        canRedirect: false,
      });
      showAlert();
      return;
    }
    setLoading(true);
    try {
      let apiRes = await fetch('https://recupe.in/api/forgotPassword', {
        method: 'POST',
        headers: {
          'Access-Control-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });
      let data = await apiRes.json();
      if (data.status === 'S') {
        hideAlert();
        await AsyncStorage.setItem('correl_id', data.correl_id);
        console.log(data.correl_id, '==========');
        navigation.navigate('OtpVerification');
      } else if (data.status === 'E' && data.result_code === 404) {
        setAlertProps({
          ...alertProps,
          message: 'Incorrect email',
          canRedirect: false,
        });
        showAlert();
      }
    } catch (error) {
      console.error('Error making API call:', error);
      setAlertProps({
        ...alertProps,
        message: 'Something went wrong',
        canRedirect: false,
      });
      showAlert();
    } finally {
      setLoading(false);
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
          {/* Top 30% */}
          <View style={styles.firstContainer}>
            <Text style={styles.title}>Forgot Password</Text>
          </View>

          {/* Bottom 70% */}
          <View style={styles.secondContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.card}>
                <Text style={styles.label}>Enter your Email</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />

                <TouchableOpacity
                  style={styles.sendBtn}
                  onPress={() => {
                    Keyboard.dismiss();
                    submit();
                  }}
                >
                  <Text style={styles.sendBtnText}>SEND OTP</Text>
                </TouchableOpacity>

                <Text style={styles.loginText}>
                  Remember password?{' '}
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
    alignItems: 'center',
    paddingBottom: 60,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 26,
    alignSelf: 'flex-start',
    marginTop: 25,
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    width: '100%',
    height: 60,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  sendBtn: {
    backgroundColor: '#08979d',
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  sendBtnText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  loginText: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  loginLink: {
    color: '#08979d',
    fontSize: 20,
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
});
