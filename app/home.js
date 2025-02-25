import { useNavigation } from '@react-navigation/native'; // Đổi từ 'expo-router' sang 'react-navigation'
import React, { useEffect } from 'react';
import { Image, StyleSheet, View, StatusBar, SafeAreaView } from "react-native";

const Index1 = () => {
    const navigation = useNavigation(); // Đặt useNavigation trước useEffect

    useEffect(() => {
        // Chờ 3 giây trước khi chuyển màn hình
        const timer = setTimeout(() => {
            navigation.navigate('Login'); // Chuyển đến màn hình Đăng nhập
        }, 3000);
    
        // Xóa timer khi component bị unmount
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Đặt StatusBar để nền đen tràn lên cả thanh trạng thái */}
            <StatusBar hidden={true} />

           {/* Hiển thị logo */}
             <Image
                source={require('../assets/images/Group 72.png')}
                style={styles.logo}
                resizeMode="contain" // Đảm bảo ảnh không bị méo
            />
        </SafeAreaView>
    );
};

export default Index1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C0F14', // Nền đen tràn màn hình
        justifyContent: 'center', // Căn giữa dọc
        alignItems: 'center', // Căn giữa ngang
    },
    logo: {
        width: 150, // Tăng kích thước logo
        height: 150,
    },
});
