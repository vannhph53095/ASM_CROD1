import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const IndexScreen = () => {
  const router = useRouter();

  useEffect(() => {
    // Sau 2 giây, điều hướng đến màn hình login
    setTimeout(() => {
      router.push('/Login');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/Group72.png')}

        style={styles.image}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14', // Màu nền đen
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang
  },
  image: {
    width: 200, // Đặt chiều rộng của ảnh
    height: 200, // Đặt chiều cao của ảnh
    marginBottom: 20, // Khoảng cách dưới ảnh
  },
  text: {
    color: 'white', // Màu chữ trắng
    fontSize: 20,
  },
});

export default IndexScreen;
