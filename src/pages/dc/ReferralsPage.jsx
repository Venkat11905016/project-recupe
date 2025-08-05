// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/Ionicons';

// const referralsData = [
//   {
//     id: '1',
//     name: 'Suresh',
//     date: '29-07-2025',
//     doctor: 'Pavankalyan',
//     tests: 'Dengue test, Blood test,',
//   },
//   {
//     id: '2',
//     name: 'Harsha',
//     date: '05-07-2025',
//     doctor: 'Pavankalyan',
//     tests: 'Blood test, Sugar test',
//   },
//   {
//     id: '3',
//     name: 'Vinay',
//     date: '12-06-2025',
//     doctor: 'Pavankalyan',
//     tests: 'Sugar test, Blood test',
//   },
//   {
//     id: '4',
//     name: 'Pavan',
//     date: '06-06-2025',
//     doctor: 'Pavankalyan',
//     tests: 'Dengue test, Sugar test',
//   },
// ];

// export default function ReferralsPage() {
//   const navigation = useNavigation();

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('ReferralInfo', { referral: item })}
//     >
//       <View style={styles.row}>
//         <Text style={styles.name}>{item.name}</Text>
//         <View style={styles.dateContainer}>
//           <Text style={styles.date}>{item.date}</Text>
//           <MaterialCommunityIcons
//             name="chevron-right"
//             size={29}
//             color="#08979d"
//           />
//         </View>
//       </View>
//       <View style={styles.newRow}>
//         <Text style={styles.doctor}>{item.doctor}</Text>
//         {/* <Text style={styles.tests} numberOfLines={1}>
//           {item.tests}
//         </Text> */}
//         <Text style={styles.tests} numberOfLines={1} ellipsizeMode="tail">
//           {item.tests}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#08979d" barStyle="light-content" />
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <FontAwesome6 name="arrow-left" size={28} color="#fff" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Entypo name="home" size={30} color="#fff" />
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.header}>Referrals</Text>
//       {/* <TextInput
//         placeholder="Search"
//         placeholderTextColor="black"
//         style={styles.searchInput}
//       /> */}
//       <View style={styles.searchContainer}>
//         <TextInput placeholder="Search" style={styles.searchInput} />
//         <Icon name="search" size={24} color="black" style={styles.searchIcon} />
//       </View>
//       {referralsData.length === 0 ? (
//         <TouchableOpacity style={styles.cardNew}>
//           <View style={styles.row}>
//             <Text style={styles.newName}>No Referral found</Text>
//           </View>
//         </TouchableOpacity>
//       ) : (
//         <FlatList
//           data={referralsData}
//           keyExtractor={item => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={styles.list}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: {
//     backgroundColor: '#08979d',
//     fontSize: 23,
//     paddingTop: 10,
//     paddingBottom: 20,
//     color: '#fff',
//     textAlign: 'center',
//     fontFamily: 'Poppins-Regular',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#08979d',
//     paddingHorizontal: 15,
//     paddingBottom: 15,
//     paddingTop: 5,
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between', // or 'flex-start' based on spacing preference
//   },

//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#ccc',
//     borderRadius: 30,
//     height: 60,
//     // margin: 18,
//     marginVertical: 18,
//     marginTop: 20,
//     marginHorizontal: 12,
//     paddingHorizontal: 10,
//     paddingLeft: 20,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 18,
//     fontFamily: 'Poppins-Regular',
//     color: 'black',
//   },

//   searchIcon: {
//     marginRight: 15,
//   },
//   // searchInput: {
//   //   margin: 15,
//   //   padding: 10,
//   //   height: 60,
//   //   borderColor: '#ccc',
//   //   paddingLeft: 20,
//   // },
//   list: { paddingHorizontal: 15 },
//   card: {
//     borderWidth: 3,
//     borderColor: 'rgba(0, 0, 0, 0.1)',
//     borderRadius: 8,
//     padding: 15,

//     marginBottom: 15,
//   },
//   cardNew: {
//     borderWidth: 3,
//     borderColor: 'rgba(0, 0, 0, 0.1)',
//     borderRadius: 8,
//     padding: 15,
//     paddingHorizontal: 18,
//     paddingVertical: 10,
//     margin: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   newRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 12,
//   },
//   name: {
//     fontSize: 20,
//     fontFamily: 'Poppins-SemiBold',
//   },
//   newName: {
//     fontSize: 20,
//     fontFamily: 'Poppins-Medium',
//   },
//   date: {
//     fontSize: 18,
//     color: 'black',
//     fontFamily: 'Poppins-Regular',
//   },
//   doctor: {
//     color: 'grey',
//     marginTop: 5,
//     fontSize: 17,
//     // maxWidth: 200,
//     fontFamily: 'Poppins-Regular',
//   },
//   tests: {
//     color: 'grey',
//     marginTop: 2,
//     fontSize: 17,
//     // maxWidth: 200,
//     fontFamily: 'Poppins-Regular',
//   },
// });
// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/Ionicons';

