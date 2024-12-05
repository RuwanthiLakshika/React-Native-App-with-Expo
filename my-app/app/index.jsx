import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import carImage from '../assets/car.jpg';

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Have a better sharing experience</Text>
          <View style={styles.rightContainer}>
          <Image source={carImage} style={{ width: 350, height: 350 }} />
        </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Create an account</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Log In</Text>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  leftContainer: {
    flex: 1,
    marginRight: 24,

  },
  rightContainer: {
    marginTop: 30,
    alignItems: 'flex-center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#0077B6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default index;