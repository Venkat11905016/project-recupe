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

  const handleSendOTP = () => {
    Alert.alert('OTP Sent', `OTP sent to ${email}`);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
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
                  onPress={handleSendOTP}
                >
                  <Text style={styles.sendBtnText}>SEND OTP</Text>
                </TouchableOpacity>

                <Text style={styles.loginText}>
                  Remember password?
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
    backgroundColor: '#0097A7',
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
    fontFamily: 'Poppins-SemiBold',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 25,
    alignSelf: 'flex-start',
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ddd',
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  sendBtn: {
    backgroundColor: '#0097A7',
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  sendBtnText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  loginLink: {
    color: '#0097A7',
    fontFamily: 'Poppins-Bold',
  },
  powered: {
    marginTop: 30,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  recupe: {
    color: '#0097A7',
    fontFamily: 'Poppins-Bold',
  },
});
