// DeleteAlert.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonStyles } from '../styles/CommonStyles';

const DeleteAlert = ({
  isVisible,
  onClose,
  deleteFunc
}) => {

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.3}  // Semi-transparent backdrop
    >
      <View style={styles.alertContainer}>
        <Icon name={'warning'} size={40} color={CommonStyles.themeColor.color} />
        {/* <Text style={styles.title}>{title}</Text> */}
        <Text style={styles.message}>Are you sure you want to delete?</Text>
        <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
          <TouchableOpacity style={CommonStyles.cancelButton} onPress={onClose}>
            <Text style={[CommonStyles.buttonText, CommonStyles.themeColor]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={CommonStyles.createButton} onPress={() => {
              onClose();
              deleteFunc();
            }}>
            <Text style={CommonStyles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
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

export default DeleteAlert;