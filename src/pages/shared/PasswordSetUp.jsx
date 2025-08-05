import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import CustomAlert from '../../components/CustomAlert';

export default function PasswordSetUp({ navigation }) {
  const route = useRoute();
  const { otp, correl_id } = route.params || {};

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shownFlowError, setShownFlowError] = useState(false); // prevent repeated alert loops

  // Custom alert state
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    canRedirect: false,
    message: '',
  });
  const [pendingRedirect, setPendingRedirect] = useState(null); // e.g. { route: 'Login' }

  // Helpers for custom alert
  const showAlert = ({
    message,
    canRedirect = false,
    redirectRoute = null,
  }) => {
    setAlertProps({ message, canRedirect });
    if (redirectRoute) setPendingRedirect({ route: redirectRoute });
    setAlertVisible(true);
  };
  const hideAlert = () => {
    setAlertVisible(false);
    if (alertProps.canRedirect && pendingRedirect) {
      navigation.replace(pendingRedirect.route);
      setPendingRedirect(null);
    }
  };

  useEffect(() => {
    if ((!otp || !correl_id) && !shownFlowError) {
      console.warn('Missing otp or correl_id in PasswordSetUp screen', {
        otp,
        correl_id,
      });
      showAlert({
        message: 'Required verification data missing. Please restart signup.',
        canRedirect: false,
      });
      setShownFlowError(true);
    }
  }, [otp, correl_id, shownFlowError]);

  const handleSubmit = async () => {
    if (!password || !newPassword) {
      showAlert({
        message: 'Both password fields are required.',
        canRedirect: false,
      });
      return;
    }
    if (password !== newPassword) {
      showAlert({ message: 'Passwords do not match.', canRedirect: false });
      return;
    }
    if (!correl_id) {
      showAlert({
        message:
          'Missing verification context. Please go back and redo signup.',
        canRedirect: false,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://recupe.in/api/setPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword: password,
          confirmPassword: newPassword,
          correl_id,
        }),
      });

      const data = await res.json();
      console.log('setPassword response:', data);

      if (data.status === 'S' || data.result_code === 0) {
        showAlert({
          message: 'Password set. Please login.',
          canRedirect: true,
          redirectRoute: 'Login',
        });
      } else {
        const msg =
          data.message || data.result_info?.message || 'Could not set password';
        showAlert({ message: msg, canRedirect: false });
      }
    } catch (err) {
      console.error('setPassword error:', err);
      showAlert({
        message: 'Something went wrong. Try again.',
        canRedirect: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled =
    loading ||
    !password ||
    !newPassword ||
    password !== newPassword ||
    password.length < 6;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Top 30% Header */}
          <View style={styles.firstContainer}>
            <Text style={styles.title}>Password SetUp</Text>
          </View>
          <View style={{ flex: 7 }}>
            <ScrollView
              style={styles.secondContainer}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.card}>
                <Text style={styles.label}>New Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(prev => !prev)}
                  >
                    <FontAwesome
                      name={showPassword ? 'eye-slash' : 'eye'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholderTextColor="#999"
                    secureTextEntry={!showNewPassword}
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowNewPassword(prev => !prev)}
                  >
                    <FontAwesome
                      name={showNewPassword ? 'eye-slash' : 'eye'}
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  // style={[
                  //   styles.loginBtn,
                  //   isSubmitDisabled && { opacity: 0.6 },
                  // ]}
                  style={styles.loginBtn}
                  onPress={handleSubmit}
                  // disabled={isSubmitDisabled}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.loginBtnText}>SUBMIT</Text>
                  )}
                </TouchableOpacity>
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
        redirectRoute="Login" // actual navigation for success is driven in hideAlert via pendingRedirect
        navigation={navigation}
      />
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
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 22,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Poppins-Medium',
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
  loginBtn: {
    backgroundColor: '#0097A7',
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
});
