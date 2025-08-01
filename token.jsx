import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { Alert } from 'react-native';

export const getAccessToken = async () => {
  let token = await AsyncStorage.getItem('token');
  console.log(token, '========token.jsx');
  return token ? token : '';
};

export const redirectLogin = navigation => {
  Alert.alert(
    'Session Expired',
    'Your token has expired or is unauthorized. Please login again.',
    [
      {
        text: 'OK',
        onPress: () => {
          // Reset navigation stack and navigate to LoginScreen
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }], // 👈 replace with your actual login screen name
            }),
          );
        },
      },
    ],
    { cancelable: false },
  );
};

export async function requestOptions() {
  const token = await getAccessToken();
  return {
    headers: {
      'x-access-token': token,
      // 'Content-Type': 'application/json',
    },
  };
}
