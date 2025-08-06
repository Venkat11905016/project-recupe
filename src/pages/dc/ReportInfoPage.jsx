import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { requestOptions, redirectLogin } from '../../../token';
import CustomAlert from '../../components/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchDocumentPicker } from 'react-native-image-picker';
import { pick, types, isCancel } from '@react-native-documents/picker';

const ReportInfoPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { report } = route.params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    canRedirect: false,
    message: '',
  });
  const [pendingUploads, setPendingUploads] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});
  const showAlert = () => setAlertVisible(true);
  const hideAlert = () => setAlertVisible(false);
  console.log('the pending uploads aree', pendingUploads);
  useEffect(() => {
    if (report?.referral_id) {
      fetchReportDetails(report.referral_id);
    }
  }, [report]);

  const deleteReferralReport = async reportId => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token, 'the token ++++++++++++++++token.jsx');

      const response = await fetch(
        `https://recupe.in/api/deleteReferralReport/${reportId}`,
        {
          method: 'DELETE',
          headers: {
            'x-access-token': token,
            // 'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const result = await response.json();
      console.log('Delete response is:', result);
      console.log(token, 'the token ++++++++++++++++token.jsx');

      if (response.ok && result.status === 'S') {
        alert('Report deleted successfully!');
        fetchReportDetails(report.referral_id); // Refresh
      } else if (result.result_code === 505) {
        redirectLogin(navigation); // Token expired
      } else {
        alert('Failed to delete: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Something went wrong while deleting the report');
    }
  };
  const handleSaveReports = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const referred_by = await AsyncStorage.getItem('correl_id');

      if (!token || !report?.dc_id || !referred_by || !report?.referral_id) {
        setAlertProps({
          message: 'Missing required information for upload',
          canRedirect: false,
        });
        showAlert();
        return;
      }

      const formData = new FormData();

      formData.append('referral_id', report.referral_id);
      formData.append('dc_id', report.dc_id);
      formData.append('referred_by', referred_by);
      formData.append('status', 'Partially Completed');

      Object.entries(pendingUploads).forEach(([testId, fileList]) => {
        fileList.forEach((file, index) => {
          if (file?.uri && file?.name && file?.type) {
            let uri = file.uri;

            // Handle content:// URI on Android
            if (uri.startsWith('content://')) {
              // Accept as is — FormData will process it correctly on Android
              // No need to convert unless you're seeing empty files on backend
            }

            formData.append(`report_${testId}_${index}`, {
              uri,
              name: file.name,
              type: file.type,
            });
          }
        });
      });

      console.log('--- FormData contents ---');
      formData._parts.forEach(([key, value]) => {
        if (typeof value === 'object' && value?.uri) {
          console.log(`Key: ${key}`, {
            name: value.name,
            type: value.type,
            uri: value.uri,
          });
        } else {
          console.log(`Key: ${key}, Value: ${value}`);
        }
      });

      const response = await fetch(
        'https://recupe.in/api/updateReferralReports',
        {
          method: 'POST',
          headers: {
            'x-access-token': token,
            Accept: 'application/json',
            // Do NOT set Content-Type here; fetch will do it automatically for FormData
          },
          body: formData,
        },
      );

      const resJson = await response.json();
      console.log('Upload response:', resJson);

      if (resJson.status === 'S') {
        setPendingUploads({});
        fetchReportDetails(report.referral_id);
      } else {
        setAlertProps({
          message: resJson.message || 'Upload failed',
          canRedirect: false,
        });
        showAlert();
      }
    } catch (error) {
      console.error('Save report error:', error);
      setAlertProps({
        message: 'Something went wrong while uploading',
        canRedirect: false,
      });
      showAlert();
    }
  };
  // const handleSaveReports = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     const referred_by = await AsyncStorage.getItem('correl_id');

  //     if (!token || !report?.dc_id || !referred_by || !report?.referral_id) {
  //       setAlertProps({
  //         message: 'Missing required information for upload',
  //         canRedirect: false,
  //       });
  //       showAlert();
  //       return;
  //     }

  //     const formData = new FormData();

  //     // Append text fields
  //     formData.append('referral_id', report.referral_id);
  //     formData.append('dc_id', report.dc_id);
  //     formData.append('referred_by', referred_by);
  //     formData.append('status', 'Partially Completed');

  //     // Append files (multiple files per testId under the same key)
  //     Object.entries(pendingUploads).forEach(([testId, fileList]) => {
  //       fileList.forEach(file => {
  //         if (file?.uri && file?.name && file?.type) {
  //           formData.append(`report_${testId}`, {
  //             uri: file.uri,
  //             name: file.name,
  //             type: file.type,
  //           });
  //         }
  //       });
  //     });

  //     // Optional: Debug log
  //     console.log('--- FormData contents ---');
  //     formData._parts.forEach(([key, value]) => {
  //       if (typeof value === 'object' && value?.uri) {
  //         console.log(`Key: ${key}`, {
  //           name: value.name,
  //           type: value.type,
  //           uri: value.uri,
  //         });
  //       } else {
  //         console.log(`Key: ${key}, Value: ${value}`);
  //       }
  //     });

  //     const response = await fetch(
  //       'https://recupe.in/api/updateReferralReports',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'x-access-token': token,
  //           Accept: 'application/json',
  //           // ❌ Don't set Content-Type manually
  //         },
  //         body: formData,
  //       },
  //     );

  //     const resJson = await response.json();
  //     console.log('Upload response:', resJson);

  //     if (resJson.status === 'S') {
  //       setPendingUploads({});
  //       fetchReportDetails(report.referral_id);
  //     } else {
  //       setAlertProps({
  //         message: resJson.message || 'Upload failed',
  //         canRedirect: false,
  //       });
  //       showAlert();
  //     }
  //   } catch (error) {
  //     console.error('Save report error:', error);
  //     setAlertProps({
  //       message: 'Something went wrong while uploading',
  //       canRedirect: false,
  //     });
  //     showAlert();
  //   }
  // };
  const fetchReportDetails = async referral_id => {
    try {
      setLoading(true);
      const headers = await requestOptions();
      const response = await fetch(
        `https://recupe.in/api/getReferralInfo/${referral_id}`,
        headers,
      );
      const json = await response.json();

      if (json.status === 'S' && json.result_code === 0) {
        setData(json.result_info);
      } else if (json.status === 'F' && json.result_code === 505) {
        redirectLogin(navigation);
      } else {
        setAlertProps({
          canRedirect: false,
          message: json.message || 'Something went wrong',
        });
        showAlert();
      }
    } catch (error) {
      console.error('Error fetching report info:', error);
      setAlertProps({
        canRedirect: false,
        message: 'Something went wrong',
      });
      showAlert();
    } finally {
      setLoading(false);
    }
  };
  
  const handleSelectFile = async testItem => {
    console.log('Opening file picker...');
    try {
      const picked = await pick({
        allowMultiSelection: true,
        type: [types.pdf],
      });

      const results = Array.isArray(picked) ? picked : [picked];

      if (!results || results.length === 0) {
        console.log('No PDF selected');
        return;
      }

      console.log('Picked files:', results);

      // Set or update the pending uploads for the selected test item
      setPendingUploads(prev => {
        const existing = prev[testItem.id] || [];
        return {
          ...prev,
          [testItem.id]: [...existing, ...results],
        };
      });
    } catch (err) {
      if (isCancel(err)) {
        console.log('User cancelled picker');
      } else {
        console.error('Picker error:', err);
        setAlertProps({
          message: 'File selection failed',
          canRedirect: false,
        });
        showAlert();
      }
    }
  };

  const renderCompletedItem = ({ item, index }) => {
    const handleView = () => {
      if (item?.report_path) {
        const fullUrl = `https://recupe.in/api/files/reports/${item.report_path}`;
        Linking.openURL(fullUrl).catch(err =>
          console.error('Failed to open PDF:', err),
        );
      } else {
        console.warn('No file available to open');
      }
    };
    // const handleSaveReports = async () => {
    //   try {
    //     const token = await AsyncStorage.getItem('token');
    //     const referred_by = await AsyncStorage.getItem('correl_id');

    //     if (!token || !report?.dc_id || !referred_by || !report?.referral_id) {
    //       setAlertProps({
    //         message: 'Missing required information for upload',
    //         canRedirect: false,
    //       });
    //       showAlert();
    //       return;
    //     }

    //     const formData = new FormData();

    //     // Append basic data
    //     formData.append('referral_id', report.referral_id);
    //     formData.append('dc_id', report.dc_id);
    //     formData.append('referred_by', referred_by);
    //     formData.append('status', 'Partially Completed');
    //     console.log('--- FormData contents ---');
    //     formData._parts.forEach(([key, value]) => {
    //       if (typeof value === 'object' && value?.uri) {
    //         console.log(`Key: ${key}`, {
    //           name: value.name,
    //           type: value.type,
    //           uri: value.uri,
    //         });
    //       } else {
    //         console.log(`Key: ${key}, Value: ${value}`);
    //       }
    //     });
    //     // Append files grouped by testId
    //     Object.entries(pendingUploads).forEach(([testId, fileList]) => {
    //       fileList.forEach((file, index) => {
    //         if (file?.uri && file?.name && file?.type) {
    //           formData.append(`report_${testId}_${index}`, {
    //             uri: file.uri,
    //             name: `${file.name}`, // could prefix with UUID if needed
    //             type: file.type,
    //           });
    //         }
    //       });
    //     });
    //     console.log('the formdata is ', FormData);
    //     const response = await fetch(
    //       'https://recupe.in/api/updateReferralReports',
    //       {
    //         method: 'POST',
    //         headers: {
    //           'x-access-token': token,
    //           Accept: 'application/json',
    //           // Do NOT set Content-Type here; let fetch handle it for FormData
    //         },
    //         body: formData,
    //       },
    //     );

    //     const resJson = await response.json();
    //     console.log('Upload response:', resJson);

    //     if (resJson.status === 'S') {
    //       setPendingUploads({});
    //       fetchReportDetails(report.referral_id);
    //     } else {
    //       setAlertProps({
    //         message: resJson.message || 'Upload failed',
    //         canRedirect: false,
    //       });
    //       showAlert();
    //     }
    //   } catch (error) {
    //     console.error('Save report error:', error);
    //     setAlertProps({
    //       message: 'Something went wrong while uploading',
    //       canRedirect: false,
    //     });
    //     showAlert();
    //   }
    // };
    return (
      <View style={styles.row}>
        <Text style={[styles.cell, { flex: 2 }]}>{index + 1}</Text>
        <Text style={[styles.cell, { flex: 4 }]}>{item.report_name}</Text>
        <Text style={[styles.cell, { flex: 10 }]} numberOfLines={1}>
          {item.file_name}
        </Text>

        <View
          style={[styles.iconButtonGroup, { flex: 5, flexDirection: 'row' }]}
        >
          <TouchableOpacity onPress={handleView} style={styles.iconButton}>
            <MaterialCommunityIcons name="eye" size={20} color="#fff" />
          </TouchableOpacity>
          {data.status !== 'Completed' && (
            <TouchableOpacity
              onPress={() => deleteReferralReport(item.report_id)}
              style={styles.iconButtonDelete}
            >
              <MaterialCommunityIcons name="delete" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const completedReports =
    data?.tests?.filter(item => item.report_path && item.report_path.trim()) ||
    [];

  const pendingReports =
    data?.tests?.filter(
      item => !item.report_path || item.report_path.trim().length === 0,
    ) || [];

  return (
    <>
      <StatusBar backgroundColor="#08979d" barStyle="light-content" />
      <CustomAlert
        isVisible={alertVisible}
        onClose={hideAlert}
        message={alertProps.message}
        canRedirect={alertProps.canRedirect}
        navigation={navigation}
        redirectRoute="Login"
      />
      <View style={styles.iconHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Report Info</Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#08979d"
          style={{ marginTop: 40 }}
        />
      ) : data ? (
        <>
          <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <Text style={styles.label}>Patient Name</Text>
            <TextInput
              value={data.patient_name}
              style={styles.input}
              editable={false}
            />

            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              value={data.mobile}
              style={styles.input}
              editable={false}
            />
            {data.status !== 'Completed' ? (
              <>
                <Text style={[styles.label, { marginTop: 24 }]}>Tests</Text>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderTextNew]}>Test Name</Text>
                  <Text style={[styles.tableHeaderTextNew]}>Upload Report</Text>
                </View>
              </>
            ) : null}
            {data.status !== 'Completed'
              ? data.tests.map((item, index) => (
                  <View key={index} style={styles.rowNew}>
                    <Text style={[styles.cell]}>{item.name}</Text>
                    {/* <TouchableOpacity
                      style={[styles.iconButtonNew]}
                      onPress={() =>
                        navigation.navigate('UploadReport', {
                          test: item,
                          referral_id: report.referral_id,
                        })
                      }
                    >
                      <Text
                        style={{ color: '#fff', fontFamily: 'Poppins-Medium' }}
                      >
                        Upload
                      </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={styles.iconButtonNew}
                      onPress={() => handleSelectFile(item)}
                    >
                      <Text
                        style={{ color: '#fff', fontFamily: 'Poppins-Medium' }}
                      >
                        Upload
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))
              : null}

            {/* ✅ Completed Reports Table */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>#</Text>
              <Text style={[styles.tableHeaderText, { flex: 4 }]}>
                Test Name
              </Text>
              <Text style={[styles.tableHeaderText, { flex: 10 }]}>
                File Name
              </Text>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>View</Text>
            </View>
            {completedReports.length === 0 ? (
              <Text style={styles.emptyValue}>No files uploaded yet</Text>
            ) : (
              <>
                <FlatList
                  data={completedReports}
                  renderItem={renderCompletedItem}
                  keyExtractor={(item, index) => index.toString()}
                  scrollEnabled={false}
                />
                {Object.entries(pendingUploads).map(
                  ([testId, files], pendingIndex) => {
                    const testItem = data?.tests.find(
                      t => t.id.toString() === testId.toString(),
                    );

                    if (!testItem || files.length === 0) return null;

                    return files.map((file, idx) => (
                      <View
                        key={`pending-${testId}-${idx}` + 100000000}
                        style={styles.row}
                      >
                        <Text style={[styles.cell, { flex: 2 }]}>
                          {completedReports.length + idx + 1}
                        </Text>

                        <Text style={[styles.cell, { flex: 4 }]}>
                          {testItem.name}
                        </Text>

                        <Text
                          numberOfLines={1}
                          style={[
                            styles.cell,
                            { flex: 6, fontSize: 12, color: 'gray' },
                          ]}
                        >
                          {file.name}
                        </Text>

                        <TouchableOpacity
                          style={[
                            styles.cell,
                            styles.iconButtonDelete,
                            { flex: 2, alignItems: 'center' },
                          ]}
                          onPress={() => {
                            setPendingUploads(prev => {
                              const updatedFiles = [...prev[testId]];
                              updatedFiles.splice(idx, 1);
                              return {
                                ...prev,
                                [testId]: updatedFiles,
                              };
                            });
                          }}
                        >
                          <MaterialCommunityIcons
                            name="delete"
                            size={18}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                    ));
                  },
                )}
              </>
            )}
          </ScrollView>
          {data.status !== 'Completed' ? (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() =>
                  navigation.navigate('ReportInfo', {
                    report: referralInfo,
                  })
                }
              >
                <Text style={styles.uploadText}>MARK AS COMPLETED</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.uploadButton}
                onPress={() =>
                  navigation.navigate('ReportInfo', {
                    report: referralInfo,
                  })
                }
              >
                <Text style={styles.uploadText}>SAVE</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleSaveReports}
              >
                <Text style={styles.uploadText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default ReportInfoPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: '#08979d',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  emptyValue: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Poppins-Medium',
  },
  headerTitle: {
    fontSize: 23,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  iconHeader: {
    backgroundColor: '#08979d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
  },
  label: {
    fontSize: 20,
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
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 24,
  },
  tableHeaderText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  tableHeaderTextNew: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 17,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
  },
  iconButtonGroup: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowNew: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: 'grey',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 3,
    fontFamily: 'Poppins-Regular',
  },
  iconButton: {
    backgroundColor: '#08979d',
    borderRadius: 5,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  iconButtonDelete: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
    marginLeft: 3,
  },
  iconButtonNew: {
    backgroundColor: '#08979d',
    borderRadius: 5,
    padding: 6,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 0.5,
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
  backText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#08979d',
    fontFamily: 'Poppins-SemiBold',
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
  uploadText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});
