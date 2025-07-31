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
export default function DcHome({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0097A7" barStyle="light-content" />
      <Text style={styles.header}>Hello Ajay,</Text>
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
              <Text style={styles.statValue}>5</Text>
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
              <Text style={styles.statValue}>3</Text>
            </TouchableOpacity>
          </View>
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
    paddingVertical: 50,
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
    fontSize: 25,
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
});
