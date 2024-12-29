import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { ClickCountContext } from "../ClickCountContext";

const Signup = () => {
  const {
    setIsAuthenticated,
    setUserEmail,
    setUserPassword,
  } = useContext(ClickCountContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+94");
  const [gender, setGender] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (number: string): boolean => {
    const phoneRegex = /^\+94\d{9}$/;
    return phoneRegex.test(number);
  };

  const handleSignup = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      Alert.alert("Error", "Enter a valid email address");
      return;
    }

    if (!password || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    if (!phoneNumber.trim() || !validatePhoneNumber(phoneNumber)) {
      Alert.alert("Error", "Enter a valid phone number");
      return;
    }

    if (!gender) {
      Alert.alert("Error", "Please select a gender");
      return;
    }

    if (!isTermsAccepted) {
      Alert.alert("Error", "Please accept Terms of Service");
      return;
    }

    // Update the context with the new user information
    setUserEmail(email);
    setUserPassword(password);
    setIsAuthenticated(true);

    Alert.alert("Success", "Account created successfully", [
      { text: "OK", onPress: () => router.push("/login") },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Sign up with your email</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.phoneNumberContainer}>
          <TouchableOpacity style={styles.countryCodeButton}>
            <Image
              source={require("../../assets/sri-lanka-flag.png")}
              style={styles.countryCodeIcon}
            />
            <Text style={styles.countryCode}>+94</Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, styles.phoneNumberInput]}
            placeholder="Your mobile number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <View style={styles.genderContainer}>
          <Picker
            style={styles.genderPicker}
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <View style={styles.termsContainer}>
          <Pressable
            role="checkbox"
            aria-checked={isTermsAccepted}
            style={[
              styles.checkboxBase,
              isTermsAccepted && styles.checkboxChecked,
            ]}
            onPress={() => setIsTermsAccepted(!isTermsAccepted)}
          >
            {isTermsAccepted && (
              <Ionicons name="checkmark" size={24} color="white" />
            )}
          </Pressable>
          <Text style={styles.termsText}>
            By signing up, you agree to the{" "}
            <Text style={styles.linkText}>Terms of service</Text> and{" "}
            <Text style={styles.linkText}>Privacy policy</Text>.
          </Text>
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account?</Text>
          <TouchableOpacity>
            <Text style={[styles.signInText, styles.linkText]}>
              <Link href="/login">Sign in</Link>
            </Text>
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
    marginTop: 8,
    height: 48,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
    height: 48,
    marginBottom: 16,
  },
  countryCodeIcon: {
    width: 35,
    height: 20,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    color: '#333333',
  },
  phoneNumberInput: {
    flex: 1,
  },
  genderContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    marginBottom: 16,
  },
  genderPicker: {
    height: 50,
  },
  termsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0077B6',
    backgroundColor: 'transparent',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#0077B6',
  },
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 18,
  },
  termsText: {
    fontSize: 14,
    color: '#666666',
    marginRight: 4,
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

export default Signup;