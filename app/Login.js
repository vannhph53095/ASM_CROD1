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
import AsyncStorage from '@react-native-async-storage/async-storage';
const api = `http://192.168.2.6:3000/users`;

const Login = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const handleLogin = () => {
    fetch(`${api}?email=${email}`)
      .then((res) => res.json())
      .then(async (users) => {
        if (users.length > 0) {
          const user = users[0];
          if (user.password === password) {
            // Lưu thông tin người dùng vào AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify(user));
  
            Alert.alert('Đăng nhập thành công');
            if (user.role === 'admin') {
              navigation.navigate('Admin');
            } else {
              navigation.navigate('Main');
            }
          } else {
            setError('Sai mật khẩu');
          }
        } else {
          setError('Tài khoản không tồn tại');
        }
      })
      .catch((error) => {
        Alert.alert('Lỗi kết nối', 'Không thể kết nối tới server.');
        console.error(error);
      });
  };
  

  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Chuyển đổi giữa trạng thái ẩn và hiện mật khẩu
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/Group 72.png')}
        style={styles.logo}
      />

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome to Longoo</Text>
      <Text style={styles.subtitle}>Login to Continue</Text>

      {/* Input Fields */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password Input with Eye Icon */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible} // Điều chỉnh secureTextEntry dựa trên passwordVisible
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          {/* <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#ccc" /> */}
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {/* Buttons */}
      <TouchableOpacity style={styles.signInButton} onPress={handleLogin} >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require('../assets/images/image.png')}
          style={styles.googleImage}
        />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      {/* Register and Forgot Password */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text style={styles.register} onPress={() =>navigation.navigate('Register')}>
            Click Register
          </Text>
        </Text>

        <Text style={styles.footerText}>
          Forgot Password?{' '}
          <Text style={styles.reset} onPress={() => alert('Go to Reset')}>
            Click Reset
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'left',
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
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#52555A',
    width: '100%',
    backgroundColor: '#0C0F14',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    marginBottom: 15,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    top: 12,
    right: 15,
    zIndex: 1,
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#D17842',
    padding: 17,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  googleButton: {
    flexDirection: 'row', // Sắp xếp ngang
    alignItems: 'center', // Căn giữa theo trục dọc
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  googleImage: {
    width: 30,
    height: 30,
    marginRight: 10, // Khoảng cách giữa hình ảnh và text
  },
  buttonText: {
    color: '#0C0F14',
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
  register: {
    color: '#D17842',
    fontWeight: 'bold',
  },
  reset: {
    color: '#D17842',
    fontWeight: 'bold',
  },
});
