import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const index = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Sign in with your email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          keyboardType="visible-password"
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.socialSignUpContainer}>
          <TouchableOpacity style={styles.socialSignUpButton}>
            <Image source={require('../../assets/gmail.png')} style={styles.socialSignUpIcon} />
            <Text style={styles.socialSignUpText}>Sign up with Gmail</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialSignUpButton}>
            <Image source={require('../../assets/facebook.png')} style={styles.socialSignUpIcon} />
            <Text style={styles.socialSignUpText}>Sign up with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialSignUpButton}>
            <Image source={require('../../assets/apple.png')} style={styles.socialSignUpIcon} />
            <Text style={styles.socialSignUpText}>Sign up with Apple</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={[styles.signInText, styles.linkText]}>Sign up</Text>
          </TouchableOpacity>
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
  signUpButton: {
    marginTop: 30,
    backgroundColor: '#0077B6',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  socialSignUpContainer: {
    marginTop: 15,
    marginBottom: 24,
  },
  socialSignUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 12,
  },
  socialSignUpIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  socialSignUpText: {
    fontSize: 16,
    color: '#333333',
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
});

export default index;