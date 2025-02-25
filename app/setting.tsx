import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; // Import biểu tượng
import { RootStackParamList } from './index';

const SettingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false); // State để hiển thị modal xác nhận đăng xuất

  const handleLogout = () => {
    // Xử lý đăng xuất ở đây
    alert('Đã đăng xuất');
    navigation.navigate('Login'); // Chuyển hướng đến màn hình đăng nhập
    setLogoutModalVisible(false); // Đóng modal sau khi đăng xuất
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header với nút "Back" và tiêu đề "Setting" */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#D17842" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Setting</Text>
      </View>

      {/* Các mục trong màn hình Setting */}
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>History</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('personDetail')} style={styles.item}>
        <Text style={styles.itemText}>Personal Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Address</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Payment Method</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Help</Text>
      </TouchableOpacity>

      {/* Nút Log out */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutModalVisible(true)}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>

      {/* Modal xác nhận đăng xuất */}
      <Modal visible={logoutModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Xác nhận đăng xuất</Text>
            <Text style={styles.confirmText}>Bạn có chắc chắn muốn đăng xuất không?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={handleLogout}>
                <Text style={styles.modalButtonText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 50,
  },
  headerTitle: {
    alignItems: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#D17842',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#D17842',
  },
  confirmButton: {
    backgroundColor: '#e74c3c',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingScreen;