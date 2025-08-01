import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { redirectLogin, requestOptions } from '../../../token';
import CustomAlert from '../../components/CustomAlert';
export default function DcHome({ navigation }) {
  console.log('the navigation is ', navigation);
  const isFocused = useIsFocused();
  const [content, setContent] = React.useState(null);

  const [role, setRole] = React.useState(null);
  const [userData, setUserData] = React.useState({});

  // Start Alerts
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({
    canRedirect: false,
    message: '',
  });

  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };
  // End Alerts

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let userRole = parseInt(await AsyncStorage.getItem('role_id'));
        let userInfo = JSON.parse(
          (await AsyncStorage.getItem('userData')) || '{}',
        );
        setUserData(userInfo);
        console.log(userInfo, '====Home Page');
        setRole(userRole);
        console.log(userRole);

        let storedDcId = await AsyncStorage.getItem('dc_id');
        let dc_id = storedDcId || userInfo.dc_id || '';
        console.log(dc_id, '==========');

        let correl_id = (await AsyncStorage.getItem('correl_id')) || '';
        console.log(correl_id, '=====================');

        if (!userRole) {
          console.log('No user role found');
          setContent(null);
          return;
        }

        let apiRes;
        let headers = await requestOptions();

        if (userRole == 2) {
          apiRes = await fetch(
            `https://recupe.in/api/getDoctorDashboard/${correl_id}`,
            headers,
          );
        } else if (userRole == 3) {
          apiRes = await fetch(
            `https://recupe.in/api/getDCDashboard/${dc_id}`,
            headers,
          );
        } else {
          console.log('Invalid user role:', userRole);
          setContent(null);
          return;
        }
        // console.log(apiRes);
        let data = await apiRes.json();
        console.log(data, 'Dashboard Data');

        if (data.status === 'S' && data.result_code === 0) {
          console.log('Setting content:', data.result_info);
          setContent(data.result_info);
        } else if (data.status === 'F' && data.result_code === 505) {
          redirectLogin(navigation);
          return;
        } else {
          console.log('API Error:', data);
          setContent(null);
          setAlertProps({
            ...alertProps,
            message: data.message || 'Something went wrong',
            canRedirect: false,
          });
          showAlert();
        }
      } catch (error) {
        setContent(null);
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
    })();
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0097A7" barStyle="light-content" />

      <CustomAlert
        isVisible={alertVisible}
        onClose={hideAlert}
        message={alertProps.message}
        canRedirect={alertProps.canRedirect}
        navigation={navigation}
        redirectRoute="Login"
      />

      <Text style={styles.header}>
        Hello {userData?.name || userData?.center_name},
      </Text>
      <View style={styles.scrollWrapperOne}>
        <View style={styles.scrollingContainer}></View>
      </View>
      <View style={styles.scrollWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/home-vector.60eaedb1083724ec6f59.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : content ? (
            <>
              <Text style={styles.statsHeader}>Quick Stats</Text>

              <View style={styles.statsContainer}>
                <TouchableOpacity
                  style={styles.statBox}
                  onPress={() => navigation.navigate('Referrals')}
                >
                  <View style={styles.iconLabelContainer}>
                    <FontAwesome5 name="file-medical" size={30} color="grey" />
                    <Text style={styles.statLabel}>Total Referrals</Text>
                  </View>
                  <Text style={styles.statValue}>
                    {content?.referral_count || '0'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.statBox}
                  onPress={() => navigation.navigate('LabReports')}
                >
                  <View style={styles.iconLabelContainer}>
                    <MaterialCommunityIcons
                      name="text-box"
                      size={30}
                      color="grey"
                    />
                    <Text style={styles.statLabel}>Completed Reports</Text>
                  </View>
                  <Text style={styles.statValue}>
                    {content?.report_count || '0'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No data available</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  imageContainer: {
    paddingVertical: 45,
  },
  scrollWrapperOne: {
    height: 20,
    backgroundColor: '#0097A7',
  },
  scrollingContainer: {
    height: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    backgroundColor: '#0097A7',
    color: '#fff',
    padding: 20,
    paddingVertical: 50,
    fontSize: 22,
    fontFamily: 'Poppins-Regular',
  },
  scrollWrapper: {
    flex: 1,
    backgroundColor: '#0097A7', // header color
  },
  image: {
    width: '100%',
    height: 350,
    alignSelf: 'center',
    marginTop: 10,
  },
  statsHeader: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    margin: 20,
  },
  statsContainer: {
    paddingHorizontal: 20,
    gap: 15,
  },
  statBox: {
    borderWidth: 3,
    borderColor: '#B2DFDB',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
  icon: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15, // works in React Native 0.71+. If not supported, use marginRight
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  noDataText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
});
