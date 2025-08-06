// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   StatusBar,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

// const ReferralInfoPage = () => {
//   const navigation = useNavigation();

//   const patientName = 'Vinay';
//   const mobileNumber = '3333333333';
//   const tests = ['Blood test', 'Dengue test', 'Sugar test'];
//   const status = 'Partially Completed';

//   return (
//     <View style={{ flex: 1 }}>
//       {/* Header - OUTSIDE ScrollView */}
//       <StatusBar backgroundColor="#08979d" barStyle="light-content" />
//       <View style={styles.iconHeader}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <FontAwesome6 name="arrow-left" size={28} color="#fff" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Entypo name="home" size={28} color="#fff" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Referral Info</Text>
//       </View>

//       {/* Scrollable Form Section */}
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.label}>Patient Name</Text>
//         <TextInput value={patientName} style={styles.input} editable={false} />

//         <Text style={styles.label}>Mobile Number</Text>
//         <TextInput value={mobileNumber} style={styles.input} editable={false} />

//         <Text style={styles.label}>Tests</Text>
//         <View style={styles.testContainer}>
//           {tests.map(test => (
//             <View key={test} style={styles.testChip}>
//               <Text style={styles.testText}>{test}</Text>
//             </View>
//           ))}
//         </View>

//         <Text style={styles.label}>Status</Text>
//         <TextInput value={status} style={styles.input} editable={false} />
//       </ScrollView>
//       <View style={styles.buttonRow}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.backText}>BACK</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.uploadButton}
//           onPress={() => navigation.navigate('ReportInfo')}
//         >
//           <Text style={styles.uploadText}>UPLOAD REPORTS</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ReferralInfoPage;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { requestOptions, redirectLogin } from '../../../token';

const ReferralInfoPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { referral } = route.params || {};

  const [referralInfo, setReferralInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (referral?.referral_id) fetchReferralDetails(referral.referral_id);
  }, [referral]);

  const fetchReferralDetails = async referral_id => {
    try {
      setLoading(true);
      const headers = await requestOptions();
      const response = await fetch(
        `https://recupe.in/api/getReferralInfo/${referral_id}`,
        headers,
      );
      const json = await response.json();
      if (json.status === 'S' && json.result_code === 0) {
        setReferralInfo(json.result_info);
        console.log('>>>>>>>>>>>>>>>>>>>', referralInfo);
      } else if (json.status === 'F' && json.result_code === 505) {
        redirectLogin(navigation);
      } else {
        console.warn('Failed to load referral info:', json.message);
      }
    } catch (err) {
      console.error('Error fetching referral info:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderTests = (referralInfo?.test_names || []).map((test, index) => (
    <View key={index} style={styles.testChip}>
      <Text style={styles.testText}>{test.name}</Text>
    </View>
  ));

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#08979d" barStyle="light-content" />

      <View style={styles.iconHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Referral Info</Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#08979d"
          style={{ marginTop: 20 }}
        />
      ) : referralInfo ? (
        <>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Patient Name</Text>
            <TextInput
              value={referralInfo.patient_name}
              style={styles.input}
              editable={false}
            />

            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              value={referralInfo.mobile}
              style={styles.input}
              editable={false}
            />

            <Text style={styles.label}>Tests</Text>
            <View style={styles.testContainer}>{renderTests}</View>

            <Text style={styles.label}>Status</Text>
            <TextInput
              value={referralInfo.status}
              style={styles.input}
              editable={false}
            />
          </ScrollView>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>
            {console.log('the referallInfo status', referralInfo.status)}
            {referralInfo.status == 'Completed' ? (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() =>
                  navigation.navigate('ReportInfo', {
                    report: referralInfo,
                  })
                }
                // onPress={() =>
                //   navigation.navigate('ReportInfo', { report: item.fullData })
                // }
                // navigation.navigate('ReportInfo', { report: item.fullData })
              >
                <Text style={styles.uploadText}>VIEW REPORTS</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() =>
                  navigation.navigate('ReportInfo', {
                    report: referralInfo,
                  })
                }
              >
                <Text style={styles.uploadText}>UPLOAD REPORTS</Text>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => navigation.navigate('ReportInfo')}
        >
          <Text style={styles.uploadText}>UPLOAD REPORTS</Text>
        </TouchableOpacity> */}
          </View>
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Referral details not found.</Text>
        </View>
      )}
    </View>
  );
};

export default ReferralInfoPage;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#08979d',
    paddingTop: 10,
    paddingBottom: 20,
    // marginBottom: 20,
    textAlign: 'center',
  },
  iconHeader: {
    backgroundColor: '#08979d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
  },
  headerTitle: {
    fontSize: 23,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginTop: 12,
    marginBottom: 6,
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  testContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  testChip: {
    backgroundColor: '#08979d',
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 4,
  },
  testText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 18,
  },
  backButton: {
    borderWidth: 2,
    borderColor: '#08979d',
    borderRadius: 8,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  uploadButton: {
    backgroundColor: '#08979d',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  backText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#08979d',
    fontFamily: 'Poppins-SemiBold',
  },
  uploadText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});
