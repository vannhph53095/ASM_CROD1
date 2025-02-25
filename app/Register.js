import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

const api = `http://192.168.2.6:3000/users`;


const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    // Tạo người dùng mới
    const newUser = {
      name,
      email,
      password,
      role: 'customer', // Có thể thêm phân quyền
    };

    // Gửi yêu cầu đăng ký
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          Alert.alert('Đăng ký thành công');
          navigation.navigate('Login');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Đăng ký thất bại, vui lòng thử lại');
      });
  };
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/Group 72.png')}
        style={styles.logo}
      />

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome to Longo !!</Text>
      <Text style={styles.subtitle}>Register to Continue</Text>

      {/* Input Fields */}
      <TextInput
        placeholder="Name"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc"
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#ccc"
        style={styles.input}
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Buttons */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      

      {/* Register and Forgot Password */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          You have an account ?{''} Click {''}
          <Text style={styles.login} onPress={() => navigation.navigate('Login')}>
             Sign in
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#52555A',
    marginBottom: 20,
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#252A32',
    width: '100%',
    backgroundColor: '#0C0F14',
    borderRadius: 8,
    padding: 15,
    color: '#fff',
    marginBottom: 15,
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#D17842',
    padding: 17,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 10,
  },
  login: {
    color: '#D17842',
    fontWeight: 'bold',
  },
});
