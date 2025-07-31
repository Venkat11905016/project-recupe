// CustomAlert.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonStyles } from '../styles/CommonStyles';

const CustomToast = ({
  
  isVisible,
  onClose,
  message,
  navigation,
  redirectRoute
}) => {

  const closeAlert = () => {
    onClose();
  }

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isVisible, onClose]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {closeAlert()}}
      backdropOpacity={0.3}
    >
      <View style={styles.alertContainer}>
        <Icon name={'checkmark-circle'} size={40} color={CommonStyles.themeColor.color} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  message: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomToast;