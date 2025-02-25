import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/Group 72.png')}
        style={styles.logo}
      />

      {/* Welcome Text */}
      <Text style={styles.title}>Forgot your password?</Text>
      <Text style={styles.subtitle}>Enter your email to reset your password</Text>

      {/* Input Fields */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        style={styles.input}
        keyboardType="email-address"
      />

      {/* Buttons */}
      <TouchableOpacity style={styles.resetButton}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Remembered your password?{' '}
          <Text style={styles.login} onPress={() => alert('Go to Login')}>
            Click Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default ForgotPassword;

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
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#1C1F26',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    marginBottom: 15,
  },
  resetButton: {
    width: '100%',
    backgroundColor: '#FF8C00',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
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
  },
  login: {
    color: '#FF8C00',
    fontWeight: 'bold',
  },
});
