import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../../components/CustomAlert';
import { requestOptions, redirectLogin } from '../../../token';

export default function LabReportsPage() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [searchQuery, setSearchQuery] = useState('');
  const [reportsData, setReportsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    canRedirect: false,
    message: '',
  });

  const showAlert = () => setAlertVisible(true);
  const hideAlert = () => setAlertVisible(false);

  useEffect(() => {
    if (isFocused) fetchReports();
  }, [isFocused]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(
        (await AsyncStorage.getItem('userData')) || '{}',
      );
      const storedDcId = await AsyncStorage.getItem('dc_id');
      const dc_id = storedDcId || userInfo.dc_id || '';

      if (!dc_id) {
        console.warn('Missing dc_id');
        setReportsData([]);
        setFilteredData([]);
        return;
      }

      const headers = await requestOptions();
      const response = await fetch(
        `https://recupe.in/api/getAllReportsByDc/${dc_id}`,
        headers,
      );
      const json = await response.json();

      console.log('Fetched Reports:', json);

      if (json.status === 'S' && json.result_code === 0) {
        const mappedData = json.result_info.map(item => ({
          id: item.referral_id.toString(),
          name: item.patient_name,
          date: item.created_date,
          referredBy: item.doctor_name,
          tests: item.tests,
          fullData: item,
        }));
        setReportsData(mappedData);
        setFilteredData(mappedData);
      } else if (json.status === 'F' && json.result_code === 505) {
        redirectLogin(navigation);
      } else {
        setAlertProps({
          canRedirect: false,
          message: json.message || 'Something went wrong',
        });
        showAlert();
        setReportsData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setAlertProps({
        canRedirect: false,
        message: 'Something went wrong',
      });
      showAlert();
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = reportsData.filter(
      item =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.date.toLowerCase().includes(text.toLowerCase()) ||
        item.referredBy.toLowerCase().includes(text.toLowerCase()) ||
        item.tests.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('ReportInfo', { report: item.fullData })
      }
    >
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{item.date}</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={33}
            color="#08979d"
          />
        </View>
      </View>
      <View style={styles.newRow}>
        <Text style={styles.doctor}>{item.referredBy}</Text>
        <Text style={styles.tests} numberOfLines={1}>
          {item.tests}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#08979d" barStyle="light-content" />
      <CustomAlert
        isVisible={alertVisible}
        onClose={hideAlert}
        message={alertProps.message}
        canRedirect={alertProps.canRedirect}
        navigation={navigation}
        redirectRoute="Login"
      />

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome6 name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Reports</Text>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Icon name="search" size={24} color="black" style={styles.searchIcon} />
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#08979d"
          style={{ marginTop: 20 }}
        />
      ) : filteredData.length === 0 ? (
        <TouchableOpacity style={styles.cardNew}>
          <View style={styles.row}>
            <Text style={styles.name}>No Reports found</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </View>
  );
}
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   StatusBar,
//   ScrollView,
//   ActivityIndicator,
//   Linking,
// } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import { requestOptions, redirectLogin } from '../../../token';
// import CustomAlert from '../../components/CustomAlert';