// const referralsData = [
//   {
//     id: '1',
//     name: 'Suresh',
//     date: '29-07-2025',
//     doctor: 'Pavankalyan',
//     tests: 'Dengue test, Blood test',
//   },
//   {
//     id: '2',
//     name: 'Harsha',
//     date: '05-07-2025',
//     doctor: 'Pavankalyan',
//     tests: 'Blood test, Sugar test',
//   },
//   {
//     id: '3',
//     name: 'Vinay',
//     date: '12-06-2025',
//     doctor: 'Pavankalyan',
//     tests: 'Sugar test, Blood test',
//   },
//   {
//     id: '4',
//     name: 'Pavan',
//     date: '06-06-2025',
//     doctor: 'Pavankalyan',
//     tests: 'Dengue test, Sugar test',
//   },
// ];

// export default function ReferralsPage() {
//   const navigation = useNavigation();

//   const [searchQuery, setSearchQuery] = React.useState('');
//   const [filteredData, setFilteredData] = React.useState(referralsData);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('ReferralInfo', { referral: item })}
//     >
//       <View style={styles.row}>
//         <Text style={styles.name}>{item.name}</Text>
//         <View style={styles.dateContainer}>
//           <Text style={styles.date}>{item.date}</Text>
//           <MaterialCommunityIcons
//             name="chevron-right"
//             size={33}
//             color="#08979d"
//           />
//         </View>
//       </View>
//       <View style={styles.newRow}>
//         <Text style={styles.doctor}>{item.doctor}</Text>
//         <Text style={styles.tests} numberOfLines={1} ellipsizeMode="tail">
//           {item.tests}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const handleSearch = text => {
//     setSearchQuery(text);
//     const filtered = referralsData.filter(
//       item =>
//         item.name.toLowerCase().includes(text.toLowerCase()) ||
//         item.date.toLowerCase().includes(text.toLowerCase()) ||
//         item.doctor.toLowerCase().includes(text.toLowerCase()) ||
//         item.tests.toLowerCase().includes(text.toLowerCase()),
//     );
//     setFilteredData(filtered);
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#08979d" barStyle="light-content" />
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <FontAwesome6 name="arrow-left" size={28} color="#fff" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Entypo name="home" size={30} color="#fff" />
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.header}>Referrals</Text>

//       {/* Search */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           placeholder="Search"
//           style={styles.searchInput}
//           value={searchQuery}
//           onChangeText={handleSearch}
//         />
//         <Icon name="search" size={24} color="black" style={styles.searchIcon} />
//       </View>

//       {/* List */}
//       {filteredData.length === 0 ? (
//         <TouchableOpacity style={styles.cardNew}>
//           <View style={styles.row}>
//             <Text style={styles.newName}>No Referral found</Text>
//           </View>
//         </TouchableOpacity>
//       ) : (
//         <FlatList
//           data={filteredData}
//           keyExtractor={item => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={styles.list}
//         />
//       )}
//     </View>
//   );
// }
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   ActivityIndicator,
// } from 'react-native';
// import { useNavigation, useIsFocused } from '@react-navigation/native';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function ReferralsPage() {
//   const navigation = useNavigation();
//   const isFocused = useIsFocused();

//   const [searchQuery, setSearchQuery] = useState('');
//   const [referralsData, setReferralsData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [role, setRole] = React.useState(null);
//   const [userData, setUserData] = React.useState({});
//   useEffect(() => {
//     if (isFocused) fetchReferrals();
//   }, [isFocused]);

//   const fetchReferrals = async () => {
//     try {
//       setLoading(true);
//       const dc_id = await AsyncStorage.getItem('dc_id');
//       let userInfo = JSON.parse(
//         (await AsyncStorage.getItem('userData')) || '{}',
//       );
//       setUserData(userInfo);
//       console.log(userInfo, '====Home Page');
//       // setRole(userRole);
//       // console.log(userRole);
//       if (!dc_id) {
//         console.warn('dc_id not found in AsyncStorage');
//         setReferralsData([]);
//         setFilteredData([]);
//         return;
//       }

//       const response = await fetch(
//         `https://recupe.in/api/getAllReferralsByDc/${dc_id}`,
//       );
//       const json = await response.json();
//       console.log('the dc id is', dc_id);
//       if (json.result_code === 0 && json.status === 'S') {
//         const mappedData = json.result_info.map(item => ({
//           id: item.referral_id.toString(),
//           name: item.patient_name,
//           date: item.referred_date,
//           doctor: item.doctor_name,
//           tests: item.tests,
//           fullData: item, // for detail screen
//         }));

