import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';

const USERS = [
  { email: 'ruwanthi@gmail.com', password: 'ruwa123', name: 'ruwanthi' },
];

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const loginImage = require('../../assets/loginImage.jpg');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    const user = USERS.find((u) => u.email === email && u.password === password);

    if (user) {
      Alert.alert('Success', 'Login Successful', [
        {
          text: 'OK',
          onPress: () =>router.push({
            pathname: '/home',
            params: { name: user.name },
          }),
        },
      ]);
    } else {
      Alert.alert('Error', 'Invalid email or password.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Sign in with your email</Text>
        <View style={styles.rightContainer}>
          <Image source={loginImage} style={{ width: 350, height: 350 }} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Don't have an account?</Text>
          <Link href="/signup" style={styles.linkText}>
            Sign up
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  linkText: {
    color: '#0077B6',
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 30,
    backgroundColor: '#0077B6',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#666666',
    marginRight: 4,
  },
  rightContainer: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Login;