// const ReportInfoPage = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { report } = route.params;

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertProps, setAlertProps] = useState({
//     canRedirect: false,
//     message: '',
//   });

//   const showAlert = () => setAlertVisible(true);
//   const hideAlert = () => setAlertVisible(false);

//   useEffect(() => {
//     if (report?.referral_id) {
//       fetchReportDetails(report.referral_id);
//     }
//   }, [report]);

//   const fetchReportDetails = async referral_id => {
//     try {
//       setLoading(true);
//       const headers = await requestOptions();
//       const response = await fetch(
//         `https://recupe.in/api/getReferralInfo/${referral_id}`,
//         headers,
//       );
//       const json = await response.json();

//       if (json.status === 'S' && json.result_code === 0) {
//         setData(json.result_info);
//       } else if (json.status === 'F' && json.result_code === 505) {
//         redirectLogin(navigation);
//       } else {
//         setAlertProps({
//           canRedirect: false,
//           message: json.message || 'Something went wrong',
//         });
//         showAlert();
//       }
//     } catch (error) {
//       console.error('Error fetching report info:', error);
//       setAlertProps({
//         canRedirect: false,
//         message: 'Something went wrong',
//       });
//       showAlert();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderCompletedItem = ({ item, index }) => {
//     const handleView = () => {
//       if (item?.report_path) {
//         const fullUrl = `https://recupe.in/api/files/reports/${item.report_path}`;
//         Linking.openURL(fullUrl).catch(err =>
//           console.error('Failed to open PDF:', err),
//         );
//       } else {
//         console.warn('No file available to open');
//       }
//     };

//     return (
//       <View style={styles.row}>
//         <Text style={[styles.cell, { flex: 2 }]}>{index + 1}</Text>
//         <Text style={[styles.cell, { flex: 4 }]}>{item.report_name}</Text>
//         <Text style={[styles.cell, { flex: 10 }]} numberOfLines={1}>
//           {item.file_name}
//         </Text>
//         <TouchableOpacity
//           style={[styles.iconButton, { flex: 2 }]}
//           onPress={handleView}
//         >
//           <MaterialCommunityIcons name="eye" size={20} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const completedReports =
//     data?.tests?.filter(item => item.report_name && item.report_name.trim()) ||
//     [];

//   const pendingReports =
//     data?.tests?.filter(
//       item => !item.report_name || item.report_name.trim().length === 0,
//     ) || [];

//   return (
//     <>
//       <StatusBar backgroundColor="#08979d" barStyle="light-content" />
//       <CustomAlert
//         isVisible={alertVisible}
//         onClose={hideAlert}
//         message={alertProps.message}
//         canRedirect={alertProps.canRedirect}
//         navigation={navigation}
//         redirectRoute="Login"
//       />
//       <View style={styles.iconHeader}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <FontAwesome6 name="arrow-left" size={28} color="#fff" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Entypo name="home" size={28} color="#fff" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Report Info</Text>
//       </View>

//       {loading ? (
//         <ActivityIndicator
//           size="large"
//           color="#08979d"
//           style={{ marginTop: 40 }}
//         />
//       ) : data ? (
//         <ScrollView
//           style={styles.container}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         >
//           <Text style={styles.label}>Patient Name</Text>
//           <TextInput
//             value={data.patient_name}
//             style={styles.input}
//             editable={false}
//           />

//           <Text style={styles.label}>Mobile Number</Text>
//           <TextInput
//             value={data.mobile}
//             style={styles.input}
//             editable={false}
//           />

//           {/* ✅ Completed Reports Table */}
//           <Text style={styles.label}>Completed Reports</Text>
//           <View style={styles.tableHeader}>
//             <Text style={[styles.tableHeaderText, { flex: 2 }]}>#</Text>
//             <Text style={[styles.tableHeaderText, { flex: 4 }]}>Test Name</Text>
//             <Text style={[styles.tableHeaderText, { flex: 10 }]}>
//               File Name
//             </Text>
//             <Text style={[styles.tableHeaderText, { flex: 2 }]}>View</Text>
//           </View>
//           {completedReports.length === 0 ? (
//             <Text style={styles.emptyValue}>No reports uploaded</Text>
//           ) : (
//             <FlatList
//               data={completedReports}
//               renderItem={renderCompletedItem}
//               keyExtractor={(item, index) => index.toString()}
//               scrollEnabled={false}
//             />
//           )}

//           {/* ✅ Pending Reports Table */}
//           <Text style={[styles.label, { marginTop: 24 }]}>Pending Reports</Text>
//           <View style={styles.tableHeader}>
//             <Text style={[styles.tableHeaderText, { flex: 3 }]}>Test Name</Text>
//             <Text style={[styles.tableHeaderText, { flex: 2 }]}>Upload</Text>
//           </View>
//           {pendingReports.length === 0 ? (
//             <Text style={styles.emptyValue}>No pending uploads</Text>
//           ) : (
//             pendingReports.map((item, index) => (
//               <View key={index} style={styles.row}>
//                 <Text style={[styles.cell, { flex: 3 }]}>{item.test_name}</Text>
//                 <TouchableOpacity
//                   style={[styles.iconButton, { flex: 2 }]}
//                   onPress={() =>
//                     navigation.navigate('UploadReport', {
//                       test: item,
//                       referral_id: report.referral_id,
//                     })
//                   }
//                 >
//                   <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium' }}>
//                     Upload
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             ))
//           )}
//         </ScrollView>
//       ) : null}
//     </>
//   );
// };

// export default ReportInfoPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#08979d',
    fontSize: 23,
    paddingTop: 10,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#08979d',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  date: {
    fontSize: 18,
    color: 'black',
    marginRight: 3,
    fontFamily: 'Poppins-Regular',
  },
  doctor: {
    color: 'grey',
    marginTop: 5,
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
  tests: {
    color: 'grey',
    marginTop: 2,
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
  card: {
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 5,
  },
  cardNew: {
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 15,
    paddingHorizontal: 18,
    paddingVertical: 10,
    margin: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 30,
    height: 60,
    marginTop: 20,
    marginBottom: 8,
    marginHorizontal: 12,
    paddingHorizontal: 10,
    paddingLeft: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  searchIcon: {
    marginRight: 15,
  },
});