//         setReferralsData(mappedData);
//         setFilteredData(mappedData);
//       } else {
//         setReferralsData([]);
//         setFilteredData([]);
//         console.warn('API response invalid:', json);
//       }
//     } catch (error) {
//       console.error('Error fetching referrals:', error);
//       setReferralsData([]);
//       setFilteredData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = text => {
//     setSearchQuery(text);
//     const filtered = referralsData.filter(
//       item =>
//         item.name.toLowerCase().includes(text.toLowerCase()) ||
//         item.date.toLowerCase().includes(text.toLowerCase()) ||
//         item.doctor.toLowerCase().includes(text.toLowerCase()) ||
//         item.tests.toLowerCase().includes(text.toLowerCase()),
//     );
//     setFilteredData(filtered);
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() =>
//         navigation.navigate('ReferralInfo', { referral: item.fullData })
//       }
//     >
//       <View style={styles.row}>
//         <Text style={styles.name}>{item.name}</Text>
//         <View style={styles.dateContainer}>
//           <Text style={styles.date}>{item.date}</Text>
//           <MaterialCommunityIcons
//             name="chevron-right"
//             size={33}
//             color="#08979d"
//           />
//         </View>
//       </View>
//       <View style={styles.newRow}>
//         <Text style={styles.doctor}>{item.doctor}</Text>
//         <Text style={styles.tests} numberOfLines={1} ellipsizeMode="tail">
//           {item.tests}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#08979d" barStyle="light-content" />

//       {/* Header */}
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <FontAwesome6 name="arrow-left" size={28} color="#fff" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Entypo name="home" size={30} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.header}>Referrals</Text>

//       {/* Search */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           placeholder="Search"
//           style={styles.searchInput}
//           value={searchQuery}
//           onChangeText={handleSearch}
//         />
//         <Icon name="search" size={24} color="black" style={styles.searchIcon} />
//       </View>

//       {/* Loader or List */}
//       {loading ? (
//         <ActivityIndicator
//           size="large"
//           color="#08979d"
//           style={{ marginTop: 20 }}
//         />
//       ) : filteredData.length === 0 ? (
//         <TouchableOpacity style={styles.cardNew}>
//           <View style={styles.row}>
//             <Text style={styles.newName}>No Referral found</Text>
//           </View>
//         </TouchableOpacity>
//       ) : (
//         <FlatList
//           data={filteredData}
//           keyExtractor={item => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={styles.list}
//         />
//       )}
//     </View>
//   );
// }
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../../components/CustomAlert';
import { requestOptions, redirectLogin } from '../../../token';

export default function ReferralsPage() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [searchQuery, setSearchQuery] = useState('');
  const [referralsData, setReferralsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [userData, setUserData] = useState({});
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    canRedirect: false,
    message: '',
  });

  const showAlert = () => setAlertVisible(true);
  const hideAlert = () => setAlertVisible(false);

  useEffect(() => {
    if (isFocused) fetchReferrals();
  }, [isFocused]);

  const fetchReferrals = async () => {
    try {
      setLoading(true);

      const userRole = parseInt(await AsyncStorage.getItem('role_id'));
      const userInfo = JSON.parse(
        (await AsyncStorage.getItem('userData')) || '{}',
      );
      const storedDcId = await AsyncStorage.getItem('dc_id');
      const dc_id = storedDcId || userInfo.dc_id || '';
      const correl_id = (await AsyncStorage.getItem('correl_id')) || '';

      setRole(userRole);
      setUserData(userInfo);

      if (!userRole || !dc_id) {
        console.warn('Missing userRole or dc_id');
        setReferralsData([]);
        setFilteredData([]);
        return;
      }

      let response;
      const headers = await requestOptions();

      if (userRole === 3) {
        response = await fetch(
          `https://recupe.in/api/getAllReferralsByDc/${dc_id}`,
          headers,
        );
      } else if (userRole === 2) {
        response = await fetch(
          `https://recupe.in/api/getDoctorReferrals/${correl_id}`,
          headers,
        );
      } else {
        console.warn('Unsupported role');
        setReferralsData([]);
        setFilteredData([]);
        return;
      }

      const json = await response.json();
      console.log('Fetched Referrals:', json);

      if (json.status === 'S' && json.result_code === 0) {
        const mappedData = json.result_info.map(item => ({
          id: item.referral_id.toString(),
          name: item.patient_name,
          date: item.referred_date,
          doctor: item.doctor_name,
          tests: item.tests,
          fullData: item,
        }));
        setReferralsData(mappedData);
        setFilteredData(mappedData);
      } else if (json.status === 'F' && json.result_code === 505) {
        redirectLogin(navigation);
      } else {
        setAlertProps({
          canRedirect: false,
          message: json.message || 'Something went wrong',
        });
        showAlert();
        setReferralsData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error('Error fetching referrals:', error);
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
    const filtered = referralsData.filter(
      item =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.date.toLowerCase().includes(text.toLowerCase()) ||
        item.doctor.toLowerCase().includes(text.toLowerCase()) ||
        item.tests.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('ReferralInfo', { referral: item.fullData })
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
        <Text style={styles.doctor}>{item.doctor}</Text>
        <Text style={styles.tests} numberOfLines={1} ellipsizeMode="tail">
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

      <Text style={styles.header}>Referrals</Text>

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
            <Text style={styles.newName}>No Referral found</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}
// Keep your styles as-is from previous message

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
    alignItems: 'center',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
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
  list: { paddingHorizontal: 15 },
  card: {
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
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
  newName: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
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
});
